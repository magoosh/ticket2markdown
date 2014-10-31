# Ticket2Markdown

First draft of Zendesk plugin to retrieve formatted markdown from old tickets.

------

Problem: Agents cannot copy/paste pretty markdown-formatted "solved" tickets- leads to a lot of redundancy and reinventing the wheel.

Basic idea: snag <tt>html_body</tt> from Zendesk api endpoint and convert that raw (though nicely-formed) html back into markdown into a textarea kept inside a modal for easy copy/pasting by agents. Should be a single-button operation

----

#Currently Figured out:

* Can retrive ALL the <tt>html_body</tt> tags from response and convert to nice markdown
* Modal popup and firing on button click
* Retrieving current ticket id and form correct URL
*


#*Need help:*

* How to populate a textarea in Zendesk-style modal window (element selector method?)
* How to determine if author a sub-comment in a ticket was written by an agent or not and ignore that particular <tt>html_body</tt> if the author wasn't an agent (ex. perhaps check authorID or see if there's some other 100% accurate "flag")
* Performant way to convert relevant html_body responses to markdown (currently shoehorning the converter right in the function)
* (Later): Final packaging and deployment



Instructions:

1) Run zat server (https://support.zendesk.com/hc/en-us/articles/203691236-Installing-and-using-the-Zendesk-apps-tools)

2) append **?zat=true** to URL to test.

3) Open a ticket and click the "Get Raw Text" button (you'll be bombarded with alerts but notice they're converting the raw html to markdown)



##Handy resources & docs:

* Working model (want to automate this): https://5a9ffd27be07ef929b51d58ad708e596b985cd32.googledrive.com/host/0B55dMNU451j4OWlGRUJEY09RVVE

* Ticket Docs: https://developer.zendesk.com/rest_api/docs/core/tickets

* Useful info: https://developer.zendesk.com/apps/docs/agent/data#current-user-api

* Markdown to html: https://github.com/domchristie/to-markdown

* he.js: https://github.com/mathiasbynens/he



