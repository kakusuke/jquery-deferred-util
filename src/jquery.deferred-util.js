/*
 * deferred-util
 * https://github.com/kakusuke/jquery-deferred-util
 *
 * Copyright (c) 2014 kakusuke
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.deferred_util = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.deferred_util = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.deferred_util.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.deferred_util.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].deferred_util = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
