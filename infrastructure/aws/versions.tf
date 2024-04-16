terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.42.0"
    }
  }

  backend "s3" {
    bucket  = "tic-tac-toe-tf-state"
    key     = "prod.tfstate"
    region  = "us-east-1"
    profile = "cloud_lab"
  }

  required_version = ">= 1.7.5"
}

provider "aws" {
  profile = "cloud_lab"
  region  = "us-east-1"
}