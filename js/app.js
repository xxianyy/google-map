/* ============================================================
   app.js — 系统启动入口
   按依赖顺序初始化所有模块：数据 → 地图 → 时间轴 → 面板 → 图谱 → 工具栏 → 音频
   ============================================================ */

window.App = window.App || {};

/**
 * 全局共享状态
 * 多个模块需要读写的变量集中在这里
 */
App.state = {
  currentYear: 1956,
  showLines: true,
  clusteringEnabled: true
};

(function () {
  'use strict';

  /**
   * 启动函数
   */
  function bootstrap() {
    console.log('[北京航天历史] 系统启动中...');

    try {
      // 1. 初始化数据层（构建索引）
      console.log('  → 加载历史事件数据...');
      App.Data.init();
      console.log('  ✓ 已加载 ' + App.Data.events.length + ' 个历史事件');

      // 2. 初始化地图
      console.log('  → 初始化地图...');
      App.Map.init();
      console.log('  ✓ 地图就绪');

      // 3. 初始化时间轴
      console.log('  → 初始化时间轴...');
      App.Timeline.init();
      console.log('  ✓ 时间轴就绪');

      // 4. 初始化详情面板
      console.log('  → 初始化面板...');
      App.Panel.init();
      console.log('  ✓ 面板就绪');

      // 5. 初始化知识图谱
      console.log('  → 知识图谱就绪（按需触发）');

      // 6. 初始化工具栏
      console.log('  → 初始化工具栏...');
      App.Toolbar.init();
      console.log('  ✓ 工具栏就绪');

      // 7. 初始化音频
      console.log('  → 初始化音频合成器...');
      App.Audio.init();
      console.log('  ✓ 音频就绪');

      // 8. 首轮渲染并自动聚焦
      App.Map.renderMapLayers(true);

      console.log('[系统就绪] 拖动时间轴探索北京航天事业的历史足迹吧！');
    } catch (err) {
      console.error('系统启动失败:', err);
      var mapEl = document.getElementById('map');
      if (mapEl) {
        mapEl.innerHTML =
          '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#ef4444;font-size:16px;">' +
          '<p>⚠ 系统加载失败<br><small>' + err.message + '</small></p>' +
          '</div>';
      }
    }
  }

  // DOM 就绪后启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
