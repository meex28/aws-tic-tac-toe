variable "subnets_ids" {
  description = "List of subnets ids to associate with ALB"
  type        = list(string)
}

variable "vpc_id" {
  type = string
}