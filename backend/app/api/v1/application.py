from flask import Blueprint, request, jsonify
from backend.app.schema.application_schema import ApplicationCreate, ApplicationUpdate
from backend.app.services.application_service import create_application, get_application, update_application

application_bp = Blueprint('application', __name__)

@application_bp.route('/applications', methods=['POST'])
def create_application_endpoint():
    try:
        # Parse the incoming request data
        data = request.json

        # Validate the data using ApplicationCreate schema
        application_data = ApplicationCreate(**data)

        # Call the create_application service to create a new application
        new_application = create_application(application_data)

        # Return the created application details as a JSON response
        return jsonify(new_application), 201
    except Exception as e:
        # Handle any errors and return an error message
        return jsonify({"error": str(e)}), 400

@application_bp.route('/applications/<application_id>', methods=['GET'])
def get_application_endpoint(application_id):
    try:
        # Call the get_application service to retrieve the application details
        application = get_application(application_id)

        # Return the application details as a JSON response
        return jsonify(application), 200
    except Exception as e:
        # Handle any errors and return an error message
        return jsonify({"error": str(e)}), 404

@application_bp.route('/applications/<application_id>', methods=['PUT'])
def update_application_endpoint(application_id):
    try:
        # Parse the incoming request data
        data = request.json

        # Validate the data using ApplicationUpdate schema
        update_data = ApplicationUpdate(**data)

        # Call the update_application service to update the application
        updated_application = update_application(application_id, update_data)

        # Return the updated application details as a JSON response
        return jsonify(updated_application), 200
    except Exception as e:
        # Handle any errors and return an error message
        return jsonify({"error": str(e)}), 400

# HUMAN INPUT NEEDED
# Consider adding error handling for specific exceptions
# and implementing proper logging for better debugging and monitoring