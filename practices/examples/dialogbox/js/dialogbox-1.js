

/*
 * Copyright 2011-2014 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
/**
 * ARIA Menu Button example
 * @function onload
 * @desc after page has loaded initializ all dialog buttons based on the selector "button.dialogButton"
 */

window.addEventListener('load', function(){

  var dialogButtons = document.querySelectorAll('button.dialogButton');
  [].forEach.call(dialogButtons, function(dialogButton){
    if (dialogButton){
      var tb = new aria.widget.DialogButton(dialogButton)
      tb.initDialogButton();
    }  
  });
});

/** 
 * @namespace aria
 */

var aria = aria ||{};

/* ---------------------------------------------------------------- */
/*                  ARIA Utils Namespace                        */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor Menu
 *
 * @memberOf aria.Utils
 *
 * @desc  Computes absolute position of an element
 */

aria.Utils = aria.Utils ||{};

aria.Utils.findPos = function(element){
    var xPosition = 0;
    var yPosition = 0;
  
    while(element){
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return{ x: xPosition, y: yPosition };
};


/* ---------------------------------------------------------------- */
/*                  ARIA Widget Namespace                           */ 
/* ---------------------------------------------------------------- */

aria.widget = aria.widget ||{};


/* ---------------------------------------------------------------- */
/*                  dialogButton Widget                                  */
/* ---------------------------------------------------------------- */

/**
 * @constructor dialogButton
 *
 * @memberOf aria.Widget
 *
 * @desc  Creates a dialog button widget
 */

aria.widget.DialogButton = function(node){

  if (typeof node !== 'object' || !node.getElementsByClassName) return false;
  
  this.node = node

};

/**
 * @method initDialogButton
 *
 * @memberOf aria.widget.DialogButton
 *
 * @desc  Adds event handlers to button element 
 */

aria.widget.DialogButton.prototype.initDialogButton = function(){
  
  var dialogButton = this;
  
  var eventClick = function(event){
    dialogButton.eventClick();
    };
  dialogButton.node.addEventListener('click', eventClick);
  dialogButton.node.addEventListener('touchstart', eventClick);
  
};

aria.widget.DialogButton.prototype.eventClick = function(){
  this.dialogBox = new aria.widget.DialogBox(this);
  this.dialogBox.initDialogBox();

}

/**
 * @constructor Button
 *
 * @memberOf aria.Widget
 *
 * @desc  Creates a dialog box widget using ARIA 
 */

aria.widget.DialogBox = function(dialogButton){
  this.keyCode = Object.freeze({
     "TAB"    : 9,
     "RETURN" : 13,
     "ESC"    : 27,
     "SPACE"  : 32,
     "ALT"    : 18,

     "UP"    : 38,
     "DOWN"  : 40,
     "RIGHT" : 39,
     "LEFT"  : 37
  });
  this.dialogButton = dialogButton;
};

/**
 * @method initDialogBox
 *
 * @memberOf aria.Widget.DialogBox
 *
 * @desc  creates a new dialog box, processes the current guess, and adds event listeners to the dialog box.
 */

aria.widget.DialogBox.prototype.initDialogBox = function(){
  dialogBox = this;
  var winW = window.innerWidth;
  var winH = window.innerHeight;
  
  this.dialogoverlay = document.createElement('DIV');
  this.dialogoverlay.id = "dialogoverlay"
  
  buttonParent = this.dialogButton.node.parentNode;
  ce = buttonParent.firstChild
  while(ce){
    if ((ce.nodeType === Node.ELEMENT_NODE) && 
        (ce.tagName  === 'BUTTON')){
          ce = ce.nextSibling.nextSibling;
          break;
        }
    ce = ce.nextSibling;
  }
  buttonParent.insertBefore(this.dialogoverlay, ce)
  

  this.dialogBoxNode = document.createElement('DIV');
  buttonParent.insertBefore(this.dialogBoxNode, ce);
  this.dialogBoxNode.id = "dialogbox1";
  this.dialogBoxNode.setAttribute("role","dialog");
  this.dialogBoxNode.setAttribute("aria-hidden","false");
  this.dialogoverlay.style.display = "block";
  this.dialogoverlay.style.height = winH+"px";
  this.dialogBoxNode.style.left = (winW/2) - (550 * .5)+"px";
  this.dialogBoxNode.style.top = "100px";
  this.dialogBoxNode.style.display = "block";

  dialogBoxMiddle = document.createElement('DIV');
  this.dialogBoxNode.appendChild(dialogBoxMiddle);
  
  var dialogHead = document.createElement('DIV');
  dialogBoxMiddle.appendChild(dialogHead);
  dialogHead.setAttribute('class', 'dialogboxhead');
  dialogHead.setAttribute("aria-hidden","false");
  var dialogBody = document.createElement('DIV');
  dialogBoxMiddle.appendChild(dialogBody);
  dialogBody.setAttribute('class', 'dialogboxbody');
  dialogBody.setAttribute("aria-hidden","false");
  var dialogFoot = document.createElement('DIV');
  dialogBoxMiddle.appendChild(dialogFoot);
  dialogFoot.setAttribute('class', 'dialogboxfoot');
  dialogFoot.setAttribute("aria-hidden","false");
  dialogHead.innerHTML = "Add a contact";
  dialogBody.innerHTML = "Name:";
  dialogBody.innerHTML += '<br><input id="prompt_value1">';
  dialogBody.innerHTML += '<br>Phone:';
  dialogBody.innerHTML += '<br><input id="prompt_value2">';
  dialogBody.innerHTML += '<br>Address:';
  dialogBody.innerHTML += '<br><input id="prompt_value3">';
  dialogFoot.innerHTML = '<button id="submit">OK</button> <button id="last_dialog_element">Cancel</button>';
  this.firstItem = document.getElementById('prompt_value1')
  this.lastItem = document.getElementById('last_dialog_element')
  this.submit = document.getElementById('submit')
  this.firstItem.focus();
  
  var bodyNodes = document.getElementsByTagName("body");
  if (bodyNodes && bodyNodes[0]){
    this.bodyNode = bodyNodes[0];
  }
  
  this.bodyNode.setAttribute("aria-hidden","true");
  var eventClick = function(event){
    dialogBox.cancelButtonClick(event, dialogBox);
  }
  this.eventBodyClick = function(event){
    dialogBox.bodyClick(event, dialogBox);
  }
  this.eventBodyKeyDown = function(event){
    dialogBox.bodyKeyDown(event, dialogBox);
  }
  var eventKeyDown = function (event){
    dialogBox.keyDown(event, dialogBox);
  };
  
  this.lastItem.addEventListener('keydown', eventKeyDown);
  this.firstItem.addEventListener('keydown', eventKeyDown);
  this.lastItem.addEventListener('click', eventClick);
  this.firstItem.addEventListener('click', eventClick);
  this.submit.addEventListener('click', eventClick);
  this.bodyNode.addEventListener('click', this.eventBodyClick);
  this.bodyNode.addEventListener('keydown', this.eventBodyKeyDown);

}

/**
 * @method closeDialogBox
 *
 * @memberOf aria.Widget.DialogBox
 *
 * @desc  removes the dialog box and all event listeners on it.
 */
 
aria.widget.DialogBox.prototype.closeDialogBox = function(){
  this.bodyNode.removeEventListener('click', this.eventBodyClick);
  this.bodyNode.removeEventListener('keydown', this.eventBodyKeyDown);
  this.dialogBoxNode.parentNode.removeChild(this.dialogBoxNode)
  this.dialogoverlay.parentNode.removeChild(this.dialogoverlay)
  this.bodyNode.setAttribute("aria-hidden","false");
  this.dialogButton.node.focus();
}

/**
 * @method submitDialogBox
 *
 * @memberOf aria.Widget.DialogBox
 *
 * @desc  Adds all the information entered into the dialog box into the table on the page
 */
aria.widget.DialogBox.prototype.submitDialogBox = function(){
  var prompt_value1 = document.getElementById('prompt_value1').value;
  var prompt_value2 = document.getElementById('prompt_value2').value;
  var prompt_value3 = document.getElementById('prompt_value3').value;
  var contactList = document.getElementById('contact-list-body');

  tableEntry = document.createElement('TR');
  contactList.appendChild(tableEntry);
  contactName = document.createElement('TD');
  contactName.textContent = prompt_value1;
  contactPhone = document.createElement('TD');
  contactPhone.textContent = prompt_value2;
  contactAddress = document.createElement('TD');
  contactAddress.textContent = prompt_value3;
  contactList.appendChild(contactName);
  contactList.appendChild(contactPhone);
  contactList.appendChild(contactAddress);
  
  this.closeDialogBox();
}

/**
 * @method keyDown
 *
 * @memberOf aria.Widget.DialogBox
 *
 * @desc  makes sure the user cannot tab out of the dialog box
 */

 aria.widget.DialogBox.prototype.keyDown = function(event, dialogBox){
  if(event.keyCode == dialogBox.keyCode.TAB){
    if(event.shiftKey && event.currentTarget == dialogBox.firstItem){
      dialogBox.lastItem.focus();
      event.stopPropagation();
      event.preventDefault();
    }else if(event.currentTarget == dialogBox.lastItem && !event.shiftKey){
      dialogBox.firstItem.focus();
      event.stopPropagation();
      event.preventDefault();
    }
  }
}

/**
 * @method cancelButtonClick
 *
 * @memberOf aria.Widget.DialogBox
 *
 * @desc  closes the dialog box if the cancel button was clicked.
 */
 
aria.widget.DialogBox.prototype.cancelButtonClick = function(event, dialogBox){
  if(event.currentTarget == this.submit){
    dialogBox.submitDialogBox();
  }else if(event.currentTarget == this.lastItem){
    dialogBox.closeDialogBox();
  }
}

/**
 * @method bodyClick
 *
 * @memberOf aria.Widget.DialogBox
 *
 * @desc  makes sure clicks outside of the dialog box do nothing
 */

aria.widget.DialogBox.prototype.bodyClick = function(event, dialogBox){
  if(!dialogBox.dialogBoxNode.contains(event.target)){
    event.stopPropagation();
    event.preventDefault();
  }
}

/**
 * @method bodyKeyDown
 *
 * @memberOf aria.Widget.DialogBox
 *
 * @desc  Handles escape and tab presses on the body.
 */
 
aria.widget.DialogBox.prototype.bodyKeyDown = function(event, dialogBox){
  if(event.keyCode ==dialogBox.keyCode.ESC){
    dialogBox.closeDialogBox();
    
  }
  if(!dialogBox.dialogBoxNode.contains(event.target)){
    if(event.keyCode == dialogBox.keyCode.TAB){
      dialogBox.firstItem.focus();
      event.stopPropagation();
      event.preventDefault();
    }
  }
}
