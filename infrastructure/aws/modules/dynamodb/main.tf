resource "aws_dynamodb_table" "games_table" {
  name         = "GamesResultsTable"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "hostPlayerSub"
    type = "S"
  }

  attribute {
    name = "guestPlayerSub"
    type = "S"
  }

  global_secondary_index {
    name     = "hostPlayerSub-index"
    hash_key = "hostPlayerSub"
    projection_type = "ALL"
  }

  global_secondary_index {
    name     = "guestPlayerSub-index"
    hash_key = "guestPlayerSub"
    projection_type = "ALL"
  }
}

resource "aws_dynamodb_resource_policy" "games_table_policy" {
  policy = jsonencode({
    Version   = "2012-10-17",
    Statement = [
      {
        Effect    = "Deny",
        Principal = "*",
        "NotAction" : [
          "dynamodb:*ResourcePolicy", // remain it to be able to update the policy in the future
          "dynamodb:List*",
          "dynamodb:Describe*"
        ],
        Resource = aws_dynamodb_table.games_table.arn,
        Condition = {
          StringNotEquals = {
            "aws:SourceArn" : var.iam_role
          }
        }
      }
    ]
  })
  resource_arn = aws_dynamodb_table.games_table.arn
}
