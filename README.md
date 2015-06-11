# jQuery Data Remote Plugin

jQuery Data Remote is a plugin that simplifies the common task of making api/remote requests and injecting the response to the page. Optionally leverages Handlebars.js for templating. Inpired by ruby on rails' unobtrusive scripting adapter for jQuery (https://github.com/rails/jquery-ujs).

## Getting Started

### Old School

Simply include script after the jQuery library:

```html
<script src="/path/to/jquery.js"></script>
<script src="/path/to/jquery.data-remote.js"></script>
```

### Install with bower

```sh
bower install jquery-data-remote --save
```

## Options

Here are the options/settings. Note, almost all of these (not the callbacks) can be set via a html5 data attribute, like so: `<a href="#" data-remote="true" data-target=".news-list-wrapper" data-event-type="click">Display News</a>`

**url**

Type: *String*
Default: *None*
Optional: *False*

API Request URL. Can be absolute or relative. Cross browser requests obviously adhere to CORS. For cross browser requests, you must either set the `dataType` option to `jsonp` or the API request must be to a public api/endpoint.

**data**

Type: *String*
Default: `{}`
Optional: *True*

Request data.

### options tl;dr

```js
var defaults = {
  url: null, // request url
  data: {}, // request data
  debug: false, // debug on?
  eventType: 'load', // js event type to fire data request on (load, click, submit, mouseover, etc.)
  dataType: 'json', // data type that's expected in response from your request
  type: 'GET', // type of request (GET|POST|PUT|DELETE)
  target: '', // selector of the element where you want your response injected
  placement: 'html', // where to inject response relative to target (jquery DOM insertion methods <html|append|prepend|before|after>)
  handlebars: false, // boolean. Whether to use handlebars templating engine
  templateSelector: '', // selector of the handlebars template . Note, by default it will look inside target
  loaderImg: null, // target selector for data response
  oneAndDone: true, // after the first time running, wont run again
  success: successCallback($target, options, response), // success callback
  error: errorCallback($target, options, response, error), // error callback
  complete: function($target) {}, // callback fires after request, on success or error
  before: function($target) {} // callback fires directly before request
};
```

## Usage

Here's a great example of how this plugin can help minimize the amount of work you need to do in order to make an ajax request and handle the results. Here's an api request to githubs' gists api, using handlebars for templating (optional). This also leverages all of the default options (event type of 'load', data type of json, request type of GET, etc. See [Options](#options) for more details).

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

## Demo

To view the demo, run the following:

```sh
$ git clone git@github.com:codonnell822/jquery-data-remote.git
$ cd jquery-data-remote
# port 8080 might not work for you, change it to whatever you like
$ php -S localhost:8080
```

Now to view the demo, go to [http://localhost:8080/demo](http://localhost:8080/demo)

## To Do

* Add build tools
    - gulp
    - minify script
    - add node server, change demo instructions to use gulp serve rather than php built-in server
* Add better support for POST requests (they're very possible, but should we make assumptions about the data to send by default? i.e. grab all form values)
* Add support for authenticated requests
* Add support for multiple JS templating engines, not just handlebars
* Add built-in support for paginating responses?
* Add better error handling
