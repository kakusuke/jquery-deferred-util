# Deferred Util

Deferred Utility

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/kakusuke/jquery-deferred-util/master/dist/deferred-util.min.js
[max]: https://raw.github.com/kakusuke/jquery-deferred-util/master/dist/deferred-util.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/deferred-util.min.js"></script>
<script>
jQuery(function($) {
  // Like setTimeout,
  $.wait(100).done(function() {
    // this callback called after 100ms.
  });

  var queue = $.Queue();
  // You can add the callback to the queue, and callbacks are called by added order.
  queue.add(function() {
    // first.
    // When queue is empty, callback called immediatelly.
    // The return value delays next callback call
    return $.get('/foo.json').done(function() { /* process.. */ });
  });
  queue.add(function() {
    // second.
    return $.get('/bar.json').done(function() { /* process.. */ });
  });
  queue.add(function() {
    // third.
    return $.get('/buz.json').done(function() { /* process.. */ });
  });

});
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_
