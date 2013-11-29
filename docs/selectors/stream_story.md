# stream/story.yml



## stream-story(uistory)


A story in a stream, such as news feed, of list stream, and so on.

__Notes about separator__:
There are two types of separators
(the horizontal rule line that separates a story from another):

* `stream-story--separator` - use `border-color` to theme
* `stream-story--separator-bg` - use `background` to theme


__Selectors:__

 * .uiStreamStory



## stream-story(uistory)--highlighted


A highlighted story.
For example, when clicking on a notification for a post in a group,
the user is taken to that post.
That post is highlighted briefly in yellow.


__Selectors:__

 * .uiStreamStory[style^='background-color']



## stream-story(uistory)--comment-button


The comment button in a post.
Because it is a button and not a link,
it needs special treatment here...


__Selectors:__

 * .uiLinkButton.comment_link input



## stream-story(uistory)--headline


The headline of an item in the news feed,
usually they contain the author of the post and some descriptive items.


__Selectors:__

 * h5.uiStreamHeadline



## stream-story(uistory)--headline--author(active)

The main author of the news feed post, when they are standalone.

__Selectors:__

 * h5.uiStreamHeadline .actorName a



## stream-story(uistory)--headline--author(passive)

The main author of the news feed post, when they appear along with other text.

__Selectors:__

 * h5.uiStreamHeadline a.passiveName



## stream-story(uistory)--body

The message body.

__Selectors:__

 * .uiStreamMessage .messageBody



## stream-story(uistory)--separator-bg


The separator line between the subject an object.

For example, in a close friends stream,
you'll see when a close friend likes something.
It's the line between the headline and that thing
that your friend liked.


__Found:__ Like-style post.

__Selectors:__

 * .uiStreamEdgeStoryLine hr



## stream-story(uistory)--separator(like-page-box)


When someone shares a photo of another page,
sometimes a like button for that page appears.
There is another separator line there.


__Found:__ Close friend list, when a friend shared a photo of another page.

__Selectors:__

 * .uiStreamShareLikePageBox



## stream-story(uistory)--selected-story-indicator


The indicator at the left of the story.
It will be shown when you use a keyboard to navigate facebook.


__Selectors:__

 * .selectedStoryIndicator



## stream-story(uistory)--bling-box


In a story of a friend liking another photo,
the box that contains "likes count, comment count, and share count" in one single box.


__Selectors:__

 * .UFIBlingBox



## stream-story(2013-11-22)

__Found:__ Discovered on the news feed on 2013-11-22.

__Selectors:__

 * ._5srp



## stream-story(2013-11-22)--headline

__Selectors:__

 * ._5pbw



## stream-story(2013-11-22)--headline--author

The main author of the news feed post.

__Selectors:__

 * ._5pbw .fwb a



## stream-story(2013-11-22)--separator

__Selectors:__

 * ._5srp



## stream-story(2013-11-22)--separator(multiple)


When multiple people shares the same link,
there's another class of separator.


__Selectors:__

 * ._5pbz
 * ._4ks > li
 * ._5pbv



## stream-story(2013-11-23)

__Selectors:__

 * ._5uch



## stream-story(2013-11-23)--separator

__Selectors:__

 * ._5uch



## stream-story(suggested-page)



## stream-story(suggested-page)--headline

__Selectors:__

 * ._5srp ._66m



## stream-story(suggested-page)--headline--author

__Selectors:__

 * ._5srp ._66m ._706 a

