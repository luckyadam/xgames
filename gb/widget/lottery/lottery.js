'use strict';

/**
 * @author p_jdzsjiang
 * @date 2015-11-4
 * @desc 通用抽奖逻辑
 */

PP.define('lottery', function (require, exports, module) {
  var cookie = require('cookie');
  var gCgis = {
    createActive: 'http://act.paipai.com/promotion/active/createActiveInst',//创建实例
    playActive: 'http://act.paipai.com/promotion/active/playActiveInst',//开始抽奖
    shareActive: 'http://act.paipai.com/promotion/active/player/shareActiveInst',//分享或点赞操作
    visitReport: 'http://act.paipai.com/promotion/access/ipInfo',//访问上报
    actionReport: 'http://act.paipai.com/promotion/access/actionInfo'//操作上报
  };

  var gsUin = cookie.get('wg_uin') || cookie.get('p_uin') || cookie.get('uin');
  var gsToken = null;

  var oLotUtil = {
    //其他状态：777未登录，111游戏次数超限，112积分不足
    /**
    * 初始化实例
    **/
    init: function(opt, cb) {
      //console.log('#init#');
      var _opt = $.extend({
        actId: '',
        _active_p: 2,
        g_tk: getToken(),
        g_ty: 'j132',
        _: (new Date()).getTime()
      }, opt),
      me = this;
      $.ajax({
        url: gCgis.createActive,
        data: _opt,
        type: 'GET',
        dataType: 'jsonp',
        timeout: 5000,
        success: function(obj){//返回000/001(活动结束/暂停)，201(创建成功)，211(加载已有)
          console.log('init active ajax success');
          //console.log(obj);
          if(obj){
            if(obj.token){
              gsToken = obj.token;
            }
          }
          cb && cb(obj);
          me.actReport(gCgis.visitReport, _opt.actId);
        },
        error: function(xhr,status,err){
          console.log('init active ajax error');
          cb && cb();
        }
      });
    },
    /**
    * 实例抽奖，play前必须先init获得token
    **/
    play: function(opt, cb) {
      //console.log('#init#');
      var _opt = $.extend({
        actId: '',
        _active_p: 2,
        token: gsToken,
        g_tk: getToken(),
        g_ty: 'j132',
        _: (new Date()).getTime()
      }, opt),
      me = this;
      console.log(_opt);
      $.ajax({
        url: gCgis.playActive,
        data: _opt,
        type: 'GET',
        dataType: 'jsonp',
        timeout: 5000,
        success: function(obj){//返回300、399，300领奖成功
          console.log('play ajax success');
          cb && cb(obj);
        },
        error: function(xhr,status,err){
          console.log('play ajax error');
          cb && cb();
        }
      });
    },
    /**
    * 实例抽奖，play前必须先init获得token
    **/
    share: function(opt, cb) {
      //console.log('#init#');
      var _opt = $.extend({
        actId: '',
        _active_p: 2,
        token: gsToken,
        type: 1,//1分享，2点赞
        g_tk: getToken(),
        g_ty: 'j132',
        _: (new Date()).getTime()
      }, opt),
      me = this;
      console.log(_opt);
      $.ajax({
        url: gCgis.shareActive,
        data: _opt,
        type: 'GET',
        dataType: 'jsonp',
        timeout: 5000,
        success: function(obj){
          console.log('share ajax success');
          cb && cb(obj);
          me.actReport(gCgis.actionReport, _opt.actId);
        },
        error: function(xhr,status,err){
          console.log('share ajax error');
          cb && cb();
        }
      });
    },
    /**
    * 访问或行为上报
    **/
    actReport: function(url, actId){
      $.ajax({
        url: url,
        data: {
          uin: gsUin,
          type: 1,//分享
          actId: actId,
          token: gsToken,
          refer: window.location.href,
          _: (new Date()).getTime()
        },
        dataType: 'jsonp',
        type: 'GET',
        timeout: 5000,
        success: function(obj){
          console.log(obj);
        },
        error: function(xhr,status,err){}
      });
    }
  };

  /**
  * 获取token
  **/
  function getToken(){
    //console.log('#getToken#');
    var skey = cookie.get('skey'),
        token;
    token = skey==null?'':time33(skey);
    //console.log('#getToken fin#=>'+token);
    return token;
  }

  /**
  * time33哈希算法
  **/
  function time33(str){
    str = (str != undefined) ? str : '';
    for(var i = 0, len = str.length,hash = 5381; i < len; ++i){
      hash += (hash << 5) + str.charAt(i).charCodeAt();
    }
    return hash & 0x7fffffff;
  }

  /**
  * 模块输出
  **/
  module.exports = oLotUtil;
});
