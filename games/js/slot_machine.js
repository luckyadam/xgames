'use strict';

/**
 * @author luckyadam
 * @date 2015-10-27
 * @desc 老虎机
 */

PP.define('games/page/slot_machine', function (require, exports,module) {
  var LoginUtil = require('gb/widget/login');
  var LotteryUtil = require('gb/widget/lottery');
  var Toast = require('toast');
  var SlotMachine = _.Class.extend({
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
      _.eventCenter.on('games_slot:init', $.proxy(this.onAfterCheck, this));
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
              _.eventCenter.trigger('games_slot:init', 0, 0, isShareBack);
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
              _.eventCenter.trigger('games_slot:init', 0, leftShareTimes, isShareBack);
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
              _.eventCenter.trigger('games_slot:init', leftTimes, leftShareTimes, isShareBack);
              break;
            case '777':
              _.eventCenter.trigger('games_slot:init', 0, 0, isShareBack);
              setTimeout(function () {
                new Toast('请先登录!', 5000);
              }, 800);
              LoginUtil.gotoLogin();
              break;
            default :
              _.eventCenter.trigger('games_slot:init', 0, 0, isShareBack);
              setTimeout(function () {
                new Toast('网络错误，请刷新重试!!', 5000);
              }, 800);
          }
        } else {
          _.eventCenter.trigger('games_slot:init', 0, 0, isShareBack);
          setTimeout(function () {
            new Toast('网络错误，请刷新重试!!', 5000);
          }, 800);
        }
      }, this));
    },

    onAfterCheck: function (leftTimes, leftShareTimes, isShareBack) {
      if (leftTimes > 0) {
        setTimeout($.proxy(function () {
          _.eventCenter.trigger('games_slot:start', this.conf.actId, this.token);
        }, this), 2000);
      }
    }
  });

  module.exports = SlotMachine;
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
 * @date 2015-10-29
 * @desc 玩法提示
 */

PP.define('games/widget/tip', function (require, exports, module) {

  var Tip = _.Class.extend({
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
      _.eventCenter.on('games_slot:start', $.proxy(this.hide, this));
    },

    hide: function () {
      this.conf.$el.addClass('out');
    }
  });

  module.exports = Tip;
});

'use strict';

/**
 * @author luckyadam
 * @date 2015-11-8
 * @desc 老虎机
 */

