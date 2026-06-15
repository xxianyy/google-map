/* ============================================================
   toolbar.js — 左侧控制面板：开关、滤镜切换、复位按钮
   ============================================================ */

window.App = window.App || {};

App.Toolbar = {
  /**
   * 初始化所有控制按钮的事件监听
   */
  init: function () {
    this._initLinkToggle();
    this._initClusterToggle();
    this._initFilterButtons();
    this._initResetButton();
    this._initGuideModal();
  },

  /**
   * 测控链路显示开关
   */
  _initLinkToggle: function () {
    var linkToggle = document.getElementById('link-toggle');
    var toggleBg = document.getElementById('toggle-bg');
    var toggleDot = document.getElementById('toggle-dot');

    if (!linkToggle) return;

    linkToggle.addEventListener('change', function (e) {
      App.state.showLines = e.target.checked;
      if (App.state.showLines) {
        toggleBg.className = 'toggle-bg';
        toggleDot.className = 'toggle-dot on';
      } else {
        toggleBg.className = 'toggle-bg off';
        toggleDot.className = 'toggle-dot off';
      }
      App.Map.renderMapLayers();
    });
  },

  /**
   * 地理智能聚合开关
   */
  _initClusterToggle: function () {
    var clusterToggle = document.getElementById('cluster-toggle');
    var clusterBg = document.getElementById('cluster-bg');
    var clusterDot = document.getElementById('cluster-dot');

    if (!clusterToggle) return;

    clusterToggle.addEventListener('change', function (e) {
      App.state.clusteringEnabled = e.target.checked;
      if (App.state.clusteringEnabled) {
        clusterBg.className = 'toggle-bg';
        clusterDot.className = 'toggle-dot on';
      } else {
        clusterBg.className = 'toggle-bg off';
        clusterDot.className = 'toggle-dot off';
      }
      App.Map.renderMapLayers();
    });
  },

  /**
   * 底图历史氛围滤镜切换
   */
  _initFilterButtons: function () {
    var mapContainer = document.getElementById('map');
    var filterOnBtn = document.getElementById('filter-on');
    var filterOffBtn = document.getElementById('filter-off');

    if (!filterOnBtn || !filterOffBtn) return;

    filterOnBtn.addEventListener('click', function () {
      mapContainer.classList.add('vintage-map-filter');
      filterOnBtn.className = 'filter-btn active';
      filterOffBtn.className = 'filter-btn';
    });

    filterOffBtn.addEventListener('click', function () {
      mapContainer.classList.remove('vintage-map-filter');
      filterOffBtn.className = 'filter-btn active';
      filterOnBtn.className = 'filter-btn';
    });
  },

  /**
   * 复位中国全图按钮
   */
  _initResetButton: function () {
    var resetBtn = document.getElementById('reset-view');
    if (!resetBtn) return;

    resetBtn.addEventListener('click', function () {
      App.Map.resetView();
      App.Panel.hide();
    });
  },

  /**
   * 引导弹窗关闭按钮
   */
  _initGuideModal: function () {
    var closeBtn = document.getElementById('close-guide');
    if (!closeBtn) return;

    closeBtn.addEventListener('click', function () {
      document.getElementById('guide-modal').style.display = 'none';
    });
  }
};
