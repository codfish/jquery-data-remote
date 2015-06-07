/**
 * jQuery dataRemote Plugin v0.2.0
 * http://github.com/codonnell822/jquery-dataremote
 * Copyright 2014, Chris O'Donnell
 *
 * Plugin to help make handling ajax requests easier.
 * Name inspired by Ruby on Rails
 */
;(function($, window, undefined) {

  $.fn.dataRemote = function(opts) {
    "use strict";

    /**
     * Default Settings
     *
     * @see https://api.jquery.com/jQuery.ajax/
     */
    var defaults = {
      url: null, // request url
      data: {}, // request data
      debug: false,
      eventType: 'load', // js event type to fire data request on (load, click, submit, mouseover, etc.)
      dataType: 'json', // data type that's expected in response from your request
      type: 'GET', // type of request (GET or POST)
      handlebars: false, // use handlebars to render the response?
      handlebarsTemplate: null, // hb template selector. by default it will look inside target
      target: null, // selector of the element where you want your response injected
      loaderImg: null, // target selector for data response
      oneAndDone: true, // after the first time running, wont run again
      append: false, // append result to target element? default is to replace content
      success: function($target, options, response) {
        var source;
        var template;
        var html;
        var $handlebarsTemplate;
        var method;

        $target.find('.loader-image').hide();

        if (options.debug) {
          $.fn.dataRemote.debug($target, response);
        }

        // Use handlebars if the option is set to true _OR_
        // if a handlebars template is found
        if (options.handlebars === true || $target.find('[type="text/x-handlebars-template"]').length) {
          if (options.handlebarsTemplate) {
            $handlebarsTemplate = $(options.handlebarsTemplate);
          } else 
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
          $.fn.dataRemote.debug($target, response, error);
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

    // Extend our default options with those provided.
    var options = $.extend({}, defaults, opts);

    /**
     * Private helper method for making the get request
     *
     * @param {object} url       url to query
     * @param {object} settings  Additional settings for the request
     * {
     *    @param {object} context   the value of `this` provided for the callbacks
     *    @param {object} options   options for current request
     *    @param {object} $target   the jquery target element to inject response
     *    @param {object} dataType  request data type (see $.ajax documentation)
     * }
     * @return {void}
     */
    function get(url, settings) {
      var $context = settings.context;
      var $target = settings.target;
      var options = settings.options;
      var dataType = settings.dataType;

      // display loader image while retrieving content
      if (options.loaderImg) {
        $target.prepend(String() +
          '<div class="loader-image" style="clear: both;">' +
            '<img src="' + options.loaderImg + '" alt="Loading...">' + 
          '</div>'
        );
      }

      $.ajax({
        url: url,
        data: options.data,
        type: options.type,
        dataType: dataType,
        cache: true,
        success: function(response) {
          options.success.call($context, $target, options, response);
          options.complete.call($context, $target);
        },
        error: function(response, status, error) {
          options.error.call($context, target, options, response, error);
          options.complete.call($context, target);
        }
      });
    }

    return this.each(function(idx, element) {
      var $element = $(element);
      var dataType = $element.data('type') || options.dataType; // response data type
      var eventType = $element.data('event') || options.eventType; // event type to make the request on
      var target = $element.data('target') || options.target; // target selector for handling the response
      var $target = target ? $(target) : $element; // no target given, default to actual element
      var url = $element.data('url') || options.url; // remote url to make the GET or POST request to

      // if event type is 'load', execute the request immediately otherwise,
      // execute ajax request on specified type (click, submit, mouseover, etc.)
      if (eventType === 'load') {
        options.before.call($element, $target);

        // execute ajax request immediately
        get(url, {
          context: $element,
          options: options,
          target: $target,
          dataType: dataType
        });
      } else {
        // use proper jQuery method based on oneAndDone option
        var method = options.oneAndDone === true ? 'one' : 'on';

        // bind to specific event type
        $element[method](eventType, function(e) {
          e.preventDefault();

          // execute before request callback
          options.before.call($element, $target);

          get(url, {
            context: $element,
            options: options,
            target: $target,
            dataType: dataType
          });
        });
      } // end if else (eventType)
    }); // end this.each
  }; // end $.fn.dataRemote

  /**
   * Helper function for debugging
   */
  $.fn.dataRemote.debug = function(element, output, error) {
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

}(jQuery, window));
