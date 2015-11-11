'use strict';

/**
 * @author luckyadam
 * @date 2015-11-6
 * @desc 分享页
 */

PP.define('games/page/share', function (require, exports, module) {
  var Share = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);

      this.init();
    },

    init: function () {

    }
  });

  module.exports = Share;
});
