'use strict';

/**
 * @author luckyadam
 * @date 2015-11-4
 * @desc 抓一抓
 */

PP.define('games/widget/crane_main', function (require, exports, module) {
  var AudioPlayer = require('gb/widget/audio_player');
  var Toast = require('toast');
  var lotteryUtil = require('gb/widget/lottery');
  var LotteryDialog = require('gb/widget/lottery_dialog');
  var CraneMain = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);

      this.init();
    },

    init: function () {
      this.getElements();
      this.listenEvent();
      this.isGrasped = false;
      this.lotteryDialog = new LotteryDialog();
      this.token = null;
      this.actId = null;
      this.timer1 = null;
      this.timer2 = null;
      this.timer3 = null;
      this.timer4 = null;
      this.player = new AudioPlayer({
        autoplay: false,
        loop: false
      });
    },

    getElements: function () {
      var $el = this.conf.$el;
      this.$pageBtn1 = $el.find('.page_btn1');
      this.$pageBtn2 = $el.find('.page_btn2');
      this.$pageBtn3 = $el.find('.page_btn3');
      this.$pageBtn4 = $el.find('.page_btn4');
      this.$pageBtn5 = $el.find('.page_btn5');
      this.$pageBtn6 = $el.find('.page_btn6');
      this.$countdown2 = $el.find('.countdown2');
      this.$pageHand = $el.find('.page_hand');
      this.$pageCraned = $el.find('.page_craned');
    },

    listenEvent: function () {
      _.eventCenter.on('games_crane:start', $.proxy(this.show, this));
      _.eventCenter.on('gb_widget_countdown:timeisup', $.proxy(this.onTimeisup, this));
      _.eventCenter.on('gb_widget_countdown2:timeisup', $.proxy(this.onStart, this));
    },

    show: function (actId, token) {
      this.actId = actId;
      this.token = token;
      this.conf.$el.addClass('in');
      setTimeout(function () {
        _.eventCenter.trigger('gb_widget_countdown2:start');
      }, 500);
    },

    onStart: function () {
      var self = this;
      this.timer1 = setTimeout(function () {
        _.eventCenter.trigger('gb_widget_countdown:start');
        self.$pageBtn1.hide();
        self.$countdown2.hide();
        self.$pageBtn2.show();
        self.$pageBtn3.hide();
        self.$pageBtn4.hide();
        self.$pageBtn5.hide();
        self.$pageBtn6.hide();
        self.$pageCraned.removeClass('in');
        self.conf.$el.off('tap').on('tap', '.page_btn2', function () {
          $(this).hide();
          var player = new AudioPlayer({
            autoplay: false,
            loop: false,
            src: __uri('../images/crane_press_btn.mp3')
          });
          player.play();
          self.$pageBtn3.show();
          self.$pageHand.addClass('down');
          if (Math.random() > 0.5) {
            self.$pageCraned.addClass('page_craned2');
          } else {
            self.$pageCraned.removeClass('page_craned2');
          }
          setTimeout(function () {
            self.$pageBtn3.hide();
            self.$pageBtn1.show();
          }, 200);
          self.timer2 = setTimeout(function () {
            var player = new AudioPlayer({
              autoplay: false,
              loop: false,
              src: __uri('../images/crane_catch.wav'),
              type: 'audio/wav'
            });
            player.play();
            setTimeout($.proxy(function () {
              self.upPlayer = new AudioPlayer({
                autoplay: false,
                loop: false,
                src: __uri('../images/crane_catch_up.mp3')
              });
              self.upPlayer.play();
            }, this), 100);
            self.$pageCraned.addClass('in');
            self.$pageBtn1.hide();
            self.$pageBtn4.show();
            self.timer3 = setTimeout(function () {
              self.$pageBtn4.hide();
              if (Math.random() > 0.3) {
                self.$pageHand.addClass('page_handlose').removeClass('down');
                self.$pageCraned.addClass('down');
                self.$pageBtn6.show();
                self.upPlayer && self.upPlayer.stop();
                self.timer4 = setTimeout(function () {
                  self.$pageBtn6.hide();
                  self.$pageBtn2.show();
                  self.$pageHand.removeClass('page_handlose');
                  self.$pageCraned.removeClass('down in');
                }, 800);
              } else {
                self.isGrasped = true;
                self.$pageHand.addClass('page_handwin');
                self.$pageCraned.removeClass('down').addClass('in');
                self.$pageBtn5.show();

                self.onTimeisup();
              }
            }, 1500);
          }, 2500);
        });

      }, 800);
    },

    onTimeisup: function () {
      clearTimeout(this.timer1);
      clearTimeout(this.timer2);
      clearTimeout(this.timer3);
      clearTimeout(this.timer4);
      this.upPlayer && this.upPlayer.stop();
      if (!this.isGrasped) {  // 让用户选择重新玩一次游戏
        this.$pageHand.addClass('stop').removeClass('down');
        this.$pageBtn6.show();
        this.$pageHand.addClass('page_handlose');
        this.$pageCraned.removeClass('down').removeClass('in');
        this.lotteryDialog.lose(false, '没有抓到娃娃嘞，运气真差！');
      } else {
        _.eventCenter.trigger('gb_widget_countdown:pause');
        lotteryUtil.play({
          token: this.token,
          actId: this.actId
        }, $.proxy(function (ret) {
          this.isWinner = 'unknow';
          if (!ret) {
            this.checkWinner();
            return;
          }
          var retData = ret.data;
          this.gift = {};
          switch (ret.code) {
            case "000"://活动已经结束!
            case "001":
              break;
            case "111"://111次数不足
            case "112"://112积分不足
              this.isWinner = 'limit';
              if(retData.limit){
                var leftShareTimes = 0;
                if(!isNaN(retData.limit.share_dateMax) && !isNaN(retData.limit.share_date)){
                  leftShareTimes = retData.limit.share_dateMax - retData.limit.share_date;
                  if(leftShareTimes > 0){//提示可以分享获得
                    new Toast({
                      content: '请分享后刷新页面再试',
                      duration: 5000
                    });
                  } else {//分享机会也用完
                    new Toast({
                      content: '今日次数已经用完，请明日再来！',
                      duration: 5000
                    });
                  }
                }
              }
              break;
            case '399': //领奖失败
              this.isWinner = false;
              break;
            case '300':
              if(retData && retData.sysGift && retData.sysGift.giftType === 1) { //实物奖励
                this.isWinner = 'unknow';
              } else if(retData && retData.sysGift && retData.sysGift.giftType === 2) { //优惠券奖励
                if(retData.sysGift.giftValue && retData.sysGift.giftName){
                  this.gift.value = retData.sysGift.giftValue;
                  this.gift.name = retData.sysGift.giftName;
                  this.gift.tip = retData.sysGift.sysGiftCode;
                  this.gift.url = retData.sysGift.coupon;
                  this.isWinner = true;
                }else{
                  new Toast("网络错误，请刷新重试");
                }

              } else {
                this.isWinner = false;
              }
              break;
            default:
              break;
          }
          this.checkWinner();
        }, this));
      }
    },

    checkWinner: function () {
      if (this.isWinner !== undefined) {
        if (this.isWinner === 'limit') {
          return;
        }
        if (this.isWinner === 'unknow') {
          console.log('unknow');
          new Toast({
            content: '网络错误，请重新再试！'
          });
          return;
        }

        if (this.isWinner) {
          var gift = this.gift;
          this.lotteryDialog.win(gift.value, gift.name, gift.tip, gift.url);
          var player = new AudioPlayer({
            autoplay: false,
            loop: false,
            src: __uri('../images/get_gift.mp3')
          });
          player.play();
        } else {
          this.lotteryDialog.lose();
        }
      } else {
        new Toast({
          content: '网络错误，请重新再试！'
        });
      }
    }
  });

  module.exports = CraneMain;
});
