'use strict';

/**
 * @author luckyadam
 * @date 2015-10-27
 * @desc 音频播放器
 */

PP.define('gb/widget/audio_player', function (require, exports, module) {

  var AudioPlayer = _.Class.extend({

    statics: {

      PAUSED: 0,
      PLAYING: 1
    },

    construct: function (opts) {
      this.conf = $.extend({
        src: null,
        loop: 'loop',
        type: 'audio/mpeg',
        autoplay: true,
        preload: true
      }, opts);

      this.init();
    },

    // 初始化音频组件
    init: function () {
      var conf = this.conf;
      if (!this.audio) {
        this.audio = new Audio();
      }
      this.audio.src = conf.src;
      this.audio.loop = conf.loop;
      this.audio.type = conf.type;
      this.audio.autoplay = conf.autoplay;
      this.audio.preload = conf.preload;
      if (this.audio.autoplay) {
        this.status = AudioPlayer.PLAYING;
      } else {
        this.status = AudioPlayer.PAUSED;
      }
    },

    // 切换音频播放
    togglePlay: function () {
      if (this.status === AudioPlayer.PLAYING) {
        this.pause();
      } else {
        this.play();
      }
    },

    // 播放音频
    play: function () {
      this.status = AudioPlayer.PLAYING;
      this.audio && this.audio.pause();
      this.audio && this.audio.play();
    },

    // 暂停播放
    pause: function () {
      this.status = AudioPlayer.PAUSED;
      this.audio && this.audio.pause();
    },

    stop: function () {
      this.status = AudioPlayer.PAUSED;
      this.audio.currentTime = 0;
      this.pause();
    },

    // 设置新的路径，重新开始播放
    setSrc: function (src, type) {
      if (this.audio) {
        this.stop();
        this.audio.src = src;
        if (type) {
          this.audio.type = type
        }
      }
    },

    getStatus: function () {
      return this.status;
    },

    destroy: function () {
      this.audio.pause();
      this.audio = null;
    }

  });

  module.exports = AudioPlayer;
});
