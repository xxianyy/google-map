/* ============================================================
   timeline.js — 底部时间轴滑块控制器
   ============================================================ */

window.App = window.App || {};

App.Timeline = {
  /** 滑块 DOM */
  slider: null,

  /** 年份显示 DOM */
  yearLabel: null,

  /**
   * 初始化：绑定滑块事件
   */
  init: function () {
    var self = this;

    this.slider = document.getElementById('time-slider');
    this.yearLabel = document.getElementById('slider-year');

    if (!this.slider || !this.yearLabel) {
      console.warn('时间轴元素未找到');
      return;
    }

    // 初始值：1956
    this.slider.value = App.state.currentYear;
    this.yearLabel.textContent = App.state.currentYear;

    // 实时拖动
    this.slider.addEventListener('input', function (e) {
      var year = parseInt(e.target.value, 10);
      self.setYear(year);
    });
  },

  /**
   * 设置年份并触发联动
   * @param {number} year - 目标年份
   */
  setYear: function (year) {
    App.state.currentYear = year;
    this.yearLabel.textContent = year;

    // 重新渲染地图并自动聚焦到有事件的区域
    App.Map.renderMapLayers(true);

    // 如果当前打开的面板事件已不可见，关闭面板
    if (App.Panel.currentEventId) {
      var evt = App.Data.getEventById(App.Panel.currentEventId);
      if (evt && evt.year > year) {
        App.Panel.hide();
      }
    }

    // 清除知识图谱高亮
    App.Map.clearHighlights();
  },

  /**
   * 强制推进到指定年份（知识图谱联动用）
   * @param {number} year
   */
  advanceTo: function (year) {
    if (year <= App.state.currentYear) return;
    this.slider.value = year;
    this.setYear(year);
  }
};
