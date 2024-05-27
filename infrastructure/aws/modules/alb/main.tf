resource "aws_security_group" "this" {
  name        = "tic-tac-toe-alb-sg"
  description = "Security group for tic-tac-toe ALB"
  vpc_id      = var.vpc_id

  // Allow HTTPS connections
  ingress {
    from_port = 443
    to_port   = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_alb" "this" {
  name            = "tic-tac-toe-alb"
  subnets         = var.subnets_ids
  security_groups = [aws_security_group.this.id]
}

resource "aws_lb_listener" "this" {
  load_balancer_arn = aws_alb.this.arn
  port            = 443
  protocol        = "HTTPS"
  certificate_arn = local.certificate_arn

  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "Wrong domain!"
      status_code  = "404"
    }
  }
}
