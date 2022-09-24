from django.shortcuts import render
from django.views.generic import View


class DailyReportView(View):
    def get(self, request):
        return render(request, "report_list.html", context={"name": "テスト"})
