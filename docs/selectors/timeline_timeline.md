# timeline/timeline.yml



## timeline

__Selectors:__

 * .timelineLayout



## timeline--content-column


The content column in a timeline.
Must reset its background color to transparent.


__Selectors:__

 * .timelineLayout #contentCol



## timeline--scrubber


The scrubber at the right side of the timeline.
It contains a list of times to travel, like, um...
Recent, 2010s, 2009, ..., Born.


__Selectors:__

 * #contentCol .fbTimelineScrubber



## timeline--scrubber--item

__Selectors:__

 * #contentCol .fbTimelineScrubber li a



## timeline--scrubber--item--selected

__Selectors:__

 * #contentCol .fbTimelineScrubber li.selected a



## timeline--unit


A timeline unit.


__Selectors:__

 * .fbTimelineUnit



## timeline--unit--container


The timeline unit container,
one that contains the background and border.


__Selectors:__

 * .fbTimelineCapsule .timelineUnitContainer
 * ._4lh .timelineReportContainer



## timeline--unit--container--container


But when a container is inside a container (what?!)
we have to cancel one border out.


__Selectors:__

 * .timelineReportContainer .timelineUnitContainer



## timeline--unit--background


Other elements that need some background treatment.


__Selectors:__

 * .fbTimelineUFI



## timeline--unit--border


Each unit contains a top border and bottom border.
Facebook uses images to make these unit look rounder.


__Selectors:__

 * .fbTimelineCapsule .topBorder
 * .fbTimelineCapsule .bottomBorder



## timeline--unit--title

__Selectors:__

 * ._70l



## timeline--unit--comments


The comments section.


__Selectors:__

 * .fbTimelineUFI



## timeline--unit--comments--container


The container that contains the comments section.
They need some background treatment.


__Selectors:__

 * .fbTimelineFeedbackActions
 * .timelineUnitContainer .UFIList



## timeline--unit--comments--separator


The separator between the buttons 'Like / Comment / Share'
and the sentence that says (someone likes this).
We need to color its line.


__Selectors:__

 * .timelineUnitContainer .UFIRow



## timeline--separator


Separators between list items.


__Selectors:__

 * ._5gf9
 * ._1ln2 .uiList > li
 * ._55-w



## timeline--attachment


Things like book thumbnails, and stuffs.


__Selectors:__

 * ._4jul ._ph5

