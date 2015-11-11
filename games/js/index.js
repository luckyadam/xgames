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
    '/xgames/games/images/crane_bg_57cda176.png',
    '/xgames/games/images/crane_catch_36719e30.wav',
    '/xgames/games/images/crane_catch_up_b7749698.mp3',
    '/xgames/games/images/crane_drop_cbb07f00.mp3',
    '/xgames/games/images/crane_press_btn_88008cba.mp3',
    '/xgames/games/images/get_gift_cba184d0.mp3',
    '/xgames/games/images/index_bg_db8dbec5.png',
    '/xgames/games/images/little_p_3dca8a3f.png',
    '/xgames/games/images/MFLiHei_Noncommercial-Regular_03bdd4c7.ttf',
    '/xgames/games/images/page_btn_imgs_7bec1422.png',
    '/xgames/games/images/shake_bg_7e689f64.png',
    '/xgames/games/images/shake_bg_4462b638.wav',
    '/xgames/games/images/shake_fart_83b2670a.mp3',
    '/xgames/games/images/shake_little_p_ec45cc76.mp3',
    '/xgames/games/images/shake_win_6f557776.mp3',
    '/xgames/games/images/slot_bg_8ee639a4.png',
    '/xgames/games/images/slot_elements1_ab95bcc9.png',
    '/xgames/games/images/slot_end_e6c674d4.wav',
    '/xgames/games/images/slot_light_off_bc1b486e.png',
    '/xgames/games/images/slot_machine_bg_fed4195a.png',
    '/xgames/games/images/slot_scroll_705b0d83.mp3',
    '/xgames/games/images/slot_tip_bg_08b8329e.png',
    '/xgames/games/images/ss1_c9883634.png',
    '/xgames/games/images/ss2_195fbe65.png',
    '/xgames/games/images/time_over_99d85b03.mp3',
    '/xgames/gb/images/bgm_fd54f6f4.mp3',
    '/xgames/gb/images/countdown_15090e1d.png',
    '/xgames/gb/images/countdown2_6d2a51c1.png',
    '/xgames/gb/images/lh_f74f79cd.ttf',
    '/xgames/gb/images/top_player_f9d76f2e.png',
    '/xgames/gb/images/lottery_dialog_imgs_c12f15ec.png',
    '/xgames/gb/images/popup_yellow_1ec8d671.png'
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
        this.setShareBtn();

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
      var shareLink = 'http://luckyadam.github.io/xgames/games/share.html';
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

'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5
 * @desc 首页头部
 */

'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5
 * @desc 首页重要模块
 */

PP.define('games/widget/index_main', function (require, exports, module) {
  var IndexMain = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);
      this.init();
    },

    init: function () {
      this.getElements();
      this.listenEvent();
    },

    getElements: function () {
      var $el = this.conf.$el;
      this.$tipMsg = $el.find('.main_tip_msg');
      this.$cards = $el.find('.game_carousel_card');
      this.$tipMsg = $el.find('.main_tip_msg');
      this.$gameBtnMsg = $el.find('.game_btn_msg');
    },

    listenEvent: function () {
      _.eventCenter.on('games_index:init', $.proxy(this.setInitState, this));
    },

    setInitState: function (leftTimes, leftShareTimes, isShareBack) {
      this.leftTimes = leftTimes;
      this.leftShareTimes = leftTimes;
      if (leftTimes > 0) {
        if (isShareBack) {
          this.$tipMsg.html('太棒了！赢得<span class="highlight">' + leftTimes + '</span>次机会！').show();
          this.$cards.removeClass('sfight');
        } else {
          this.$tipMsg.html('今日还剩<span class="highlight">' + leftTimes + '</span>次机会').show();
        }
        this.$gameBtnMsg.off('click').text('进入游戏');
        _.eventCenter.on('games_widget_game_carousel:change', $.proxy(this.onGameShowChange, this));
      } else {
        if (leftShareTimes > 0) {
          this.$cards.addClass('sfight');
          this.$gameBtnMsg.text('分享再玩一次').attr('href', 'javascript:;').off('click').on('click', function () {
            _.eventCenter.trigger('games_index_share:emit');
          });
        } else {
          this.$cards.addClass('tfight');
          this.$gameBtnMsg.off('click').hide();
        }
        this.$tipMsg.hide();
      }
    },

    onGameShowChange: function (index) {
      if (this.leftTimes > 0) {
        switch (index) {
          case 0:
            this.$gameBtnMsg.attr('href', 'crane.html');
            break;
          case 1:
            this.$gameBtnMsg.attr('href', 'shakeit.html');
            break;
          case 2:
            this.$gameBtnMsg.attr('href', 'slot_machine.html');
            break;
        }
      }
    }
  });

  module.exports = IndexMain;
});

'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5
 * @desc 次数提示
 */

'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5 changed
 * @desc 轮播
 */

