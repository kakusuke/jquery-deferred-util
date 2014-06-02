(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#wait', {
    setup: function() {
      this._old = window.setTimeout;
      window.setTimeout = (function() {
        var id = 0;
        var list = [];
        function setTimeout(fn, duration) {
          list.push([fn, duration]);
          return id++;
        }
        setTimeout.digest = function(duration) {
          var done = [];
          list = list.filter(function(item) {
            item[1] -= duration;
            return item[1] > 0 || done.push(item) || false; 
          });
          done.forEach(function(item) {
            item[0].call(null);
          });
        };
        return setTimeout;
      }());

      this.called = false;
      this.wait = $.wait(100).done($.proxy(function() {
        this.called = true;
      }, this));
    },
    teardown: function() {
      window.setTimeout = this._old;
    }
  });

  test('does not fire the callback until the time has passed', function() {
    expect(2);
    setTimeout.digest(50);
    equal(this.called, false);
    setTimeout.digest(50);
    equal(this.called, true);
  });

  test('is cancelable', function() {
    expect(1);
    this.wait.reject();
    setTimeout.digest(100);
    equal(this.called, false);
  });
}(jQuery));
