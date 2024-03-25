resource "aws_security_group" "this" {
  name        = "tic-tac-toe-sg"
  description = "Security group for tic-tac-toe EC2 instance"
  vpc_id      = var.vpc_id

  // Allow HTTP connections
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  // Allow SSH connections
  ingress {
    from_port   = 22
    to_port     = 22
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

resource "aws_key_pair" "this" {
  public_key = var.public_key
  key_name   = "tic-tac-toe-key"
}

resource "aws_instance" "this" {
  ami                         = local.amazon_linux_ami
  instance_type               = "t2.micro"
  associate_public_ip_address = true
  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = [aws_security_group.this.id]
  key_name                    = aws_key_pair.this.key_name
  user_data                   = file("${path.module}/scripts/install_docker.sh")
  user_data_replace_on_change = true
  tags                        = {
    Name = "tic-tac-toe-instance"
  }
}
