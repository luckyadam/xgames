'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5 changed
 * @desc 轮播
 */

PP.define('games/widget/game_carousel', function (require, exports, module) {
  var Carousel = _.Class.extend({
    canSlide: true,
    construct: function (opts) {
      this.conf = $.extend({
        wrapper: $('body'),
        isAuto: false
      }, opts);

      this.init();
    },

    init: function () {
      var wrapper = this.conf.wrapper;
      this.wrapperWidth = this.conf.wrapper.width();
      this.initial = { x:5, y:5, sx:0, sy:0, ex:0, ey:0 };
      this.$before = wrapper.find('.before');
      this.$prev = wrapper.find('.prev');
      this.$next = wrapper.find('.next');
      this.initEvent();
      if (this.conf.isAuto) {
        this.auto();
      }
    },

    initEvent: function () {
      this.conf.wrapper.on('touchstart', $.proxy(this.onStart, this))
        .on('touchmove', $.proxy(this.onMove, this))
        .on('touchend', $.proxy(this.onEnd, this));
    },

    classArr: ['prev', 'before', 'next'],
    classIdx: 1,
    changeIndex: function(step) {
      var prev = this.classIdx;
      this.classIdx = this.classIdx+step;
      if(this.classIdx > 2) {
        this.classIdx = 0;
      }
      if(this.classIdx < 0) {
        this.classIdx = 2;
      }
      _.eventCenter.trigger('games_widget_game_carousel:change', this.classIdx);
      this.conf.wrapper.removeClass('prev').removeClass('before').removeClass('next').addClass(this.classArr[this.classIdx]);
    },

    onStart: function (event) {
      var initial = this.initial;
      var wrapper = this.conf.wrapper;
      if (this.wrapperWidth === 0) {
        this.wrapperWidth = wrapper.width();
      }
      initial.sx = event.targetTouches[0].pageX;
      initial.sy = event.targetTouches[0].pageY;
      initial.ex = initial.sx;
      initial.ey = initial.sy;
      if (this.conf.isAuto) {
        clearInterval(this.autoInterval);
      }
    },

    onMove: function (event) {
      if(this.canSlide) {
        this.canSlide = false;
        var initial = this.initial;
        initial.ex = event.targetTouches[0].pageX;
        initial.ey = event.targetTouches[0].pageY;
        setTimeout(function() {
          this.canSlide = true;
        }.bind(this),200);
      }
    },

    onEnd: function (event) {
      var initial = this.initial;
      var changeX = initial.sx - initial.ex;
      var changeY = initial.sy - initial.ey;
      if (Math.abs(changeY) < Math.abs(changeX)) {
        event.preventDefault();
        if(changeX > 0) {
          this.changeIndex(1);
        } else {
          this.changeIndex(-1);
        }
      }

      if (this.conf.isAuto) {
        clearInterval(this.autoInterval);
        this.auto();
      }
    },

    auto: function () {
      this.autoInterval = setInterval($.proxy(function() {
        this.changeIndex(1);
      }, this), 3000);
    }
  });

  module.exports = Carousel;
});
