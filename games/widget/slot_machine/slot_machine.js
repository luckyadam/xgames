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
        self.btnPlayer.setSrc(__uri('../images/crane_press_btn.mp3'));
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
                if (self.isWinner === true) {
                  $('.slot_machine_go .page_btn5').show();
                  $('.slot_machine_stop .page_btn5').show();
                  var gift = self.gift;
                  self.lotteryDialog.win(gift.value, gift.name, gift.tip, gift.url);
                  self.player.setSrc(__uri('../images/get_gift.mp3'), 'audio/mpeg');
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
      // this.player.setSrc(__uri('../images/slot_scroll.mp3'));
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
        this.btnPlayer.setSrc(__uri('../images/crane_press_btn.mp3'));
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
