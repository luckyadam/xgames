'use strict';

/**
 * @author luckyadam
 * @date 2015-11-11
 * @desc 下载
 */

PP.define('games/widget/share_download', function (require, exports, module) {
  var ShareDownload = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);
      this.init();
    },

    init: function () {
      this.initEvent();
    },

    initEvent: function () {
      this.conf.$el.on('click', '.share_download_down', $.proxy(this.download, this))
        .on('click', '.share_download_open', $.proxy(this.open, this))
    },

    download: function () {

    },

    open: function () {

    }
  });

  module.exports = ShareDownload;
});
