variable "iam_role" {
  description = "IAM role which has access to created DynamoDB table"
  type        = string
}

variable "region" {
  type = string
}