resource "aws_security_group" "this" {
  name        = "tic-tac-toe-sg"
  description = "Security group for tic-tac-toe EC2 instance"
  vpc_id      = var.vpc_id
  ingress {
    from_port   = 80
    to_port     = 80
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

resource "aws_instance" "this" {
  ami                         = local.amazon_linux_ami
  instance_type               = "t2.micro"
  associate_public_ip_address = true
  // TODO: associate with subnets
  vpc_security_group_ids      = [aws_security_group.this.id]
  tags                        = {
    Name = "tic-tac-toe-instance"
  }
}
