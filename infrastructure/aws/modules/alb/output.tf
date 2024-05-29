output "listener_arn" {
  value = aws_lb_listener.this.arn
}

output "security_group_id" {
  value = aws_security_group.this.id
}

output "dns_name" {
  value = aws_alb.this.dns_name
}

output "arn_suffix" {
  value = aws_alb.this.arn_suffix
}