from celery.schedules import crontab
from backend.app.tasks.celery import celery_app
from backend.app.services.email_processor import process_email

@celery_app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    # Add a periodic task to process emails every 10 minutes
    sender.add_periodic_task(
        crontab(minute='*/10'),  # Run every 10 minutes
        process_email.s(),
        name='process emails every 10 minutes'
    )

# HUMAN INPUT NEEDED
# Note: The confidence level for this implementation is 0.6, which is below the threshold of 0.8.
# Please review and adjust the periodic task configuration as needed.
# Consider adding more periodic tasks or adjusting the schedule based on specific requirements.