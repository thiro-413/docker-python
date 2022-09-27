import json
import logging

from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.shortcuts import redirect, render, get_object_or_404
from django.views.generic import View

from .forms import reportForm
from .models import DailyReport


class DailyReportView(View):
    def get(self, request):
        params = {
            "app_name": "dailyreport",
        }
        return render(request, "dailyreport/report_list.html", params)

    def post(self, request):
        if request.headers.get("Content-Type") == "application/json":
            daily_reports = DailyReport.objects.order_by("created_at").values()
            reports_list = list(daily_reports)
            return JsonResponse(reports_list, safe=False, status=200)

    def put(self, request):
        newReport = json.loads(request.body)
        if newReport['id'] :
            updateTargetReport = get_object_or_404(DailyReport, id=newReport['id'])
            form = reportForm(newReport, instance=updateTargetReport)
        else :
            form = reportForm(newReport)

        logging.getLogger('config').debug(form)
        if form.is_valid():
            logging.getLogger('config').debug(form.save())
            new_report = form.save()
            return JsonResponse({"report": model_to_dict(new_report)}, status=200)

        return redirect("report_list_url")

    def delete(self, request):
        param = json.loads(request.body)
        deleteReport = get_object_or_404(DailyReport, id=param['id'])
        if deleteReport :
            deleteReport.delete()
            return JsonResponse({"result": "OK"}, status=200)

