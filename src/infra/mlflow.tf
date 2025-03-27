locals {
  depends_on = [module.db]

  mlflow_values = {
    "backendStore" = {
      "postgres" = {
        "enabled"  = true
        "host"     = module.db.db_instance_address
        "port"     = 5432
        "database" = "makanlah"
        "user"     = "makanlah_admin"
        "password" = var.db_password
      }
    }
    "artifactRoot" = {
      "s3" = {
        "enabled" = true
        "bucket"  = aws_s3_bucket.main.bucket
      }
    }
  }
}

resource "helm_release" "mlflow" {
  name = "mlflow"

  repository = "https://community-charts.github.io/helm-charts"
  chart      = "mlflow"

  values = [
    yamlencode(local.mlflow_values)
  ]
}
