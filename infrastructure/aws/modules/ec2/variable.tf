variable "vpc_id" {
  description = "ID of used VPC"
  type        = string
}

variable "subnet_id" {
  description = "Subnet to associate with EC2"
  type        = string
}

variable "public_key" {
  description = "Public key to create key pair for EC2"
  type        = string
}