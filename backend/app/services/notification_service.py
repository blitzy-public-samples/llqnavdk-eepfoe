from requests import post
from backend.app.core.config import Settings

settings = Settings()

def send_notification(webhook_url: str, payload: dict) -> bool:
    """
    Sends a notification to a registered webhook URL.

    Args:
        webhook_url (str): The URL of the webhook to send the notification to.
        payload (dict): The data to be sent in the notification.

    Returns:
        bool: True if the notification was sent successfully, False otherwise.
    """
    try:
        response = post(webhook_url, json=payload, timeout=settings.WEBHOOK_TIMEOUT)
        response.raise_for_status()
        return True
    except Exception as e:
        # Log the error here if needed
        print(f"Error sending notification: {str(e)}")
        return False