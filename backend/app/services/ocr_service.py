from google.cloud.vision import ImageAnnotatorClient
from io import BytesIO
from backend.app.core.config import Settings

settings = Settings()
client = ImageAnnotatorClient()

def perform_ocr(document_content: bytes) -> str:
    # HUMAN INPUT NEEDED
    try:
        # Convert the document content to an image format
        image = BytesIO(document_content)

        # Send the image to Google Cloud Vision API for text extraction
        response = client.document_text_detection(image=image)

        # Extract and concatenate the text from the response
        extracted_text = ""
        for page in response.full_text_annotation.pages:
            for block in page.blocks:
                for paragraph in block.paragraphs:
                    for word in paragraph.words:
                        extracted_text += ''.join([symbol.text for symbol in word.symbols])
                        extracted_text += ' '
                    extracted_text += '\n'

        return extracted_text.strip()
    except Exception as e:
        # Log the error and return an empty string or handle the error as needed
        print(f"Error performing OCR: {str(e)}")
        return ""