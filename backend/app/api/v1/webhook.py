from flask import Blueprint, request, jsonify
from backend.app.schema.webhook_schema import WebhookCreate
from backend.app.services.webhook_service import register_webhook, get_webhooks, delete_webhook

webhook_bp = Blueprint('webhook', __name__)

@webhook_bp.route('/webhooks', methods=['POST'])
def register_webhook():
    try:
        data = request.json
        webhook_data = WebhookCreate(**data)
        registered_webhook = register_webhook(webhook_data)
        return jsonify(registered_webhook), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred"}), 500

@webhook_bp.route('/webhooks', methods=['GET'])
def get_all_webhooks():
    try:
        webhooks = get_webhooks()
        return jsonify(webhooks), 200
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred"}), 500

@webhook_bp.route('/webhooks/<webhook_id>', methods=['DELETE'])
def delete_specific_webhook(webhook_id):
    try:
        delete_webhook(webhook_id)
        return jsonify({"message": "Webhook deleted successfully"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred"}), 500