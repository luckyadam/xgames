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

    listenEvent: function () {
      _.eventCenter.on('games_crane:start', $.proxy(this.show, this));
    },

    show: function () {
      this.conf.$el.addClass('in');
    }
  });

  module.exports = CraneMain;
});
