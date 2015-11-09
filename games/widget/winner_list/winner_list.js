'use strict';

/**
 * @author luckyadam
 * @date 2015-11-5
 * @desc 获奖名单
 */

PP.define('games/widget/winner_list', function (require, exports,module) {
  var WinnerList = _.Class.extend({
    construct: function (opts) {
      this.conf = $.extend({
        $el: null
      }, opts);

      this.init();
    },

    init: function () {
      this.getWinnerList();
    },

    getWinnerList: function (cb) {
      var self = this;
      $.ajax({
        url: 'http://s.paipaiimg.com/ppms/js/99/ppms.page17399.js',
        data: {},
        type: 'GET',
        dataType: 'jsonp',
        timeout: 5000,
        success: function(obj){//返回000/001(活动结束/暂停)，201(创建成功)，211(加载已有)
          if(obj && obj.data){
            var data = obj.data;
            if (typeof data.sort === 'function') {
              var $ul = self.conf.$el.find('.winner_list_cont_list');
              var listhtml = '';
              for (var i = 0; i < data.length; i ++) {
                var li = '<li><div>' + data[i].num + '</div><div>抽中' + data[i].award + '</div></li>';
                listhtml += li;
              }
              $ul.append(listhtml);
            }
          }
        },
        error: function(xhr,status,err){
          cb && cb();
        }
      });
    }
  });

  module.exports = WinnerList;
});
