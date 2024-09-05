from flask import Blueprint, request, jsonify
from backend.app.schema.user_schema import UserCreate, UserUpdate
from backend.app.services.user_service import create_user, get_user, update_user

user_bp = Blueprint('user', __name__)

@user_bp.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.json
        user_create = UserCreate(**data)
        new_user = create_user(user_create)
        return jsonify(new_user), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred"}), 500

@user_bp.route('/users/<user_id>', methods=['GET'])
def get_user_details(user_id):
    try:
        user = get_user(user_id)
        if user:
            return jsonify(user), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred"}), 500

@user_bp.route('/users/<user_id>', methods=['PUT'])
def update_user_details(user_id):
    try:
        data = request.json
        user_update = UserUpdate(**data)
        updated_user = update_user(user_id, user_update)
        if updated_user:
            return jsonify(updated_user), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred"}), 500

# HUMAN INPUT NEEDED: Consider adding error handling for specific exceptions
# that might be raised by the user service functions.