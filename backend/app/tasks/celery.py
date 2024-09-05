from celery import Celery
from backend.app.core.config import Settings

settings = Settings()
celery_app = Celery('mca_app', broker=settings.CELERY_BROKER_URL)

def make_celery(app):
    celery = Celery(
        app.import_name,
        broker=app.config['CELERY_BROKER_URL']
    )
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask

    # Set the Celery task serializer and result backend
    celery.conf.task_serializer = 'json'
    celery.conf.result_backend = app.config['CELERY_RESULT_BACKEND']

    return celery