variable "aws_region" {
  type        = string
  description = "Target deployment cloud region"
  default     = "us-east-1"
}

variable "environment" {
  type        = string
  description = "Execution environment stage (e.g. staging, prod)"
  default     = "staging"
}
