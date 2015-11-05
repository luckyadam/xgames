'use strict';

/**
 * @author luckyadam
 * @date 2015-11-4
 * @desc 抓一抓
 */

PP.define('games/widget/crane_main', function (require, exports, module) {
  var CraneMain = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);

      this.init();
    },

    init: function () {
      this.listenEvent();
    },

    initEvent: function () {

    },

    listenEvent: function () {
      _.eventCenter.on('games_crane:start', $.proxy(this.show, this));
      _.eventCenter.on('gb_widget_countdown2:timeisup', $.proxy(this.onStart, this));
    },

    show: function () {
      this.conf.$el.addClass('in');
      setTimeout(function () {
        _.eventCenter.trigger('gb_widget_countdown2:start');
      }, 500);
    },

    onStart: function () {
      var $el = this.conf.$el;
      var $pageBtn1 = $el.find('.page_btn1');
      var $pageBtn2 = $el.find('.page_btn2');
      var $pageBtn3 = $el.find('.page_btn3');
      var $pageBtn4 = $el.find('.page_btn4');
      var $pageBtn5 = $el.find('.page_btn5');
      var $pageBtn6 = $el.find('.page_btn6');
      var $countdown2 = $el.find('.countdown2');
      var $pageHand = $el.find('.page_hand');
      var $pageCraned = $el.find('.page_craned');
      setTimeout($.proxy(function () {
        $pageBtn1.hide();
        $countdown2.remove();
        $pageBtn2.show();
        $el.on('click', '.page_btn2', function () {
          $(this).hide();
          $pageBtn3.show();
          $pageHand.addClass('down');
          $pageCraned.addClass('page_craned2');
          setTimeout(function () {
            $pageBtn3.hide();
            $pageBtn1.show();
          }, 200);
          setTimeout(function () {
            $pageCraned.addClass('in');
            $pageBtn1.hide();
            $pageBtn4.show();
            setTimeout(function () {
              $pageBtn4.hide();
              if (Math.random() > 0) {
                $pageHand.addClass('page_handlose').removeClass('down');
                $pageCraned.addClass('down');
                $pageBtn6.show();
                setTimeout(function () {
                  $pageBtn6.hide();
                  $pageBtn2.show();
                  $pageHand.removeClass('page_handlose');
                  $pageCraned.removeClass('down in');
                }, 800);
              } else {
                $pageHand.addClass('page_handwin');
                $pageBtn5.show();
              }
            }, 1500);
          }, 2500);
        });

      }, this), 800);
    }
  });

  module.exports = CraneMain;
});
