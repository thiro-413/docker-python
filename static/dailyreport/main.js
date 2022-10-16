// dailyReport.js
const csrftoken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

const report_list_box = document.getElementsByClassName('report-card-box')[0];

const list_template = document.getElementsByClassName('report-card')[0];

const modal_open = document.getElementsByClassName('create-modal-btn')[0];

const report_modal = document.getElementsByClassName('modal-area')[0];

const modal_close_btn = document.getElementsByClassName('modal-close-btn')[0];

const report_form = document.getElementById('report-form');

let user_id = 1;

let report_id = null;

loadReport = function() {
  document.querySelectorAll('.report-card').forEach(report_card => {
    report_card.remove();
  });
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
      report_item.getElementsByClassName('report-edit-btn')[0].addEventListener("click", function() {
        report_id = report.id;
        report_modal.getElementsByClassName('report_title')[0].value = report.title;
        report_modal.getElementsByClassName('report_content')[0].value = report.content;
        report_modal.getElementsByClassName('report_user_id')[0].value = report.user_id;
        reportModalOpen();
      });
      report_item.getElementsByClassName('report-delete-btn')[0].addEventListener("click", function() {
        report_id = report.id;
        deleteReport();
      });
      report_list_box.appendChild(report_item);
    });
  });
};

loadReport();

modal_open.addEventListener("click", function(){
  reportModalOpen();
}, false);

reportModalOpen = function() {
  report_modal.style.display = 'block';
}

modal_close_btn.addEventListener("click", function(){
  reportModalClose();
}, false);

reportModalClose = function() {
  report_modal.style.display = 'none';
  reportReset();
}

report_form.onsubmit = function(e) {
  saveReport(new FormData(e.target));
  reportModalClose();
  return false;
};

reportReset = function() {
  report_modal.getElementsByClassName('report_title')[0].value = null;
  report_modal.getElementsByClassName('report_content')[0].value = null;
  report_modal.getElementsByClassName('report_user_id')[0].value = user_id;
  report_id = null;
}

saveReport = function(form_data) {
  console.log(form_data.get('title'), report_id);
    fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    body: JSON.stringify({
        'title': form_data.get('title'),
        'content': form_data.get('content'),
        'user_id': form_data.get('user_id'),
        'id': report_id,
      }),
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    loadReport();
  });
};

deleteReport = function() {
  fetch(URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    body: JSON.stringify({
        'id': report_id,
      }),
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    reportReset();
    loadReport();
  });
};