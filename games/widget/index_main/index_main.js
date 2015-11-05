'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5
 * @desc 首页重要模块
 */

PP.define('games/widget/index_main', function (require, exports, module) {
  var IndexMain = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);
      this.init();
    },

    init: function () {
      this.getElements();
      this.listenEvent();
    },

    getElements: function () {
      var $el = this.conf.$el;
      this.$tipMsg = $el.find('.main_tip_msg');
      this.$cards = $el.find('.game_carousel_card');
      this.$tipMsg = $el.find('.main_tip_msg');
      this.$gameBtnMsg = $el.find('.game_btn_msg');
    },

    listenEvent: function () {
      _.eventCenter.on('games_index:init', $.proxy(this.setInitState, this));
    },

    setInitState: function (leftTimes, leftShareTimes, isShareBack) {
      this.leftTimes = leftTimes;
      this.leftShareTimes = leftTimes;
      if (leftTimes > 0) {
        if (isShareBack) {
          this.$tipMsg.html('太棒了！赢得<span class="highlight">' + leftTimes + '</span>次机会！').show();
          this.$cards.removeClass('sfight');
        } else {
          this.$tipMsg.html('今日还剩<span class="highlight">' + leftTimes + '</span>次机会').show();
        }
        this.$gameBtnMsg.off('click').text('进入游戏');
        _.eventCenter.on('games_widget_game_carousel:change', $.proxy(this.onGameShowChange, this));
      } else {
        if (leftShareTimes > 0) {
          this.$cards.addClass('sfight');
          this.$gameBtnMsg.text('分享再玩一次').attr('href', 'javascript:;').off('click').on('click', function () {
            _.eventCenter.trigger('games_index_share:emit');
          });
        } else {
          this.$cards.addClass('tfight');
          this.$gameBtnMsg.off('click').hide();
        }
        this.$tipMsg.hide();
      }
    },

    onGameShowChange: function (index) {
      if (this.leftTimes > 0) {
        switch (index) {
          case 0:
            this.$gameBtnMsg.attr('href', 'crane.html');
            break;
          case 1:
            this.$gameBtnMsg.attr('href', 'shakeit.html');
            break;
          case 2:
            this.$gameBtnMsg.attr('href', 'slot_machine.html');
            break;
        }
      }
    }
  });

  module.exports = IndexMain;
});
