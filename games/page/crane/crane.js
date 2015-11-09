'use strict';

/**
 * @author luckyadam
 * @date 2015-11-4
 * @desc 抓一抓
 */

PP.define('games/page/crane', function (require, exports, module) {
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
