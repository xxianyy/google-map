/* ============================================================
   panel.js — 右侧详情面板：打开/关闭/内容填充
   ============================================================ */

window.App = window.App || {};

App.Panel = {
  /** 当前打开的事件 ID */
  currentEventId: null,

  /**
   * 初始化：绑定关闭按钮
   */
  init: function () {
    var self = this;
    var closeBtn = document.getElementById('close-panel');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        self.hide();
      });
    }
  },

  /**
   * 打开面板，展示事件详情
   * @param {Object} evt - 事件数据对象
   */
  show: function (evt) {
    if (!evt) return;

    this.currentEventId = evt.id;
    App.Map.clearHighlights();

    // 标题
    document.getElementById('info-title').textContent = evt.name;
    document.getElementById('info-date').textContent = evt.date;
    document.getElementById('info-location').textContent = evt.location;
    document.getElementById('info-summary').textContent = evt.summary;
    document.getElementById('info-ref').textContent = '北京航天历史档案 · ' + evt.id.toUpperCase();

    // SVG 插图
    var svgContainer = document.getElementById('info-svg-container');
    svgContainer.innerHTML = App.SvgGraphics[evt.svgId] ||
      '<p class="text-xs text-[#3e2723]/50">历史图纸整理中</p>';

    // 关联人物标签
    var peopleContainer = document.getElementById('info-people');
    peopleContainer.innerHTML = '';
    evt.people.forEach(function (person) {
      var badge = document.createElement('button');
      badge.className = 'person-chip';
      badge.innerHTML = '👨‍🚀 <span>' + person + '</span>';
      badge.addEventListener('click', function () {
        App.Graph.highlightPerson(person);
      });
      peopleContainer.appendChild(badge);
    });

    // 关联单位标签
    var unitsContainer = document.getElementById('info-units');
    unitsContainer.innerHTML = '';
    evt.units.forEach(function (unit) {
      var badge = document.createElement('span');
      badge.className = 'unit-chip';
      badge.textContent = unit;
      unitsContainer.appendChild(badge);
    });

    // 展开面板
    document.body.classList.add('panel-open');

    // 飞越到事件位置
    App.Map.flyTo(evt.latlng);
  },

  /**
   * 关闭面板
   */
  hide: function () {
    document.body.classList.remove('panel-open');
    App.Map.clearHighlights();
    this.currentEventId = null;
  }
};
