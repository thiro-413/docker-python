from django.urls import path

from .views import *

urlpatterns = [
    path("", DailyReportView.as_view(), name="report_list"),
]