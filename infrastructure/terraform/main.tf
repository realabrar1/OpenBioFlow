terraform {
  required_version = ">= 1.7.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# The infrastructure components are structured in clean isolated modules
# E.g. VPC, EKS cluster, RDS PostgreSQL, ElastiCache Redis, and S3 Storage buckets
