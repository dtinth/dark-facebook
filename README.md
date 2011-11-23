dark-facebook
=============

This is a userstyle for Firefox to make Facebook dark, while using as least image as possible.
For development I use [LiveStyl](https://github.com/dtinth/LiveStyl) for live CSS editing.

Most part has been done already, including some of the timeline layout and there are many parts that need tweaking.
You are welcomed to help make this userstyle more complete by forking this project.


Installation
------------

* [Install at Userstyle.org](http://userstyles.org/styles/56731/facebook-dark-facebook).
* or download __dark-facebook.css__ from this repository and add to Stylish manually. Make sure you add the correct `@-moz-document` tag.




Development Environment
-----------------------

I work on a Mac but maybe you can use it on Linux or Windows (maybe with Cygwin).

    node /path/to/LiveStyl/livestyl.js main.styl

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








