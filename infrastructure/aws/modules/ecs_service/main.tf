resource "aws_cloudwatch_log_group" "this" {
  name              = "/ecs/${var.name}"
  retention_in_days = 7
}

resource "aws_ecs_task_definition" "this" {
  family                   = var.name
  execution_role_arn       = var.execution_role_arn
  task_role_arn            = var.task_role_arn
  network_mode             = "awsvpc"
  cpu                      = var.cpu
  memory                   = var.memory
  requires_compatibilities = ["FARGATE"]
  container_definitions    = jsonencode([
    {
      name         = var.name
      image = var.image
      // map to camelCase
      portMappings = [
        for port_mapping in var.port_mappings : {
          containerPort = port_mapping.container_port
          hostPort      = port_mapping.host_port
        }
      ]
      environment = [
        for k, v in var.env_vars : {
          name  = k,
          value = v
        }
      ]
      logConfiguration : {
        logDriver = "awslogs",
        options = {
          awslogs-group         = aws_cloudwatch_log_group.this.name,
          awslogs-region        = "us-east-1",
          awslogs-stream-prefix = "ecs"
        }
      }
    }
  ])
}

resource "aws_lb_target_group" "this" {
  count                = length(var.port_mappings)
  name                 = "${var.name}-port-${var.port_mappings[count.index].container_port}"
  port                 = var.port_mappings[count.index].container_port
  protocol             = "HTTP"
  vpc_id               = var.vpc_id
  target_type          = "ip"
  deregistration_delay = "30" // lower than default 300 to make redeployments faster
}

resource "aws_lb_listener_rule" "this" {
  count        = length(aws_lb_target_group.this)
  listener_arn = var.lb_listener_arn
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this[count.index].arn
  }
  condition {
    path_pattern {
      values = var.listener_rule_path_pattern
    }
  }
}

resource "aws_security_group" "this" {
  name        = var.name
  vpc_id      = var.vpc_id
  description = "Allow traffic from load balancer"

  dynamic "ingress" {
    for_each = var.port_mappings
    content {
      from_port       = ingress.value.container_port
      to_port         = ingress.value.container_port
      security_groups = [var.alb_security_group]
      protocol        = "tcp"
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_ecs_service" "this" {
  name                               = var.name
  cluster                            = var.cluster_id
  task_definition                    = aws_ecs_task_definition.this.arn
  desired_count                      = 1
  launch_type                        = "FARGATE"
  deployment_minimum_healthy_percent = 0
  deployment_maximum_percent         = 100

  network_configuration {
    subnets          = var.subnets_ids
    assign_public_ip = true
    security_groups = [aws_security_group.this.id]
  }

  dynamic "load_balancer" {
    for_each = aws_lb_target_group.this
    content {
      target_group_arn = load_balancer.value.arn
      container_name   = var.name
      container_port   = load_balancer.value.port
    }
  }
}