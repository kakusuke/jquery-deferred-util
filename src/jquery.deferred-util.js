/*
 * deferred-util
 * https://github.com/kakusuke/jquery-deferred-util
 *
 * Copyright (c) 2014 kakusuke
 * Licensed under the MIT license.
 */

(function($) {

  var wait = function(duration) {
    var dfd = $.Deferred();
    setTimeout(dfd.resolve, duration);
    return dfd;
  };

  var Sequence = (function() {
    function Sequence() {
      if (!(this instanceof Sequence)) {
        return new Sequence();
      }

      var jobs = [];
      var thread = [];
      var dfd = $.Deferred();

      function addJob(i) {
        var job = jobs[i];
        var jobDfd = $.Deferred();
        $.when.apply($, thread).done(function() {
          (job.call(this) || $.Deferred().resolve()).always(function() {
            jobDfd.resolve();
            thread.splice($.inArray(jobDfd, thread), 1);
          });
        });
        thread.push(jobDfd);
      }
      $.extend(this, {
        add: function(job) {
          jobs.push(job);
        },
        play: function() {
          dfd = $.Deferred();

          for (var i = 0, len = jobs.length; i < len; i++) {
            addJob(i);
          }
          
          $.when.apply($, thread)
            .done(dfd.resolve)
            .fail(dfd.reject);
        },
        promise: function() {
          return dfd.promise();
        }
      });
    }

    return Sequence;
  }());

  $.extend({
    wait: wait,
    Sequence: Sequence
  });

}(jQuery));
