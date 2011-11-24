dark-facebook
=============

This is a userstyle for Firefox/Stylish and Social Fixer to make Facebook dark, while using as least image as possible.
For development I use [LiveStyl](https://github.com/dtinth/LiveStyl) for live CSS editing.

Most part has been done already, including some of the timeline layout and there are many parts that need tweaking.
You are welcomed to help make this userstyle more complete by forking this project.


Installation
------------

[Stylish](http://userstyles.org/):

* [__Install directly at Userstyle.org__](http://userstyles.org/styles/56731/facebook-dark-facebook). This allows you to update the code to the latest version easily.
* Or download __dark-facebook.css__ from this repository and add to Stylish manually. Make sure you add the correct `@-moz-document` tag.


[Social Fixer for Facebook](https://socialfixer.com/)

* Use this theme URL: <https://dark-facebook.appspot.com/dark-facebook.css> (it is a proxy to raw GitHub url, with proper mime type served).



Styling Details
---------------

First, everything is given a transparent background color, a gray border color,
and white text color, and then the userstyle adds background colors to things, as well as
tweaking the text and border colors of various elements.

For bright images that don't go well with the dark theme, they are darkened by reducing the opacity
thus making it look more blended to the style.

`!important` should be used in all declarations, because without it,
in Stylish the injected style declaration seem to lose and Facebook's default style seems to win.

For coloring things, a variable name should be used, with `colorize` mixin which sets the background
color of the element and also the border color, if given, and automatically adding `!important` to it.

To customize text colors, use `text-color` mixin (like a property) which sets the text color
of that element and all its descendant, along with `!important`.



Development Environment
-----------------------

Install LiveStyl first:

	npm install livestyl

I work on a Mac but maybe you can use it on Linux or Windows (maybe with Cygwin).

	node server.js

And then go to `http://localhost:25531/` and run the bookmarklet on Facebook.
Your changes will be applied when you save the file.

To generate the final CSS, run `make` __with the livestyl server running__ and it will make __dark-facebook.css__.



Publishing to Userstyles.org
----------------------------

In case you made a fork of it, you can use the provided script (written in PhantomJS) to submit your style to Userstyles.org.

But you need to create `userstyles-credentials.json` and fill it with your login credentials:

	{ "username": ".....", "password": "....." }

You also need to alter `userstyles-config.json` to make it point to the right style ID. This means you need to
create a style manually at userstyles.org first.

	{ "styleID": "56731", "filename": "dark-facebook.css" }

Finally, publish using:

	make publish

After that, the users of the userstyle can update to it.








