# Import necessary models
from backend.app.db.models.application import Application
from backend.app.db.models.document import Document
from backend.app.db.models.user import User
from backend.app.db.models.webhook import Webhook

# This file initializes the database module and imports the necessary models.
# By importing these models here, we ensure that they are available when the database is initialized.
# This can help prevent circular import issues and makes it easier to use these models in other parts of the application.