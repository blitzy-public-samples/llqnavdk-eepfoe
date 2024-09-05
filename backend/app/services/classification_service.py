from google.cloud.automl_v1 import PredictionServiceClient
from backend.app.core.config import Settings

settings = Settings()
client = PredictionServiceClient()

def classify_document(document_content: bytes) -> str:
    """
    Classifies a document based on its content and returns the classification result.

    Args:
        document_content (bytes): The content of the document to be classified.

    Returns:
        str: The classification result (e.g., 'Bank Statement', 'ISO Application').

    HUMAN INPUT NEEDED: This function requires configuration of the Google Cloud AutoML model.
    Please ensure that the correct model name and project details are set in the Settings.
    """
    try:
        # Prepare the payload for the AutoML model
        payload = {"text_snippet": {"content": document_content.decode("utf-8")}}

        # Get the full path of the model
        model_full_id = client.model_path(settings.PROJECT_ID, settings.LOCATION_ID, settings.MODEL_ID)

        # Send the content to the AutoML model for prediction
        response = client.predict(name=model_full_id, payload=payload)

        # Get the highest confidence prediction
        prediction = max(response.payload, key=lambda x: x.classification.score)

        # Return the classification result
        return prediction.display_name

    except Exception as e:
        # Log the error and return a default classification
        print(f"Error during document classification: {str(e)}")
        return "Unclassified"