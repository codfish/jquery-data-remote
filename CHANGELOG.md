# v0.8.3

* [3ceddb8](https://github.com/codfish/jquery-data-remote/3ceddb804eb1299c5176ea1d45076f482ebeb0e0) - Specify uglify as a dependency for the gulp demo <Chris O'Donnell>
* [1ba0d86](https://github.com/codfish/jquery-data-remote/1ba0d86a50bde0fe1cc53f2afae2390ce23c86f8) - Remove dist from gitignore to start tracking built files <Chris O'Donnell>
* [2258ec1](https://github.com/codfish/jquery-data-remote/2258ec1d7460ada5ee47494a625ffb14ca3882ca) - Refactor main callback event handling <Chris O'Donnell>
* [311937e](https://github.com/codfish/jquery-data-remote/311937ee34ae0e92bdf59918dcf065221e1c4529) - Fix use strict in dist version <Chris O'Donnell>
* [13ec1bc](https://github.com/codfish/jquery-data-remote/13ec1bc4c2e748a4105e0a78373eecf19acf820b) - Cleanup readme <Chris O'Donnell>

# v0.8.2

* [73e28b6](https://github.com/codfish/jquery-data-remote/73e28b63c4fd6a3f383cee3ab6c8feb79feca96a) - update travis npm token <Chris O'Donnell>

# v0.8.1

* [d938ef7](https://github.com/codfish/jquery-data-remote/d938ef73e5d9ec78b07451ea36489c5b5b075811) - travis: add language attributes, set skip cleanup to true <Chris O'Donnell>

# v0.8.0

* [9060279](https://github.com/codfish/jquery-data-remote/9060279ca845cc7f05190927b3e11649b71463fb) - add travis install & script steps, change gulp tasks <Chris O'Donnell>
* [bbe1b61](https://github.com/codfish/jquery-data-remote/bbe1b61c836fafb6bdd4e19da656bdb922db460a) - add travis integration to auto publish to npm <Chris O'Donnell>
* [075ecca](https://github.com/codfish/jquery-data-remote/075ecca10ddbe3d1bb1d5a3fee3235df6d297012) - update demo jsfiddle embed to use base path <Chris O'Donnell>
* [f3889d8](https://github.com/codfish/jquery-data-remote/f3889d867b9e16ded5f0dea32a75e9fac27c2906) - update demo jsfiddle embed and loader image path <Chris O'Donnell>
* [be98a03](https://github.com/codfish/jquery-data-remote/be98a03519190d03fb45b8ccb3e36cf7a013a148) - es6 improvements <Chris O'Donnell>
* [e57e1f8](https://github.com/codfish/jquery-data-remote/e57e1f875ebee9d8fc05b81edc2df94c190e08b7) - change default gulp task to build js <Chris O'Donnell>
* [e2e31de](https://github.com/codfish/jquery-data-remote/e2e31de2b879e4c74f3ea68644a436816885f420) - update loader image html to template string <Chris O'Donnell>
* [f3c5a44](https://github.com/codfish/jquery-data-remote/f3c5a44c23e99e186437fd59125b946f1857921f) - add loader image to demo <Chris O'Donnell>
* [f9c06fc](https://github.com/codfish/jquery-data-remote/f9c06fc089ee40620e3f1f13983a6380930c5b9d) - improve gulp serve task <Chris O'Donnell>

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
