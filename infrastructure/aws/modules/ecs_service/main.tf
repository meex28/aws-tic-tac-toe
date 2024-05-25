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
    }
  ])
}

resource "aws_lb_target_group" "this" {
  count       = length(var.port_mappings)
  name        = "${var.name}-port-${var.port_mappings[count.index].container_port}"
  port        = var.port_mappings[count.index].container_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"
}

resource "aws_lb_listener_rule" "this" {
  count        = length(aws_lb_target_group.this)
  priority     = var.listener_rule_priority
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

resource "aws_ecs_service" "this" {
  name            = var.name
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.this.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.subnets_ids
    assign_public_ip = true
    // TODO: probably set it with ports
    #     security_groups  = var.security_groups
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