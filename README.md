dark-facebook 2
===============

__dark-facebook__ is a dark theme for facebook that you can install in your browser.


The Second Generation
---------------------

The first version suffers several serious problems:

* It overrides the colors of every elements (making all elements transparent, and start adding colors from there).
    * First, it triggered facebook's __High Contrast__ mode.
    * Also, a lot of unthemed components are totally unreadable.
* All code is in one file, making it easy to write at first, but soon it became extremely unmaintainable, and it's not contribution-friendly.
* Facebook likes to change CSS classes easily.


The Next Approach
-----------------

* __Separate the component styles from facebook's selectors.__
  Since facebook likes to change CSS classes,
  we should not depend on them too much.
  Our approach is to give each and every component a name,
  then have a "selector definition" file that maps a selector to appropriate component.
* __Work in multiple files,__
  making it easier to search for things.
* __Better documentation.__
  The selector definition file should contain human-readable and descriptive information about each component:
  What does this component refer to on facebook,
  and where to find it.
* __Contribution friendly.__
  I should invest more time in making this project as documentation-friendly as possible.
* __No Global Override.__
  This time, we will add dark styles to facebook,
  component by component.


Contribution
------------

Because facebook is a big website,
your contribution would help this theme become more complete.

Please check out

* [the theming process](docs/theming-process.md),
* [the contribution guidelines](CONTRIBUTING.md), and
* the development section, below.


Development
-----------

### Prerequisites

1. First, install Node.js.
2. Download the source code.
3. And run `npm install` to install the dependencies.
4. [Set Firefox to allow Scratchpad to access Firefox internals](https://developer.mozilla.org/en-US/docs/Tools/Scratchpad#Using_Scratchpad_to_access_Firefox_internals) by going to `about:config` and setting `devtools.chrome.enabled` to `true`.
5. Install __Stylish__ for Firefox.

### Development (Live CSS Preview with Stylish)

1. Start the server: `node server.js`
2. In __Stylish__, select __Write new style__ and select __Blank style...__ and leave it like that.
4. Open Firefox, __Tools__, __Web Developer__, __Scratchpad__.
5. In Scratchpad, set __Environment__ to __Browser__.
6. Click __Open File__ and select `firefox-previewer.js`.
7. Click __Run__. The script will compile dark-facebook to CSS and put it in stylish, and previews it automatically. It will also auto-reload the CSS when you save file.

Remarks

* When you quit the server, the script is finished. When you start a server, you have to run the script again.








