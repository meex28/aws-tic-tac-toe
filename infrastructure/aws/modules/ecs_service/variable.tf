variable "name" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "execution_role_arn" {
  type = string
}

variable "task_role_arn" {
  type = string
}

variable "cpu" {
  type = number
}

variable "memory" {
  type = number
}

variable "image" {
  type = string
}

variable "port_mappings" {
  type = list(object({
    container_port = number
    host_port      = number
  }))
}

variable "cluster_id" {
  type = string
}

variable "subnets_ids" {
  type = list(string)
}

variable "lb_listener_arn" {
  type = string
}

variable "listener_rule_path_pattern" {
  type = list(string)
}

variable "env_vars" {
  type = map(string)
}

variable "alb_security_group" {
  type = string
}
