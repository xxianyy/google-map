/* ============================================================
   map.js — Leaflet 地图初始化、标记渲染、聚合、连线管理
   ============================================================ */

window.App = window.App || {};

App.Map = {
  /** Leaflet 地图实例 */
  map: null,

  /** 当前活跃的标记图层 */
  activeMarkers: [],

  /** 当前活跃的连线图层 */
  activeLines: [],

  /** 知识图谱高亮的 DOM 元素 */
  highlightElements: [],

  /** 地理基准中心与缩放级别（聚焦北京） */
  initialCenter: [39.96, 116.32],
  initialZoom: 12,

  /** 测控链路连接网配置（北京各科研机构间协作连线） */
  links: [
    { from: [39.958, 116.310], to: [39.954, 116.326], label: "五院-中科院 科研协作" },
    { from: [39.954, 116.326], to: [39.961, 116.318], label: "中科院-友谊宾馆 会议往返" },
    { from: [39.961, 116.318], to: [39.982, 116.326], label: "友谊宾馆-卫星制造厂 技术协作" },
    { from: [39.954, 116.326], to: [40.075, 116.261], label: "五院-航天城 人才交流" },
    { from: [39.982, 116.326], to: [39.958, 116.310], label: "制造厂-五院 研制汇报" }
  ],

  /**
   * 初始化 Leaflet 地图
   */
  init: function () {
    var self = this;

    this.map = L.map('map', {
      center: this.initialCenter,
      zoom: this.initialZoom,
      zoomControl: true,
      minZoom: 10,
      maxZoom: 16
    });

    // 默认瓦片底图（CartoDB Voyager，色彩偏淡，利于历史滤镜着色）
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(this.map);

    // 监听缩放事件 → 重新渲染聚合状态
    this.map.on('zoomend', function () {
      self.renderMapLayers();
    });
  },

  /**
   * 轻量化空间聚类判断
   * 缩放级别 >= 6 时不聚合，否则把距离 < 1.6 度的点位归组
   */
  _getRenderableElements: function (visibleEvents) {
    if (!App.state.clusteringEnabled || this.map.getZoom() >= 6) {
      return visibleEvents.map(function (evt) {
        return { type: 'single', data: evt };
      });
    }

    var clusters = [];
    var threshold = 1.6;

    visibleEvents.forEach(function (evt) {
      var addedToCluster = false;
      for (var i = 0; i < clusters.length; i++) {
        var cluster = clusters[i];
        var firstEvt = cluster[0];
        var latDiff = Math.abs(firstEvt.latlng[0] - evt.latlng[0]);
        var lngDiff = Math.abs(firstEvt.latlng[1] - evt.latlng[1]);

        if (latDiff < threshold && lngDiff < threshold) {
          cluster.push(evt);
          addedToCluster = true;
          break;
        }
      }
      if (!addedToCluster) {
        clusters.push([evt]);
      }
    });

    var results = [];
    clusters.forEach(function (c) {
      if (c.length === 1) {
        results.push({ type: 'single', data: c[0] });
      } else {
        results.push({ type: 'cluster', list: c });
      }
    });
    return results;
  },

  /**
   * 渲染地图图层（标记 + 聚合 + 连线）
   * 由时间轴变化、聚合开关、连线开关触发
   * @param {boolean} fitBounds - 是否自动缩放视野到可见事件区域
   */
  renderMapLayers: function (fitBounds) {
    var self = this;

    // 清除旧图层
    this.activeMarkers.forEach(function (m) { self.map.removeLayer(m); });
    this.activeMarkers = [];
    this.activeLines.forEach(function (l) { self.map.removeLayer(l); });
    this.activeLines = [];

    // 过滤可见事件
    var visibleEvents = App.Data.getEventsUpToYear(App.state.currentYear);
    var renderItems = this._getRenderableElements(visibleEvents);

    // 绘制标记
    renderItems.forEach(function (item) {
      if (item.type === 'single') {
        self._addSingleMarker(item.data);
      } else if (item.type === 'cluster') {
        self._addClusterMarker(item.list);
      }
    });

    // 自动缩放视野到可见事件区域（时间轴拖动时触发）
    if (fitBounds && visibleEvents.length > 0) {
      var latlngs = visibleEvents.map(function (e) { return e.latlng; });
      this.map.fitBounds(latlngs, { padding: [60, 60], maxZoom: 8 });
    }

    // 绘制连线（仅当时间轴到达 1970 且开关开启）
    if (App.state.showLines && App.state.currentYear >= 1970) {
      this.links.forEach(function (line) {
        var polyline = L.polyline([line.from, line.to], {
          color: '#d97706',
          weight: 2,
          opacity: 0.75,
          className: 'dash-flow'
        }).addTo(self.map);

        polyline.bindTooltip(
          '<span class="text-xs font-serif-sc text-amber-950">' + line.label + '</span>'
        );
        self.activeLines.push(polyline);
      });
    }
  },

  /**
   * 添加单个历史标记
   */
  _addSingleMarker: function (evt) {
    var self = this;

    var customIcon = L.divIcon({
      className: 'bg-transparent',
      html:
        '<div class="relative flex items-center justify-center" id="marker-' + evt.id + '">' +
        '<div class="absolute w-8 h-8 rounded-full border-2 border-amber-600 custom-ring"></div>' +
        '<div class="absolute w-12 h-12 rounded-full border border-red-500/0" id="pulse-' + evt.id + '"></div>' +
        '<div class="w-6 h-6 rounded-full bg-amber-700 hover:bg-amber-800 border-2 border-[#faf5ec] shadow-xl flex items-center justify-center text-white text-[10px] font-bold cursor-pointer transition-all hover:scale-115">★</div>' +
        '</div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    var marker = L.marker(evt.latlng, { icon: customIcon }).addTo(this.map);

    marker.on('click', function () {
      App.Panel.show(evt);
    });

    marker.bindTooltip(
      '<div class="p-1 font-serif-sc text-amber-950">' +
      '<span class="px-1 py-0.5 rounded bg-amber-700 text-white text-[9px] font-mono mr-1">' + evt.year + '</span>' +
      '<strong>' + evt.name + '</strong>' +
      '</div>',
      { direction: 'top', opacity: 0.95 }
    );

    this.activeMarkers.push(marker);
  },

  /**
   * 添加聚合标记
   */
  _addClusterMarker: function (group) {
    var self = this;
    var centerLat = group.reduce(function (acc, cur) { return acc + cur.latlng[0]; }, 0) / group.length;
    var centerLng = group.reduce(function (acc, cur) { return acc + cur.latlng[1]; }, 0) / group.length;

    var clusterIcon = L.divIcon({
      className: 'bg-transparent',
      html:
        '<div class="relative flex items-center justify-center">' +
        '<div class="absolute w-10 h-10 rounded-full bg-amber-800/30 animate-pulse"></div>' +
        '<div class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 border-2 border-amber-100 flex items-center justify-center text-white font-bold text-xs shadow-lg cursor-pointer">' + group.length + '</div>' +
        '</div>',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    var clusterMarker = L.marker([centerLat, centerLng], { icon: clusterIcon }).addTo(this.map);

    clusterMarker.on('click', function () {
      self.map.setView([centerLat, centerLng], self.map.getZoom() + 1.5);
    });

    clusterMarker.bindTooltip(
      '<div class="p-1.5 font-serif-sc text-amber-950 text-xs">' +
      '<span class="text-amber-800 font-bold block mb-1">此处包含 ' + group.length + ' 项航天档案:</span>' +
      group.map(function (e) { return '• [' + e.year + '] ' + e.name; }).join('<br/>') +
      '</div>',
      { direction: 'top' }
    );

    this.activeMarkers.push(clusterMarker);
  },

  /**
   * 高亮指定事件 ID 对应的标记 DOM
   */
  highlightByIds: function (eventIds) {
    var self = this;
    this.clearHighlights();

    eventIds.forEach(function (id) {
      var el = document.getElementById('pulse-' + id);
      if (el) {
        el.classList.add('highlight-ring');
        el.classList.add('custom-ring');
        self.highlightElements.push(el);
      }
    });
  },

  /**
   * 清除所有高亮状态
   */
  clearHighlights: function () {
    this.highlightElements.forEach(function (el) {
      el.classList.remove('highlight-ring');
      el.classList.remove('custom-ring');
    });
    this.highlightElements = [];
  },

  /**
   * 添加临时连线（知识图谱用）
   */
  addTempLine: function (fromLatlng, toLatlng) {
    var line = L.polyline([fromLatlng, toLatlng], {
      color: '#ef4444',
      weight: 2,
      dashArray: '4, 4',
      opacity: 0.9
    }).addTo(this.map);
    this.activeLines.push(line);
  },

  /**
   * 飞越到指定坐标
   */
  flyTo: function (latlng, zoom) {
    this.map.flyTo(latlng, zoom || 6, {
      animate: true,
      duration: 1.2
    });
  },

  /**
   * 复位到全部事件可见范围（北京市全域）
   */
  resetView: function () {
    var allLatlngs = App.Data.events.map(function (e) { return e.latlng; });
    this.map.fitBounds(allLatlngs, { padding: [60, 60], maxZoom: 13 });
  }
};
