resource "aws_cognito_user_pool" "this" {
  name = "tic-tac-toe-user-pool"
  alias_attributes         = ["email", "preferred_username"]
  auto_verified_attributes = ["email"]

  schema {
    attribute_data_type      = "String"
    name                     = "email"
    developer_only_attribute = false
    mutable                  = true
    required                 = true
    string_attribute_constraints {
      max_length = 50
      min_length = 1
    }
  }
}

resource "aws_cognito_user_pool_client" "this" {
  name                                 = "tic-tac-toe-client"
  user_pool_id                         = aws_cognito_user_pool.this.id
  explicit_auth_flows                  = ["ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_PASSWORD_AUTH"]
  callback_urls = ["http://localhost:5173/callback/", "${var.application_url}/callback/"]
  logout_urls = ["http://localhost:5173/", "${var.application_url}/"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = ["email", "openid", "profile"]
  supported_identity_providers         = ["COGNITO"]
}

resource "aws_cognito_user_pool_domain" "this" {
  domain       = "tic-tac-toe-app"
  user_pool_id = aws_cognito_user_pool.this.id
}
