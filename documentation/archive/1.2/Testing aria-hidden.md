**Editors Note.** Archived wiki page https://github.com/w3c/aria/wiki/Testing-aria-hidden, last edited May 8, 2020.

#### Notes:
This is a refresh of [@stevefaulkner's aria-hidden tests](https://developer.paciellogroup.com/blog/2013/11/html5-accessibility-chops-hidden-aria-hidden-support/) and [test data](https://www.html5accessibility.com/tests/hidden2013.html) from 2013.
Added a couple of new tests for visibility:hidden, and one new test for aria-hidden=false on descendant of aria-hidden=true.

#### Test cases used for testing:
https://carmacleod.github.io/playground/aria-hidden-tests.html

#### Software used for testing:
* Windows 10
* Chrome 81
* Edge 81
* Firefox 76
* Internet Explorer 11
* Safari 13.1
* JAWS 2019
* NVDA 2019.3.1
* VoiceOver on iOS 13.3.1 (iPhone SE)
* VoiceOver on macOS Catalina 10.15.4
* ChromeVox on Chrome OS ?
* Orca ? on Epiphany (Webkit) ?
* Orca ? on Chromium ? Ubuntu ?
* Orca ? on Firefox ? Ubuntu ?
* Talkback ? on Android ? Chrome ?
* Talkback ? on Android ? Firefox ?

#### Results:
screen reader support for various methods of hiding content

test | JAWS + Chrome | JAWS + Edge | JAWS + Firefox | JAWS + IE | NVDA + Chrome | NVDA + Edge | NVDA + Firefox | NVDA + IE | VoiceOver macOS + Safari | VoiceOver iOS + Safari | ChromeVox + Chrome OS | Orca + Epiphany (Webkit) | Orca + Chromium Ubuntu | Orca + Firefox Ubuntu | Talkback + Android Chrome | Talkback + Android Firefox |
--- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
`1.` aria-hidden=true | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ? | ? | ? | ? | ? | ?
`2.` html hidden | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ? | ? | ? | ? | ? | ?
`3.` CSS display:none | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ? | ? | ? | ? | ? | ?
`4.` CSS visibility:hidden | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ? | ? | ? | ? | ? | ?
`5.` CSS off screen | read | read | read | read | read | read | read | read | read | read | ? | ? | ? | ? | ? | ?
`6.` CSS off screen aria-hidden=true | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ? | ? | ? | ? | ? | ?
`7.` HTML hidden aria-hidden=false | ignored | ignored | ignored | read | ignored | ignored | ignored | ignored | read | read | ? | ? | ? | ? | ? | ?
`8.` CSS display:none aria-hidden=false | ignored | ignored | ignored | read | ignored | ignored | ignored | ignored | read | read | ? | ? | ? | ? | ? | ?
`9.` CSS visibility:hidden aria-hidden=false | ignored | ignored | ignored | read | ignored | ignored | ignored | ignored | ignored | ignored | ? | ? | ? | ? | ? | ?
`10.` HTML hidden with aria-hidden=false child | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ? | ? | ? | ? | ? | ?
`11.` aria-hidden=true with aria-hidden=false child | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ignored | ? | ? | ? | ? | ? | ?

