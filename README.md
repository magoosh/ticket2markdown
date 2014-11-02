# Ticket2Markdown

### Initial draft of Zendesk plugin to retrieve formatted markdown from old tickets.

------


Problem: Agents cannot copy/paste old markdown-formatted "solved" tickets- leads to a lot of redundancy and reinventing the wheel.

~~Basic idea: snag <tt>html_body</tt> from Zendesk api endpoint and convert that raw (though nicely-formed) html back into markdown into a textarea kept inside a modal for easy copy/pasting by agents. Should be a single-button operation~~

BETTER IDEA (+ Zach): Just take the body and pass it as an object and avoid data processing (able to strip out he.js & to-markdown converter)


----

##Currently Figured out:

* One button operation- everything passes through perfectly and displays in a nice modal
* Determining if sub-comment was written by an agent: check the comment.source.rel and if rel == null, and if there is a reply then check if object.via.source.from.address is blank/undefined
* Populte textarea in a modal.


##Need help:
* Final packaging, integration, and deployment



Instructions to run:

1) Run zat server (https://support.zendesk.com/hc/en-us/articles/203691236-Installing-and-using-the-Zendesk-apps-tools)

2) Open a ticket (great example tickets are 55911 and 61418) 

3) Click "Allow Unsafe script to Load" and append <tt>?zat=true</tt> to URL to test 

4) Click the ACTIVATE button and let 'er rip


##Handy resources & docs:
* ZAT Instructions: https://support.zendesk.com/hc/en-us/articles/203691236-Installing-and-using-the-Zendesk-apps-tools

* Ticket Docs: https://developer.zendesk.com/rest_api/docs/core/tickets

* Useful info: https://developer.zendesk.com/apps/docs/agent/data#current-user-api

