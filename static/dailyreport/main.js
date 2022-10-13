// dailyReport.js
const csrftoken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

const report_list_box = document.getElementsByClassName('report-card-box')[0];
const list_template = document.getElementsByClassName('report-card')[0];
list_template.remove();

fetch(URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken
  },
}).then(function(response) {
  return response.json();
}).then(function(reports_list) {
  reports_list.forEach(report => {
    report_item = list_template.cloneNode(true);
    report_item.getElementsByClassName('title-lable')[0].appendChild(document.createTextNode(report.title));
    report_item.getElementsByClassName('content-lable')[0].appendChild(document.createTextNode(report.content));
    report_list_box.appendChild(report_item);
  });
});
