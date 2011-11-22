dark-facebook
=============

This is a userstyle for Firefox to make Facebook dark, while using as least image as possible.
For development I use [LiveStyl](https://github.com/dtinth/LiveStyl) for live CSS editing.

Most part has been done already, including some of the timeline layout and there are many parts that need tweaking.
You are welcomed to help make this userstyle more complete by forking this project.


Get the Userstyle
-----------------

Just download __dark-facebook.css__ from this repository and add a userstyle to Stylish.


Development Environment
-----------------------

    node /path/to/LiveStyl/livestyl.js main.styl

And then go to `http://localhost:25531/` and run the bookmarklet on Facebook.
Your changes will be applied when you save the file.

To generate the final CSS, run `make` __with the livestyl server running__ and it will make __dark-facebook.css__.



