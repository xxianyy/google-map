/* ============================================================
   audio.js — Web Audio API 东方红一号无线电乐曲合成器
   模拟 50 年代晶体管发声器的粗糙低频蜂鸣和短波无线电广播音效
   ============================================================ */

window.App = window.App || {};

App.Audio = {
  /** AudioContext 实例（延迟初始化） */
  audioCtx: null,

  /** 播放状态 */
  isPlaying: false,

  /** 定时器句柄 */
  playTimer: null,

  /** 《东方红》旋律：音符频率 + 时长 */
  melody: [
    { note: 392, dur: 0.6 },  // 5 (sol)
    { note: 392, dur: 0.6 },  // 5
    { note: 440, dur: 0.6 },  // 6 (la)
    { note: 587, dur: 0.8 },  // 2 (re)
    { note: 523, dur: 0.4 },  // 1 (do)
    { note: 523, dur: 0.6 },  // 1
    { note: 440, dur: 0.6 },  // 6
    { note: 392, dur: 1.2 },  // 5
    { note: 392, dur: 0.6 },  // 5
    { note: 440, dur: 0.6 },  // 6
    { note: 587, dur: 1.2 }   // 2
  ],

  /**
   * 初始化：绑定播放按钮
   */
  init: function () {
    var self = this;
    var btn = document.getElementById('audio-toggle-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      if (self.isPlaying) {
        self.stop();
      } else {
        self.play();
      }
    });
  },

  /**
   * 开始播放
   */
  play: function () {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    this.isPlaying = true;
    document.getElementById('play-icon').classList.add('hidden');
    document.getElementById('pause-icon').classList.remove('hidden');
    var statusEl = document.getElementById('audio-status');
    statusEl.textContent = '太空中无线电广播中...';
    statusEl.className = 'audio-status playing';

    this._currentIndex = 0;
    this._playNextNote();
  },

  /**
   * 播放下一个音符
   */
  _playNextNote: function () {
    var self = this;
    if (!this.isPlaying) return;

    var item = this.melody[this._currentIndex];
    var ctx = this.audioCtx;

    // 1. 生成东方红电子音轨（三角波，模拟模拟电路蜂鸣音）
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(item.note, ctx.currentTime);

    // 衰减器包络（电铃般的敲击衰减感）
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + item.dur - 0.05);

    // 低通滤波器，制造古旧收音机沙沙声和厚重杂音
    var filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);

    osc.connect(gain);
    gain.connect(filter);
    filter.connect(ctx.destination);

    // 2. 遥测高频嘀嘀声叠加（每 3 个音符一次）
    if (this._currentIndex % 3 === 0) {
      var beepOsc = ctx.createOscillator();
      var beepGain = ctx.createGain();
      beepOsc.type = 'sine';
      beepOsc.frequency.setValueAtTime(1500, ctx.currentTime);
      beepGain.gain.setValueAtTime(0.05, ctx.currentTime);
      beepGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      beepOsc.connect(beepGain);
      beepGain.connect(ctx.destination);
      beepOsc.start();
      beepOsc.stop(ctx.currentTime + 0.15);
    }

    osc.start();
    osc.stop(ctx.currentTime + item.dur);

    // 推进到下一个音符
    this._currentIndex = (this._currentIndex + 1) % this.melody.length;
    this.playTimer = setTimeout(function () {
      self._playNextNote();
    }, item.dur * 1000);
  },

  /**
   * 停止播放
   */
  stop: function () {
    this.isPlaying = false;
    if (this.playTimer) {
      clearTimeout(this.playTimer);
      this.playTimer = null;
    }
    document.getElementById('play-icon').classList.remove('hidden');
    document.getElementById('pause-icon').classList.add('hidden');
    var statusEl = document.getElementById('audio-status');
    statusEl.textContent = '已停止播音';
    statusEl.className = 'audio-status';
  }
};
