#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Function to build the application
build_application() {
    echo "Building the application..."
    
    # Build backend
    cd backend
    pip install -r requirements.txt
    python setup.py build
    cd ..

    # Build frontend
    cd frontend
    npm install
    npm run build
    cd ..
}

# Function to run tests
run_tests() {
    echo "Running tests..."
    
    # Run backend tests
    cd backend
    python -m pytest tests/
    cd ..

    # Run frontend tests
    cd frontend
    npm run test
    cd ..
}

# Function to deploy to cloud
deploy_to_cloud() {
    echo "Deploying to Google Cloud Platform..."
    
    # Authenticate with Google Cloud (assuming gcloud is already configured)
    gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}

    # Deploy backend to Google App Engine
    cd backend
    gcloud app deploy app.yaml --project=${GCP_PROJECT_ID} --quiet

    # Deploy frontend to Google Cloud Storage
    cd ../frontend/build
    gsutil -m rsync -r . gs://${GCS_BUCKET_NAME}

    # Set the bucket to serve a static website
    gsutil web set -m index.html -e 404.html gs://${GCS_BUCKET_NAME}
}

# Function to perform post-deploy checks
post_deploy_checks() {
    echo "Performing post-deployment checks..."
    
    # Check if backend is responding
    BACKEND_URL="https://${GCP_PROJECT_ID}.appspot.com/api/health"
    if curl -sSf ${BACKEND_URL} > /dev/null; then
        echo "Backend is up and running."
    else
        echo "Backend deployment failed!" && exit 1
    fi

    # Check if frontend is accessible
    FRONTEND_URL="https://storage.googleapis.com/${GCS_BUCKET_NAME}/index.html"
    if curl -sSf ${FRONTEND_URL} > /dev/null; then
        echo "Frontend is accessible."
    else
        echo "Frontend deployment failed!" && exit 1
    fi
}

# Main deployment script
main() {
    build_application
    run_tests
    deploy_to_cloud
    post_deploy_checks
    
    echo "Deployment completed successfully!"
}

# Run the main function
main