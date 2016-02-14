

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
 
/*
 * ARIA Menu Button example
 * @function onload
 * @desc 
 */

window.addEventListener('load', function(){

  var comboBoxes = document.querySelectorAll('div.combobox');

  [].forEach.call(comboBoxes, function(comboBox){
    if (comboBox){
      var mb = new aria.widget.ComboBoxInput(comboBox)
      mb.initComboBox();
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

 * @desc  Computes absolute position of an element
 *
 * @param  element    DOM node  -  DOM node object
 *
 * @retruns  Object  Object contains left and top position
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
/*                  ARIA Widget Namespace                        */ 
/* ---------------------------------------------------------------- */

aria.widget = aria.widget ||{};


/* ---------------------------------------------------------------- */
/*                        List Box Widget                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor ComboBoxInput
 *
 * @memberOf aria.Widget
 *
 * @desc  Creates a ComboBox widget using ARIA 
 *
 * @param  node    DOM node  -  DOM node object
 *
 * @property  keyCode      Object    -  Object containing the keyCodes used by the slider widget
 *
 * @property  node               Object    -  JQuery node object
 */

aria.widget.ListBox = function(comboBox){

  this.keyCode = Object.freeze({
    "TAB"      : 9,
    "RETURN"   : 13,
    "ESC"    : 27,
    "SPACE"    : 32,
    "ALT"      :18,

    "PAGEUP"    : 33,
    "PAGEDOWN" : 34,
    "END"      : 35,
    "HOME"     : 36,

    "LEFT"  : 37,
    "UP"    : 38,
    "RIGHT" : 39,
    "DOWN"  : 40,
  });

  this.comboBox = comboBox;
  this.firstComboItem = false;
  this.lastComboItem = false;
  this.selectedItem = false;
  this.tabDistance = 0;
};

/**
 * @method initComboBox
 *
 * @memberOf aria.widget.ListBox
 *
 * @desc  Add event listeners to all listbox elements 
 */

aria.widget.ListBox.prototype.initListBox = function(){

  var listBox = this;
  var cn = this.comboBox.listBoxNode.firstChild;
  var numItems = 0;
  
  while (cn){
    if (cn.nodeType === Node.ELEMENT_NODE){
      if (cn.getAttribute('role')  === 'option'){
        numItems += 1;
        cn.tabIndex = -1;
        if (!this.firstComboItem) this.firstComboItem = cn; 
        this.lastComboItem = cn;

        // This is for the case of the LI elements containing the A elements
        var links = cn.getElementsByTagName('A');

        if (links.length){
          links[0].tabIndex = -1;
          cn.href = links[0].href;
        }

        var eventKeyDown = function (event){
          listBox.eventKeyDown(event, listBox);
        };

        cn.addEventListener('keydown', eventKeyDown);

        var eventClick = function (event){
          listBox.eventClick(event, listBox);
        };

        cn.addEventListener('click', eventClick);
      }
    }
    cn = cn.nextSibling;
  }
  listBox.calcTabDistance(numItems);
  
  this.button = new aria.widget.Button(this.comboBox);
  this.button.initButton();
};

/**
 * @method calcTabDistance
 *
 * @memberOf aria.widget.ListBox
 *
 * @desc  Moves focus to next item
 */
 
aria.widget.ListBox.prototype.calcTabDistance = function(numItems){

  if(numItems){
    this.tabDistance = numItems/10;
    if(this.tabDistance < 5)this.tabDistance = 5;
    if(this.tabDistance > 15) this.tabDistance = 15;
  }
}

/**
 * @method nextComboItem
 *
 * @memberOf aria.widget.ListBox
 *
 * @desc  Moves focus to next item
 */

aria.widget.ListBox.prototype.nextComboItem = function(ci){

  var mi = ci.nextSibling;

  while (mi){
    if ((mi.nodeType === Node.ELEMENT_NODE) && 
      (mi.getAttribute('role')  === 'option')){
      this.selectedItem = mi;
      break;
    }
    mi = mi.nextSibling;
  }

  if (!mi && this.firstComboItem){
    mi =  this.firstComboItem;
    this.selectedItem = mi;
  }

  return mi;
};

/**
 * @method moveToNextComboItem
 *
 * @memberOf aria.widget.ListBox
 *
 * @desc  Moves focus down the item list 
 */

aria.widget.ListBox.prototype.moveToNextComboItem = function(ci , n){

  var mi = ci;
  for( var i = 0; i < n; i++){
    mi = mi.nextSibling.nextSibling;
    if(!mi)break;
    if(mi.nodeType === Node.ELEMENT_NODE &&
      (mi.getAttribute('role')  === 'option')){
      this.selectedItem = mi;
    }
  }
  if (!mi && this.firstComboItem){
    mi = this.lastComboItem;
    this.selectedItem = mi;
  }

  return mi;
};


/**
 * @method previousComboItem
 *
 * @memberOf aria.widget.ListBox
 *
 * @desc  Moves focus to previous item 
 */

aria.widget.ListBox.prototype.previousComboItem = function(ci){

  var mi = ci.previousSibling;

  while (mi){
    if(mi.nodeType === Node.ELEMENT_NODE &&
      (mi.getAttribute('role')  === 'option')){
      mi.focus();
      this.selectedItem = mi;
      break;
    }
    mi = mi.previousSibling;
  }

  if (!mi && this.lastComboItem){
    mi = this.lastComboItem;
    this.selectedItem = mi;
    this.lastComboItem.focus();
  }
  
  return mi;
};

/**
 * @method moveToPreviousComboItem
 *
 * @memberOf aria.widget.ListBox
 *
 * @desc  Moves focus up the item list 
 */

aria.widget.ListBox.prototype.moveToPreviousComboItem = function(ci, n){

  var mi = ci;
  for( var i = 0; i < n; i++){
    mi = mi.previousSibling.previousSibling;
    if(!mi)break;
    if(mi.nodeType === Node.ELEMENT_NODE &&
      (mi.getAttribute('role')  === 'option')){
      mi.focus();
      this.selectedItem = mi;
      }
  }
  if (!mi && this.firstComboItem){
    mi = this.firstComboItem;
    this.selectedItem = mi;
    this.firstComboItem.focus();
  }

  return mi;
};

/**
 * @method setInput
 *
 * @memberOf aria.widget.ListBox
 *
 * @desc  Set the text of the input field.
 */

aria.widget.ListBox.prototype.setInput = function(ci){
  
  this.comboBox.inputNode.value = ci.childNodes[0].nodeValue;
};


/**
 * @method setInput
 *
 * @memberOf aria.widget.ListBox
 *
 * @desc  Set the text of the input field.
 */
 
aria.widget.ListBox.prototype.activateSelectedItem = function(){

  this.selectedItem.focus()
  this.setInput(this.selectedItem)
  
}

/**
 * @method nextAlphaComboItem
 *
 * @memberOf aria.widget.ListBox
 *
 * @desc  Find the next instance of a combo item matching the key pressed.
 */

aria.widget.ListBox.prototype.nextAlphaComboItem = function(event){

  var keyCode = String.fromCharCode(event.keyCode).toLowerCase();
  var flag = false;
  
  if (keyCode >= '0' && keyCode <= 'z'){
    cn = this.selectedItem.nextSibling;
    while(cn){
      if (cn.nodeType === Node.ELEMENT_NODE){
        if (cn.getAttribute('role')  === 'option'){
          if (cn.childNodes[0].nodeValue.charAt(0).toLowerCase() === keyCode){
            nt = cn;
            this.selectedItem = nt;
            flag = true;
            break;
          }
        }
      }
      cn = cn.nextSibling;
    }
    if(!flag){
      cn = this.comboBox.listBoxNode.firstChild.nextSibling
      while(cn){
        if (cn.nodeType === Node.ELEMENT_NODE){
          if (cn.getAttribute('role')  === 'option'){
            if (cn.childNodes[0].nodeValue.charAt(0).toLowerCase() === keyCode){
              nt = cn;
              this.selectedItem = nt;
              break;
            }
          }
        }
      cn = cn.nextSibling;
      }
    }
    return nt;
  }
}

/**
 * @method eventKeyDown
 *
 * @memberOf aria.widget.ListBox
 *
 * @desc  Keydown event handler for ListBox Object
 *        NOTE: The listBox parameter is needed to provide a reference to the specific
 *               listBox 
 */

aria.widget.ListBox.prototype.eventKeyDown = function(event, listBox){

  var ct = event.currentTarget;
  var nt = ct;
  
  var flag = false;

  switch(event.keyCode){
  
  case listBox.keyCode.RETURN:
  case listBox.keyCode.ESC:
    listBox.comboBox.closeListBox();
    listBox.comboBox.inputNode.focus();  
    flag = true;
    break;

  case listBox.keyCode.UP:
    if (event.altKey){
      listBox.comboBox.toggleListBox();
      listBox.comboBox.inputNode.focus();
      flag = true;
      break;
    }
    nt = listBox.previousComboItem(ct);
    flag = true;
    break;
  
  case listBox.keyCode.LEFT:
    nt = listBox.previousComboItem(ct);
    flag = true;
    break;

  case listBox.keyCode.DOWN:
    if (event.altKey){
      listBox.comboBox.toggleListBox();
      listBox.comboBox.inputNode.focus();
      flag = true;  
      break;
    }
    nt = listBox.nextComboItem(ct);
    flag = true;
    break;
    
  case listBox.keyCode.RIGHT:
    nt = listBox.nextComboItem(ct);
    flag = true;
    break;

  case listBox.keyCode.TAB:
    listBox.comboBox.closeListBox();
    break;
  
  case listBox.keyCode.PAGEUP:
    nt = listBox.moveToPreviousComboItem(ct, listBox.tabDistance);
    flag = true;  
    break;
    
  case listBox.keyCode.PAGEDOWN:
    nt = listBox.moveToNextComboItem(ct, listBox.tabDistance);
    flag = true;  
    break;

  default:
    nt = listBox.nextAlphaComboItem(event);
    if(nt) flag = true;
    break;
  }

  if (flag){
    if(nt){listBox.activateSelectedItem()}
    event.stopPropagation();
    event.preventDefault();
  }  
  
};

/**
 * @method eventKeyDown
 *
 * @memberOf aria.widget.ListBox
 *
 * @desc  Keydown event handler for ListBox Object
 *        NOTE: The listBox parameter is needed to provide a reference to the specific
 *               listBox 
 */

aria.widget.ListBox.prototype.eventClick = function(event, listBox){
  var ct = event.currentTarget;
  listBox.selectedItem = ct;
  listBox.setInput(ct)
  listBox.comboBox.toggleListBox();
}


/* ---------------------------------------------------------------- */
/*                  ComboBox Input Widget                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor ComboBox Input
 *
 * @memberOf aria.Widget
 *
 * @desc  Creates a combo bot input widget using ARIA 
 *
 * @param  node    DOM node  -  DOM node object
 *
 * @property  keyCode      Object    -  Object containing the keyCodes used by the slider widget
 *
 * @property  node               Object    -  JQuery node object
 */

aria.widget.ComboBoxInput = function(node){

  this.keyCode = Object.freeze({
     "TAB"    : 9,
     "RETURN" : 13,
     "ESC"    : 27,
     "SPACE"  : 32,
     "ALT"    : 18,

     "UP"    : 38,
     "DOWN"  : 40
  });
  if (typeof node !== 'object' || !node.getElementsByClassName) return false;

  this.mouseInMouseButton = false;
  
  var inputs = document.getElementsByTagName('input');
  if (inputs && inputs[0]) this.inputNode = inputs[0];
  
  var buttons = document.getElementsByTagName('button');
  if (buttons && buttons[0]){
    this.buttonNode = buttons[0];
    this.buttonNode.tabIndex = "-1";
  }
  
};

/**
 * @method initComboBox
 *
 * @memberOf aria.widget.ComboBoxInput
 *
 * @desc  Adds event handlers to input element 
 */

aria.widget.ComboBoxInput.prototype.initComboBox = function(){
  
  var comboBox = this;
  var id = this.inputNode.getAttribute('aria-controls');

  if (id){
    this.listBoxNode = document.getElementById(id);

    if (this.listBoxNode && this.buttonNode){
      this.listBox = new aria.widget.ListBox(this);
        this.listBox.initListBox();
    }
  }  
  this.closeListBox();
  var eventKeyDown = function (event){
    comboBox.eventKeyDown(event, comboBox);
  };
  comboBox.inputNode.addEventListener('keydown',   eventKeyDown);

};

/**
 * @method openListBox
 *
 * @memberOf aria.widget.ComboBoxInput
 *
 * @desc  Opens the listBox
 */

aria.widget.ComboBoxInput.prototype.openListBox = function(){

  if (this.listBoxNode){
    var pos = aria.Utils.findPos(this.inputNode);
    var br = this.inputNode.getBoundingClientRect();

    this.listBoxNode.style.display = 'block';
    this.listBoxNode.style.position = 'absolute';
    this.listBoxNode.style.top  = (pos.y + br.height) + "px"; 
    this.listBoxNode.style.left = pos.x + "px"; ;
    
    this.inputNode.setAttribute('aria-expanded', 'true');
  }  
};


/**
 * @method closeListBox
 *
 * @memberOf aria.widget.ComboBoxInput
 *
 * @desc  Close the listBox
 */

aria.widget.ComboBoxInput.prototype.closeListBox = function(){

  if(this.listBoxNode){
    this.listBoxNode.style.display = 'none';
    this.inputNode.setAttribute('aria-expanded', 'false');
  }

};

/**
 * @method toggleListBox
 *
 * @memberOf aria.widget.ComboBoxInput
 *
 * @desc  Close or open the listBox depending on current state
 */

aria.widget.ComboBoxInput.prototype.toggleListBox = function(){
  
  this.listBox.button.toggleHighlightButton();
  
  if (this.listBoxNode){
    if (this.listBoxNode.style.display === 'block'){
      this.listBoxNode.style.display = 'none';
      this.inputNode.focus();
      this.inputNode.setAttribute('aria-expanded', 'false');
    }
    else{
      this.listBoxNode.style.display = 'block';
      if(this.listBox.selectedItem)this.listBox.selectedItem.focus();
      this.inputNode.setAttribute('aria-expanded', 'true');
    }
  }

};

/**
 * @method moveFocusToFirstListBoxItem
 *
 * @memberOf aria.widget.ComboBoxInput
 *
 * @desc  Move keyboard focus to first listBox item
 */

aria.widget.ComboBoxInput.prototype.moveFocusToFirstListBoxItem = function(resetSelectedItem){

  if ((this.listBox.firstComboItem && !this.listBox.selectedItem) ||
      (this.listBox.firstComboItem && resetSelectedItem)){
    this.openListBox();
    this.listBox.firstComboItem.focus();
    this.listBox.selectedItem = this.listBox.firstComboItem;
  }else{
    this.openListBox();
    this.listBox.selectedItem.focus();
  }

};

/**
 * @method moveFocusToLastListBoxItem
 *
 * @memberOf aria.widget.ComboBoxInput
 *
 * @desc  Move keyboard focus to first listBox item
 */

aria.widget.ComboBoxInput.prototype.moveFocusToLastListBoxItem = function(resetSelectedItem){

  if ((this.listBox.lastComboItem && !this.listBox.selectedItem) ||
      (this.listBox.lastComboItem && resetSelectedItem)){
    this.openListBox();
    this.listBox.lastComboItem.focus();
    this.listBox.selectedItem = this.listBox.lastComboItem;
  }else{
    this.openListBox();
    this.listBox.selectedItem.focus();
  }

};

/**
 * @method nextAlphaComboItem
 *
 * @memberOf aria.widget.ComboBoxInput
 *
 * @desc  Find the next instance of a combo item matching the key pressed.
 */

aria.widget.ComboBoxInput.prototype.nextAlphaComboItem = function(event){

  var keyCode = String.fromCharCode(event.keyCode).toLowerCase();
  var flag = false;
  
  var overwriteSelectedItem = true;
  
  if (keyCode >= '0' && keyCode <= 'z'){
    this.openListBox()
    
    this.moveFocusToFirstListBoxItem(overwriteSelectedItem)

    cn = this.listBox.selectedItem;
    while(cn){
      if (cn.nodeType === Node.ELEMENT_NODE){
        if (cn.getAttribute('role')  === 'option'){
          if (cn.childNodes[0].nodeValue.charAt(0).toLowerCase() === keyCode){
            nt = cn;
            this.listBox.selectedItem = nt;
            flag = true;
            break;
          }
        }
      }
      cn = cn.nextSibling;
    }
    return nt;
  }
}


/**
 * @method eventKeyDown
 *
 * @memberOf aria.widget.ComboBoxInput
 *
 * @desc  Keydown event handler for ComboBoxInput Object
 *        NOTE: The comboBox parameter is needed to provide a reference to the specific
 *               comboBox 
 */

aria.widget.ComboBoxInput.prototype.eventKeyDown = function(event, comboBox){

  var flag = false;
  var overwriteSelectedItem = false;
  
  ct = comboBox.listBox.selectedItem;
  nt = null;
  
  switch(event.keyCode){
    case comboBox.keyCode.UP:
      if (event.altKey){
        comboBox.toggleListBox();
        flag = true;
        comboBox.moveFocusToLastListBoxItem(overwriteSelectedItem);
        nt = comboBox.listBox.selectedItem
        break;
      }
      flag = true;
      nt = comboBox.listBox.previousComboItem(ct);
      break;
      
    case comboBox.keyCode.DOWN:
      if (event.altKey){
        comboBox.toggleListBox();
        flag = true;
        comboBox.moveFocusToFirstListBoxItem(overwriteSelectedItem);
        nt = comboBox.listBox.selectedItem
        break;
      }
      flag = true;
      nt = comboBox.listBox.nextComboItem(ct);
      break;
    
    case comboBox.keyCode.RETURN:
    case comboBox.keyCode.ESC:
      comboBox.closeListBox();
      flag = true;
      break;

    case comboBox.keyCode.TAB:
      comboBox.closeListBox();
      break;

    default:
      nt = comboBox.nextAlphaComboItem(event);
      if(nt) flag = true;
      break;
    }
  
  if (flag){
    if(nt){comboBox.listBox.activateSelectedItem()}
    event.stopPropagation();
    event.preventDefault();
  }  

};

/* ---------------------------------------------------------------- */
/*                          Button Widget                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor Button
 *
 * @memberOf aria.Widget
 *
 * @desc  Creates a Button widget using ARIA 
 *
 * @param  node    DOM node  -  DOM node object
 *
 * @property  keyCode      Object    -  Object containing the keyCodes used by the slider widget
 *
 * @property  node               Object    -  JQuery node object
 */

aria.widget.Button = function(comboBox){

  this.comboBox = comboBox;  
};

/**
 * @method initButton
 *
 * @memberOf aria.widget.Button
 *
 * @desc  Adds event handlers to button element 
 */

aria.widget.Button.prototype.initButton = function(){

  var button = this;

  var eventClick = function (event){
    button.eventClick(event, button.comboBox);
    };
  this.comboBox.buttonNode.addEventListener('click', eventClick);
  


};

aria.widget.Button.prototype.toggleHighlightButton = function(){

  var img = this.comboBox.buttonNode.firstChild;

  while(img) {
    if (img.nodeType === Node.ELEMENT_NODE) {
      if (img.tagName === 'IMG') break;
    }
    img = img.nextSibling;
  }
  if(img.src.indexOf('button-arrow-down.png') > 0){
    img.src = "./images/button-arrow-down-hl.png";
  }
  else{
    img.src = "./images/button-arrow-down.png";
  }
}


/**
 * @method eventClick
 *
 * @memberOf aria.widget.ListBox
 *
 * @desc  Click event handler for button object
 *        NOTE: The listBox parameter is needed to provide a reference to the specific
 *               listBox 
 */

aria.widget.Button.prototype.eventClick = function(event, comboBox){

  var type = event.type;

  if (type === 'click'){
    this.comboBox.toggleListBox();
    if(!this.comboBox.listBox.selectedItem){
      this.comboBox.listBox.selectedItem = this.comboBox.listBox.firstComboItem
      this.comboBox.listBox.activateSelectedItem()
    }
  }
}