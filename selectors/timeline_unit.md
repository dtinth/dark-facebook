---
layout: default
title: "Selectors in timeline/unit.yml"
---

# timeline/unit.yml



## timeline-unit


A timeline unit.


__Selectors:__

 * .fbTimelineUnit



## timeline-unit--container


The timeline unit container,
one that contains the background and border.


__Selectors:__

 * .fbTimelineCapsule .timelineUnitContainer
 * .\_4lh .timelineReportContainer



## timeline-unit--container--container


But when a container is inside a container (what?!)
we have to cancel one border out.


__Selectors:__

 * .timelineReportContainer .timelineUnitContainer



## timeline-unit--background


Other elements that need some background treatment.


__Selectors:__

 * .fbTimelineUFI
 * .fbTimelineUnit .uiMorePagerLight .uiMorePagerPrimary



## timeline-unit--border


Things that need border color treatment.


__Selectors:__

 * .\_1\_m
 * .pageFriendSummaryContainer .header
 * .fbPageFriendSummarySection.needsBorder
 * .timelinePageMostRecentLabel
 * .fbTimelineUnit .uiMorePagerLight .uiMorePagerPrimary
 * .timelinePageLikedPagesLabel



## timeline-unit--rounded-border


Each unit contains a top border and bottom border.
Facebook uses images to make these unit look rounder.


__Selectors:__

 * .fbTimelineCapsule .topBorder
 * .fbTimelineCapsule .bottomBorder



## timeline-unit--title

__Selectors:__

 * .\_70l



## timeline-unit--image-container


The image container in a featured story in timeline.


__Selectors:__

 * .uiScaledImageCentered



## timeline-unit--comments


The comments section.


__Selectors:__

 * .fbTimelineUFI



## timeline-unit--comments--container


The container that contains the comments section.
They need some background treatment.


__Selectors:__

 * .fbTimelineFeedbackActions
 * .timelineUnitContainer .UFIList



## timeline-unit--comments--separator


The separator between the buttons 'Like / Comment / Share'
and the sentence that says (someone likes this).
We need to color its line.


__Selectors:__

 * .timelineUnitContainer .UFIRow



## timeline-unit--num-friends-like


The number of friends that likes this page.


__Selectors:__

 * .pageFriendSummaryContainer .headerDigit



## timeline-unit(2014)


The upcoming version of the timeline unit.
Used in Year in Review and Notes.


__Selectors:__

 * .\_4-u2



## timeline-unit(2014)--text(title)

__Selectors:__

 * .\_4-u2 h1, .\_4-u2 h2, .\_4-u2 h3, .\_4-u2 h4, .\_4-u2 h5, .\_4-u2 h6



## timeline-unit(2014)--comments

__Selectors:__

 * .\_4-u2



## timeline-unit(2014)--comments--container

__Selectors:__

 * .\_6kb

