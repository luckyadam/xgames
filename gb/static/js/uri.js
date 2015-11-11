/**
 * @module Uri
 * @author liweitao
 */

PP.define('uri', function () {
  'use strict';

  function parseUri (str) {
    var o   = parseUri.options,
      m   = o.parser[o.strictMode ? 'strict' : 'loose'].exec(str),
      uri = {},
      i   = 14;

    while (i--) uri[o.key[i]] = m[i] || '';

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
      if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
  }

  parseUri.options = {
    strictMode: false,
    key: ['source','protocol','authority','userInfo','user','password','host','port','relative','path','directory','file','query','anchor'],
    q: {
      name:   'queryKey',
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  };

  /**
   * @author (c) Steven Levithan <stevenlevithan.com>
   * @constructor Uri
   * @desc 处理、匹配url中的各个参数
   * @param {String} str 待处理的url
   * @constructor
   */
  var Uri = function (str) {
    this.url = str;
    this.data = parseUri(str);
  };
  Uri.prototype = {
    getQueryParamValue: function(param) {
      return this.data.queryKey[param];
    },
    /**
     * @function
     * @memberof Uri.ptototype
     * @desc 替换url中的querystring为给定的值
     * @param {String} param 要替换的key
     * @param {String} value 替换后的值
     * @inner
     */
    replaceQueryParam: function(param, value) {
      this.data.queryKey[param] = value.toString();
    },
    getKeyValue: function(key) {
      return this.data[key];
    },
    toString: function(){
      var url = this.data.protocol + '://' + this.data.authority + this.data.path;
      if (this.data.queryKey) {
        url += '?';
        for (var key in this.data.queryKey) {
          url += key + '=' + this.data.queryKey[key] + '&';
        }
      }
      return url;
    }
  };
  return Uri;
});
