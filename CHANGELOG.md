# v0.7.0

* [(7596022)](https://github.com/codfish/jquery-data-remote/commit/75960225019bf696af1f04505256ff21a65c6e54) - allow users to provide a list of event types in a 'debounceEvents' option <codfish>
* [(754f2f0)](https://github.com/codfish/jquery-data-remote/commit/754f2f0e304f4172192e8563017294def976d4f5) - added debounce helper method to debounce main plugin ajax requests for certain event types <mekhami>
* [(6882fa0)](https://github.com/codfish/jquery-data-remote/commit/eeeb8c246808332206c5c2a7169445ceca16f535) - add jshintrc and clean up jshint warnings <codfish>
* [(eeeb8c2)](https://github.com/codfish/jquery-data-remote/commit/eeeb8c246808332206c5c2a7169445ceca16f535) - add gulp task to create zip archive for github release <codfish>
* [(2784a2f)](https://github.com/codfish/jquery-data-remote/commit/2784a2f02ae9d2b447e61497dc7057167219d8db) - clean up gulp dependencies, add shelljs <codfish>

# v0.6.2

* [(3fe4533)](https://github.com/codfish/jquery-data-remote/commit/3fe4533186305498bac29b66018ca8ec52fc2e68) - update bower jquery dependancy version <codfish>
* small readme changes <codfish>

# v0.6.1

* [(af061ff)](https://github.com/codfish/jquery-data-remote/commit/af061ff83c23fc9821757b86df9686a83c599b6a) - add .npmignore file so dist folder isn't ignored by npm <codfish>
* [(2123d80)](https://github.com/codfish/jquery-data-remote/commit/2123d802193af9ace836433f7e3518db7c9faf43) - add .editorconfig file for syntax formating <codfish>

# v0.6.0

* [(1da12da)](https://github.com/codfish/jquery-data-remote/commit/1da12da9d28ad30d03b69c6482700b820c40b80c) - add prepublish script to npm <codfish>
* [(9208d8e)](https://github.com/codfish/jquery-data-remote/commit/9208d8e3120247b4e5b33fffdac2dfdccb575704) - add build process with gulp, remove minified files from repo
* minor cleanup to readme <codfish>

# v0.5.0

* [(0429450)](https://github.com/codfish/jquery-data-remote/commit/042945067ef2e266bb0caab4f8b4ad07295bb22b) - add element value to request data for keyup & change events <codfish>

    If you're watching on keyup or change events, let's assume you want to
    send the value of the element as a query parameter. A good example use for this would be autosuggest search boxes.

    `<input name="q" data-event-type="keyup" data-target="#search-results">`

    Now, when you're typing in that input, the request is made with `q=<value>` automatically added to the request data for you.

# v0.4.3

* [(6066442)](https://github.com/codfish/jquery-data-remote/commit/6066442116543a993cf39a2a70e154ab10000dcc) - fix bug that allowed options set for one element to accidentally overwrite another <codfish>
* [(1a6daf1)](https://github.com/codfish/jquery-data-remote/commit/1a6daf18a03d33162cf833ab1796f1951ac5d56e) - fix bug that wasn't setting boolean options correctly <codfish>
* Minor documentation updates <codfish>
* Minor demo updates <codfish>
