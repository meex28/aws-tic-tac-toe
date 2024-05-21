resource "aws_dynamodb_table" "games_table" {
  name         = "GamesResultsTable"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "host_player_sub"
    type = "S"
  }

  attribute {
    name = "guest_player_sub"
    type = "S"
  }

  global_secondary_index {
    name            = "host_player_sub-index"
    hash_key        = "host_player_sub"
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "guest_player_sub-index"
    hash_key        = "guest_player_sub"
    projection_type = "ALL"
  }
}
