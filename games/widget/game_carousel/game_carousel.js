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
      this.conf.wrapper.on('touchend', $.proxy(function () {
        this.changeIndex(1);
        if (this.conf.isAuto) {
          clearInterval(this.autoInterval);
          this.auto();
        }
      }, this));
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

    auto: function () {
      this.autoInterval = setInterval($.proxy(function() {
        this.changeIndex(1);
      }, this), 3000);
    }
  });

  module.exports = Carousel;
});
