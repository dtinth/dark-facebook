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


The Build Process
-----------------












