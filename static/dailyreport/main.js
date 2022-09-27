Vue.use(window["vue-js-modal"].default);

const App = new Vue({
  el: "#report",
  data() {
    return {
        report: {title: '', content: '', user_id: 1, id: ''},
        daily_reports: [],
    }
  },
  delimiters: ['[[', ']]'],
  methods: {
    show: function() {
      this.$modal.show('modal-area');
    },
    hide: function() {
      this.$modal.hide('modal-area');
    },

    postReports() {
      const csrftoken = Cookies.get('csrftoken');
      fetch(URL, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
      })
      .then((response) => {
        return response.json();
      })
      .then((reports_list) => {
          this.daily_reports = reports_list;
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
      });
    },

    createReport() {
      this.resetParam();
      this.show();
    },

    editReport(id, title, content) {
      this.report.id = id;
      this.report.title = title;
      this.report.content = content;
      this.show();
    },

    saveReport() {
      const csrftoken = Cookies.get('csrftoken');
      this.postReports();
      fetch(URL, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(this.report),
      })
      .then((response) => {
        return response.json();
      })
      .then((report) => {
        this.resetParam();
        this.postReports();
        this.hide();
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
      });
    },

    resetParam() {
      this.report.title = '';
      this.report.content = '';
      this.report.id = '';
    },

    deleteReport(id) {
      const csrftoken = Cookies.get('csrftoken');
      this.postReports();
      fetch(URL, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({id: id}),
      })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        this.resetParam();
        this.postReports();
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
      });
    }

  },
  created() {
    this.postReports();
  },
});