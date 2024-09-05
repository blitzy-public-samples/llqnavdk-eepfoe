variable "project_id" {
  description = "The Google Cloud Project ID"
  type        = string
}

variable "region" {
  description = "The Google Cloud region where resources will be created"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "The Google Cloud zone within the region"
  type        = string
  default     = "us-central1-a"
}

variable "storage_bucket_name" {
  description = "The name of the Google Cloud Storage bucket for storing documents"
  type        = string
}

variable "database_instance_name" {
  description = "The name of the Google Cloud SQL instance"
  type        = string
}

variable "database_name" {
  description = "The name of the database within the SQL instance"
  type        = string
  default     = "mca_db"
}

variable "database_user" {
  description = "The username for the database"
  type        = string
}

variable "database_password" {
  description = "The password for the database user"
  type        = string
  sensitive   = true
}

variable "ml_model_name" {
  description = "The name of the machine learning model for document classification"
  type        = string
  default     = "document-classifier"
}

variable "vision_api_enabled" {
  description = "Whether to enable the Google Cloud Vision API"
  type        = bool
  default     = true
}

variable "app_engine_service_name" {
  description = "The name of the App Engine service for hosting the application"
  type        = string
  default     = "mca-app"
}

variable "network_name" {
  description = "The name of the VPC network to be created"
  type        = string
  default     = "mca-network"
}

variable "subnet_name" {
  description = "The name of the subnet within the VPC network"
  type        = string
  default     = "mca-subnet"
}

variable "subnet_cidr" {
  description = "The CIDR range for the subnet"
  type        = string
  default     = "10.0.0.0/24"
}