'use strict';

/**
 * @author luckyadam
 * @date 2015-11-4
 * @desc 抓一抓引导
 */

PP.define('games/widget/crane_guide', function (require, exports, module) {

  var CraneGuide = _.Class.extend({
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
      _.eventCenter.on('games_crane:start', $.proxy(this.hide, this));
    },

    hide: function () {
      this.conf.$el.addClass('out');
    }
  });

  module.exports = CraneGuide;
});
