'use strict';

/**
 * @author luckyadam
 * @date 2015-11-2
 * @desc 摇摇乐
 */

PP.define('games/widget/shakeit_main', function (require, exports, module) {

  var ShakeitMain = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);
      this.init();
    },

    init: function () {
      this.listenEvent();
      this.initEvent();
      this.isFirstShake = true;
    },

    initEvent: function () {
      $(window).on('shake', $.proxy(this.shakeEventDidOccur, this));
    },

    listenEvent: function () {
      _.eventCenter.on('games_widget_shakeit_guide:start', $.proxy(this.onReady, this));
      _.eventCenter.on('gb_widget_countdown2:timeisup', $.proxy(this.onStart, this));
    },

    onReady: function () {
      $('body').css({
        'transform': 'rotate(-180deg)',
        '-webkit-transform': 'rotate(-180deg)'
      });
      this.conf.$el.show();
      setTimeout(function () {
        _.eventCenter.trigger('gb_widget_countdown2:start');
      }, 500);
    },

    onStart: function () {
      setTimeout($.proxy(function () {
        _.eventCenter.trigger('gb_widget_countdown:start');
        this.conf.$el.find('.sm_title').hide();
        this.shakeEvent = new Shake({
          threshold: 15
        });

        this.shakeEvent.start();
      }, this), 600);

    },

    shakeEventDidOccur: function () {
      if (this.isFirstShake) {
        this.conf.$el.removeClass('shake_ini').addClass('shake_ing');
        this.isFirstShake = false;
      }
    }
  });

  module.exports = ShakeitMain;

});
