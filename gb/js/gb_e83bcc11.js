'use strict';

/**
 * @author luckyadam
 * @date 2015-10-27
 * @desc 音频播放器
 */

PP.define('gb/widget/audio_player', function (require, exports, module) {

  var AudioPlayer = _.Class.extend({

    statics: {

      PAUSED: 0,
      PLAYING: 1
    },

    construct: function (opts) {
      this.conf = $.extend({
        src: null,
        loop: 'loop',
        type: 'audio/mpeg',
        autoplay: true,
        preload: true
      }, opts);

      this.init();
    },

    // 初始化音频组件
    init: function () {
      var conf = this.conf;
      if (!this.audio) {
        this.audio = new Audio();
      }
      if (conf.src) {
        this.audio.src = conf.src;
      }
      this.audio.loop = conf.loop;
      this.audio.type = conf.type;
      this.audio.autoplay = conf.autoplay;
      this.audio.preload = conf.preload;
      if (this.audio.autoplay) {
        this.status = AudioPlayer.PLAYING;
      } else {
        this.status = AudioPlayer.PAUSED;
      }
    },

    // 切换音频播放
    togglePlay: function () {
      if (this.status === AudioPlayer.PLAYING) {
        this.pause();
      } else {
        this.play();
      }
    },

    // 播放音频
    play: function () {
      this.status = AudioPlayer.PLAYING;
      this.audio && this.audio.pause();
      this.audio && this.audio.play();
    },

    // 暂停播放
    pause: function () {
      this.status = AudioPlayer.PAUSED;
      this.audio && this.audio.pause();
    },

    stop: function () {
      this.status = AudioPlayer.PAUSED;
      this.audio.currentTime = 0;
      this.pause();
    },

    // 设置新的路径，重新开始播放
    setSrc: function (src, type) {
      if (this.audio) {
        this.stop();
        this.audio.src = src;
        if (type) {
          this.audio.type = type
        }
      }
    },

    getStatus: function () {
      return this.status;
    },

    destroy: function () {
      this.audio.pause();
      this.audio = null;
    }

  });

  module.exports = AudioPlayer;
});

'use strict';

/**
 * @author luckyadam
 * @date 2015-10-28
 * @desc 左上角播放控制器
 */

PP.define('gb/widget/top_player', function (require, exports, module) {

  var AudioPlayer = require('gb/widget/audio_player');

  var TopPlayer = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null,
        src: null
      }, opts);
      if (this.conf.src === null) {
        return;
      }
      this.init();
    },

    init: function () {
      this.player = new AudioPlayer({
        src: this.conf.src
      });
      this.setStyle();
      this.initEvent();
    },

    setStyle: function () {
      var $btn = $('.top_player_btn', this.conf.$el);
      if (this.player.getStatus() === AudioPlayer.PLAYING) {
        $btn.removeClass('off').addClass('on');
      } else {
        $btn.removeClass('on').addClass('off');
      }
    },

    initEvent: function () {
      this.conf.$el.on('touchend', '.top_player_btn', $.proxy(this.togglePlay, this));
    },

    togglePlay: function () {
      this.player.togglePlay();
      this.conf.$el.toggleClass('stop');
      this.setStyle();
    }
  });

  module.exports = TopPlayer;
});

'use strict';

/**
 * @author luckyadam
 * @date 2015-10-29
 * @desc 倒计时器
 */

