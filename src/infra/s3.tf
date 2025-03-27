resource "aws_s3_bucket" "main" {
  bucket = "makanlah-s3-bucket"
  force_destroy = true
}