PP.define('games/widget/slot_machine', function (require, exports,module) {
  var AudioPlayer = require('gb/widget/audio_player');
  var Toast = require('toast');
  var lotteryUtil = require('gb/widget/lottery');
  var LotteryDialog = require('gb/widget/lottery_dialog');

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

  function elastic(progress) {
    return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * 1.5 / 3 * progress)
  }
  function linear(progress) {
    return progress
  }
  function quad(progress) {
    return Math.pow(progress, 2)
  }
  function quint(progress) {
    return Math.pow(progress, 5)
  }
  function circ(progress) {
    return 1 - Math.sin(Math.acos(progress))
  }
  function back(progress) {
    return Math.pow(progress, 2) * ((1.5 + 1) * progress - 1.5)
  }
  function bounce(progress) {
    for (var a = 0,
    b = 1,
    result; 1; a += b, b /= 2) {
      if (progress >= (7 - 4 * a) / 11) {
        return - Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
      }
    }
  }
  function makeEaseInOut(delta) {
    return function(progress) {
      if (progress < .5) return delta(2 * progress) / 2
      else return (2 - delta(2 * (1 - progress))) / 2
    }
  }
  function makeEaseOut(delta) {
    return function(progress) {
      return 1 - delta(1 - progress)
    }
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

  var SlotMachine = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);

      this.init();
    },

    init: function () {
      this.getElements();
      this.listenEvent();
      this.isPlayed = false;
      this.lotteryDialog = new LotteryDialog();
      this.player = new AudioPlayer({
        autoplay: false,
        loop: false
      });
      this.btnPlayer = new AudioPlayer({
        autoplay: false,
        loop: false
      });
    },

    getElements: function () {
      var $el = this.conf.$el;
      this.$trackWrapperLeft = $el.find('.slot_machine_left .slot_machine_track_wrapper');
      this.$trackWrapperMiddle = $el.find('.slot_machine_middle .slot_machine_track_wrapper');
      this.$trackWrapperRight = $el.find('.slot_machine_right .slot_machine_track_wrapper');
      $el.find('.slot_machine_main').addClass('hide');
    },

    initEvent: function () {
      var self = this;
      this.conf.$el.on('click', '.slot_machine_go .page_btn1', function () {
        self.btnPlayer.setSrc('/xgames/games/images/crane_press_btn_88008cba.mp3');
        self.btnPlayer.play();
        var $this = $(this);
        $('.slot_machine_go .page_btn3').show();
        _.eventCenter.trigger('gb_widget_countdown:start');
        $this.hide();
        setTimeout(function () {
          $('.slot_machine_go .page_btn3').hide();
          $('.slot_machine_go .page_btn2').show();
          $('.slot_machine_stop .page_btn1').show();
          $('.slot_machine_stop .page_btn2').hide();
          self.scroll();
        }, 200);

      }).on('click', '.slot_machine_stop .page_btn1', $.proxy(this.stop, this));
    },

    listenEvent: function () {
      var self = this;
      _.eventCenter.on('slot_machine:stop', function (left, middle, right) {
        setTimeout(function () {
          clearInterval(self.leftInterval);
          self.scrollLeftTrack(1, left, 1500, makeEaseOut(back), false);
          setTimeout(function () {
            clearInterval(self.middleInterval);
            self.scrollMiddleTrack(1, middle, 1500, makeEaseOut(back), false);
            setTimeout(function () {
              clearInterval(self.rightInterval);
              self.scrollRightTrack(1, right, 1500, makeEaseOut(back), false, function () {
                if (self.isWinner === 'limit') {
                  $('.slot_machine_go .page_btn6').show();
                  $('.slot_machine_stop .page_btn6').show();
                  _.eventCenter.trigger('gb_widget_countdown:stop');
                  return;
                }
                if (self.isWinner === true) {
                  $('.slot_machine_go .page_btn5').show();
                  $('.slot_machine_stop .page_btn5').show();
                  var gift = self.gift;
                  self.lotteryDialog.win(gift.value, gift.name, gift.tip, gift.url);
                  self.player.setSrc('/xgames/games/images/get_gift_cba184d0.mp3', 'audio/mpeg');
                  self.player.play();
                } else {
                  $('.slot_machine_go .page_btn6').show();
                  $('.slot_machine_stop .page_btn6').show();
                  _.eventCenter.trigger('gb_widget_countdown:stop');
                  self.lotteryDialog.lose(true, function () {
                    self.isPlayed = false;
                    self.conf.$el.find('.countdown2').show();
                    self.conf.$el.find('.slot_machine_main').addClass('hide');
                    self.conf.$el.off('click');
                    $($('.slot_machine_go .page_btn').hide().get(0)).show();
                    $($('.slot_machine_stop .page_btn').hide().get(1)).show();
                    _.eventCenter.trigger('gb_widget_countdown:reset');
                    _.eventCenter.trigger('gb_widget_countdown2:reset');
                    setTimeout(function () {
                      _.eventCenter.trigger('gb_widget_countdown2:start');
                    }, 600);
                  });
                }
              });
            }, 1500);
          }, 1500);
        }, 1500);
      });

      _.eventCenter.on('gb_widget_countdown2:timeisup', function () {
        setTimeout(function () {
          self.conf.$el.find('.slot_machine_main').removeClass('hide');
          self.conf.$el.find('.countdown2').hide();
          self.initEvent();
        }, 1000);
      });

      _.eventCenter.on('games_slot:start', $.proxy(this.show, this));

      _.eventCenter.on('gb_widget_countdown:timeisup', $.proxy(this.stop, this));
    },

    checkGift: function (cb) {
      lotteryUtil.play({
        token: this.token,
        actId: this.actId
      }, $.proxy(function (ret) {
        this.isWinner = 'unknow';
        if (!ret) {
          cb && cb();
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
        cb && cb();
      }, this));
    },

    show: function (actId, token) {
      this.actId = actId;
      this.token = token;
      this.conf.$el.show().addClass('fadeIn');
      setTimeout(function () {
        _.eventCenter.trigger('gb_widget_countdown2:start');
      }, 500);
    },

    scroll: function () {
      // this.player.setSrc('/xgames/games/images/slot_scroll_705b0d83.mp3');
      // this.player.play();
      this.scrollLeftTrack(0, -1020, 1500, function (p) {return p;}, true);
      setTimeout($.proxy(function () {
        this.scrollMiddleTrack(0, 1020, 1500, function (p) {return p;}, true);
        setTimeout($.proxy(function () {
          this.scrollRightTrack(0, -1020, 1500, function (p) {return p;}, true);
        }, this), 1000);
      }, this), 1000);
    },

    stop: function () {
      // this.player.stop();
      if (!this.isPlayed) {
        this.isPlayed = true;
        this.btnPlayer.setSrc('/xgames/games/images/crane_press_btn_88008cba.mp3');
        this.btnPlayer.play();
        _.eventCenter.trigger('gb_widget_countdown:pause');
        $('.slot_machine_stop .page_btn1').hide();
        $('.slot_machine_stop .page_btn3').show();
        setTimeout(function () {
          $('.slot_machine_stop .page_btn3').hide();
          $('.slot_machine_stop .page_btn2').show();
        }, 200);
        this.checkGift($.proxy(function () {
          var leftRandomNum = Math.floor(Math.random() * 5 + 1);
          var rightRandomNum = Math.floor(Math.random() * 6 + 1);
          var middleRandomNum = Math.floor(Math.random() * 6 + 1);
          if (this.isWinner === 'unknow') {
            new Toast({
              content: '网络错误，请重新再试！'
            });
            _.eventCenter.trigger('slot_machine:stop', -1 * 170, 1 * 170, -1 * 170);
            return;
          }
          if (this.isWinner === 'limit') {
            _.eventCenter.trigger('slot_machine:stop', -2 * 170, 2 * 170, -2 * 170);
            return;
          }
          if (this.isWinner) {
            leftRandomNum = 6;
            rightRandomNum = 2;
            middleRandomNum = 4;
          }
          _.eventCenter.trigger('slot_machine:stop', -leftRandomNum * 170, middleRandomNum * 170, -rightRandomNum * 170);
        }, this));
      }
    },

    scrollLeftTrack: function (times, to, duration, delta, loop, cb) {
      times++;
      this.leftInterval = animate({
        delay: 10,
        duration: duration,
        delta: (function () {
          if (times === 1) {
            return back;
          }
          return delta;
        })(),
        step: $.proxy(function (progress) {
          this.$trackWrapperLeft.css({
            '-webkit-transform': _tool.setTranslateY(rem(to * progress) + 'rem'),
            'transform': _tool.setTranslateY(rem(to * progress) + 'rem')
          });

          if (progress === 1 && loop) {
            this.$trackWrapperLeft.css({
              '-webkit-transform': _tool.setTranslateY(0),
              'transform': _tool.setTranslateY(0)
            });
            return this.scrollLeftTrack(times, to, 400, delta, loop);
          }

          if (!loop && cb && progress === 1) {
            setTimeout(cb, 600);
          }
        }, this)
      });

    },

    scrollMiddleTrack: function (times, to, duration, delta, loop, cb) {
      times++;
      this.middleInterval = animate({
        delay: 10,
        duration: duration,
        delta: (function () {
          if (times === 1) {
            return back;
          }
          return delta;
        })(),
        step: $.proxy(function (progress) {
          this.$trackWrapperMiddle.css({
            '-webkit-transform': _tool.setTranslateY(rem(to * progress) + 'rem'),
            'transform': _tool.setTranslateY(rem(to * progress) + 'rem')
          });

          if (progress === 1 && loop) {
            this.$trackWrapperMiddle.css({
              '-webkit-transform': _tool.setTranslateY(0),
              'transform': _tool.setTranslateY(0)
            });
            return this.scrollMiddleTrack(times, to, 400, delta, loop);
          }
          if (!loop && cb && progress === 1) {
            setTimeout(cb, 600);
          }
        }, this)
      });

    },

    scrollRightTrack: function (times, to, duration, delta, loop, cb) {
      times++;
      this.rightInterval = animate({
        delay: 10,
        duration: duration,
        delta: (function () {
          if (times === 1) {
            return back;
          }
          return delta;
        })(),
        step: $.proxy(function (progress) {
          this.$trackWrapperRight.css({
            '-webkit-transform': _tool.setTranslateY(rem(to * progress) + 'rem'),
            'transform': _tool.setTranslateY(rem(to * progress) + 'rem')
          });

          if (progress === 1 && loop) {
            this.$trackWrapperRight.css({
              '-webkit-transform': _tool.setTranslateY(0),
              'transform': _tool.setTranslateY(0)
            });
            return this.scrollRightTrack(times, to, 400, delta, loop);
          }

          if (!loop && cb && progress === 1) {
            setTimeout(cb, 600);
          }
        }, this)
      });

    },

  });

  module.exports = SlotMachine;
});
