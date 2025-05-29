ARIA WG onboarding: Cheat sheet for new members

Please read the [ARIA WG Process Document](process.md)

# ARIA Meeting Information
## Inter Relay Chat(IRC)
### Access via IRC Cloud
* [IRC Cloud ARIA Channel URL](https://www.irccloud.com/irc/irc.w3.org/channel/aria) 
* Hostname:irc.w3.org
* Port:6679(check secure port)
* Add your nickname and more
* Go to channel #aria

### Access via [IRC Web URL](http://irc.w3.org/)
* add your **Nickname**, "your name"
* add **Channels**, "#aria"

### IRC command cheat sheet
When you first enter the channel, type:
`present+`

Commands anyone can use:
```
q+  (to add yourself to the speaker queue)
q+ to say [what you want to say]  (to add yourself to the speaker queue with reminder message)
ack me  (acknowledge oneself from the speaker queue (used when you speak - often the chair will do this)
ack ja  (acknowledge james from the q)
q- (remove from the q - use if you decide you no longer want to speak)
q?  (to find out if anyone is on the q)

[More Advanced IRC commands (rarely used)](https://www.w3.org/2001/12/zakim-irc-bot.html#speakerqueue).

s/old text/new text/  (to replace something that was typed. Make sure "old text" is unique)
s/old text//  (to delete "old text")

/me message  (sends message to channel without adding to minutes. Adds * prefix, i.e.)
* joanie says Zakim is named after a bridge in Boston and pronounced Zay come
```

These are the commands to set up a meeting
```
/invite zakim
zakim, start meeting
agendabot, find agenda
meeting: ARIA WG
chair: JamesNurthen
agenda? (to list the agenda items - chair usually enters agenda using `agenda+ item`)
```

Scribing commands used during the call:
```
scribe: [your nickname]
zakim, next item
zakim, close this item   (might need this if we try to move to the next item too soon)
zakim, take up item 6   (might need this to go directly to a specific item)

topic: topic name  (ARIA WG doesn't use this, but APG does)
github: [github issue url]  (adds current topic discussion to github issue)
agenda+ [topic to add to agenda]
```

When scribing conversation, tab key will (usually - if the user in IRC and the IRC client supports it) complete the person's name after 2 or 3 letters, for example:
```
ja[tab] completes to jamesn: 
jc[tab] completes to jcraig: 
```

Scribing commands used at the end of the call to prepare the minutes:
```
zakim, end meeting 
```
If the minutes need correcting 
```
present+ name  (if anyone who was on the call is missing from the list)
present- name  (if someone is added twice for example)
regrets+ name  (for anyone who sent regrets)
rrsagent, make minutes (re-makes the minutes)
```

Open the minutes link in a new tab, and check that they look ok (may need to refresh several times).
If all is well, email minutes link to group (I usually just reply to the agenda email).
If anything is missing, add it, and then `rrsagent, make minutes` again.

The following links have way too much information, but here they are for completeness:
- https://www.w3.org/wiki/IRC
- https://www.w3.org/2002/03/RRSAgent
- https://www.w3.org/2001/12/zakim-irc-bot

## ARIA Github Repository
* [ARIA Github Repo URL](https://github.com/w3c/aria)
* [Editor's Draft](https://w3c.github.io/aria)
   * This is built from the main branch of the ARIA repository.
* [ARIA Authoring Practices (aka the "APG")](https://www.w3.org/WAI/ARIA/apg/)
   * Developer guidance on best practices for ARIA usage
   * [Github for APG](https://www.w3.org/WAI/ARIA/apg/)
### How to contribute to the repository
* Your Github account needs to be added to list of people who have the permission to the repo. Please send email to the chairs or <public-aria-editors@w3.org> for access.
* Assign yourself to the issues to review PR.
### Current ARIA contributors
* [Participants active in the ARIA WG](https://www.w3.org/groups/wg/aria/participants)
## Communication
* New member will receive Welcome email from Chairs. If not, let the chairs know.
* ARIA WG Public mailing list:public-aria@w3.org
* Slack channels: w3ccommunity.slack.com/ #aria, web-a11y.slack.com
## Other Specifications Managed by the ARIA Working Group
* [Accessible Name and Description Computation (aka "accname")](https://github.com/w3c/accame)
   * How browser should calculate the accessible name and description for elements.
* [CORE-AAM](https://github.com/w3c/core-aam)
   * Contains mappings between ARIA and platform accessibility APIs.
* [HTML-AAM](https://github.com/w3c/html-aam)
   * Contains mappings between HTML and platform accessibility APIs.
* [DPUB-ARIA](https://github.com/w3c/dpub-aria)
* [DPUB-AAM](https://github.com/w3c/dpub-aam)
  * Contains mappings between DPUB and platform accessibility APIs.
* [MathML-AAM](https://github.com/w3c/mathml-aam)
  * Contains mappings between MathML and platform accessibility APIs.
* [Graphics-ARIA](https://github.com/w3c/graphics-aria)
* [Graphics-AAM](https://github.com/w3c/graphics-aam)
  * Contains mappings between Graphics-ARIA and platform accessibility APIs.


