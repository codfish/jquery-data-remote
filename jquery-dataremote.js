/**
 * jQuery dataRemote Plugin 1.0.0
 * http://github.com/codonnell822/jquery-dataremote
 * Copyright 2014, Chris O'Donnell
 *
 * Plugin to help make handling ajax requests easier.
 * Name inspired by Ruby on Rails
 */
;(function($, window, undefined) {

  $.fn.dataRemote = function(opts) {
    "use strict";

    // Extend our default options with those provided.
    // Note that the first argument to extend is an empty
    // object – this is to keep from overriding our "defaults" object.
    var options = $.extend({}, $.fn.dataRemote.defaults, opts);

    /**
     * Private helper method for making the ajax request
     *
     * @param {object} context  The value of `this` provided for the callbacks
     * @param {object} url      Remote url to request
     * @param {object} options  Options/settings for current request
     * @param {object} $target  The jquery target element to inject response
     * @param {object} dataType Request data type (see $.ajax documentation)
     * @return {void}
     */
    function _retrieve(context, url, options, $target, dataType) {
      // display loader image while retrieving content
      $target.prepend('<div class="loader-image" style="clear: both;"><img src="' + options.loaderImg + '" alt="Loading..."></div>');

      $.ajax({
        url: url,
        data: options.data,
        type: options.type,
        dataType: dataType,
        cache: true,
        success: function(response) {
          options.success.call(context, $target, options, response);
          options.complete.call(context, $target);
        },
        error: function(response, status, error) {
          options.error.call(context, $target, options, response, error);
          options.complete.call(context, $target);
        }
      });
    }

    return this.each(function(idx, element) {
      var $this = $(element),

          // response data type
          dataType = $this.data('type') || options.dataType,

          // event listener to make the request on
          event = $this.data('event') || options.event,

          // Get the target selector for the response
          target = $this.data('target') || options.target,

          // If no selector is given, inject content
          // target should be the current element
          $target = target ? $(target) : $this,

          // use proper jQuery method based on oneAndDone option
          // if oneAndDone == true, only execute the request once
          method = options.oneAndDone === true ? 'one' : 'on',

          // remote url to make the GET or POST request to
          // grab on action
          url;

      if (event === 'load') {
        // execute before request callback
        options.before.call($this, $target);

        // execute ajax request immediately
        url = $this.data('url') || options.url;
        _retrieve($this, url, options, $target, dataType);
      } else {
        // execute ajax request on specified event (click, submit, mouseover, etc.)
        $this[method](event, function(e) {
          e.preventDefault();

          // execute before request callback
          options.before.call($this, $target);

          url = $this.data('url') || options.url;
          _retrieve($this, url, options, $target, dataType);
        });
      }
    });
  };

  /**
   * Helper function for debugging
   */
  $.fn.dataRemote._debug = function(element, output, error) {
    if (window.console && window.console.log) {
      window.console.log('Element: ');
      window.console.log(element);
      window.console.log('Response: ');
      window.console.log(output);
      if (error) {
        window.console.log(' -> Error: ');
        window.console.log(error);
      }
      window.console.log('------------');
    }
  }

  /**
   * Default Settings
   *
   * @see https://api.jquery.com/jQuery.ajax/
   */
  $.fn.dataRemote.defaults = {
    url: null, // request url
    data: {}, // request url
    debug: false,
    event: 'load', // event listener to fire data request on.
    dataType: 'json', // data type that's expected in response from your request
    type: 'GET', // type of request (GET or POST)
    handlebars: 'false', // use handlebars to render the response?
    handlebarsTemplate: null, // hb template selector. by default it will look inside target
    target: '', // selector of the element where you want your response injected
    loaderImg: 'img/loader.gif', // target selector for data response
    oneAndDone: true, // after the first time running, wont run again
    append: false, // append result to target element? default is to replace content
    success: function($target, options, response) {
      var source,
          template,
          html,
          $handlebarsTemplate,
          method;

      $target.find('.loader-image').hide();

      if (options.debug) {
        $.fn.dataRemote._debug($target, response);
      }

      // Use handlebars if the option is set to true _OR_
      // if a handlebars template is found
      if (options.handlebars === true
        || $target.find('[type="text/x-handlebars-template"]').length) {
        $handlebarsTemplate = options.handlebarsTemplate
          ? $(options.handlebarsTemplate)
          : $target.find('[type="text/x-handlebars-template"]');
        source = $handlebarsTemplate.html();
        template = Handlebars.compile(source);
        html = template(response);
      } else {
        html = response;
      }

      // use proper jQuery method based on append option
      // if append == true, append results to target element,
      // or else replace inner html with results
      method = options.append === true ? 'append' : 'html';
      $target[method](html);
    },
    error: function($target, options, response, error) {
      $target.find('.loader-image').hide();
      if (options.debug) {
        $.fn.dataRemote._debug($target, response, error);
      }
    },

    /**
     * Callback that fires after the request is made (on success OR error)
     *
     * @param $target {jQuery} jQuery object containing target element(s)
     */
    complete: function($target) {},

    /**
     * Callback that fires before the request is made
     *
     * @param $target {jQuery} jQuery object containing target element(s)
     */
    before: function($target) {}
  };

}(jQuery, window));
