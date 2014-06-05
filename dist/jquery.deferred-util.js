/*! Deferred Util - v0.1.1 - 2014-06-05
* https://github.com/kakusuke/jquery-deferred-util
* Copyright (c) 2014 kakusuke; Licensed MIT */
(function($) {

  var wait = function(duration) {
    var dfd = $.Deferred();
    setTimeout(dfd.resolve, duration);
    return dfd;
  };

  var Queue = (function() {
    function Queue() {
      if (!(this instanceof Queue)) {
        return new Queue();
      }
      this._queue = [];
    }

    $.extend(Queue.prototype, {
      add: function(cb) {
        var dfd = $.Deferred();
        $.when.apply($, this._queue).done(function() {
          (cb.call(this) || $.Deferred().resolve()).always(dfd.resolve);
        });
        this._queue.push(dfd);
      }
    });

    return Queue;
  }());

  $.extend({
    wait: wait,
    Queue: Queue
  });

}(jQuery));
