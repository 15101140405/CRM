;(function($) {
	$.cookie = function(key, value, options) {
		var opts;
		var val = String(value);
		if (arguments.length > 1 && val !== "[object Object]") {
			var expiresTime, num, type, strsec = 0,exp = new Date();
			opts = $.extend({}, $.cookie.defaults, options);
			expiresTime = {null:"d-1",undefined:"d-1"}[value]||opts.expires;
			expiresTime != '' && (num = expiresTime.substring(1, expiresTime.length) * 1, type = expiresTime.substring(0, 1), strsec = {'s':num * 1000,'h': num * 60 * 60 * 1000,'d':num * 24 * 60 * 60 * 1000}[type], exp.setTime(exp.getTime() + strsec * 1), expiresTime = ";expires=" + exp.toGMTString());
			return (document.cookie = [
				encodeURIComponent(key), '=',
				opts.raw ? val : encodeURIComponent(val),
				expiresTime,
				opts.path ? '; path=' + opts.path : '',
				opts.secure ? '; secure' : ''
			].join(''))
		}
		opts = $.extend({}, $.cookie.defaults, value);
		return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? {true:result[1],false:decodeURIComponent(result[1])}[opts.raw] : null
	};
	$.cookie.defaults = {
		expires: '',
		path: '',
		secure: false,
		raw: false
	};
})(Zepto)