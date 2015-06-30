# jQuery Data Remote Plugin

jQuery Data Remote is a plugin that simplifies the common task of making api/remote requests and injecting the response to the page. Optionally leverages Handlebars.js for templating. Inpired by ruby on rails' unobtrusive scripting adapter for jQuery (https://github.com/rails/jquery-ujs).


## Install

* [npm](http://npmjs.org/package/jquery-data-remote): `npm install --save jquery-data-remote`
* [Bower](http://bower.io/): `bower install --save jquery-data-remote`
* [cdnjs](https://cdnjs.com/libraries/jquery-data-remote)
* [Download](https://github.com/codfish/jquery-data-remote/releases/download/v0.6.2/jquery.data-remote.zip).


## Options

Option | Type | Default | Description
------ | ---- | ------- | -----------
data | object | {} | Request data. If this is passed as a html5 attribute, it needs to be a valid JSON string (e.g. `<div data-data='{"count": 20}'></div>`).
dataType | string | 'json' | The type of response data you're expecting. Can be any dataType value supported by [jQuery.ajax](http://api.jquery.com/jquery.ajax/).
debug | boolean | false | Turn debugging on/off.
eventType | string | 'load' | The event type to fire data request on. Can be any event type that is supported by jQuery, including custom events.
handlebars | boolean | false | Whether to use handlebars templating engine
loaderImg | string | '' | Image src to an optional loader image.
method | string | 'GET' | The HTTP method to use for the request (e.g. "POST", "GET", "PUT") Can be any request type supported by jQuery.
oneAndDone | boolean | true | Whether to remove the event binding after the initial request.
placement | string | 'html' | Where to inject response relative to target (uses jQuery DOM insertion methods. Can be 'html', 'append', 'prepend', 'before' or 'after').
target | string | $(element) | Selector of the element where you want your response injected.
template | string | '' | Selector of the handlebars template. Default it will look inside target element for the template.
type | string | 'GET' | Alias for method.
url | string | null | **REQUIRED** API Request URL. Can be absolute or relative. Cross browser requests obviously adhere to CORS. For cross browser requests, you must either set the `dataType` option to `jsonp` or the API request must be to a public api/endpoint.

## Callbacks

Callback | Type | Default | Description
-------- | ---- | ------- | -----------
before | function | function($target) {} | Before callback. Fires directly before the request is made. Default is an empty function.
complete | function | function($target) {} | Complete callback. Fires after request, on success or error. Default is an empty function.
error | function | errorCallback($target, options, response, error) | Error callback. Fires if the ajax request fails. Takes 4 arguments. Default error callback (`errorCallback()`) handles error reporting is `debug` is true.
success | function | successCallback($target, options, response) | Success callback. Fires on the success of the ajax request. Takes 3 arguments. The default success callback (`successCallback()`) handles templating the response.


## Usage

1) Here's a great example of how this plugin can help minimize the amount of work you need to do in order to make an ajax request and handle the results. Here's an api request to githubs' gists api, using handlebars for templating (optional). This also leverages all of the default options (event type of 'load', data type of json, request type of GET, etc. See [Options](#options) for more details).

  ```html
  <div data-remote="true" data-url="https://api.github.com/users/codonnell822/gists">
    <script type="text/x-handlebars-template">
      <ul>
        {{#each this}}
          <li>
            <h3><a href="{{ html_url }}" target="_blank">{{ html_url }}</a></h3>
            <p>{{ description }}</p>
          </li>
        {{/each}}
      </ul>
    </script>
  </div>
  ```

Almost all options can be set via html5 data attributes, or passed into the plugin initialization, or a mixture of both. Note html5 data attributes take precedence, so if you wanted to, you can initialize data remote with options, and then override options on any specific element using data attributes. See the following example:

1) Here's an example with 3 elements getting initialized together, but showing the ability to override options with data attributes.

  - First, here's the plugin initialization. Initialize all of the `.get-news` elements with data remote options you want.

  ```js
  $(document).ready(function() {
    $('.get-news').dataRemote({
      url: 'http://api.example.com/news',
    });
  });
  ```

  - Here's the first element, a wrapper element with no data attributes. Leverages the default options of the plugin, as well as the options you specify below in the plugin call.

  ```html
  <ul class="news-list-wrapper" class="get-news">
    <script type="text/x-handlebars-template">
      {{#each news_items}}
        <li>
          <h3><a href="{{ url }}" target="_blank">{{ url }}</a></h3>
          <p>{{ dek }}</p>
        </li>
      {{/each}}
    </script>
  </ul>
  ```

  - Now we add a link to the page to allow the user to load more news. Overrides request url adding page param

  ```html
  <a class="get-news"
     data-target=".news-list-wrapper"
     data-event-type="click"
     data-placement="append"
     data-url="http://api.example.com/news?page=2"
  >
      Load More News
  </a>
  ```

  - override request url

  ```html
  <a class="get-news"
     data-url=""
     data-target=".news-list-wrapper"
     data-event-type="click"
     data-url="http://api.example.com/news?category=funny"
  >
    Display Funny News Instead
  </a>
  ```


## Demo

To view the demo, run the following:

```sh
$ gulp demo
```


## In Development

1. Support for multiple templating engines
1. Add better support for POST requests (they're very possible, but should we make assumptions about the data to send by default? i.e. grab all form values)
1. Add support for authenticated requests
1. Add better error handling
1. ~~Add a node server via gulp, so you can use that to serve the demo, with a simple `gulp serve`~~
