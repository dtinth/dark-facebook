---
layout: default
title: "Selectors in timeline/timeline.yml"
---

# timeline/timeline.yml



## timeline

__Selectors:__

 * .timelineLayout



## timeline--content-column


The content column in a timeline.
Must reset its background color to transparent.


__Selectors:__

 * .timelineLayout \#contentCol



## timeline--scrubber


The scrubber at the right side of the timeline.
It contains a list of times to travel, like, um...
Recent, 2010s, 2009, ..., Born.


__Selectors:__

 * \#contentCol .fbTimelineScrubber



## timeline--scrubber--item

__Selectors:__

 * \#contentCol .fbTimelineScrubber li a



## timeline--scrubber--item--selected

__Selectors:__

 * \#contentCol .fbTimelineScrubber li.selected a



## timeline--time-period


The time period view is the two-column view,
with a line going in the middle...


__Selectors:__

 * .fbTimelineTimePeriod
 * .fbTimelineCapsule



## timeline--spine-pointer


The pointy thing that points a post to the center time line.
They look bad here, so it'd be better if they were hidden.


__Selectors:__

 * .spinePointer



## timeline--separator


Separators between list items.


__Selectors:__

 * .\_5gf9
 * .\_1ln2 .uiList > li
 * .\_55-w



## timeline--attachment


Things like book thumbnails, and stuffs.


__Selectors:__

 * .\_4jul .\_ph5



## timeline--time-marker


The blue time marker, like "Earlier in 2013"


__Selectors:__

 * .fbTimelineContentHeader h3.uiHeaderTitle
 * .fbTimelineInlineSectionHeader h3.uiHeaderTitle



## timeline-button-pagelet


At the top right, where it says, "Create Page"


__Selectors:__

 * .pagesTimelineButtonPagelet

