locals {
  desired_size = 3
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "my-eks-cluster"
  cluster_version = "1.31"

  vpc_id     = aws_vpc.main.id
  subnet_ids = [aws_subnet.public_1.id, aws_subnet.public_2.id]

  cluster_endpoint_public_access = true

  enable_cluster_creator_admin_permissions = true

  cluster_addons = {
    coredns                = {}
    eks-pod-identity-agent = {}
    kube-proxy             = {}
    vpc-cni                = {}
  }

  eks_managed_node_groups = {
    worker = {
      ami_type       = "AL2023_x86_64_STANDARD"
      instance_types = ["t3a.medium"]
      subnet_ids     = [aws_subnet.public_1.id]
      iam_role_additional_policies = {
        "S3FullAccess" = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
      }

      min_size     = 3
      max_size     = 3
      desired_size = local.desired_size
    }
  }

  node_security_group_additional_rules = {
    ingress_allow_access_from_control_plane = {
      type                          = "ingress"
      protocol                      = "tcp"
      from_port                     = 9443
      to_port                       = 9443
      description                   = "Allow access from control plane to webhook port of AWS load balancer controller"
    }
  }

  tags = {
    Environment = "dev"
    Terraform   = "true"
  }
}

data "aws_eks_cluster" "default" {
  depends_on = [ module.eks ]
  name = module.eks.cluster_name
}

resource "null_resource" "update_desired_size" {
  triggers = {
    desired_size = local.desired_size
  }

  provisioner "local-exec" {
    interpreter = ["bash", "-c"]

    # Note: this requires the awscli to be installed locally where Terraform is executed
    command     = <<-EOT
      aws eks update-nodegroup-config \
        --cluster-name ${module.eks.cluster_name} \
        --nodegroup-name ${element(split(":", module.eks.eks_managed_node_groups["worker"].node_group_id), 1)} \
        --scaling-config desiredSize=${local.desired_size}
    EOT
  }
}
