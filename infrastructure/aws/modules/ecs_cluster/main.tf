resource "aws_ecs_cluster" "this" {
  name = "tic-tac-toe-cluster"
}

resource "aws_security_group" "ecr_sg" {
  name        = "ecr-security-group"
  description = "Security group for ECR VPC endpoint"
  vpc_id      = var.vpc_id

  ingress {
    from_port = 443
    to_port   = 443
    protocol  = "tcp"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_vpc_endpoint" "ecr_dkr" {
  vpc_id              = var.vpc_id
  service_name        = "com.amazonaws.us-east-1.ecr.dkr"
  vpc_endpoint_type   = "Interface"
  security_group_ids  = [aws_security_group.ecr_sg.id]
  subnet_ids          = var.private_subnets_ids
  private_dns_enabled = true
  tags = {
    Name = "ecr-dkr-endpoint"
  }
}

resource "aws_vpc_endpoint" "ecr_api" {
  vpc_id              = var.vpc_id
  service_name        = "com.amazonaws.us-east-1.ecr.api"
  vpc_endpoint_type   = "Interface"
  security_group_ids  = [aws_security_group.ecr_sg.id]
  subnet_ids          = var.private_subnets_ids
  private_dns_enabled = true
  tags = {
    Name = "ecr-api-endpoint"
  }
}
