# Configure the Google Cloud provider
provider "google" {
  project = var.project_id
  region  = var.region
}

# Create a Google Cloud Storage bucket for storing documents
resource "google_storage_bucket" "document_storage" {
  name     = "${var.project_id}-mca-documents"
  location = var.region
  force_destroy = true

  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }
}

# Create a Google Cloud SQL instance for the database
resource "google_sql_database_instance" "mca_database" {
  name             = "mca-database-instance"
  database_version = "POSTGRES_13"
  region           = var.region

  settings {
    tier = "db-f1-micro"

    backup_configuration {
      enabled = true
    }
  }

  deletion_protection = false
}

# Create a database within the SQL instance
resource "google_sql_database" "mca_db" {
  name     = "mca_db"
  instance = google_sql_database_instance.mca_database.name
}

# Create a Google Cloud AI Platform model for document classification
resource "google_ai_platform_model" "document_classifier" {
  name        = "document-classifier"
  description = "Model for classifying MCA application documents"
  regions     = [var.region]

  online_prediction {
    machine_type = "n1-standard-2"
  }
}

# Enable the Google Cloud Vision API
resource "google_project_service" "vision_api" {
  service = "vision.googleapis.com"

  disable_on_destroy = false
}

# Output the created resources
output "document_bucket_name" {
  value       = google_storage_bucket.document_storage.name
  description = "The name of the Google Cloud Storage bucket for storing documents"
}

output "database_connection_name" {
  value       = google_sql_database_instance.mca_database.connection_name
  description = "The connection name of the Google Cloud SQL instance"
}

output "document_classifier_model_name" {
  value       = google_ai_platform_model.document_classifier.name
  description = "The name of the Google Cloud AI Platform model for document classification"
}