'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5
 * @desc 登录组件
 */

PP.define('gb/widget/login', function(require, exports, module) {
  var mCookie = require('cookie');
  var mUtil = require('util');
  var Uri = require('uri');
  var mUrl = new Uri(window.location.href);
  var gSid = mUrl.getQueryParamValue('sid')?mUrl.getQueryParamValue('sid'):document.referrer.match(/sid=([^&]*)/i)?document.referrer.match(/sid=([^&]*)/i)[1]:mCookie.get('sid')?mCookie.get('sid'):'';

  /**
  * 检验登录态
  **/
  var checkLogin = function() {
    var uin = mCookie.get('uin') ? parseInt((mCookie.get('uin') + '').replace('o',''),10) : '',
        wgUin = mCookie.get('wg_uin') ? parseInt((mCookie.get('wg_uin') + '').replace('o',''),10) : '',
        skey = mCookie.get('skey') ? (mCookie.get('skey') + '') : '',
        wgSkey = mCookie.get('wg_skey') ? (mCookie.get('skey') + '') : '';

    //return (skey && skey.toString().replace(/^\s*|\s*$/g,'') != '' && wgSkey && skey == wgSkey) ? true : false;//版本1，校验skey及skey一致性
    //return (skey && skey.toString().replace(/^\s*|\s*$/g,'') != '' && wgSkey) ? true : false;//版本2，取消skey/wgSkey一致性校验
    return (uin && skey && uin == wgUin && skey == wgSkey) ? true : false;//版本3，校验uin和skey一致性
  };

  /**
  * 检验登录态，未登录则登录跳转
  **/
  var checkAndRedirect = function(rurl) {
    if (!checkLogin()) {
      gotoLogin(rurl);
    }
  };

  /**
  * 登录跳转
  **/
  var gotoLogin = function(rurl) {
    var isWX = mUtil.isWX(),
        isMQQ = mUtil.isMQQ,
        isPaiSns = mUtil.isPaiSns(),
        jumpUrl = rurl||window.location.href,
        reloginKey = '_reloginTimes',
        reloginCache = parseInt(localStorage.getItem(reloginKey),10),
        reloginTimes = (!isNaN(reloginCache) && reloginCache > 0) ? reloginCache : 0;//最多刷新页面重试2次，最多耗时2秒
    var _goJump = function(){
      //http://mqq.oa.com/api/#data.getUserInfo
      mqq.data.getUserInfo(function(obj){//getUserInfo两次调用间需延时1秒
        if(mCookie.get('uin') && mCookie.get('skey')){
          localStorage.setItem(reloginKey,0);//计数清零
          window.location.href = 'http://b.paipai.com/mlogin/tws64/m/qqv1/Login?rurl=' + encodeURIComponent(jumpUrl);
        } else if(reloginTimes < 3){//清空qq应用数据后首次访问无uin和skey的cookie值
          localStorage.setItem(reloginKey,reloginTimes+1);
          if(obj&&obj.uin&&obj.skey){//回调含值，设cookie值并跳转
            mCookie.set('uin',obj.uin, undefined, "/", ".paipai.com");
            mCookie.set('skey',obj.skey, undefined, "/", ".paipai.com");
            localStorage.setItem(reloginKey,0);//计数清零
            window.setTimeout(function(){
              window.location.href = 'http://b.paipai.com/mlogin/tws64/m/qqv1/Login?rurl=' + encodeURIComponent(jumpUrl);
            },10);
          } else {
            window.setTimeout(function(){
              window.location.href = jumpUrl;
            },1100);//避免过频调用，1.1s刷新页面
          }
        } else {//失败，关闭窗口
          mqq.ui.popBack();
        }
      });
    };
    if (isWX) {
      window.location.href = 'http://b.paipai.com/mlogin/tws64/m/wxv2/Login?appid=1&rurl=' + encodeURIComponent(jumpUrl);
    } else if(isPaiSns){
      window.location.href = 'paipai://jump/login';
    } else {
      window.location.href = 'http://b.paipai.com/mlogin/tws64/m/h5v1/cpLogin?rurl=' + encodeURIComponent(jumpUrl) + '&sid=' + gSid + '&uk=' + mCookie.get('uk');
    }
  };

  module.exports = {
    checkAndRedirect: checkAndRedirect,
    checkLogin: checkLogin,
    gotoLogin: gotoLogin
  };
});
