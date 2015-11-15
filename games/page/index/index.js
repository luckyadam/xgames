'use strict';

/**
 * @author luckyadam
 * @date 2015-11-3
 * @desc 首页
 */

PP.define('games/page/index', function (require, exports, module) {
  Array.prototype.each = function (cb, onDone){
    var length = this.length,
      cnt = 0,
      i,
      finish = function (){
        if(++cnt === length){
          onDone && onDone.call(this);
        }
      };

    for(i=0; i<length; i++){
      cb.call(this, this[i], i, finish);
    }
  }

  var loadImg = function (srcArr, progress, done){
    var total = srcArr.length,
      count = 0,
      imgArr = [],
      done = done? done: function(){};

    srcArr.each(function (val, idx, finish){
      var img, state = false;
      img = new Image();
      img.src = val;
      if (img.complete){
        imgArr[idx] = img;
        count++;
        progress && progress((count / total * 100).toString().split('.')[0]);
        finish();
      } else {
        img.onerror = img.onload = function (){
          imgArr[idx] = img;
          count++;
          progress && progress((count / total * 100).toString().split('.')[0]);
          finish();
        };
      }
    }, done.bind(this, imgArr));
  }

  var allSrcs = [
    __uri('images/crane_bg.png'),
    __uri('images/crane_catch.wav'),
    __uri('images/crane_catch_up.mp3'),
    __uri('images/crane_drop.mp3'),
    __uri('images/crane_press_btn.mp3'),
    __uri('images/get_gift.mp3'),
    __uri('images/index_bg.png'),
    __uri('images/little_p.png'),
    __uri('images/MFLiHei_Noncommercial-Regular.ttf'),
    __uri('images/page_btn_imgs.png'),
    __uri('images/shake_bg.png'),
    __uri('images/shake_bg.wav'),
    __uri('images/shake_fart.mp3'),
    __uri('images/shake_little_p.mp3'),
    __uri('images/shake_win.mp3'),
    __uri('images/slot_bg.png'),
    __uri('images/slot_elements1.png'),
    __uri('images/slot_end.wav'),
    __uri('images/slot_light_off.png'),
    __uri('images/slot_machine_bg.png'),
    __uri('images/slot_scroll.mp3'),
    __uri('images/slot_tip_bg.png'),
    __uri('images/ss1.png'),
    __uri('images/ss2.png'),
    __uri('images/time_over.mp3'),
    __uri('images/bgm.mp3'),
    __uri('images/countdown.png'),
    __uri('images/countdown2.png'),
    __uri('images/lh.ttf'),
    __uri('images/top_player.png'),
    __uri('images/lottery_dialog_imgs.png'),
    __uri('images/popup_yellow.png')
  ];

  var Loading = require('gb/widget/loading');
  var LotteryUtil = require('gb/widget/lottery');
  var LoginUtil = require('gb/widget/login');
  var Util = require('util');
  var Toast = require('toast');
  var GamesIndex = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);

      this.init();
    },

    init: function () {
      this.loading = new Loading();
      this.loading.show();
      loadImg(allSrcs, function (percent) {
        console.log(percent);
      }, $.proxy(function () {
        this.checkValidate(false);
      }, this));
      // var isPaiSns = Util.isPaiSns();
      // if (!isPaiSns) {
      //   // 跳分享页
      //   return;
      // }
      this.connectWebViewJavascriptBridge($.proxy(function(bridge) {
        bridge.init(function(message, responseCallback) {
          if (responseCallback) {
            responseCallback('0');
          }
        });
        bridge.registerHandler && bridge.registerHandler('PPSNScallback', function (data, responseCallback) {
            //console.log(data);
        });
        this.setShareBtn(bridge);

      }, this));
      // 检测登录
      // if (LoginUtil.checkLogin()) {
        this.getElements();
        this.initEvent();
        this.listenEvent();
      // } else {
      //   LoginUtil.gotoLogin();
      // }
    },

    getElements: function () {
      var $el = this.conf.$el;
    },

    initEvent: function () {
    },

    checkValidate: function (isShareBack) {
      LotteryUtil.init({
        actId: this.conf.actId
      }, $.proxy(function (ret) {
        this.loading.hide();
        this.conf.$el.show().addClass('fadeIn');
        if(ret && (ret.code !== undefined)){
          var retData = ret.data;
          switch (ret.code){
            case '000'://活动已经结束!
            case '001':
              _.eventCenter.trigger('games_index:init', 0, 0, isShareBack);
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
              _.eventCenter.trigger('games_index:init', 0, leftShareTimes, isShareBack);
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
              _.eventCenter.trigger('games_index:init', leftTimes, leftShareTimes, isShareBack);
              break;
            case '777':
              _.eventCenter.trigger('games_index:init', 0, 0, isShareBack);
              setTimeout(function () {
                new Toast('请先登录!', 5000);
              }, 800);
              LoginUtil.gotoLogin();
              break;
            default :
              _.eventCenter.trigger('games_index:init', 0, 0, isShareBack);
              setTimeout(function () {
                new Toast('网络错误，请刷新重试!!', 5000);
              }, 800);
          }
        } else {
          _.eventCenter.trigger('games_index:init', 0, 0, isShareBack);
          setTimeout(function () {
            new Toast('网络错误，请刷新重试!!', 5000);
          }, 800);
        }
      }, this));
    },

    listenEvent: function () {
      _.eventCenter.on('games_index_share:emit', $.proxy(this.doShare, this));
    },

    connectWebViewJavascriptBridge: function (callback) {
      if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
      } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
          callback(WebViewJavascriptBridge)
        }, false);
      }
    },

    getShareArgs: function () {
      var shareLink = 'http://www.paipai.com/act/games/share.html';
      var args={
        'title': '我在京东拍拍玩游戏，不小心中奖了！来试试？？',
        'msg': '超级大奖天天领，就等你来拿哦',
        'links': {
          'Wechat': shareLink,//微信
          'WechatMoments': shareLink,//朋友圈
          'QQ': shareLink,//qq
          'QZone': shareLink,//qq空间
          'SinaWeibo': shareLink,//新浪微博
          'ShortMessage': shareLink,//短信
          'Link': shareLink//复制链接,及当找不到对应关系时的默认链接
        },
        'imgUrl': 'http://static.paipaiimg.com/fd/h5/xgames/gb/images/cover.png',
        'panelTitle':'每日抽奖分享',//面板标题，传空会取默认：分享获得更多客流
        'finishToast': '1'//分享结束的消息框  0不弹 1弹出
      };
      return args;
    },

    doShare: function () {
      this.connectWebViewJavascriptBridge($.proxy(function (bridge) {
        bridge.callHandler('share', JSON.stringify(this.getShareArgs()), $.proxy(function(response) {
          this.shareCallback(response);
        }, this));
      }, this));
    },

    setShareBtn: function (bridge) {
      bridge.callHandler('setShareButton', JSON.stringify(this.getShareArgs()), $.proxy(function(response) {
        this.shareCallback.call(self, response);
      }, this));
    },

    shareCallback: function (response) {
      if (response && response.event === 'shareSuccess') {
        LotteryUtil.share({
          actId: this.conf.actId
        }, $.proxy(function (ret) {
          if(ret && (ret.code !== undefined)){
            this.checkValidate(true);
          } else {
            setTimeout(function () {
              new Toast('网络错误，请刷新重试!!', 5000);
            }, 800);
          }
        }, this));
      }
    }

  });

  module.exports = GamesIndex;
});
