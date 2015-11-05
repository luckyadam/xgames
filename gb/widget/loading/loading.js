'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5
 * @desc loading
 */

PP.define('gb/widget/loading', function (require, exports, module) {
  var Loading = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        container: $('body')
      }, this);
      this.init();
    },

    init: function () {
      var html = '';
      if (!this.$loading) {
        html = '<div class="mod_loading">';
        html += '<div class="mod_loading_inner">';
        html += '<i class="mod_loading_icon"></i> 正在加载，请稍候…';
        html += '</div>';
        html += '</div>';
        this.$loading = $(html).appendTo(this.conf.container).hide();
      }
    },

    show: function () {
      this.$loading && this.$loading.show();
    },

    hide: function () {
      this.$loading && this.$loading.hide();
    },

    destroy: function () {
      this.$loading && this.$loading.remove();
    }
  });

  module.exports = Loading;
});
