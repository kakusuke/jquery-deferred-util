/*! Deferred Util - v0.1.0 - 2014-06-03
* https://github.com/kakusuke/jquery-deferred-util
* Copyright (c) 2014 kakusuke; Licensed MIT */
(function($) {

  $.wait = function(duration) {
    var dfd = $.Deferred();
    setTimeout(dfd.resolve, duration);
    return dfd;
  };

}(jQuery));
