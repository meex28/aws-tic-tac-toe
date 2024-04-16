output "url" {
  value = "http://${module.ec2.public_dns}"
}