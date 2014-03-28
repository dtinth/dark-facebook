---
layout: default
title: "Selectors in chat/nub.yml"
---

# chat/nub.yml



## chat-nub

![docs/images/components/chat-nub.png](https://github.com/dtinth/dark-facebook/blob/dfb2/docs/images/components/chat-nub.png?raw=true)


The chat tabs that appear at the bottom of the page,
at the left of the chat sidebar.

Not sure why, but facebook calls them "nub".
It's a cute name though, I think.


__Selectors:__

 * .fbDock .rNubContainer



## chat-nub--button


The tab buttons. This may refer to

- the translation button
- the chat tab (closed one)
- the chat button (when the sidebar is closed)


__Selectors:__

 * .fbNubButton



## chat-nub--online-count


The friend count in the chat button.


__Selectors:__

 * .fbNubButton .label .count



## chat-nub--name

__Selectors:__

 * .fbChatTab .name



## chat-nub--decoration


In the new Facebook UI design (March 2014),
facebook added rounded borders to chat tabs.


__Selectors:__

 * .\_5q5b .fbNubButton:before
 * .\_5q5b .fbNubButton:after



## chat-nub-flyout


When you click on a nub button, it expands!
It became a nub flyout. For example, an opened chat tab.


__Selectors:__

 * .fbNubFlyout



## chat-nub-flyout--content

The contents of the nub flyout, which should be styled black.

__Selectors:__

 * .fbNubFlyoutHeader
 * .fbNubFlyoutBody
 * .fbNubFlyoutAttachments
 * .fbNubFlyoutFooter



## chat-nub-flyout--body

__Selectors:__

 * .fbNubFlyoutBody



## chat-nub-flyout--footer

This footer contains the message input box for chat tabs.

__Selectors:__

 * .fbNubFlyoutFooter



## chat-nub-flyout--titlebar

__Selectors:__

 * .fbNubFlyoutTitlebar



## chat-nub-flyout--titlebar--active

__Selectors:__

 * .focusedTab .fbNubFlyoutTitlebar



## chat-nub-flyout--attachments

![docs/images/components/chat-nub-flyout--attachments.png](https://github.com/dtinth/dark-facebook/blob/dfb2/docs/images/components/chat-nub-flyout--attachments.png?raw=true)


When sharing a link, the link information displays in the attachment.


__Selectors:__

 * .fbNubFlyoutAttachments



## chat-nub-flyout--attachments--shelf

__Selectors:__

 * .fbNubFlyoutAttachments .chatAttachmentShelf



## chat-nub-flyout--attachments--shelf--border

__Selectors:__

 * .\_2qh



## chat-nub-flyout--unread-count


The unread count in the more menu.


__Selectors:__

 * .\_51jt .unreadCount

