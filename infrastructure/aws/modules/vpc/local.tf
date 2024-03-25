locals {
  public_subnets = [
    { cidr_block = "10.0.1.0/24", availability_zone = "us-east-1a" },
    { cidr_block = "10.0.2.0/24", availability_zone = "us-east-1b" },
    { cidr_block = "10.0.3.0/24", availability_zone = "us-east-1c" },
  ]
}