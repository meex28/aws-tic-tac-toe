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
