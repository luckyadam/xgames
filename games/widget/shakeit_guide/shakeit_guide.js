'use strict';

/**
 * @author luckyadam
 * @date 2015-11-2
 * @desc 摇摇乐提示
 */

PP.define('games/widget/shakeit_guide', function (require, exports, module) {
  var ShakeitGuide = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);

      this.init();
    },

    init: function () {
      this.initEvent();
      this.listenEvent();
    },

    initEvent: function () {
      this.conf.$el.on('webkitAnimationEnd', $.proxy(this.onAnimationEnd, this));
    },

    listenEvent: function () {
      _.eventCenter.on('games_page_shakeit:invert', $.proxy(this.onInvert, this));
    },

    onInvert: function () {
      this.conf.$el.addClass('dismiss');
    },

    onAnimationEnd: function (e) {
      this.conf.$el.hide();
      _.eventCenter.trigger('games_widget_shakeit_guide:start');
    }

  });

  module.exports = ShakeitGuide;
});
