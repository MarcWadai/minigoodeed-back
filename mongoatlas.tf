
# # provision and create mongo database
# provider "mongodbatlas" {
#   public_key = "${var.mongoatlas_public}"
#   private_key  = "${var.mongoatlas_private}"
# }


# # Create a Group
# resource "mongodbatlas_project" "mini_goodeed" {
#   org_id = "${var.mongoatlas_orgid}"
#   name = "${var.mongoatlas_project_name}"
# }

# # Create a Group IP Whitelist
# resource "mongodbatlas_project_ip_whitelist" "mini_goodeed" {
#   project_id = "${mongodbatlas_project.mini_goodeed.project_id}"
#   cidr_block = "${var.mongoatlas_whitelist}"
#   comment = "whitelist"
# }

# # Create a Container
# resource "mongodbatlas_container" "mini_goodeed" {
#   group = "${mongodbatlas_project.test.id}"
#   atlas_cidr_block = "10.0.0.0/21"
#   provider_name = "${var.mongoatlas_provider}"
#   region = "${var.mongoatlas_cluster_region}"
# }

# # Create a Cluster
# resource "mongodbatlas_cluster" "mini_goodeed" {
#   depends_on = ["mongodbatlas_container.mini_goodeed"]
#   name = "${var.mongoatlas_cluster_name}"
#   group = "${mongodbatlas_project.mini_goodeed.id}"
#   mongodb_major_version = "3.6"
#   provider_name = "${var.mongoatlas_provider}"
#   backing_provider = "${var.mongoatlas_provider}"
#   region = "${var.mongoatlas_cluster_region}"
#   size = "${var.mongoatlas_cluster_tier}"
#   backup = false
# }

# # Create a Database User
# resource "mongodbatlas_database_user" "mini_goodeed" {
#   username = "marc"
#   password = "${var.mongoatlas_user_password}"
#   database_name = "admin"
#   project_id = ""
#   roles {
#     name = "readWrite"
#     database = "admin"
#   }
# }
# data "mongodbatlas_database_user" "mini_goodeed" {
#     project_id = "${mongodbatlas_database_user.mini_goodeed.project_id}"
#     username = "${mongodbatlas_database_user.mini_goodeed.username}"
# }