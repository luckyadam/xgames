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
