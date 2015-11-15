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

  function loadUrl(o) {
    var el = document.createElement('script');
    el.charset = o.charset || 'utf-8';
    el.onload = el.onreadystatechange = function() {
        if(/loaded|complete/i.test(this.readyState) || navigator.userAgent.toLowerCase().indexOf("msie") == -1) {
            o.onLoad && o.onLoad();
            clear();
        }
    };
    el.onerror = function(){
        clear();
    };
    el.src = o.url;
    document.getElementsByTagName('head')[0].appendChild(el);
    function clear(){
        if(!el){return ;}
        el.onload = el.onreadystatechange = el.onerror = null;
        el.parentNode && (el.parentNode.removeChild(el));
        el = null;
    }
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
      window.showPageData17474 = function (obj) {
        if(obj && obj.data){
          var data = obj.data;
          if (typeof data.sort === 'function') {
            var listhtml = '';
            for (var i = 0; i < data.length; i ++) {
              var li = '<li><div>' + data[i].num + '</div><div>' + data[i].award + '</div></li>';
              listhtml += li;
            }
            for (var i = 0; i < data.length; i ++) {
              var li = '<li><div>' + data[i].num + '</div><div>' + data[i].award + '</div></li>';
              listhtml += li;
            }
            self.$ul.append(listhtml);
            self.ulHeight = self.$ul.height();
            self.autoScroll();
          }
        }
      }
      loadUrl({
        url: 'http://static.paipaiimg.com/js/data/ppms.page17474.js',
        charset: 'gbk',
        onLoad: function () {
          delete window.showPageData17474;
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
