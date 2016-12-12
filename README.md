# UNMAINTAINED (see [#74](https://github.com/dtinth/dark-facebook/issues/74))

dark-facebook 2 [![Build Status](https://travis-ci.org/dtinth/dark-facebook.svg?branch=dfb2)](https://travis-ci.org/dtinth/dark-facebook)
===============

__dark-facebook__ is a dark theme for facebook that you can install in your browser.


Usage
-----

See the [website](https://dtinth.github.io/dark-facebook/)


Contributing
------------

Because facebook is a big website,
your contribution would help this theme become more complete.

Please check out:

* [the theming process](docs/theming-process.md),
* [the contribution guidelines](CONTRIBUTING.md), and
* the development section, below.


Development
-----------

1. First, install Node.js.
2. Download the source code.
3. And run `npm install` to install the dependencies.
4. Start the development server: `node server.js`
5. Download and install the extensions for your browser:
    - [Firefox .xpi](https://dl.dropboxusercontent.com/u/25097375/dark-facebook/dfb2.xpi) ([signature](https://dl.dropboxusercontent.com/u/25097375/dark-facebook/dfb2.xpi.asc)) ([source](firefox))
    - [Chrome .crx](https://dl.dropboxusercontent.com/u/25097375/dark-facebook/chrome.crx) ([signature](https://dl.dropboxusercontent.com/u/25097375/dark-facebook/chrome.crx.asc)) ([source](chrome))
    - You can verify file integrity using [Keybase](https://keybase.io). My account is [dtinth](https://keybase.io/dtinth).
6. Disable the dark theme in Stylish/Social Fixer.
7. When you go to Facebook, you should see: "Develop dark-facebook" button at the bottom-right corner of the screen. Click that button.
8. Facebook should become dark.


History
-------

### The Second Generation

The first version suffers several serious problems:

* It overrides the colors of every elements (making all elements transparent, and start adding colors from there).
    * First, it triggered facebook's __High Contrast__ mode.
    * Also, a lot of unthemed components are totally unreadable.
* All code is in one file, making it easy to write at first, but soon it became extremely unmaintainable, and it's not contribution-friendly.
* Facebook likes to change CSS classes easily.


### The Next Approach

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





