'use strict';

/**
 * @author liyixin5
 * @date 2015-11-1
 * @desc 摇摇乐游戏
 */

PP.define('games/page/shakeit', function (require, exports, module) {
  var LoginUtil = require('gb/widget/login');
  var lotteryUtil = require('gb/widget/lottery');
  var Toast = require('toast');
  var Shakeit = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);
      lotteryUtil.init({
        actId: this.conf.actId
      }, $.proxy(function (ret) {
        if(ret && (ret.code !== undefined)){
          var retData = ret.data;
          switch (ret.code){
            case '000'://活动已经结束!
            case '001':
              new Toast('活动已经结束!');
              break;
            case '111'://111次数不足
            case '112'://112积分不足
              if(retData.coin === 0 ){
                //提示分享
                new Toast('积分不足，请分享！');
              } else if(retData.coin === 1 ){
                new Toast('抽奖次数已用完!');//抽奖次数已用完
              }
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
              if(leftCoin > 0){
                var leftTimes = Math.floor(leftCoin / this.conf.lotSingleCost);
                if(leftTimes > 0){
                  isTimesLeft = true;
                  this.init();
                  this.initEvent();
                  _.eventCenter.trigger('shake_game_init', {
                    token: ret.token,
                    actId: this.conf.actId
                  });
                } else {
                  isTimesLeft = false;
                  new Toast('次数用完');
                }
              } else {
                isTimesLeft = false;
              }
              if(!isTimesLeft && retData.limit){
                if(!isNaN(retData.limit.share_dateMax) && !isNaN(retData.limit.share_date)){
                  if(retData.limit.share_dateMax - retData.limit.share_date > 0){//提示可以分享获得
                    new Toast('分享增加次数');
                  } else {//分享机会也用完
                    new Toast('明天来玩');
                  }
                }
              }
              break;
            case '777':
              new Toast('请登录');
              LoginUtil.gotoLogin();
              break;
            default :
              new Toast('网络错误，请刷新重试!!');
          }
        } else {
          new Toast('网络错误，请刷新重试!!');
        }
      }, this));
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
      this.isOnInvert = false;
    },

    initEvent: function () {
      this.conf.$el.on('webkitAnimationEnd', $.proxy(this.onAnimationEnd, this));
    },

    listenEvent: function () {
      _.eventCenter.on('games_page_shakeit:invert', $.proxy(this.onInvert, this));
    },

    onInvert: function () {
      if (!this.isOnInvert) {
        this.conf.$el.addClass('dismiss');
      }
    },

    onAnimationEnd: function () {
      var $el = this.conf.$el;
      if (($el.css('opacity') - 0) === 0) {
        $el.hide();
        _.eventCenter.trigger('games_widget_shakeit_guide:start');
      }
    }
  });

  module.exports = ShakeitGuide;
});

'use strict';

/**
 * @author luckyadam
 * @date 2015-11-2
 * @desc 摇摇乐
 */

PP.define('games/widget/shakeit_main', function (require, exports, module) {

  var AudioPlayer = require('gb/widget/audio_player');
  var Toast = require('toast');
  var lotteryUtil = require('gb/widget/lottery');
  var LotteryDialog = require('gb/widget/lottery_dialog');
  var ShakeitMain = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);
      _.eventCenter.on('shake_game_init', $.proxy(this.init, this));
    },

    init: function (args) {
      this.listenEvent();
      this.initEvent();
      this.isFirstShake = true;
      this.isShaking = false;
      this.isEnd = false;
      this.$falls = this.conf.$el.find('.sm_ribbons').children();
      this.token = args.token;
      this.actId = args.actId;
      this.lotteryDialog = new LotteryDialog();
      this.bgPlayer = new AudioPlayer({
        src: '/xgames/games/images/shake_bg_4462b638.wav',
        autoplay: false,
        loop: false,
        type: 'audio/wav'
      });
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
        time = parseInt(time, 10);
        if (time === this.randomTime) {
          if (this.isShaking) {
            this.fallLittleP();
          }
        }

        if (time === 1) {
          lotteryUtil.play({
            token: this.token,
            actId: this.actId
          }, $.proxy(function (ret) {
            this.isWinner = 'unknow';
            if (!ret) {
              return;
            }
            var retData = ret.data;
            this.gift = {};
            if (this.isEnd) {
              _.eventCenter.trigger('gb_widget_countdown:timeisup');
            }
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
          }, this));
        }
      }, this));
    },

    onReady: function () {
      $('body').css({
        'transform': 'rotate(-180deg)',
        '-webkit-transform': 'rotate(-180deg)'
      });
      this.conf.$el.show();
      this.randomTime = Math.floor(Math.random() * 8 + 3);
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
      this.bgPlayer.play();
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
      this.bgPlayer.stop();
      if (!this.isEnd) {
        this.conf.$el.addClass('shake_notice');
        this.unfalling();
        this.isShaking = false;
      }
    },

    fallLittleP: function () {
      this.conf.$el.addClass('shake_drop').find('.sm_drop').addClass('falling');
      this.littlePDropped();
    },

    littlePDropped: function () {
      var fallLittlePPlayer = new AudioPlayer({
        src: '/xgames/games/images/shake_little_p_ec45cc76.mp3',
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

      this.isEnd = true;
      if (this.isWinner !== undefined) {
        this.shakeEvent.stop();
        $(window).off('shake unshake');
        if (this.isWinner === 'limit') {
          return;
        }
        if (this.isWinner === 'unknow') {
          new Toast({
            content: '网络错误，请重新再试！'
          });
          return;
        }
        if (this.isWinner) {
          timeUpAudio.setSrc('/xgames/games/images/shake_win_6f557776.mp3');
          timeUpAudio.play();
          this.conf.$el.removeClass('shake_drop shake_fart shake_notice').addClass('shake_win').find('.sm_drop').addClass('falling');
          setTimeout($.proxy(function () {
            var gift = this.gift;
            this.lotteryDialog.win(gift.value, gift.name, gift.tip, gift.url);
            timeUpAudio.setSrc('/xgames/games/images/get_gift_cba184d0.mp3');
            timeUpAudio.play();
          }, this), 1500);
        } else {
          timeUpAudio.setSrc('/xgames/games/images/shake_fart_83b2670a.mp3');
          timeUpAudio.play();
          this.conf.$el.removeClass('shake_drop shake_win shake_notice').addClass('shake_fart').find('.sm_drop').addClass('falling');
          setTimeout($.proxy(function () {
            this.lotteryDialog.lose();
          }, this), 1500);
        }
      } else {
        new Toast({
          content: '网络错误，请重新再试！'
        });
      }
    }
  });

  module.exports = ShakeitMain;

});
