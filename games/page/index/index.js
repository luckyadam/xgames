'use strict';

/**
 * @author luckyadam
 * @date 2015-11-3
 * @desc 首页
 */

PP.define('games/page/index', function (require, exports, module) {

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
      // var isPaiSns = Util.isPaiSns();
      // if (!isPaiSns) {
      //   // 跳分享页
      //   return;
      // }
      this.connectWebViewJavascriptBridge($.proxy(function(bridge) {
        bridge.init(function(message, responseCallback) {
          if (responseCallback) {
            responseCallback("0");
          }
        });
        this.setShareBtn();

      }, this));
      // 检测登录
      // if (LoginUtil.checkLogin()) {
        this.getElements();
        this.initEvent();
        this.listenEvent();
        this.checkValidate(false);
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
      var args={
        'title': '每日抽奖',
        'msg': '超级大奖天天领，就等你来拿哦',
        'links': {
          'Wechat': 'http://b.paipai.com/abc',//微信
          'WechatMoments': 'http://b.paipai.com/abc',//朋友圈
          'QQ': 'http://b.paipai.com/abc',//qq
          'QZone': 'http://b.paipai.com/abc',//qq空间
          'SinaWeibo': 'http://b.paipai.com/abc',//新浪微博
          'ShortMessage': 'http://b.paipai.com/abc',//短信
          'Link': 'http://b.paipai.com/abc'//复制链接,及当找不到对应关系时的默认链接
        },
        'imgUrl': 'http://img6.paipaiimg.com/item-54588B34-4EBD121D00000000000000000BEC3CC2.0.200x200.jpg',
        'panelTitle':'每日抽奖分享',//面板标题，传空会取默认：分享获得更多客流
        'finishToast': '1'//分享结束的消息框  0不弹 1弹出
      };
      return args;
    },

    doShare: function () {
      if ('WebViewJavascriptBridge' in window) {
        WebViewJavascriptBridge.callHandler('share', JSON.stringify(this.getShareArgs()), $.proxy(function(response) {
          this.shareCallback(response);
        }, this));
      }
    },

    setShareBtn: function () {
      if ('WebViewJavascriptBridge' in window) {
        var self = this;
        WebViewJavascriptBridge.callHandler('setShareButton', JSON.stringify(self.getShareArgs()), function(response) {
          self.shareCallback.call(self, response);
        });
      }
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
