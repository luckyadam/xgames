/**
 * @module Util
 * @author liweitao
 */

PP.define('util', function (require, exports, module) {
  var Util = {
    ua: navigator.userAgent.toLowerCase(),
    /**
     * @description 滚动到页面某一位置
     * @param {String|HTMLElement|Zepto|Number} selector - 可以是选择器，Dom，Zepto对象，或是数字
     * @param {Function} [callback] 滚完后的回调
     * @param {Number} [delay] - 延时时间
     * @param {Number} [duration] - 动画过渡时间
     */
    scrollToPosition: function (selector, callback, delay, duration) {
      if (selector === undefined) {
        return;
      }
      if (typeof callback === 'number') {
        if (arguments.length === 3) {
          duration = delay;
          delay = callback;
        } else if (arguments.length === 2) {
          delay = callback;
        }
      }
      var top = (typeof selector === 'number') ?
        selector : ($(selector).length ? $(selector).offset().top : 0);

      delay = typeof delay === 'number' ? delay : 0;

      setTimeout(function () {
        if (typeof duration === 'number' && duration) {
          var pageHeight = document.documentElement.scrollHeight;
          top = Math.min(top, pageHeight);
          var pageOffsetY = window.pageYOffset;
          var interval = 1000 / 60;
          var distance = pageOffsetY - top;
          var speed = distance / duration; // 匀速运动
          var frameDiastance = speed * interval;
          var timer = null;
          var hasScroll = false;
          var scroll = function () {
            if (pageOffsetY === top) {
              if (hasScroll) {
                setTimeout(function () {
                  if ($.isFunction(callback)) {
                    callback();
                  }
                }, 0);
              }
              return;
            }
            pageOffsetY -= frameDiastance;
            if (Math.abs(pageOffsetY - top) < Math.abs(frameDiastance)) {
              pageOffsetY = top;
            }
            timer = setTimeout(function () {
              hasScroll = true;
              window.scrollTo(0, pageOffsetY);
              scroll();
            }, interval);
          };
          scroll();
        } else {
          window.scrollTo(0, top);
          setTimeout(function () {
            if ($.isFunction(callback)) {
              callback();
            }
          }, 0);
        }
      }, delay);
    },
    /**
     * @description 判断数据类型
     * @param val
     * @return {String} 返回数据类型
     */
    type: function (val) {
      var valType = typeof val,
        typeToString = ({}).toString.call(val);

      if (val === null) {
        return 'null';
      }

      if (valType === 'undefined' || valType === 'string' || valType === 'number' || valType === 'boolean') {
        return valType;
      }

      switch(typeToString) {
        case '[object Array]':
          return 'array';
        case '[object Date]':
          return 'date';
        case '[object Boolean]':
          return 'boolean';
        case '[object Number]':
          return 'number';
        case '[object RegExp]':
          return 'regexp';
      }

      if (valType === 'function') {
        return 'function';
      }

      if (valType === 'object') {
        if (val.nodeType !== undefined) {
            if (val.nodeType === 3) {
              return (/\S/).test(val.nodeValue) ? 'textnode' : 'whitespace';
            }
            else {
              return 'element';
            }
        }

        return 'object';
      }
    },
    /**
     * @description 生成唯一ID
     * @param {String} prefix 生成ID前缀
     * @return {String} 返回生成的ID
     */
    generateID: function(prefix) {
      var idPrefix = prefix ? prefix + '-' : '';

      return idPrefix + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },
    /**
     * @description 浅复制
     * @param  {Object} obj 初始对象
     * @return {Object} 返回整合后的对象
     */
    extend: function(obj) {
      var args = [].slice.call(arguments, 1),
        originalObj = obj,
        set;

      for (var i = 0, length = args.length; i < length; i++) {
        set = args[i];
        for (var key in set) {
          if (set.hasOwnProperty(key)) {
            originalObj[key] = set[key];
          }
        }
      }

      return originalObj;
    },
    isWX: function () {
      return window.WeixinJSBridge ? true : (this.ua.match(/micromessenger/) ? true : false);
    },
    isMQQ: function () {
      return this.ua.match(/(^)?[\s;]*qq\/(([^\.\s;]+)[^\s;]*)/) ? true : false;
    },
    isPaiSns: function () {
      return (this.ua.match(/iosppsns/) || this.ua.match(/androidppsns/)) ? true : false;
    }
  };

  return Util;
});
