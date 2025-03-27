variable "db_password" {
  description = "RDS root user password"
  type        = string
  sensitive   = true
}

module "db" {
  source = "terraform-aws-modules/rds/aws"

  identifier = "makanlah-db"

  engine                   = "postgres"
  engine_version           = "14"
  engine_lifecycle_support = "open-source-rds-extended-support-disabled"
  family                   = "postgres14"
  major_engine_version     = "14"     
  instance_class    = "db.t4g.micro"
  allocated_storage = 10

  manage_master_user_password	= false

  db_name  = "makanlah"
  username = "makanlah_admin"
  port     = 5432
  password = var.db_password

  vpc_security_group_ids = [aws_security_group.allow_all.id]

  create_db_subnet_group = true
  subnet_ids = [aws_subnet.public_1.id, aws_subnet.public_2.id]

  parameters = []
}

output "rds" {
  depends_on = [module.db]
  value = module.db.db_instance_address
  description = "RDS DB address"
}
