document.addEventListener('DOMContentLoaded', function () {
  init();
});

var wvDatepicker = {
  init: function() {
    this.today = new Date();
    this.format = { year: this.today.getFullYear(), month: this.today.getMonth() };
    this.selected = new Date(this.today);

    var comps = document.querySelectorAll('.wv_datepicker');
    if (!comps.length) return;

    comps.forEach(el => this._setup(el));
  },

  _setup: function(root) {
    root.btn       = root.querySelector('.wv_datepicker_btn');
    root.panel     = root.querySelector('.wv_dp_calendar');
    root.prev      = root.querySelector('.wv_dp_prev');
    root.next      = root.querySelector('.wv_dp_next');
    root.yearLab   = root.querySelector('.wv_dp_year_label');
    root.yearList  = root.querySelector('.wv_dp_year_list');
    root.monthLab  = root.querySelector('.wv_dp_month_label');
    root.monthList = root.querySelector('.wv_dp_month_list');
    root.daysGrid  = root.querySelector('.wv_dp_days');
    root.cancel    = root.querySelector('.wv_dp_cancel');
    root.confirm   = root.querySelector('.wv_dp_confirm');

    this._renderYearList(root);
    this._renderMonthList(root);
    this._renderCalendar(root);

    // 열기/닫기
    root.btn.addEventListener('click', () => root.panel.classList.toggle('hidden'));

    // 이전/다음
    root.prev.addEventListener('click', () => { this.format.month--; this._normalize(root); });
    root.next.addEventListener('click', () => { this.format.month++; this._normalize(root); });

    // 년도 클릭
    root.yearLab.addEventListener('click', () => {
      root.yearList.classList.toggle('hidden');
      this._toggleArrows(root);
    });
    root.yearList.addEventListener('click', e => {
      if (e.target.tagName === 'LI') {
        this.format.year = +e.target.dataset.year;
        root.yearList.classList.add('hidden');
        this._toggleArrows(root);
        this._updateLabels(root);
        this._renderCalendar(root);
      }
    });

    // 월 클릭
    root.monthLab.addEventListener('click', () => {
      root.monthList.classList.toggle('hidden');
      this._toggleArrows(root);
    });
    root.monthList.addEventListener('click', e => {
      if (e.target.tagName === 'LI') {
        this.format.month = +e.target.dataset.month;
        root.monthList.classList.add('hidden');
        this._toggleArrows(root);
        this._updateLabels(root);
        this._renderCalendar(root);
      }
    });

    // 날짜 선택
    root.daysGrid.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('disabled')) {
        root.daysGrid.querySelectorAll('button').forEach(b=>b.classList.remove('on'));
        e.target.classList.add('on');
        this.selected = new Date(this.format.year, this.format.month, +e.target.textContent);
      }
    });

    // 취소
    root.cancel.addEventListener('click', () => {
      this.selected = new Date(this.today);
      this.format = { year: this.today.getFullYear(), month: this.today.getMonth() };
      this._updateLabels(root);
      this._renderCalendar(root);
      root.panel.classList.add('hidden');
    });

    // 확인
    root.confirm.addEventListener('click', () => {
      root.btn.textContent = `${this.selected.getFullYear()}-${this.selected.getMonth()+1}-${this.selected.getDate()}`;
      root.panel.classList.add('hidden');
    });
  },

  _normalize: function(root) {
    // month overflow 처리
    if (this.format.month < 0)  { this.format.year--; this.format.month = 11; }
    if (this.format.month > 11) { this.format.year++; this.format.month = 0; }
    this._updateLabels(root);
    this._renderCalendar(root);
  },

  _updateLabels: function(root) {
    root.yearLab.textContent  = this.format.year + '년 ▼';
    root.monthLab.textContent = (this.format.month+1) + '월 ▼';
  },

  _toggleArrows: function(root) {
    var disable = !root.yearList.classList.contains('hidden') || !root.monthList.classList.contains('hidden');
    [root.prev, root.next].forEach(btn => {
      btn.classList.toggle('disabled', disable);
    });
  },

  _renderYearList: function(root) {
    var yearHTML = '';
    for (var y = this.today.getFullYear()+1; y >= this.today.getFullYear()-50; y--) {
      yearHTML += `<li data-year="${y}">${y}</li>`;
    }
    root.yearList.innerHTML = yearHTML;
  },

  _renderMonthList: function(root) {
    var months = '';
    for (var m=0; m<12; m++) {
      months += `<li data-month="${m}">${m+1}월</li>`;
    }
    root.monthList.innerHTML = months;
  },

  _renderCalendar: function(root) {
    this._updateLabels(root);
    var y = this.format.year, m = this.format.month;
    var firstDay = new Date(y,m,1).getDay();
    var lastDate = new Date(y,m+1,0).getDate();
    var html = '';

    // 빈 칸
    for (var i=0; i<firstDay; i++) html += `<button class="disabled"></button>`;
    // 날짜
    for (var d=1; d<=lastDate; d++) {
      var cls = '';
      if (y===this.selected.getFullYear() && m===this.selected.getMonth() && d===this.selected.getDate()) {
        cls = 'on';
      }
      html += `<button class="${cls}">${d}</button>`;
    }

    root.daysGrid.innerHTML = html;
  }
};
function init(){
  if (document.querySelector('.wv_datepicker')) {
    wvDatepicker.init();
  }
}

window.componentInit = init;
