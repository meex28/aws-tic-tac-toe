module "vpc" {
  source = "./modules/vpc"
}

module "ec2" {
  source     = "./modules/ec2"
  vpc_id     = module.vpc.vpc_id
  subnet_id  = module.vpc.public_subnets_ids[0]
  public_key = file("${path.module}/key_pair/tic-tac-toe-key.pub")
}