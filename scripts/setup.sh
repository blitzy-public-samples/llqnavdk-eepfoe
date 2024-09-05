#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Function to install dependencies
install_dependencies() {
    echo "Installing dependencies..."
    
    # Update package lists
    sudo apt-get update

    # Install Python and pip
    sudo apt-get install -y python3 python3-pip

    # Install Docker and Docker Compose
    sudo apt-get install -y docker.io docker-compose

    # Install PostgreSQL
    sudo apt-get install -y postgresql postgresql-contrib

    # Install Redis
    sudo apt-get install -y redis-server

    # Install project dependencies
    pip3 install -r requirements.txt
}

# Function to configure environment
configure_environment() {
    echo "Configuring environment..."
    
    # Create .env file if it doesn't exist
    if [ ! -f .env ]; then
        cp .env.example .env
        echo "Please update the .env file with your specific configurations."
    fi

    # Set up Google Cloud credentials
    if [ ! -f google-cloud-credentials.json ]; then
        echo "Please place your Google Cloud credentials JSON file in the project root and name it 'google-cloud-credentials.json'"
    fi

    # Set environment variables
    export GOOGLE_APPLICATION_CREDENTIALS="./google-cloud-credentials.json"
}

# Function to initialize database
initialize_database() {
    echo "Initializing database..."
    
    # Create database if it doesn't exist
    sudo -u postgres psql -c "CREATE DATABASE mca_db;"

    # Apply database migrations
    python3 manage.py db upgrade
}

# Function to start services
start_services() {
    echo "Starting services..."
    
    # Start Docker containers
    docker-compose up -d

    # Start Redis server
    sudo systemctl start redis-server

    # Start Celery worker
    celery -A backend.app.tasks.celery worker --loglevel=info &

    # Start Celery beat
    celery -A backend.app.tasks.celery beat --loglevel=info &

    # Start Flask development server
    python3 run.py
}

# Main execution
echo "Setting up development environment..."

install_dependencies
configure_environment
initialize_database
start_services

echo "Setup complete. The application should now be running."