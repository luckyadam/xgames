'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5
 * @desc 轮播
 */

PP.define('games/widget/game_carousel', function (require, exports, module) {
  var Carousel = _.Class.extend({
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
      this.$before = wrapper.find('.before');
      this.$prev = wrapper.find('.prev');
      this.$next = wrapper.find('.next');
      if (this.conf.isAuto) {
        clearInterval(this.autoInterval);
      }
    },

    onMove: function (event) {
      var initial = this.initial;
      var wrapper = this.conf.wrapper;
      var wrapperWidth = this.wrapperWidth;
      initial.ex = event.targetTouches[0].pageX;
      initial.ey = event.targetTouches[0].pageY;
      var changeX = initial.sx - initial.ex;
      var changeY = initial.sy - initial.ey;
      var progress = changeX / wrapperWidth;
      if(Math.abs(changeX) < wrapperWidth) {
          this.$before.css('transform', 'translate('+ (-changeX / 3) +'px,0) scale('+ ((1-0.85)*(1-Math.abs(progress))+0.85) +')');
          this.$before.css('-webkit-transform', 'translate('+ (-changeX / 3) +'px,0) scale('+ ((1-0.85)*(1-Math.abs(progress))+0.85) +')');
          if(changeX>0) {
              this.$prev.css('transform', 'translate('+ (-wrapperWidth/3+wrapperWidth*2/3*progress) +'px,0) scale('+ 0.85 +')');
              this.$next.css('transform', 'translate('+ (wrapperWidth/3)*(1-progress) +'px,0) scale('+ (Math.abs(progress)*0.15+0.85) +')');
              this.$prev.css('-webkit-transform', 'translate('+ (-wrapperWidth/3+wrapperWidth*2/3*progress) +'px,0) scale('+ 0.85 +')');
              this.$next.css('-webkit-transform', 'translate('+ (wrapperWidth/3)*(1-progress) +'px,0) scale('+ (Math.abs(progress)*0.15+0.85) +')');
          } else {
              this.$prev.css('transform', 'translate('+ (-wrapperWidth/3)*(1+progress) +'px,0) scale('+ (Math.abs(progress)*0.15+0.85) +')');
              this.$next.css('transform', 'translate('+ (wrapperWidth/3+wrapperWidth*2/3*progress) +'px,0) scale('+ 0.85 +')');
              this.$prev.css('-webkit-transform', 'translate('+ (-wrapperWidth/3)*(1+progress) +'px,0) scale('+ (Math.abs(progress)*0.15+0.85) +')');
              this.$next.css('-webkit-transform', 'translate('+ (wrapperWidth/3+wrapperWidth*2/3*progress) +'px,0) scale('+ 0.85 +')');
          }
      }
    },

    onEnd: function (event) {
      var initial = this.initial;
      var wrapper = this.conf.wrapper;
      var changeX = initial.sx - initial.ex;
      var changeY = initial.sy - initial.ey;
      var currentIndex = -1;
      this.$before = wrapper.find('.before');
      this.$prev = wrapper.find('.prev');
      this.$next = wrapper.find('.next');
      if(changeX > 0) {
        this.$prev.removeClass('prev').addClass('next').removeAttr('style');
        this.$before.removeClass('before').addClass('prev').removeAttr('style');
        this.$next.removeClass('next').addClass('before').removeAttr('style');
      } else {
        this.$prev.removeClass('prev').addClass('before').removeAttr('style');
        this.$before.removeClass('before').addClass('next').removeAttr('style');
        this.$next.removeClass('next').addClass('prev').removeAttr('style');
      }
      currentIndex = wrapper.find('.before').index();
      _.eventCenter.trigger('games_widget_game_carousel:change', currentIndex);
      if (this.conf.isAuto) {
        clearInterval(this.autoInterval);
        this.auto();
      }
    },

    auto: function () {
      var wrapper = this.conf.wrapper;
      var currentIndex = -1;
      this.autoInterval = setInterval($.proxy(function() {
        this.$before = wrapper.find('.before');
        this.$prev = wrapper.find('.prev');
        this.$next = wrapper.find('.next');
        this.$prev.removeClass('prev').addClass('next');
        this.$before.removeClass('before').addClass('prev');
        this.$next.removeClass('next').addClass('before');
        currentIndex = wrapper.find('.before').index();
        _.eventCenter.trigger('games_widget_game_carousel:change', currentIndex);
      }, this), 3000);
    }
  });

  module.exports = Carousel;
});
