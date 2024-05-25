module "vpc" {
  source = "./modules/vpc"
}

module "cognito" {
  source = "./modules/cognito"
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
  listener_rule_priority     = 1
}
