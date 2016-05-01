

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
 * @desc finds and initializes a guessing game
 */

window.addEventListener('load', function(){

  var guessingDiv = document.getElementById("numberGuessingGame");
  var tb = new aria.widget.GuessingGame(guessingDiv)
  tb.initGuessingGame();
  
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
/*                  GuessingGame Widget                                  */
/* ---------------------------------------------------------------- */

/**
 * @constructor GuessingGame
 *
 * @memberOf aria.Widget
 *
 * @desc  Creates a guessing game widget
 */

aria.widget.GuessingGame = function(guessingDiv){

  this.guessingDiv = guessingDiv;
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

};

/**
 * @method initGuessingGame
 *
 * @memberOf aria.widget.GuessingGame
 *
 * @desc  Adds event handlers that allow interaction with the game
 */

aria.widget.GuessingGame.prototype.initGuessingGame = function(){
  
  var GuessingGame = this;
  
  var buttons = document.getElementsByTagName("button");
  if (buttons && buttons[0] && buttons[1]){
    this.submitButton = buttons[0];
    this.resetButton = buttons[1];
  }
  
  var inputs = document.getElementsByTagName("input");
  if (inputs && inputs[0]){
    this.input = inputs[0];
  }
  var submitGuess = function(event){
    GuessingGame.submitGuess();
    };
  var inputKeyDown = function(event){
    GuessingGame.inputKeyDown();
  };
  var initializeGame = function(event){
    GuessingGame.initializeGame();
    };
  this.submitButton.addEventListener('click', submitGuess);
  this.submitButton.addEventListener('touchstart', submitGuess);
  this.resetButton.addEventListener('click', initializeGame);
  this.resetButton.addEventListener('touchstart', initializeGame);
  this.input.addEventListener('keydown', inputKeyDown);
  
  GuessingGame.initializeGame();
  
};

/**
 * @method submitGuess
 *
 * @memberOf aria.Widget.GuessingGame
 *
 * @desc  Adds to the guess count and creates a new dialogBox
 */

aria.widget.GuessingGame.prototype.submitGuess = function(){
  this.numberOfGuesses += 1;
  this.dialogBox = new aria.widget.DialogBox(this);
  this.dialogBox.initDialogBox();

}

/**
 * @method initializeGame
 *
 * @memberOf aria.Widget.GuessingGame
 *
 * @desc  Creates the random number to be guessed and resets the guess count
 */

 aria.widget.GuessingGame.prototype.initializeGame = function(){
  this.value = Math.floor(Math.random()*(10)) + 1;
  this.numberOfGuesses = 0;
  this.submitButton.disabled = false;
  this.input.value = "";
  this.input.focus();
}

/**
 * @method inputKeyDown
 *
 * @memberOf aria.Widget.GuessingGame
 *
 * @desc  handles events on the input field.
 */
 
aria.widget.GuessingGame.prototype.inputKeyDown = function(){
  
  if(event.keyCode == this.keyCode.RETURN && !this.submitButton.disabled){
    this.submitGuess();
    event.stopPropagation();
    event.preventDefault();
  }else if(event.keyCode == this.keyCode.RETURN){
    this.initializeGame()
    event.stopPropagation();
    event.preventDefault();
  }
}

/**
 * @constructor Button
 *
 * @memberOf aria.Widget
 *
 * @desc  Creates a Dialog Box widget using ARIA 
 */

aria.widget.DialogBox = function(guessingGame){
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
  this.guessingGame = guessingGame;
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
  this.correct = false;
  var winW = window.innerWidth;
  var winH = window.innerHeight;
  this.dialogoverlay = document.createElement('DIV');
  this.dialogoverlay.id = "dialogoverlay"
  buttonParent = this.guessingGame.submitButton.parentNode;
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
  
  this.dialogoverlay.style.display = "block";
  this.dialogoverlay.style.height = winH+"px";
  this.dialogBoxNode = document.createElement('DIV');
  buttonParent.insertBefore(this.dialogBoxNode, ce);
  this.dialogBoxNode.id = "dialogbox1";
  this.dialogBoxNode.setAttribute("role","dialog");
  this.dialogBoxNode.setAttribute("aria-hidden","false");
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
  dialogHead.innerHTML = "Alert Box";
  var guessedValue = this.guessingGame.input.value
  if(isNaN(guessedValue) || guessedValue == ""){
    dialogBody.innerHTML = "You must guess an int"
  }
  else if(this.guessingGame.value > guessedValue){
    dialogBody.innerHTML = "Your guess of " + guessedValue + " was too small.";
  }
  else if(this.guessingGame.value < guessedValue){
    dialogBody.innerHTML = "Your guess of " + guessedValue + " was too large.";
  }
  else if(this.guessingGame.value == guessedValue){
    if(this.guessingGame.numberOfGuesses == 1){
      dialogBody.innerHTML = "Your guess of " + guessedValue + " was correct.  You got it on the first try!";
    }else{
      dialogBody.innerHTML = "Your guess of " + guessedValue + " was correct! It only took you " + this.guessingGame.numberOfGuesses + " tries.";
    }
    this.guessingGame.submitButton.disabled = true;
    this.correct = true;
  }
  
  
  dialogFoot.innerHTML = '<button id="last_dialog_element">Cancel</button>';
  this.cancelButton = document.getElementById('last_dialog_element')
  this.cancelButton.focus();
  
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
  
  this.cancelButton.addEventListener('keydown', eventKeyDown);
  this.cancelButton.addEventListener('click', eventClick);
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
  if(!this.correct){
    this.guessingGame.input.focus();
    this.guessingGame.input.select();
  }else{
    this.guessingGame.resetButton.focus();
  }
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
    if(event.shiftKey && event.currentTarget == dialogBox.cancelButton){
      dialogBox.cancelButton.focus();
      event.stopPropagation();
      event.preventDefault();
    }else if(event.currentTarget == dialogBox.cancelButton && !event.shiftKey){
      dialogBox.cancelButton.focus();
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
    dialogBox.closeDialogBox();

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
      dialogBox.cancelButton.focus();
      event.stopPropagation();
      event.preventDefault();
    }
  }
}
