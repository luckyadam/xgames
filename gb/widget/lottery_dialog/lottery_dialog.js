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

    win: function (value, name, tip, url) {
      tip = parseInt(tip, 10);
      var btnTxt = '';
      if (!this.$win) {
        var html = '<div class="mod_popup win">';
        html += '<div class="mod_popup_body mod_popup_imgs">';
        html += '<div class="mod_popup_xiu mod_popup_imgs"></div>';
        html += '<div class="mod_popup_yqsex mod_popup_imgs"></div>';
        html += '<div class="mod_popup_main mod_popup_win mod_popup_imgs">';
        html += '<div class="mod_popup_txt">' + name + '</div>';
        if (tip === 10001 || tip === 10002) {
          btnTxt = '去购物';
          html += '<div class="mod_popup_tip"><span>限定商品全平台通用</span></div>';
        } else if (tip >= 10003 && tip <= 10005) {
          btnTxt = '去首页购物';
          html += '<div class="mod_popup_tip"><span>全平台通用</span></div>';
        } else if (tip >= 10006 && tip <= 10009) {
          btnTxt = '去店铺购物';
          html += '<div class="mod_popup_tip"><span>限店铺使用</span></div>';
        }
        html += '</div>';
        html += '<div class="mod_popup_btn"><a href="' + url + '" class="mod_popup_imgs"><span>' + btnTxt + '</span></a></div>';
        html += '<div class="mod_popup_star mod_popup_imgs"></div>';
        html += '<a href="javascript:;" class="mod_popup_close"></a>';
        html += '</div>';
        html += '</div>';
        this.$win = $(html);
        this.$win.appendTo($(this.conf.container)).on('tap', '.mod_popup_close', $.proxy(function () {
          this.$win.removeClass('in').off().remove();
          this.$win = null;
        }, this));
      }

      this.$win.addClass('in');
    },

    lose: function (replay, tip, cb) {
      if (!this.$lose) {
        var loseTip = tip ? tip : '什么？没有中！？';

        var html = '<div class="mod_popup lose">';
        html += '<div class="mod_popup_body mod_popup_imgs">';
        html += '<div class="mod_popup_main mod_popup_lose mod_popup_imgs">';
        html += '<div class="mod_popup_lose_inner">';
        html += '<div class="mod_popup_leaf mod_popup_leaf1 mod_popup_imgs"></div>';
        html += '<div class="mod_popup_leaf mod_popup_leaf2 mod_popup_imgs"></div>';
        html += '<div class="mod_popup_line mod_popup_imgs"></div>';
        html += '<div class="mod_popup_cry mod_popup_imgs"></div>';
        html += '<div class="mod_popup_losetip">' + loseTip + '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="mod_popup_btn"><a href="javascript:;" class="mod_popup_imgs"><span>换个姿势再来一次</span></a></div>';
        html += '<a href="javascript:;" class="mod_popup_close"></a>';
        html += '</div>';
        html += '</div>';
        this.$lose = $(html);
        this.$lose.appendTo($(this.conf.container)).on('tap', '.mod_popup_close', $.proxy(function () {
          this.$lose.removeClass('in').off().remove();
          this.$lose = null;
        }, this)).on('tap', '.mod_popup_btn', $.proxy(function (e) {
          e && e.preventDefault();
          if (replay) {
            this.$lose.removeClass('in').off().remove();
            this.$lose = null;
            cb && cb();
          } else {
            window.location.reload();
          }
        }, this));
      }

      this.$lose.addClass('in');
    }
  });

  module.exports = LotteryDialog;
});
