from django.shortcuts import render
from django.views.generic import View

from .models import DailyReport
import logging
from pathlib import Path


class DailyReportView(View):
    def get(self, request):
        logger = logging.getLogger('config')
        logger.debug(Path(__file__).resolve().parent.parent)
        params = {}
        params["daily_reports"] = DailyReport.objects.all()
        return render(request, "dailyreport/report_list.html", params)
