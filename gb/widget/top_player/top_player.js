'use strict';

/**
 * @author luckyadam
 * @date 2015-10-28
 * @desc 左上角播放控制器
 */

PP.define('gb/widget/top_player', function (require, exports, module) {

  var AudioPlayer = require('gb/widget/audio_player');

  var TopPlayer = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null,
        src: null
      }, opts);
      if (this.conf.src === null) {
        return;
      }
      this.init();
    },

    init: function () {
      this.player = new AudioPlayer({
        src: this.conf.src
      });
      this.setStyle();
      this.initEvent();
    },

    setStyle: function () {
      var $btn = $('.top_player_btn', this.conf.$el);
      if (this.player.getStatus() === AudioPlayer.PLAYING) {
        $btn.removeClass('off').addClass('on');
      } else {
        $btn.removeClass('on').addClass('off');
      }
    },

    initEvent: function () {
      this.conf.$el.on('touchend', '.top_player_btn', $.proxy(this.togglePlay, this));
    },

    togglePlay: function () {
      this.player.togglePlay();
      this.conf.$el.toggleClass('stop');
      this.setStyle();
    }
  });

  module.exports = TopPlayer;
});
