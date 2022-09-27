from django import forms

from .models import DailyReport
class reportForm(forms.ModelForm):
  class Meta:
        model = DailyReport
        fields = ["title", "content", "user_id"]
        labels = {
          "title": "タイトル",
          "content": "内容",
          "user_id": "ユーザーid",
        }
        widgets = {
            "title": forms.TextInput(attrs={"v-model":"report.title"}),
            "content": forms.Textarea(attrs={"v-model":"report.content"}),
            "user_id": forms.HiddenInput(attrs={"v-model":"report.user_id"}),
        }