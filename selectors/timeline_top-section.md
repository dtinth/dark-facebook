---
layout: default
title: "Selectors in timeline/top-section.yml"
---

# timeline/top-section.yml



## timeline-top-section


The timeline top section that,
for a page,
contains the page name,
brief information,
the like button,
and other links.


__Selectors:__

 * .fbTimelineTopSection



## timeline-top-section--base

__Selectors:__

 * .fbTimelineTopSectionBase



## timeline-top-section--bottom-border


At the very bottom of the top section of the timeline,
there is a curved border image at the bottom.
Thus, we need to eliminate it.


__Selectors:__

 * .topSectionBottomBorder



## timeline-top-section--frame


Those rectangle links in the timeline.


__Selectors:__

 * .fbTimelineNavigationWrapper .frame



## timeline-top-section--frame--inner

__Selectors:__

 * .fbTimelineNavigationWrapper .frame .mat



## timeline-top-section--frame--detail


We need a separate detail selector
because that's where the background gets applied.

If we just apply the background to the frame,
some pictures will go missing.


__Selectors:__

 * .fbTimelineNavigationWrapper .detail



## timeline-top-section--frame--blurb


The short information about the page. The about section.


__Selectors:__

 * .fbTimelineSummarySection span.fbLongBlurb



## timeline-top-section--frame--title-text


The title text of each frame item.


__Selectors:__

 * .fbTimelineNavigationWrapper .title .text



## timeline-top-section--ribbon

![docs/images/components/timeline-top-section--ribbon.png](https://github.com/dtinth/dark-facebook/blob/dfb2/docs/images/components/timeline-top-section--ribbon.png?raw=true)


The more button at the timeline header.


__Selectors:__

 * .fbTimelineMoreButton .fbTimelineRibbon



## timeline-top-section--headline


The page name.


__Selectors:__

 * \#fbTimelineHeadline h2

