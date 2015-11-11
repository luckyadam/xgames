'use strict';

/**
 * @author luckyadam
 * @date 2015-11-4
 * @desc 抓一抓
 */

PP.define('games/page/crane', function (require, exports, module) {
  var LoginUtil = require('gb/widget/login');
  var LotteryUtil = require('gb/widget/lottery');
  var Toast = require('toast');
  var Crane = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);
      this.init();
    },

    init: function () {
      var cont = this.conf.$el,
        doc = document.documentElement,
        s = doc.clientWidth,
        width = (s > 640) ? 640 : s,
        height = doc.clientHeight;

      cont.width(width);
      cont.height(height);
      this.listenEvent();
      this.token = null;
      this.checkValidate(false);
    },

    listenEvent: function () {
      _.eventCenter.on('games_crane:init', $.proxy(this.onAfterCheck, this));
    },

    checkValidate: function (isShareBack) {
      LotteryUtil.init({
        actId: this.conf.actId
      }, $.proxy(function (ret) {
        if(ret && (ret.code !== undefined)){
          var retData = ret.data;
          switch (ret.code){
            case '000'://活动已经结束!
            case '001':
              _.eventCenter.trigger('games_crane:init', 0, 0, isShareBack);
              setTimeout(function () {
                new Toast('活动已经结束!', 5000);
              }, 800);
              break;
            case '111'://111次数不足
            case '112'://112积分不足
              var leftShareTimes = 0;
              if(ret.data.limit){
                if(!isNaN(ret.data.limit.share_dateMax) && !isNaN(ret.data.limit.share_date)){
                  leftShareTimes = ret.data.limit.share_dateMax - ret.data.limit.share_date;
                  if(leftShareTimes > 0){//提示可以分享获得
                    new Toast('请分享后刷新页面再试');
                  } else {//分享机会也用完
                    new Toast('今日次数已经用完，请明日再来！');
                  }
                }
              }
              _.eventCenter.trigger('games_crane:init', 0, leftShareTimes, isShareBack);
              break;
            case '201'://加载实例，首次创建实例成功
            case '211'://加载已有实例
              if (!retData) {
                new Toast('网络错误，请刷新重试');
                return;
              }

              var leftCoin = parseInt(retData.coin, 10);
              var isTimesLeft = false;
              if (isNaN(leftCoin)) {
                new Toast('网络错误，请刷新重试');
                return;
              }
              var leftTimes = Math.floor(leftCoin / this.conf.lotSingleCost);
              var leftShareTimes = 0;
              this.conf.$el.find()
              if(leftTimes > 0){
                isTimesLeft = true;
              } else {
                isTimesLeft = false;
              }
              if(!isTimesLeft && retData.limit){
                if(!isNaN(retData.limit.share_dateMax) && !isNaN(retData.limit.share_date)){
                  leftShareTimes = retData.limit.share_dateMax - retData.limit.share_date;
                  if(leftShareTimes > 0){//提示可以分享获得
                    new Toast('分享增加次数');
                  } else {//分享机会也用完
                    new Toast('今日次数已经用完，请明日再来！');
                  }
                }
              }
              this.token = ret.token;
              _.eventCenter.trigger('games_crane:init', leftTimes, leftShareTimes, isShareBack);
              break;
            case '777':
              _.eventCenter.trigger('games_crane:init', 0, 0, isShareBack);
              setTimeout(function () {
                new Toast('请先登录!', 5000);
              }, 800);
              LoginUtil.gotoLogin();
              break;
            default :
              _.eventCenter.trigger('games_crane:init', 0, 0, isShareBack);
              setTimeout(function () {
                new Toast('网络错误，请刷新重试!!', 5000);
              }, 800);
          }
        } else {
          _.eventCenter.trigger('games_crane:init', 0, 0, isShareBack);
          setTimeout(function () {
            new Toast('网络错误，请刷新重试!!', 5000);
          }, 800);
        }
      }, this));
    },

    onAfterCheck: function (leftTimes, leftShareTimes, isShareBack) {
      if (leftTimes > 0) {
        setTimeout($.proxy(function () {
          _.eventCenter.trigger('games_crane:start', this.conf.actId, this.token);
        }, this), 2500);
      }
    }
  });

  module.exports = Crane;
});

'use strict';

/**
 * @author luckyadam
 * @date 2015-11-9
 * @desc 
 */

'use strict';

/**
 * @author luckyadam
 * @date 2015-11-4
 * @desc 抓一抓引导
 */

PP.define('games/widget/crane_guide', function (require, exports, module) {

  var CraneGuide = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);

      this.init();
    },

    init: function () {
      this.listenEvent();
    },

    listenEvent: function () {
      _.eventCenter.on('games_crane:start', $.proxy(this.hide, this));
    },

    hide: function () {
      this.conf.$el.addClass('out');
    }
  });

  module.exports = CraneGuide;
});

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
          self.player.setSrc('/xgames/games/images/crane_press_btn_88008cba.mp3');
          self.player.play();
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
            self.player.setSrc('/xgames/games/images/crane_catch_36719e30.wav', 'audio/wav');
            self.player.play();
            setTimeout($.proxy(function () {
              self.upPlayer = new AudioPlayer({
                autoplay: false,
                loop: false,
                src: '/xgames/games/images/crane_catch_up_b7749698.mp3'
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
        this.lotteryDialog.lose(true, $.proxy(function () {
          this.$pageHand.removeClass('stop');
          this.$pageBtn1.show();
          this.$pageBtn2.hide();
          this.$pageBtn6.hide();
          this.$pageHand.removeClass('page_handlose');
          this.conf.$el.removeClass('in').addClass('in');
          setTimeout($.proxy(function () {
            this.$countdown2.show();
            _.eventCenter.trigger('gb_widget_countdown:reset');
            _.eventCenter.trigger('gb_widget_countdown2:reset');
            _.eventCenter.trigger('gb_widget_countdown2:start');
          }, this), 500);
        }, this));
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
                  // this.gift.tip = retData.sysGift.giftName;
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
          this.player.setSrc('/xgames/games/images/get_gift_cba184d0.mp3', 'audio/mpeg');
          this.player.play();
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
