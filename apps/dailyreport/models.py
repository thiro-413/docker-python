from django.db import models
from django.utils import timezone

class DailyReport(models.Model):

    user_id=models.PositiveSmallIntegerField()

    title = models.CharField(max_length=30)

    content=models.CharField(max_length=255)

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

    class Meta:
        db_table='daily_report'
        ordering = ['created_at']

# Create your models here.
