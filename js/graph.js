/* ============================================================
   graph.js — 简易知识图谱联动：人物轨迹高亮、临时连线
   ============================================================ */

window.App = window.App || {};

App.Graph = {
  /**
   * 高亮某位先贤的所有历史足迹
   * @param {string} personName - 人物姓名
   */
  highlightPerson: function (personName) {
    var self = this;

    // 清除旧状态
    App.Map.clearHighlights();

    // 搜索所有关联事件
    var relatedEvents = App.Data.getEventsByPerson(personName);
    if (relatedEvents.length === 0) return;

    // 弹出 Toast 提示
    this._showToast(personName, relatedEvents);

    // 自动推进时间轴到该人物的最晚年份
    var maxYear = Math.max.apply(null, relatedEvents.map(function (e) { return e.year; }));
    if (maxYear > App.state.currentYear) {
      App.Timeline.advanceTo(maxYear);
    }

    // 高亮地图上的标记
    var relatedIds = relatedEvents.map(function (e) { return e.id; });
    App.Map.highlightByIds(relatedIds);

    // 绘制临时红色连线（从当前打开事件到该人物的其他足迹）
    var currentEvent = App.Data.getEventById(App.Panel.currentEventId);
    if (currentEvent) {
      relatedEvents.forEach(function (evt) {
        if (evt.id !== currentEvent.id) {
          App.Map.addTempLine(currentEvent.latlng, evt.latlng);
        }
      });
    }
  },

  /**
   * 显示 Toast 通知
   */
  _showToast: function (personName, relatedEvents) {
    var toast = document.getElementById('toast');
    document.getElementById('toast-title').textContent =
      '已高亮【' + personName + '】的历史科研足迹';
    document.getElementById('toast-body').textContent =
      personName + ' 先辈曾于 ' +
      relatedEvents.map(function (e) { return e.year; }).join('年、') +
      '年参与了相关航天基地的艰苦建设工作。';

    toast.classList.add('show');

    // 5 秒后自动淡出
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 5000);
  }
};
