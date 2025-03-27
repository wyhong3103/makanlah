resource "aws_iam_policy" "aws_load_balancer_controller_policy" {
  name   = "AWSLoadBalancerControllerPolicy"
  policy = file("./config/alb_policy.json")
}

resource "aws_iam_role" "aws_load_balancer_controller_irsa_role" {
  name                = "aws_load_balancer_controller"
  assume_role_policy  = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "${module.eks.oidc_provider_arn}"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "${module.eks.oidc_provider}:sub": "system:serviceaccount:kube-system:aws-load-balancer-controller",
                    "${module.eks.oidc_provider}:aud": "sts.amazonaws.com"
                }
            }
        }
    ]
  })
  managed_policy_arns = [aws_iam_policy.aws_load_balancer_controller_policy.arn]
}

resource "helm_release" "aws_load_balancer_controller" {
  name = "aws-load-balancer-controller"

  repository = "https://aws.github.io/eks-charts"
  chart      = "aws-load-balancer-controller"
  namespace  = "kube-system"
  version    = "1.4.4"

  set {
    name  = "replicaCount"
    value = 1
  }

  set {
    name  = "clusterName"
    value = module.eks.cluster_name
  }

  set {
    name  = "serviceAccount.name"
    value = "aws-load-balancer-controller"
  }

  set {
    name  = "serviceAccount.annotations.eks\\.amazonaws\\.com/role-arn"
    value = aws_iam_role.aws_load_balancer_controller_irsa_role.arn
  }
}
