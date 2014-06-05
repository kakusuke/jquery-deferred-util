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

  function mockTimeout() {
    var old = window.setTimeout;
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

    return old;
  }

  function spy() {
    function _() {
      _.called = true;
      _.arguments = arguments;
    }
    _.called = false;
    return _;
  }

  var initDefault = {
    setup: function() {
      this._old = mockTimeout();
      this.queue = $.Queue();
    },
    teardown: function() {
      window.setTimeout = this._old;
    }
  };

  module('jQuery#wait', {
    setup: function() {
      initDefault.setup.call(this);

      this.spy = spy();
      this.wait = $.wait(100).done(this.spy);
    },
    teardown: initDefault.teardown
  });

  test('does not fire the callback until the time has passed', function() {
    setTimeout.digest(50);
    equal(this.spy.called, false);
    setTimeout.digest(50);
    equal(this.spy.called, true);
  });

  test('is cancelable', function() {
    this.wait.reject();
    setTimeout.digest(100);
    equal(this.spy.called, false);
  });


  module('jQuery#Queue', initDefault);

  test('calls added callbacks seqentially', function() {
    var timer1, timer2, timer3;

    this.queue.add(function() { return timer1 = $.wait(1000); });
    this.queue.add(function() { return timer2 = $.wait(500); });
    this.queue.add(function() { return timer3 = $.wait(1500); });

    equal(timer1.state(), 'pending');
    equal(timer2, null);
    equal(timer3, null);

    setTimeout.digest(1000);
    equal(timer1.state(), 'resolved');
    equal(timer2.state(), 'pending');
    equal(timer3, null);

    setTimeout.digest(500);
    equal(timer1.state(), 'resolved');
    equal(timer2.state(), 'resolved');
    equal(timer3.state(), 'pending');

    setTimeout.digest(1500);
    equal(timer1.state(), 'resolved');
    equal(timer2.state(), 'resolved');
    equal(timer3.state(), 'resolved');
  });

}(jQuery));