PP.define('games/widget/game_carousel', function (require, exports, module) {
  var Carousel = _.Class.extend({
    canSlide: true,
    construct: function (opts) {
      this.conf = $.extend({
        wrapper: $('body'),
        isAuto: false
      }, opts);

      this.init();
    },

    init: function () {
      var wrapper = this.conf.wrapper;
      this.wrapperWidth = this.conf.wrapper.width();
      this.initial = { x:5, y:5, sx:0, sy:0, ex:0, ey:0 };
      this.$before = wrapper.find('.before');
      this.$prev = wrapper.find('.prev');
      this.$next = wrapper.find('.next');
      this.initEvent();
      if (this.conf.isAuto) {
        this.auto();
      }
    },

    initEvent: function () {
      this.conf.wrapper.on('touchstart', $.proxy(this.onStart, this))
        .on('touchmove', $.proxy(this.onMove, this))
        .on('touchend', $.proxy(this.onEnd, this));
    },

    classArr: ['prev', 'before', 'next'],
    classIdx: 1,
    changeIndex: function(step) {
      var prev = this.classIdx;
      this.classIdx = this.classIdx+step;
      if(this.classIdx > 2) {
        this.classIdx = 0;
      }
      if(this.classIdx < 0) {
        this.classIdx = 2;
      }
      _.eventCenter.trigger('games_widget_game_carousel:change', this.classIdx);
      this.conf.wrapper.removeClass('prev').removeClass('before').removeClass('next').addClass(this.classArr[this.classIdx]);
    },

    onStart: function (event) {
      var initial = this.initial;
      var wrapper = this.conf.wrapper;
      if (this.wrapperWidth === 0) {
        this.wrapperWidth = wrapper.width();
      }
      initial.sx = event.targetTouches[0].pageX;
      initial.sy = event.targetTouches[0].pageY;
      initial.ex = initial.sx;
      initial.ey = initial.sy;
      if (this.conf.isAuto) {
        clearInterval(this.autoInterval);
      }
    },

    onMove: function (event) {
      if(this.canSlide) {
        this.canSlide = false;
        var initial = this.initial;
        initial.ex = event.targetTouches[0].pageX;
        initial.ey = event.targetTouches[0].pageY;
        setTimeout(function() {
          this.canSlide = true;
        }.bind(this),200);
      }
    },

    onEnd: function (event) {
      var initial = this.initial;
      var changeX = initial.sx - initial.ex;
      var changeY = initial.sy - initial.ey;
      if (Math.abs(changeY) < Math.abs(changeX)) {
        event.preventDefault();
        if(changeX > 0) {
          this.changeIndex(1);
        } else {
          this.changeIndex(-1);
        }
      }

      if (this.conf.isAuto) {
        clearInterval(this.autoInterval);
        this.auto();
      }
    },

    auto: function () {
      this.autoInterval = setInterval($.proxy(function() {
        this.changeIndex(1);
      }, this), 3000);
    }
  });

  module.exports = Carousel;
});

'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5
 * @desc 游戏按钮
 */

'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5
 * @desc 查看优惠券
 */

'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5
 * @desc 获奖名单
 */

PP.define('games/widget/winner_list', function (require, exports,module) {
  function animate(opts) {

    var start = new Date();

    var id = setInterval(function() {
      var timePassed = new Date() - start;
      var progress = timePassed / opts.duration;

      if (progress > 1) {
        progress = 1;
      }

      var delta = opts.delta(progress);
      opts.step(delta);

      if (progress == 1) {
        clearInterval(id);
      }
    }, opts.delay || 10);

    return id;

  }
  function rem (px) {
    return Math.ceil((px / 40 * 640 / 750) * 10000) / 10000;
  }

  var _tool = {
    support3d: ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()),
    setTranslateY: function (y) {
        return this.support3d ? 'translate3d(0, ' + y + ', 0)' : 'translate(0, ' + y + ')';
    },
    setTranslateX: function (x) {
        return this.support3d ? 'translate3d(' + x + ', 0, 0)' : 'translate(' + x + ', 0)';
    }
  };
  var WinnerList = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);

      this.init();
    },

    init: function () {
      this.$ul = this.conf.$el.find('.winner_list_cont_list');
      this.getWinnerList();
    },

    getWinnerList: function (cb) {
      var self = this;
      $.ajax({
        url: 'http://static.paipaiimg.com/js/data/ppms.page17474.js',
        data: {},
        type: 'GET',
        dataType: 'jsonp',
        timeout: 5000,
        jsonpCallback: 'showPageData17474',
        success: function(obj){
          if(obj && obj.data){
            var data = obj.data;
            if (typeof data.sort === 'function') {
              var listhtml = '';
              for (var i = 0; i < data.length; i ++) {
                var li = '<li><div>' + data[i].num + '</div><div>抽中' + data[i].award + '</div></li>';
                listhtml += li;
              }
              for (var i = 0; i < data.length; i ++) {
                var li = '<li><div>' + data[i].num + '</div><div>抽中' + data[i].award + '</div></li>';
                listhtml += li;
              }
              self.$ul.append(listhtml);
              self.ulHeight = self.$ul.height();
              self.autoScroll();
            }
          }
        },
        error: function(xhr,status,err){
          cb && cb();
        }
      });
    },

    autoScroll: function () {
      var scrollHeight = 0;
      var to = this.ulHeight;
      if (to === 0) {
        to = this.ulHeight = this.$ul.height();
      }
      animate({
        delay: 10,
        duration: 6000,
        delta: function (p) {
          return p;
        },
        step: $.proxy(function (progress) {
          this.$ul.css({
            '-webkit-transform': _tool.setTranslateY(rem(-to * progress) + 'rem'),
            'transform': _tool.setTranslateY(rem(-to * progress) + 'rem')
          });

          if (progress === 1) {
            this.$ul.css({
              '-webkit-transform': _tool.setTranslateY(0),
              'transform': _tool.setTranslateY(0)
            });
            this.autoScroll();
          }
        }, this)
      });
    }
  });

  module.exports = WinnerList;
});

'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5
 * @desc 规则
 */
