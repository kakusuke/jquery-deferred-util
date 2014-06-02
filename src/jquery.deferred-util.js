/*
 * deferred-util
 * https://github.com/kakusuke/jquery-deferred-util
 *
 * Copyright (c) 2014 kakusuke
 * Licensed under the MIT license.
 */

(function($) {

  $.wait = function(duration) {
    var dfd = $.Deferred();
    setTimeout(dfd.resolve, duration);
    return dfd;
  };

}(jQuery));
