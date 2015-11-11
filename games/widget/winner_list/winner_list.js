'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5
 * @desc 获奖名单
 */

PP.define('games/widget/winner_list', function (require, exports,module) {
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
  var WinnerList = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);

      this.init();
    },

    init: function () {
      this.$ul = this.conf.$el.find('.winner_list_cont_list');
      this.getWinnerList();
    },

    getWinnerList: function (cb) {
      var self = this;
      $.ajax({
        url: 'http://static.paipaiimg.com/js/data/ppms.page17474.js',
        data: {},
        type: 'GET',
        dataType: 'jsonp',
        timeout: 5000,
        jsonpCallback: 'showPageData17474',
        success: function(obj){
          if(obj && obj.data){
            var data = obj.data;
            if (typeof data.sort === 'function') {
              var listhtml = '';
              for (var i = 0; i < data.length; i ++) {
                var li = '<li><div>' + data[i].num + '</div><div>抽中' + data[i].award + '</div></li>';
                listhtml += li;
              }
              for (var i = 0; i < data.length; i ++) {
                var li = '<li><div>' + data[i].num + '</div><div>抽中' + data[i].award + '</div></li>';
                listhtml += li;
              }
              self.$ul.append(listhtml);
              self.ulHeight = self.$ul.height();
              self.autoScroll();
            }
          }
        },
        error: function(xhr,status,err){
          cb && cb();
        }
      });
    },

    autoScroll: function () {
      var scrollHeight = 0;
      var to = this.ulHeight;
      if (to === 0) {
        to = this.ulHeight = this.$ul.height();
      }
      animate({
        delay: 10,
        duration: 6000,
        delta: function (p) {
          return p;
        },
        step: $.proxy(function (progress) {
          this.$ul.css({
            '-webkit-transform': _tool.setTranslateY(rem(-to * progress) + 'rem'),
            'transform': _tool.setTranslateY(rem(-to * progress) + 'rem')
          });

          if (progress === 1) {
            this.$ul.css({
              '-webkit-transform': _tool.setTranslateY(0),
              'transform': _tool.setTranslateY(0)
            });
            this.autoScroll();
          }
        }, this)
      });
    }
  });

  module.exports = WinnerList;
});
