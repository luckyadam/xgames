/**
 * 简易消息提示框组件
 * @module Toast
 * @author liweitao
 */

PP.define('toast', function (require) {
  // 调用遮罩层组件
  var Overlay = require('overlay');
  // 实例，单例模式
  var instance = null;

  /**
   * @class Toast
   * @classdesc 提示框类，单例
   * @alias module:Toast
   */
  var Toast = _.Class.extend({

    /**
     * toast.
     * @constructor
     * @param {Object|String} options
     * @param {String|HTMLElement|Zepto} [options.content] - 提示信息内容
     * @param {Number} [options.duration] - 提示持续时间
     */
    construct: function (options) {
      if (typeof options === 'string') {
        options = {
          content: options
        };
      }
      this.conf = $.extend({
        content: '',
        duration: 3000
      }, options);
      // 单例
      if (instance) {
        instance.setTimer.call(instance);
        instance.content(this.conf.content);
        instance.show();
        return instance;
      }
      this.$dom = $('<div class="toast"></div>');
      this.content(this.conf.content);
      this.setTimer();
      this.overlay = new Overlay({
        content: this.$dom,
        mask: false,
        modal: false
      });
      this.show();
      instance = this;
      return instance;
    },

    /*
     * @description 设置定时器
     */
    setTimer: function () {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout($.proxy(function () {
        this.hide();
      }, this), this.conf.duration);
    },

    /**
     * @description 展示提示信息框
     * @return {Object} this - 实例本身，方便链式调用
     */
    show: function () {
      this.overlay.show();
      return this;
    },

    /**
     * @description 隐藏提示信息框
     * @return {Object} this - 实例本身，方便链式调用
     */
    hide: function () {
      this.overlay.hide();
      return this;
    },

    /**
     * @description 获取/填充内容
     * @param {String|HTMLElement|Zepto} [content] - 当conten为空时是获取，否则是填充内容
     */
    content: function (content) {
      if (content === undefined) {
        return this.$dom.html();
      } else {
        this.$dom.html(content);
      }
    }
  });

  return Toast;
});