PP.define('gb/widget/countdown', function (require, exports, module) {
  var Countdown = _.Class.extend({
    statics: {
      COUNTING: 0,
      PAUSED: 1
    },
    construct: function (opts) {
      this.conf = $.extend({
        start: 15,
        end: 0,
        $el: null
      }, opts);
      this.init();
    },

    init: function () {
      var conf = this.conf;
      var $el = conf.$el;
      this.$timeNum = $el.find('.countdown_num');
      this.$pieLeft = $el.find('.countdown_bg_left');
      this.$pieRight = $el.find('.countdown_bg_right');
      this.$timeNum.text(conf.start);
      this.rotationAngle = 0;
      this.originTime = conf.start;
      this.totalTime = conf.start * 10;
      if (conf.start < 10) {
        conf.start = '0' + conf.start;
      }
      this.countMs = 10;
      this.countCircle = 0;
      this.timer = null;
      this.listenEvent();
    },

    listenEvent: function () {
      _.eventCenter.on('gb_widget_countdown:start', $.proxy(this.start, this));
      _.eventCenter.on('gb_widget_countdown:pause', $.proxy(this.pause, this));
      _.eventCenter.on('gb_widget_countdown:reset', $.proxy(this.reset, this));
    },

    start: function () {
      this.status = Countdown.COUNTING;
      var conf = this.conf;
      setTimeout($.proxy(function count () {
        this.totalTime -= 1;
        if (this.totalTime < 0) {
          this.$timeNum.text('00');
          clearTimeout(this.timer);
          _.eventCenter.trigger('gb_widget_countdown:timeisup');
          return;
        } else {
          if (this.totalTime >= 0 && this.countMs > 0) {
            this.countMs --;
          }

          if (this.countMs === 0 && conf.start > 0) {
            this.countMs = 10;
            conf.start --;
            if (conf.start < 10) {
              conf.start = '0' + conf.start;
            }
            _.eventCenter.trigger('gb_widget_countdown:timedown', parseInt(conf.start, 10));
          }
          this.$timeNum.text(conf.start);
          this.rotationAngle = this.rotationAngle + 360 / (this.originTime * 10);
          this.countCircle += 1;
          if(this.countCircle <= (this.originTime / 2 * 10)){
            this.$pieLeft.css('-webkit-transform', 'rotate(' + this.rotationAngle + 'deg)');
            this.$pieLeft.css('transform', 'rotate(' + this.rotationAngle + 'deg)');
          } else {
            this.$pieRight.css({
              'background-color': '#b1ffec',
              '-webkit-transform': 'rotate(' + this.rotationAngle + 'deg)',
              'transform': 'rotate(' + this.rotationAngle + 'deg)'
            });
          }
        }
        this.timer = setTimeout($.proxy(count, this), 100);
      }, this), 100);
    },

    pause: function () {
      this.status = Countdown.PAUSED
      clearTimeout(this.timer);
    },

    reset: function () {
      var conf = this.conf;
      clearTimeout(this.timer);
      conf.start = this.originTime;
      this.$timeNum.text(conf.start);
      this.rotationAngle = 0;
      this.totalTime = conf.start * 10;
      if (conf.start < 10) {
        conf.start = '0' + conf.start;
      }
      this.countMs = 10;
      this.countCircle = 0;
      this.timer = null;
      this.$pieLeft.css('-webkit-transform', 'rotate(0deg)');
      this.$pieLeft.css('transform', 'rotate(0deg)');
      this.$pieRight.css({
        'background-color': '#fff',
        '-webkit-transform': 'rotate(0deg)',
        'transform': 'rotate(0deg)'
      });
    }
  });

  module.exports = Countdown;
});

'use strict';

/**
 * @author luckyadam
 * @date 2015-10-30
 * @desc 大型倒计时器
 */

