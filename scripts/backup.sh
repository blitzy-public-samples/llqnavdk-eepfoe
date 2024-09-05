#!/bin/bash

# Set environment variables
source .env

# Set backup directory
BACKUP_DIR="/path/to/backup/directory"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Function to backup the database
backup_database() {
    echo "Backing up database..."
    pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME > $BACKUP_DIR/db_backup_$TIMESTAMP.sql
    if [ $? -eq 0 ]; then
        echo "Database backup completed successfully."
    else
        echo "Database backup failed."
        exit 1
    fi
}

# Function to backup important files
backup_files() {
    echo "Backing up important files..."
    tar -czf $BACKUP_DIR/files_backup_$TIMESTAMP.tar.gz /path/to/important/files
    if [ $? -eq 0 ]; then
        echo "File backup completed successfully."
    else
        echo "File backup failed."
        exit 1
    fi
}

# Function to upload backups to cloud storage
upload_to_cloud() {
    echo "Uploading backups to cloud storage..."
    gsutil cp $BACKUP_DIR/db_backup_$TIMESTAMP.sql gs://$BUCKET_NAME/database/
    gsutil cp $BACKUP_DIR/files_backup_$TIMESTAMP.tar.gz gs://$BUCKET_NAME/files/
    if [ $? -eq 0 ]; then
        echo "Backups uploaded to cloud storage successfully."
    else
        echo "Failed to upload backups to cloud storage."
        exit 1
    fi
}

# Function to clean up old backups
cleanup_old_backups() {
    echo "Cleaning up old backups..."
    find $BACKUP_DIR -type f -name "db_backup_*.sql" -mtime +7 -delete
    find $BACKUP_DIR -type f -name "files_backup_*.tar.gz" -mtime +7 -delete
    gsutil rm gs://$BUCKET_NAME/database/db_backup_*.sql
    gsutil rm gs://$BUCKET_NAME/files/files_backup_*.tar.gz
    echo "Old backups cleaned up."
}

# Main execution
echo "Starting backup process..."

backup_database
backup_files
upload_to_cloud
cleanup_old_backups

echo "Backup process completed successfully."