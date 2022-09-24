from django.db import models

class DailyReport(models.Model):

    user_id=models.PositiveSmallIntegerField()

    title = models.CharField(max_length=30)

    content=models.CharField(max_length=255)

    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table='daily_report'

# Create your models here.
