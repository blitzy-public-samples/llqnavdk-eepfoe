output "gcs_bucket_name" {
  description = "The name of the Google Cloud Storage bucket"
  value       = google_storage_bucket.document_storage.name
}

output "cloud_sql_connection_string" {
  description = "The connection string for the Google Cloud SQL instance"
  value       = google_sql_database_instance.mca_database.connection_name
  sensitive   = true
}

output "ai_platform_model_endpoint" {
  description = "The endpoint URL for the Google Cloud AI Platform model"
  value       = google_ai_platform_model.document_classifier.serving_url
}