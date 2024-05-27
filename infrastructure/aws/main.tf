module "vpc" {
  source = "./modules/vpc"
}

module "cognito" {
  source          = "./modules/cognito"
  application_url = "https://${module.alb.dns_name}"
}

module "alb" {
  source      = "./modules/alb"
  subnets_ids = module.vpc.public_subnets_ids
  vpc_id      = module.vpc.vpc_id
}

module "ecs_cluster" {
  source              = "./modules/ecs_cluster"
  private_subnets_ids = module.vpc.private_subnets_ids
  vpc_id              = module.vpc.vpc_id
}

module "frontend_service" {
  source             = "./modules/ecs_service"
  cluster_id         = module.ecs_cluster.cluster_id
  cpu                = 256
  execution_role_arn = local.ecs_execution_task_role
  task_role_arn      = local.task_role
  image              = "meex8462/tic-tac-toe-frontend:latest"
  memory             = 512
  name               = "tic-tac-toe-frontend"
  port_mappings      = [
    {
      host_port      = 80
      container_port = 80
    }
  ]
  subnets_ids                = module.vpc.public_subnets_ids
  vpc_id                     = module.vpc.vpc_id
  lb_listener_arn            = module.alb.listener_arn
  listener_rule_path_pattern = ["/*"]
  env_vars = {
    VITE_AWS_REGION           = "us-east-1"
    VITE_COGNITO_CLIENT_ID    = module.cognito.user_pool_client_id
    VITE_COGNITO_USER_POOL_ID = module.cognito.user_pool_id
  }
  alb_security_group = module.alb.security_group_id
}

module "backend_service" {
  source             = "./modules/ecs_service"
  cluster_id         = module.ecs_cluster.cluster_id
  cpu                = 256
  execution_role_arn = local.ecs_execution_task_role
  task_role_arn      = local.task_role
  image              = "meex8462/tic-tac-toe-backend:latest"
  memory             = 512
  name               = "tic-tac-toe-backend"
  port_mappings      = [
    {
      host_port      = 3001
      container_port = 3001
    },
    {
      host_port      = 3000
      container_port = 3000
    }
  ]
  subnets_ids                = module.vpc.public_subnets_ids
  vpc_id                     = module.vpc.vpc_id
  lb_listener_arn            = module.alb.listener_arn
  listener_rule_path_pattern = ["/api/*"]
  env_vars = {
    COGNITO_CLIENT_ID    = module.cognito.user_pool_client_id
    COGNITO_USER_POOL_ID = module.cognito.user_pool_id
  }
  alb_security_group = module.alb.security_group_id
}
