# v0.5.0

- add element value to request data for keyup & change events [0429450](https://github.com/codonnell822/jquery-data-remote/commit/042945067ef2e266bb0caab4f8b4ad07295bb22b)
    * If you're watching on keyup or change events, let's assume you want to
    send the value of the element as a query parameter. A good example use for this would be autosuggest search boxes.

    <input name="q" data-event-type="keyup" data-target="#search-results">

    Now, when you're typing in that input, the request is made with `q=<value>` automatically added to the request data for you.

# v0.4.3

- fix bug that allowed options set for one element to accidentally overwrite another [6066442](https://github.com/codonnell822/jquery-data-remote/commit/6066442116543a993cf39a2a70e154ab10000dcc)
- fix bug that wasn't setting boolean options correctly [1a6daf1](https://github.com/codonnell822/jquery-data-remote/commit/1a6daf18a03d33162cf833ab1796f1951ac5d56e)
- Minor documentation updates
- Minor demo updates
