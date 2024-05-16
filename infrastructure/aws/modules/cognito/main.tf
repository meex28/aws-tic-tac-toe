resource "aws_cognito_user_pool" "this" {
  name = "tic-tac-toe-user-pool"
}

resource "aws_cognito_user_pool_client" "this" {
  name                = "tic-tac-toe-client"
  user_pool_id        = aws_cognito_user_pool.this.id
  explicit_auth_flows = ["ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_PASSWORD_AUTH"]
}
