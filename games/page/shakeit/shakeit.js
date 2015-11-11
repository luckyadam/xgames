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
