'use strict';

/**
 * @author luckyadam
 * @date 2015-11-2
 * @desc 摇摇乐
 */

PP.define('games/widget/shakeit_main', function (require, exports, module) {

  var AudioPlayer = require('gb/widget/audio_player');
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
      this.isShaking = false;
      this.isWinner = true;
      this.isEnd = false;
      this.$falls = this.conf.$el.find('.sm_ribbons').children();
    },

    initEvent: function () {
      $(window).on('shake', $.proxy(this.shakeEventDidOccur, this))
        .on('unshake', $.proxy(this.unShakeEventDidOccur, this));
    },

    listenEvent: function () {
      _.eventCenter.on('games_widget_shakeit_guide:start', $.proxy(this.onReady, this));
      _.eventCenter.on('gb_widget_countdown2:timeisup', $.proxy(this.onStart, this));
      _.eventCenter.on('gb_widget_countdown:timeisup', $.proxy(this.onTimeisup, this));
      _.eventCenter.on('gb_widget_countdown:start', $.proxy(this.onCountdownStart, this));
      _.eventCenter.on('gb_widget_countdown:timedown', $.proxy(function (time) {
        if (parseInt(time, 10) === this.randomTime) {
          if (this.isShaking) {
            this.fallLittleP();
          }
        }
      }, this));
    },

    onReady: function () {
      $('body').css({
        'transform': 'rotate(-180deg)',
        '-webkit-transform': 'rotate(-180deg)'
      });
      this.conf.$el.show();
      this.randomTime = Math.floor(Math.random() * 8 + 2);
      setTimeout(function () {
        _.eventCenter.trigger('gb_widget_countdown2:start');
      }, 500);
    },

    onStart: function () {
      setTimeout($.proxy(function () {
        this.shakeEvent = new Shake({
          threshold: 8,
          timeout: 500
        });

        this.shakeEvent.start();
      }, this), 600);

    },

    onCountdownStart: function () {
      this.conf.$el.addClass('shake_notice');
    },

    shakeEventDidOccur: function (e) {
      if (!this.isShaking && !this.isFirstShake) {
        _.eventCenter.trigger('gb_widget_countdown:start');
      }
      if (this.isFirstShake) {
        this.conf.$el.removeClass('shake_ini').addClass('shake_ing');
        _.eventCenter.trigger('gb_widget_countdown:start');
        this.conf.$el.find('.countdown2').hide();
        this.isFirstShake = false;
      }
      this.falling();

      this.isShaking = true;
      this.conf.$el.removeClass('shake_notice');
    },

    unShakeEventDidOccur: function () {
      if (!this.isEnd) {
        this.conf.$el.addClass('shake_notice');
        this.unfalling();
        this.isShaking = false;
        _.eventCenter.trigger('gb_widget_countdown:pause');
      }
    },

    fallLittleP: function () {
      this.conf.$el.addClass('shake_drop').find('.sm_drop').addClass('falling');
      this.littlePDropped();
    },

    littlePDropped: function () {
      var fallLittlePPlayer = new AudioPlayer({
        src: __uri('../images/shake_little_p.mp3'),
        autoplay: false,
        loop: false
      });
      fallLittlePPlayer.play();
    },

    falling: function () {
      this.$falls.addClass('falling');
    },
    unfalling: function () {
      this.$falls.removeClass('falling');
    },

    onTimeisup: function () {
      var timeUpAudio = new AudioPlayer({
        autoplay: false,
        loop: false
      });
      if (this.isWinner) {
        timeUpAudio.setSrc(__uri('../images/shake_win.mp3'));
        timeUpAudio.play();
        this.conf.$el.removeClass('shake_drop shake_fart shake_notice').addClass('shake_win').find('.sm_drop').addClass('falling');
      } else {
        timeUpAudio.setSrc(__uri('../images/shake_fart.mp3'));
        timeUpAudio.play();
        this.conf.$el.removeClass('shake_drop shake_win shake_notice').addClass('shake_fart').find('.sm_drop').addClass('falling');
      }
      this.isEnd = true;
      this.shakeEvent.stop();
      $(window).off('shake unshake');
    }
  });

  module.exports = ShakeitMain;

});
