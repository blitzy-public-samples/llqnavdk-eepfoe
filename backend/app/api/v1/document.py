from flask import Blueprint, request, jsonify
from backend.app.schema.document_schema import DocumentCreate, DocumentUpdate
from backend.app.services.document_service import upload_document, get_document, classify_document

document_bp = Blueprint('document', __name__)

@document_bp.route('/documents', methods=['POST'])
def upload_document_endpoint():
    try:
        # Parse the incoming request data
        data = request.json

        # Validate the data using DocumentCreate schema
        document_data = DocumentCreate(**data)

        # Call the upload_document service to upload the document
        uploaded_document = upload_document(document_data)

        # Return the uploaded document details as a JSON response
        return jsonify(uploaded_document), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@document_bp.route('/documents/<document_id>', methods=['GET'])
def get_document_endpoint(document_id: str):
    try:
        # Call the get_document service to retrieve the document details
        document = get_document(document_id)

        # Return the document details as a JSON response
        return jsonify(document), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 404

@document_bp.route('/documents/<document_id>/classify', methods=['POST'])
def classify_document_endpoint(document_id: str):
    try:
        # Call the classify_document service to classify the document
        classification_result = classify_document(document_id)

        # Return the classification result as a JSON response
        return jsonify(classification_result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# HUMAN INPUT NEEDED
# Consider adding error handling for specific exceptions
# and implementing proper logging for debugging purposes