'use strict';

/**
 * @author luckyadam
 * @date 2015-10-29
 * @desc 倒计时器
 */

PP.define('gb/widget/countdown', function (require, exports, module) {
  var Countdown = _.Class.extend({
    statics: {
      COUNTING: 0,
      PAUSED: 1
    },
    construct: function (opts) {
      this.conf = $.extend({
        start: 15,
        end: 0,
        $el: null
      }, opts);
      this.init();
    },

    init: function () {
      var conf = this.conf;
      var $el = conf.$el;
      this.$timeNum = $el.find('.countdown_num');
      this.$pieLeft = $el.find('.countdown_bg_left');
      this.$pieRight = $el.find('.countdown_bg_right');
      this.$timeNum.text(conf.start);
      this.rotationAngle = 0;
      this.originTime = conf.start;
      this.totalTime = conf.start * 10;
      if (conf.start < 10) {
        conf.start = '0' + conf.start;
      }
      this.countMs = 10;
      this.countCircle = 0;
      this.timer = null;
      this.listenEvent();
    },

    listenEvent: function () {
      _.eventCenter.on('gb_widget_countdown:start', $.proxy(this.start, this));
      _.eventCenter.on('gb_widget_countdown:pause', $.proxy(this.pause, this));
      _.eventCenter.on('gb_widget_countdown:reset', $.proxy(this.reset, this));
    },

    start: function () {
      this.status = Countdown.COUNTING;
      var conf = this.conf;
      setTimeout($.proxy(function count () {
        this.totalTime -= 1;
        if (this.totalTime < 0) {
          this.$timeNum.text('00');
          clearTimeout(this.timer);
          _.eventCenter.trigger('gb_widget_countdown:timeisup');
          return;
        } else {
          if (this.totalTime >= 0 && this.countMs > 0) {
            this.countMs --;
          }

          if (this.countMs === 0 && conf.start > 0) {
            this.countMs = 10;
            conf.start --;
            if (conf.start < 10) {
              conf.start = '0' + conf.start;
            }
            _.eventCenter.trigger('gb_widget_countdown:timedown', parseInt(conf.start, 10));
          }
          this.$timeNum.text(conf.start);
          this.rotationAngle = this.rotationAngle + 360 / (this.originTime * 10);
          this.countCircle += 1;
          if(this.countCircle <= (this.originTime / 2 * 10)){
            this.$pieLeft.css('-webkit-transform', 'rotate(' + this.rotationAngle + 'deg)');
            this.$pieLeft.css('transform', 'rotate(' + this.rotationAngle + 'deg)');
          } else {
            this.$pieRight.css({
              'background-color': '#b1ffec',
              '-webkit-transform': 'rotate(' + this.rotationAngle + 'deg)',
              'transform': 'rotate(' + this.rotationAngle + 'deg)'
            });
          }
        }
        this.timer = setTimeout($.proxy(count, this), 100);
      }, this), 100);
    },

    pause: function () {
      this.status = Countdown.PAUSED
      clearTimeout(this.timer);
    },

    reset: function () {
      var conf = this.conf;
      clearTimeout(this.timer);
      conf.start = this.originTime;
      this.$timeNum.text(conf.start);
      this.rotationAngle = 0;
      this.totalTime = conf.start * 10;
      if (conf.start < 10) {
        conf.start = '0' + conf.start;
      }
      this.countMs = 10;
      this.countCircle = 0;
      this.timer = null;
      this.$pieLeft.css('-webkit-transform', 'rotate(0deg)');
      this.$pieLeft.css('transform', 'rotate(0deg)');
      this.$pieRight.css({
        'background-color': '#fff',
        '-webkit-transform': 'rotate(0deg)',
        'transform': 'rotate(0deg)'
      });
    }
  });

  module.exports = Countdown;
});