PP.define('gb/widget/countdown2', function (require, exports, module) {

  var AudioPlayer = require('gb/widget/audio_player');
  var Countdown2 = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null,
        bgm: null
      }, opts);

      this.init();
    },

    init: function () {
      this.originTime = 3;
      this.startTime = this.originTime;
      this.totalTime = this.originTime * 10;
      this.timer = null;
      this.countMs = 10;
      this.countChange = 0;
      this.audio = new AudioPlayer({
        src: this.conf.bgm,
        autoplay: false,
        loop: false
      });
      this.listenEvent();
    },

    listenEvent: function () {
      _.eventCenter.on('gb_widget_countdown2:start', $.proxy(this.start, this));
      _.eventCenter.on('gb_widget_countdown2:pause', $.proxy(this.pause, this));
      _.eventCenter.on('gb_widget_countdown2:reset', $.proxy(this.reset, this));
    },

    start: function () {
      var changePer = 350 / 40 * 640 / 750;
      this.audio.play();
      setTimeout($.proxy(function count () {
        this.totalTime -= 1;
        if (this.totalTime < 0) {
          this.conf.$el.find('.countdown2_txt').css({
            'background-position': '0 -' + changePer * this.countChange + 'rem'
          });
          clearTimeout(this.timer);
          this.countMs = 10;
          this.countChange = 0;
          _.eventCenter.trigger('gb_widget_countdown2:timeisup');
          return;
        } else {
          if (this.totalTime >= 0 && this.countMs > 0) {
            this.countMs --;
          }

          if (this.countMs === 0 && this.startTime > 0) {
            this.countMs = 10;
            this.startTime--;
            this.countChange++;
            this.conf.$el.find('.countdown2_txt').css({
              'background-position': '0 -' + changePer * this.countChange + 'rem'
            });
            this.audio.stop();
            this.audio.play();
          }
        }
        this.timer = setTimeout($.proxy(count, this), 100);
      }, this), 100);
    },

    pause: function () {
      clearTimeout(this.timer);
    },

    reset: function () {
      clearTimeout(this.timer);
      this.originTime = 3;
      this.startTime = this.originTime;
      this.totalTime = this.originTime * 10;
      this.timer = null;
      this.conf.$el.find('.countdown2_txt').css({
        'background-position': '0 0'
      });
    }
  });

  module.exports = Countdown2;
});

'use strict';

/**
 * @author p_jdzsjiang
 * @date 2015-11-4
 * @desc 通用抽奖逻辑
 */

PP.define('gb/widget/lottery', function (require, exports, module) {
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
      if (!this.$win) {
        var html = '<div class="mod_popup win">';
        html += '<div class="mod_popup_body mod_popup_imgs">';
        html += '<div class="mod_popup_xiu mod_popup_imgs"></div>';
        html += '<div class="mod_popup_yqsex mod_popup_imgs"></div>';
        html += '<div class="mod_popup_main mod_popup_win mod_popup_imgs">';
        html += '<div class="mod_popup_txt"><b>' + value + '</b>元的' + name + '</div>';
        if (tip) {
          html += '<div class="mod_popup_tip"><span>限<b>' + tip + '</b>使用</span></div>';
        } else {
          html += '<div class="mod_popup_tip"><span>全平台通用</span></div>';
        }
        html += '</div>';
        html += '<div class="mod_popup_btn"><a href="javascript:;" class="mod_popup_imgs"><span>到' + (tip ? '店铺' : '首页') + '找好货</span></a></div>';
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

    lose: function (replay, cb) {
      if (!this.$lose) {
        var loseTip = '';
        if (replay) { // 重新再来
          loseTip = '没有抓到娃娃嘞，运气真差~';
        } else {
          loseTip = '什么？没有中！？';
        }
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

'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5
 * @desc loading
 */

PP.define('gb/widget/loading', function (require, exports, module) {
  var Loading = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        container: $('body')
      }, this);
      this.init();
    },

    init: function () {
      var html = '';
      if (!this.$loading) {
        html = '<div class="mod_loading">';
        html += '<div class="mod_loading_inner">';
        html += '<i class="mod_loading_icon"></i> 正在加载，请稍候…';
        html += '</div>';
        html += '</div>';
        this.$loading = $(html).appendTo(this.conf.container).hide();
      }
    },

    show: function () {
      this.$loading && this.$loading.show();
    },

    hide: function () {
      this.$loading && this.$loading.hide();
    },

    destroy: function () {
      this.$loading && this.$loading.remove();
    }
  });

  module.exports = Loading;
});
