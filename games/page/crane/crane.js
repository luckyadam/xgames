'use strict';

/**
 * @author luckyadam
 * @date 2015-11-4
 * @desc 抓一抓
 */

PP.define('games/page/crane', function (require, exports, module) {
  var lotteryUtil = require('lottery');
  var Toast = require('toast');
  var Crane = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);
    },

    init: function () {
      var cont = this.conf.$el,
        doc = document.documentElement,
        s = doc.clientWidth,
        width = (s > 640) ? 640 : s,
        height = doc.clientHeight;

      cont.width(width);
      cont.height(height);

      setTimeout(function () {
        _.eventCenter.trigger('games_crane:start');
      }, 2500);
    },


  });

  module.exports = Crane;
});
