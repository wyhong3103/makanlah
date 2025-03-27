locals {
  argo_values = {
    "server" = {
      "extraArgs" = ["--auth-mode=server"]
    }
    "workflow" = {
      "serviceAccount" = {
        "create" = true
      },
      "rbac" = {
        "create" = true
      }
    }
    "controller" = {
      "containerRuntimeExecutor" = "emissary"
    }
    "useDefaultArtifactRepo" = true
    "useStaticCredentials"   = false
    "artifactRepository" = {
      "s3" = {
        "bucket"      = aws_s3_bucket.main.bucket
        "keyFormat"   = "argo-artifacts/{{workflow.creationTimestamp.Y}}/{{workflow.creationTimestamp.m}}/{{workflow.creationTimestamp.d}}/{{workflow.name}}/{{pod.name}}"
        "region"      = "us-east-1"
        "endpoint"    = "s3.amazonaws.com"
        "useSDKCreds" = true
        "insecure"    = false
      }
    }
  }
}

resource "helm_release" "argo" {
  name = "argo"

  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-workflows"

  values = [
    yamlencode(local.argo_values)
  ]
}
