output "vpc_id" {
  value = aws_vpc.this.id
}

output "public_subnets_ids" {
  value = aws_subnet.public[*].id
}
