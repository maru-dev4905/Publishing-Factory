const pfFunc = {
  _inited: false,

  dateTime: {
    updateDateTime:  () => {
      const now = new Date;

      const year = now.getFullYear();
      const month = String(now.getMonth()+1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');

      const hour = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      const dateEl = document.querySelector('.date');
      const clockEl = document.querySelector('.clock');
      dateEl.innerHTML = `
        ${year}-${month}-${day} 
      `;
      clockEl.innerHTML = `
        ${hour}:${minutes}:${seconds}
      `;
    },

    init: function(){
      this.updateDateTime();
      setInterval(()=>{
        this.updateDateTime();
      },1000)
    }
  },

  init: function () {
    if (pfFunc._inited) return;
    pfFunc._inited = true;
    pfFunc.dateTime.init();
  }
};

document.addEventListener("DOMContentLoaded", pfFunc.init);