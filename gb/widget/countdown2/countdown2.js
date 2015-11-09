'use strict';

/**
 * @author luckyadam
 * @date 2015-10-30
 * @desc 大型倒计时器
 */

PP.define('gb/widget/countdown2', function (require, exports, module) {

  var AudioPlayer = require('gb/widget/audio_player');
  var Countdown2 = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null,
        bgm: null
      }, opts);

      this.init();
    },

    init: function () {
      this.originTime = 3;
      this.startTime = this.originTime;
      this.totalTime = this.originTime * 10;
      this.timer = null;
      this.countMs = 10;
      this.countChange = 0;
      this.audio = new AudioPlayer({
        src: this.conf.bgm,
        autoplay: false,
        loop: false
      });
      this.listenEvent();
    },

    listenEvent: function () {
      _.eventCenter.on('gb_widget_countdown2:start', $.proxy(this.start, this));
      _.eventCenter.on('gb_widget_countdown2:pause', $.proxy(this.pause, this));
      _.eventCenter.on('gb_widget_countdown2:reset', $.proxy(this.reset, this));
    },

    start: function () {
      var changePer = 350 / 40 * 640 / 750;
      this.audio.play();
      setTimeout($.proxy(function count () {
        this.totalTime -= 1;
        if (this.totalTime < 0) {
          this.conf.$el.find('.countdown2_txt').css({
            'background-position': '0 -' + changePer * this.countChange + 'rem'
          });
          clearTimeout(this.timer);
          this.countMs = 10;
          this.countChange = 0;
          _.eventCenter.trigger('gb_widget_countdown2:timeisup');
          return;
        } else {
          if (this.totalTime >= 0 && this.countMs > 0) {
            this.countMs --;
          }

          if (this.countMs === 0 && this.startTime > 0) {
            this.countMs = 10;
            this.startTime--;
            this.countChange++;
            this.conf.$el.find('.countdown2_txt').css({
              'background-position': '0 -' + changePer * this.countChange + 'rem'
            });
            this.audio.stop();
            this.audio.play();
          }
        }
        this.timer = setTimeout($.proxy(count, this), 100);
      }, this), 100);
    },

    pause: function () {
      clearTimeout(this.timer);
    },

    reset: function () {
      clearTimeout(this.timer);
      this.originTime = 3;
      this.startTime = this.originTime;
      this.totalTime = this.originTime * 10;
      this.timer = null;
      this.conf.$el.find('.countdown2_txt').css({
        'background-position': '0 0'
      });
    }
  });

  module.exports = Countdown2;
});
