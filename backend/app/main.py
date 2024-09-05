from flask import Flask
from backend.app.core.config import Settings
from backend.app.api import application_bp, document_bp, webhook_bp, user_bp
from backend.app.db.session import engine, SessionLocal
from backend.app.tasks.celery import celery_app, make_celery
from backend.app.tasks.periodic_tasks import setup_periodic_tasks
from backend.app.db.base import Base

settings = Settings()
app = Flask(__name__)
celery = make_celery(app)

def create_app():
    # Initialize the Flask application
    app = Flask(__name__)

    # Configure the application using settings from the Settings class
    app.config.from_object(settings)

    # Register API blueprints for application, document, webhook, and user routes
    app.register_blueprint(application_bp, url_prefix='/api/v1/applications')
    app.register_blueprint(document_bp, url_prefix='/api/v1/documents')
    app.register_blueprint(webhook_bp, url_prefix='/api/v1/webhooks')
    app.register_blueprint(user_bp, url_prefix='/api/v1/users')

    # Initialize the database engine and session
    app.config['SQLALCHEMY_DATABASE_URI'] = settings.DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Set up Celery for asynchronous task processing
    app.config['CELERY_BROKER_URL'] = settings.CELERY_BROKER_URL
    app.config['CELERY_RESULT_BACKEND'] = settings.CELERY_RESULT_BACKEND
    celery.conf.update(app.config)

    # Configure periodic tasks using Celery Beat
    setup_periodic_tasks(celery)

    return app

def init_db():
    # Import all SQLAlchemy models
    from backend.app.db.models import application, document, user, webhook

    # Create all tables in the database using the engine
    Base.metadata.create_all(bind=engine)

# HUMAN INPUT NEEDED: Consider adding error handling and logging to the create_app and init_db functions.

if __name__ == '__main__':
    app = create_app()
    init_db()
    app.run(debug=True)