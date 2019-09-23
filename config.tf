provider "aws" {
  profile = "${var.aws_user_profile}"
  region  = "${var.aws_region}"
}

terraform {
  required_version = ">= 0.12.9"
}

// IAM policy and role creation for our lambda instances
resource "aws_iam_role" "minigoodeed_lambda_role" {
  name               = "minigoodeed_lambda_role"
  assume_role_policy = "${file("iam/assumerolepolicy.json")}"
}

resource "aws_iam_policy" "s3-policy" {
  name        = "s3-fullaccess-policy"
  description = "Full access to s3"
  policy      = "${file("iam/policyS3.json")}"
}

resource "aws_iam_policy" "cloudwatch-policy" {
  name        = "cloudwatch-fullaccess-policy"
  description = "Full access to cloudwatch"
  policy      = "${file("iam/policyCloudwatch.json")}"
}

resource "aws_iam_policy_attachment" "minigoodeed_lambda_role-attach-S3" {
  name       = "minigoodeed_lambda_role-attachment"
  roles      = ["${aws_iam_role.minigoodeed_lambda_role.name}"]
  policy_arn = "${aws_iam_policy.s3-policy.arn}"
}

resource "aws_iam_policy_attachment" "minigoodeed_lambda_role-attach-Cloudwatch" {
  name       = "minigoodeed_lambda_role-attachment"
  roles      = ["${aws_iam_role.minigoodeed_lambda_role.name}"]
  policy_arn = "${aws_iam_policy.cloudwatch-policy.arn}"
}

resource "aws_s3_bucket" "goodeed-bucket" {
  bucket = "goodeed-bucket"
}

# resource "aws_s3_bucket_public_access_block" "goodeed-bucket" {
#   bucket = "${aws_s3_bucket.goodeed-bucket.id}"
#   block_public_acls   = false
#   block_public_policy = false
# }

resource "aws_s3_bucket_policy" "goodeed-bucket" {
  bucket = "${aws_s3_bucket.goodeed-bucket.id}"

  policy = <<POLICY
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "AllowPublicRead",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::goodeed-bucket/*"
        }
    ]
}
POLICY
}
