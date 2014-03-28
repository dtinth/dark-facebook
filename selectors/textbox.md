---
layout: default
title: "Selectors in textbox.yml"
---

# textbox.yml



## search-input


A search input.


__Selectors:__

 * .uiSearchInput



## common-inputtext


All text input boxes in the page.

I believe they should all be styled black...
We can fix the surrounding colors later.


__Selectors:__

 * .inputtext
 * .textInput



## common-mentions-input


A textarea that supports mentioning names and hashtags.
The names are highlighted.

They, too, need special treatment.


__Selectors:__

 * .uiMentionsInput



## common-mentions-input--typeahead


The typeahead zone for this mentions input.
We need to strip off their background color.


__Selectors:__

 * .uiMentionsInput .mentionsTypeahead



## common-mentions-input--textarea


The textarea for this mentions input.
We too need to strip off their background color.


__Selectors:__

 * .uiMentionsInput .mentionsTypeahead .mentionsTextarea



## common-mentions-input--highlight


A highlighted item.


__Selectors:__

 * .uiMentionsInput .highlighter b



## common-placeholder


The placeholder controls.


__Selectors:__

 * .DOMControl\_placeholder

