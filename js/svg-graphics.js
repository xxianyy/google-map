/* ============================================================
   svg-graphics.js — 历史事件 SVG 档案手稿图
   模拟技术图纸、会议纪要、档案文件等文献风格
   所有内容均为公开历史材料
   ============================================================ */

window.App = window.App || {};

App.SvgGraphics = {
  /* ---- 1956：国防部第五研究院成立 ---- */
  "svg-wuyuan":
    '<svg viewBox="0 0 100 60" class="w-full h-full" style="background:#f4ebd8;">' +
    '<rect x="2" y="2" width="96" height="56" fill="none" stroke="#8b5a2b" stroke-width="0.5"/>' +
    '<text x="10" y="15" font-family="serif" font-size="3.5" fill="#8b0000" font-weight="bold">国防部第五研究院成立纪要（1956）</text>' +
    '<line x1="10" y1="18" x2="90" y2="18" stroke="#8b5a2b" stroke-width="0.3"/>' +
    '<rect x="32" y="22" width="36" height="20" fill="#b45309" opacity="0.12"/>' +
    '<text x="50" y="32" font-size="2.5" fill="#3e2723" text-anchor="middle">五院 海淀营房</text>' +
    '<text x="50" y="38" font-size="2" fill="#5c3e2e" text-anchor="middle">钱学森 首任院长</text>' +
    '<line x1="32" y1="24" x2="26" y2="18" stroke="#b45309" stroke-width="0.5"/>' +
    '<circle cx="26" cy="16" r="1.5" fill="#d97706"/>' +
    '</svg>',

  /* ---- 1958：581 组成立 ---- */
  "svg-581":
    '<svg viewBox="0 0 100 60" class="w-full h-full" style="background:#f4ebd8;">' +
    '<rect x="2" y="2" width="96" height="56" fill="none" stroke="#8b5a2b" stroke-width="0.5" stroke-dasharray="2,2"/>' +
    '<text x="10" y="15" font-family="serif" font-size="3" fill="#8b0000" font-weight="bold">【历史档案 1958】581 组规划报告</text>' +
    '<line x1="10" y1="18" x2="90" y2="18" stroke="#8b0000" stroke-width="0.3"/>' +
    '<text x="10" y="26" font-family="sans-serif" font-size="3.5" fill="#3e2723">关于开展我国第一颗人造地球卫星规划报告</text>' +
    '<text x="10" y="32" font-family="sans-serif" font-size="2" fill="#555">主旨：成立581专门技术小组（赵九章、钱学森）</text>' +
    '<line x1="10" y1="36" x2="90" y2="36" stroke="#8b0000" stroke-width="0.1"/>' +
    '<path d="M50,40 L60,55 L70,40 L65,40 L65,48 L55,48 L55,40 Z" fill="#8b5a2b" opacity="0.3"/>' +
    '</svg>',

  /* ---- 1961：星际航行座谈会 ---- */
  "svg-meeting":
    '<svg viewBox="0 0 100 60" class="w-full h-full" style="background:#f4ebd8;">' +
    '<rect x="2" y="2" width="96" height="56" fill="none" stroke="#8b5a2b" stroke-width="0.5"/>' +
    '<text x="10" y="15" font-family="serif" font-size="3.5" fill="#3e2723">星际航行座谈会 北京·中科院</text>' +
    '<line x1="10" y1="18" x2="90" y2="18" stroke="#8b5a2b" stroke-width="0.3"/>' +
    '<ellipse cx="50" cy="34" rx="14" ry="9" fill="none" stroke="#3e2723" stroke-width="0.5"/>' +
    '<circle cx="50" cy="34" r="3" fill="#d97706" opacity="0.25"/>' +
    '<text x="43" y="36" font-size="1.8" fill="#3e2723">学术研讨</text>' +
    '<line x1="36" y1="30" x2="22" y2="24" stroke="#b45309" stroke-width="0.3"/>' +
    '<line x1="64" y1="30" x2="78" y2="24" stroke="#b45309" stroke-width="0.3"/>' +
    '<text x="14" y="22" font-size="1.5" fill="#5c3e2e">钱学森</text>' +
    '<text x="72" y="22" font-size="1.5" fill="#5c3e2e">赵九章</text>' +
    '</svg>',

  /* ---- 1965：赵九章上书中央 ---- */
  "svg-petition":
    '<svg viewBox="0 0 100 60" class="w-full h-full" style="background:#f4ebd8;">' +
    '<rect x="2" y="2" width="96" height="56" fill="none" stroke="#8b5a2b" stroke-width="0.5"/>' +
    '<text x="10" y="15" font-family="serif" font-size="3.5" fill="#8b0000">赵九章关于发展卫星工作的建议书</text>' +
    '<line x1="10" y1="18" x2="90" y2="18" stroke="#8b5a2b" stroke-width="0.3"/>' +
    '<rect x="28" y="22" width="44" height="18" fill="#f5f0e6" stroke="#8b5a2b" stroke-width="0.3"/>' +
    '<text x="33" y="30" font-size="2" fill="#3e2723">我国已具备研制卫星条件</text>' +
    '<text x="33" y="36" font-size="2" fill="#3e2723">建议中央尽快立项启动</text>' +
    '<path d="M72,32 L80,28 L80,36 Z" fill="#d97706"/>' +
    '<text x="72" y="48" font-size="1.8" fill="#5c3e2e">—— 赵九章 1965.1</text>' +
    '</svg>',

  /* ---- 1965：651 方案论证会 ---- */
  "svg-651":
    '<svg viewBox="0 0 100 60" class="w-full h-full" style="background:#f4ebd8;">' +
    '<rect x="2" y="2" width="96" height="56" fill="none" stroke="#8b5a2b" stroke-width="0.5"/>' +
    '<text x="10" y="15" font-family="serif" font-size="3" fill="#8b0000">六五一会议讨论现场（1965·北京友谊宾馆）</text>' +
    '<line x1="10" y1="18" x2="90" y2="18" stroke="#8b5a2b" stroke-width="0.3"/>' +
    '<circle cx="50" cy="35" r="12" fill="none" stroke="#3e2723" stroke-width="0.5"/>' +
    '<rect x="42" y="32" width="16" height="6" fill="#8b5a2b" opacity="0.2"/>' +
    '<text x="43" y="36" font-size="2" fill="#3e2723">总体论证方案</text>' +
    '<path d="M25,25 Q35,45 75,25" fill="none" stroke="#d97706" stroke-width="0.5" stroke-dasharray="2,2"/>' +
    '<text x="18" y="52" font-size="2" fill="#555">目标：上得去 听得见 抓得住</text>' +
    '</svg>',

  /* ---- 1966：卫星设计院成立 ---- */
  "svg-design":
    '<svg viewBox="0 0 100 60" class="w-full h-full" style="background:#f4ebd8;">' +
    '<rect x="2" y="2" width="96" height="56" fill="none" stroke="#8b5a2b" stroke-width="0.5"/>' +
    '<text x="10" y="15" font-family="serif" font-size="3.5" fill="#3e2723">651设计院·东方红一号方案蓝图</text>' +
    '<line x1="10" y1="18" x2="90" y2="18" stroke="#8b5a2b" stroke-width="0.3"/>' +
    '<circle cx="35" cy="34" r="10" fill="none" stroke="#3e2723" stroke-width="0.5"/>' +
    '<line x1="35" y1="24" x2="35" y2="44" stroke="#3e2723" stroke-width="0.3"/>' +
    '<line x1="25" y1="34" x2="45" y2="34" stroke="#3e2723" stroke-width="0.3"/>' +
    '<text x="30" y="50" font-size="2" fill="#5c3e2e">卫星结构图</text>' +
    '<path d="M65,24 L82,24 L82,38 L65,38" fill="none" stroke="#b45309" stroke-width="0.3"/>' +
    '<text x="68" y="32" font-size="1.8" fill="#3e2723">轨道参数</text>' +
    '</svg>',

  /* ---- 1968：空间技术研究院 ---- */
  "svg-academy":
    '<svg viewBox="0 0 100 60" class="w-full h-full" style="background:#f4ebd8;">' +
    '<rect x="2" y="2" width="96" height="56" fill="none" stroke="#8b5a2b" stroke-width="0.5"/>' +
    '<text x="10" y="15" font-family="serif" font-size="3.5" fill="#8b0000">中国空间技术研究院（北京航天城）</text>' +
    '<line x1="10" y1="18" x2="90" y2="18" stroke="#8b5a2b" stroke-width="0.3"/>' +
    '<rect x="15" y="25" width="22" height="15" fill="#b45309" opacity="0.3"/>' +
    '<line x1="15" y1="25" x2="26" y2="20" stroke="#b45309" stroke-width="0.5"/>' +
    '<line x1="26" y1="20" x2="37" y2="25" stroke="#b45309" stroke-width="0.5"/>' +
    '<text x="20" y="34" font-size="2" fill="#3e2723">钱学森首任院长</text>' +
    '</svg>',

  /* ---- 1970：北京卫星制造厂 ---- */
  "svg-factory":
    '<svg viewBox="0 0 100 60" class="w-full h-full" style="background:#f4ebd8;">' +
    '<rect x="2" y="2" width="96" height="56" fill="none" stroke="#8b5a2b" stroke-width="0.5"/>' +
    '<text x="10" y="15" font-family="serif" font-size="3.5" fill="#3e2723">卫星外形及棱面反射面图</text>' +
    '<line x1="10" y1="18" x2="90" y2="18" stroke="#8b5a2b" stroke-width="0.3"/>' +
    '<polygon points="50,15 62,25 62,40 50,50 38,40 38,25" fill="none" stroke="#3e2723" stroke-width="1"/>' +
    '<line x1="50" y1="15" x2="50" y2="50" stroke="#3e2723" stroke-width="0.5"/>' +
    '<line x1="38" y1="25" x2="62" y2="40" stroke="#3e2723" stroke-width="0.5"/>' +
    '<line x1="38" y1="40" x2="62" y2="25" stroke="#3e2723" stroke-width="0.5"/>' +
    '<circle cx="50" cy="32.5" r="1" fill="#ef4444"/>' +
    '<text x="66" y="32" font-size="2" fill="#555">超短波折叠天线</text>' +
    '</svg>',

  /* ---- 1970：卫星启运酒泉 ---- */
  "svg-depart":
    '<svg viewBox="0 0 100 60" class="w-full h-full" style="background:#f4ebd8;">' +
    '<rect x="2" y="2" width="96" height="56" fill="none" stroke="#8b5a2b" stroke-width="0.5"/>' +
    '<text x="10" y="15" font-family="serif" font-size="3.5" fill="#8b0000">东方红一号卫星启运装车记录</text>' +
    '<line x1="10" y1="18" x2="90" y2="18" stroke="#8b5a2b" stroke-width="0.3"/>' +
    '<rect x="30" y="28" width="30" height="16" fill="none" stroke="#3e2723" stroke-width="0.8"/>' +
    '<circle cx="34" cy="48" r="4" fill="none" stroke="#3e2723" stroke-width="0.5"/>' +
    '<circle cx="56" cy="48" r="4" fill="none" stroke="#3e2723" stroke-width="0.5"/>' +
    '<line x1="30" y1="28" x2="30" y2="18" stroke="#3e2723" stroke-width="0.3"/>' +
    '<circle cx="30" cy="16" r="2" fill="#d97706" opacity="0.6"/>' +
    '<text x="35" y="40" font-size="2" fill="#3e2723">卫星 启运专机</text>' +
    '</svg>'
};
