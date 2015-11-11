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

'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5
 * @desc 首页头部
 */

'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5 changed
 * @desc 轮播
 */

PP.define('games/widget/game_carousel', function (require, exports, module) {
  var Carousel = _.Class.extend({
    canSlide: true,
    construct: function (opts) {
      this.conf = $.extend({
        wrapper: $('body'),
        isAuto: false
      }, opts);

      this.init();
    },

    init: function () {
      var wrapper = this.conf.wrapper;
      this.wrapperWidth = this.conf.wrapper.width();
      this.initial = { x:5, y:5, sx:0, sy:0, ex:0, ey:0 };
      this.$before = wrapper.find('.before');
      this.$prev = wrapper.find('.prev');
      this.$next = wrapper.find('.next');
      this.initEvent();
      if (this.conf.isAuto) {
        this.auto();
      }
    },

    initEvent: function () {
      this.conf.wrapper.on('touchstart', $.proxy(this.onStart, this))
        .on('touchmove', $.proxy(this.onMove, this))
        .on('touchend', $.proxy(this.onEnd, this));
    },

    classArr: ['prev', 'before', 'next'],
    classIdx: 1,
    changeIndex: function(step) {
      var prev = this.classIdx;
      this.classIdx = this.classIdx+step;
      if(this.classIdx > 2) {
        this.classIdx = 0;
      }
      if(this.classIdx < 0) {
        this.classIdx = 2;
      }
      _.eventCenter.trigger('games_widget_game_carousel:change', this.classIdx);
      this.conf.wrapper.removeClass('prev').removeClass('before').removeClass('next').addClass(this.classArr[this.classIdx]);
    },

    onStart: function (event) {
      var initial = this.initial;
      var wrapper = this.conf.wrapper;
      if (this.wrapperWidth === 0) {
        this.wrapperWidth = wrapper.width();
      }
      initial.sx = event.targetTouches[0].pageX;
      initial.sy = event.targetTouches[0].pageY;
      initial.ex = initial.sx;
      initial.ey = initial.sy;
      if (this.conf.isAuto) {
        clearInterval(this.autoInterval);
      }
    },

    onMove: function (event) {
      if(this.canSlide) {
        this.canSlide = false;
        var initial = this.initial;
        initial.ex = event.targetTouches[0].pageX;
        initial.ey = event.targetTouches[0].pageY;
        setTimeout(function() {
          this.canSlide = true;
        }.bind(this),200);
      }
    },

    onEnd: function (event) {
      var initial = this.initial;
      var changeX = initial.sx - initial.ex;
      var changeY = initial.sy - initial.ey;
      if (Math.abs(changeY) < Math.abs(changeX)) {
        event.preventDefault();
        if(changeX > 0) {
          this.changeIndex(1);
        } else {
          this.changeIndex(-1);
        }
      }

      if (this.conf.isAuto) {
        clearInterval(this.autoInterval);
        this.auto();
      }
    },

    auto: function () {
      this.autoInterval = setInterval($.proxy(function() {
        this.changeIndex(1);
      }, this), 3000);
    }
  });

  module.exports = Carousel;
});

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
