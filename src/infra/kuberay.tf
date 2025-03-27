resource "helm_release" "kuberay" {
  name = "kuberay"

  repository = "https://ray-project.github.io/kuberay-helm/"
  chart      = "kuberay-operator"
  version    = "1.2.2"
}
