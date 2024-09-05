from imaplib import IMAP4_SSL
from email import message_from_bytes
import os
from backend.app.core.config import Settings
from backend.app.db.session import get_db
from backend.app.services.ocr_service import perform_ocr
from backend.app.services.classification_service import classify_document
from backend.app.services.notification_service import send_notification

settings = Settings()
EMAIL_FOLDER = 'INBOX'


def connect_to_email_server():
    """
    Establishes a connection to the email server using IMAP.

    Returns:
        IMAP4_SSL: An IMAP4_SSL connection object.
    """
    connection = IMAP4_SSL(settings.EMAIL_SERVER)
    connection.login(settings.EMAIL_USERNAME, settings.EMAIL_PASSWORD)
    return connection


def fetch_unread_emails(connection):
    """
    Fetches unread emails from the email server.

    Args:
        connection (IMAP4_SSL): The IMAP4_SSL connection object.

    Returns:
        list: A list of unread email messages.
    """
    connection.select(EMAIL_FOLDER)
    _, message_numbers = connection.search(None, 'UNSEEN')

    emails = []
    for num in message_numbers[0].split():
        _, msg_data = connection.fetch(num, '(RFC822)')
        email_body = msg_data[0][1]
        email_message = message_from_bytes(email_body)
        emails.append(email_message)

    return emails


def process_email(email_message):
    """
    Processes a single email, extracting metadata, attachments, and triggering further processing.

    Args:
        email_message (Message): The email message to process.

    Returns:
        None
    """
    # HUMAN INPUT NEEDED
    # Extract metadata from the email
    subject = email_message['subject']
    sender = email_message['from']
    date = email_message['date']

    # Save the email metadata to the database
    db = next(get_db())
    # TODO: Implement database saving logic

    # Extract and save attachments
    for part in email_message.walk():
        if part.get_content_maintype() == 'multipart':
            continue
        if part.get('Content-Disposition') is None:
            continue

        filename = part.get_filename()
        if filename:
            # Save the attachment
            file_path = os.path.join(settings.ATTACHMENT_DIR, filename)
            with open(file_path, 'wb') as f:
                f.write(part.get_payload(decode=True))

            # Classify the attachment
            classification = classify_document(file_path)

            # Perform OCR on the attachment
            ocr_text = perform_ocr(file_path)

            # TODO: Save classification and OCR results to database

    # Send a notification based on the processing result
    notification_payload = {
        'subject': subject,
        'sender': sender,
        'date': date,
        'status': 'processed'  # You might want to make this more detailed based on the actual processing result
    }
    send_notification(settings.NOTIFICATION_WEBHOOK_URL, notification_payload)
# This code implements the email processing functionality as described in the specification. However, please note that some parts are marked with "HUMAN INPUT NEEDED" or "TODO" as they require additional implementation or specific details that were not provided in the specification. These areas include:

# 1. The exact structure for saving email metadata to the database.
# 2. The specific logic for saving classification and OCR results to the database.
# 3. The exact format of the notification payload, which might need to be adjusted based on your specific requirements.

# Also, make sure to handle exceptions appropriately, especially when dealing with external services like email servers and databases. The current implementation doesn't include extensive error handling for brevity, but in a production environment, you should add proper error handling and logging.
