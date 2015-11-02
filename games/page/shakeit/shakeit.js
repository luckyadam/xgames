'use strict';

/**
 * @author liyixin5
 * @date 2015-11-1
 * @desc 摇摇乐游戏
 */

PP.define('games/page/shakeit', function (require, exports, module) {

  var Shakeit = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);
      this.init();
      this.initEvent();
    },

    init: function () {
      var cont = this.conf.$el,
        doc = document.documentElement,
        s = doc.clientWidth,
        width = (s > 640) ? 640 : s,
        height = doc.clientHeight;

      cont.width(width);
      cont.height(height);
    },

    initEvent: function () {
      $(window).on('orientationchange', $.proxy(this.onOrientationchange, this))
        .on('deviceorientation', $.proxy(this.onDeviceorientation, this));
    },

    onOrientationchange: function () {

    },

    onDeviceorientation: function (e) {
      if (e.alpha <= 25 || e.alpha >= 295) {
        // console.log('正向');
        _.eventCenter.trigger('games_page_shakeit:forward');
      } else if (e.alpha >= 115 && e.alpha <= 235) {
        // console.log('倒置');
        _.eventCenter.trigger('games_page_shakeit:invert');
      }
    }
  });

  module.exports = Shakeit;
});
