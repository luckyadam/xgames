'use strict';

/**
 * @author luckyadam
 * @date 2015-11-4
 * @desc 抽奖结果浮层
 */

PP.define('gb/widget/lottery_dialog', function (require, exports, module) {
  var LotteryDialog = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        container: 'body',
        content: '',
        extClass: null,
        url: null
      }, opts);

    },

    win: function (value, tip, url) {
      if (!this.$win) {
        var html = '<div class="mod_popup win">';
        html += '<div class="mod_popup_body">';
        html += '<div class="mod_popup_xiu"></div>';
        html += '<div class="mod_popup_yqsex"></div>';
        html += '<div class="mod_popup_main mod_popup_win">';
        html += '<div class="mod_popup_txt"><b>' + value + '</b>元代金券</div>';
        if (tip) {
          html += '<div class="mod_popup_tip"><span>限<b>' + tip + '</b>使用</span></div>';
        } else {
          html += '<div class="mod_popup_tip"><span>全平台通用</span></div>';
        }
        html += '</div>';
        html += '<div class="mod_popup_btn"><a href="javascript:;"><span>到' + tip ? '店铺' : '首页' + '找好货</span></a></div>';
        html += '<div class="mod_popup_star"></div>';
        html += '<a href="javascript:;" class="mod_popup_close"></a>';
        html += '</div>';
        html += '</div>';
        this.$win = $(html);
        this.$win.appendTo($(this.conf.container)).on('tap', '.mod_popup_close', $.proxy(function () {
          this.$win.removeClass('in');
        }, this));
      }

      this.$win.addClass('in');
    },

    lose: function () {
      if (!this.$lose) {
        var html = '<div class="mod_popup lose">';
        html += '<div class="mod_popup_body">';
        html += '<div class="mod_popup_main mod_popup_lose">';
        html += '<div class="mod_popup_lose_inner">';
        html += '<div class="mod_popup_leaf mod_popup_leaf1"></div>';
        html += '<div class="mod_popup_leaf mod_popup_leaf2"></div>';
        html += '<div class="mod_popup_line"></div>';
        html += '<div class="mod_popup_cry"></div>';
        html += '<div class="mod_popup_losetip">什么？没有中！？</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="mod_popup_btn"><a href="javascript:window.location.reload()"><span>换个姿势再来一次</span></a></div>';
        html += '<a href="javascript:;" class="mod_popup_close"></a>';
        html += '</div>';
        html += '</div>';
        this.$lose = $(html);
        this.$lose.appendTo($(this.conf.container)).on('tap', '.mod_popup_close', $.proxy(function () {
          this.$lose.removeClass('in');
        }, this));
      }

      this.$lose.addClass('in');
    }
  });

  module.exports = LotteryDialog;
});