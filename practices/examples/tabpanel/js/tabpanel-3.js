

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
 * ARIA tabpanel example
 * @function onload
 * @desc  after page has loaded initializ all tabpanels based on the selector "div.tabpanel"
 */

window.addEventListener('load', function(){

  var tabpanels = document.querySelectorAll('div.tabpanel');

  [].forEach.call(tabpanels, function(tabpanel){
    if (tabpanel){
      var tb = new aria.widget.Tabpanel(tabpanel)
      tb.initTabpanel();
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
 * @constructor Tabpanel
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
/*                  Tabpanel Widget                                  */
/* ---------------------------------------------------------------- */

/**
 * @constructor Tabpanel
 *
 * @memberOf aria.Widget
 *
 * @desc  Creates a tabpanel widget using ARIA 
 */

aria.widget.Tabpanel = function(node){

  this.keyCode = Object.freeze({
     "TAB"    : 9,
     "RETURN" : 13,
     "ESC"    : 27,
     "SPACE"  : 32,
     "ALT"    : 18,
     "DELETE" : 46,

     "UP"    : 38,
     "DOWN"  : 40,
     "RIGHT" : 39,
     "LEFT"  : 37
  });
  if (typeof node !== 'object' || !node.getElementsByClassName) return false;
  firstUL = node.getElementsByTagName('UL')[0]
  this.tabs = firstUL.getElementsByTagName('LI');
  this.closeImages = node.getElementsByTagName("IMG");
  this.firstTab = this.tabs[0];
  nt = this.firstTab;
  while(nt){
    if(nt.nodeType === Node.ELEMENT_NODE &&
      (nt.tagName  === 'LI')){
      this.lastTab = nt;
    }
    nt = nt.nextSibling;
  }
  this.tabNode = node;
  this.currentTab = this.firstTab;
};

/**
 * @method initTabpanel
 *
 * @memberOf aria.widget.Tabpanel
 *
 * @desc  Adds event handlers to tabpanel 
 */

aria.widget.Tabpanel.prototype.initTabpanel = function(){
  
  var tabpanel = this;
  
  var eventKeyDown = function (event){
    tabpanel.tabKeyDown(event, tabpanel);
  };
  var eventClick = function (event){
    tabpanel.tabClick(event, tabpanel);
  };
  
  var eventCloseClick = function (event){
    tabpanel.tabCloseClick(event, tabpanel);
  };
  for(i=0;i<this.tabs.length;i++){
    this.tabs[i].addEventListener('keydown', eventKeyDown);
    this.tabs[i].addEventListener('click', eventClick);
    this.tabs[i].addEventListener('touchstart', eventClick);
  }
  for(i=0;i<this.closeImages.length;i++){
    this.closeImages[i].addEventListener('click', eventCloseClick);
    this.closeImages[i].addEventListener('touchstart', eventCloseClick);
  }
  this.openActiveTab();

};

/**
 * @method nextTab
 *
 * @memberOf aria.widget.Tabpanel
 *
 * @desc  Moves focus to the next tab
 */
 
aria.widget.Tabpanel.prototype.nextTab = function(){
  var ct = this.currentTab
  var nt = ct.nextSibling;

  while (nt){
    if((nt.nodeType === Node.ELEMENT_NODE &&
      (nt.tagName  === 'DIV'))){
        nt = nt.firstChild;
      }
    if(nt.nodeType === Node.ELEMENT_NODE &&
      (nt.tagName  === 'LI')){
      ct.tabIndex = -1;
      nt.tabIndex = 0;
      nt.focus();
      this.currentTab = nt;
      return nt;
    }
    nt = nt.nextSibling;
  }

  if (!nt && this.firstTab){
    nt = this.firstTab;
    ct.tabIndex = -1;
    nt.tabIndex = 0;
    nt.focus();
    this.currentTab = nt;
    return nt;
  }
  return false;
};

/**
 * @method previousTab
 *
 * @memberOf aria.widget.Tabpanel
 *
 * @desc  Moves focus to the previous tab
 */

aria.widget.Tabpanel.prototype.previousTab = function(){
  var ct = this.currentTab
  var nt = ct.previousSibling;

  while (nt){
    if((nt.nodeType === Node.ELEMENT_NODE &&
      (nt.tagName  === 'DIV'))){
        nt = nt.firstChild;
      }
    if(nt.nodeType === Node.ELEMENT_NODE &&
      (nt.tagName  === 'LI')){
      ct.tabIndex = -1;
      nt.tabIndex = 0;
      nt.focus();
      this.currentTab = nt;
      return nt;
    }
    nt = nt.previousSibling;
  }

  if (!nt && this.lastTab){
    nt = this.lastTab;
    ct.tabIndex = -1;
    nt.tabIndex = 0;
    nt.focus();
    this.currentTab = nt;
    return nt;
  }
  return false;
};

/**
 * @method closeTabs
 *
 * @memberOf aria.widget.Tabpanel
 *
 * @desc  closes all tabs     
 */
 
aria.widget.Tabpanel.prototype.closeTabs = function(){

  if(this.tabNode){
    np = this.tabNode.firstChild;
    while(np){
      if(np.nodeType === Node.ELEMENT_NODE && np.tagName === 'DIV'){
        np.style.display = "none";
      }
      np = np.nextSibling
    }
  }
  np = this.currentTab.parentNode.firstChild;
  while(np){
    if(np.nodeType === Node.ELEMENT_NODE && np.tagName === 'LI'){
      np.setAttribute("aria-selected", "false");
    }
    np = np.nextSibling;
  }
  
}


/**
 * @method openActiveTab
 *    
 * @memberOf aria.widget.Tabpanel
 *
 * @desc  opens the active tab
 */
 
aria.widget.Tabpanel.prototype.openActiveTab = function(){

  if(this.currentTab){
    this.closeTabs();
    this.currentTab.setAttribute("aria-selected", "true")
    panelID = this.currentTab.getAttribute("aria-controls");
    np = document.getElementById(panelID);
    np.style.display = "block";
  }
}

/**
 * @method tabKeyDown
 *
 * @memberOf aria.widget.Tabpanel
 *
 * @desc  handles keydown events for the tabs
 */
 
aria.widget.Tabpanel.prototype.tabKeyDown = function(event, tabpanel){
  
  var flag = false;
  
  switch(event.keyCode){
    case tabpanel.keyCode.RIGHT:
      nt = tabpanel.nextTab();
      flag = true;
      break;
    case tabpanel.keyCode.LEFT:
      nt = tabpanel.previousTab();
      flag = true;
      break;
    case tabpanel.keyCode.SPACE:
    case tabpanel.keyCode.RETURN:
      tabpanel.openActiveTab();
      flag = true;
      break;
    case tabpanel.keyCode.DELETE:
      tabpanel.closeCurrentTab(this.currentTab);
      break;
  }
  if (flag){
    event.stopPropagation();
    event.preventDefault();
  }
}

/**
 * @method tabClick
 *
 * @memberOf aria.widget.Tabpanel
 *
 * @desc  handles click events for the tabs
 */
 
aria.widget.Tabpanel.prototype.tabClick = function(event, tabpanel){
  
  ct = event.currentTarget;
  tabpanel.currentTab.tabIndex = "-1";
  tabpanel.currentTab = ct;
  ct.tabIndex = "0";
  ct.focus();
  tabpanel.openActiveTab();
}

/**
 * @function tabCloseClick
 *
 * @desc  closes the current tab based on event location
 */
 
aria.widget.Tabpanel.prototype.tabCloseClick = function(event, tabpanel){
  tabpanel.closeCurrentTab(event.currentTarget);
}

/**
 * @function closeCurrentTab
 *
 * @desc  closes the current tab
 */
 
aria.widget.Tabpanel.prototype.closeCurrentTab = function(target){
  console.log(this.tabs.length)
  if(this.tabs.length != 1){
    if(target.tagName == "IMG"){
      target=target.parentNode;
    }
    if(target == this.currentTab){
      ct = this.currentTab.nextSibling;
      this.currentTab = false;
      while(ct){
        if(ct.nodeType === Node.ELEMENT_NODE && ct.tagName === 'LI'){
          this.currentTab = ct
          break;
        }
        ct = ct.nextSibling;
      }
      if(!this.currentTab){
        this.currentTab = this.firstTab
      }
    }
    target.parentNode.removeChild(target)
    
    firstUL = this.tabNode.getElementsByTagName('UL')[0]
    this.tabs = firstUL.getElementsByTagName('LI');
    this.closeImages = this.tabNode.getElementsByTagName("IMG");
    this.firstTab = this.tabs[0];
    nt = this.firstTab;
    while(nt){
      if(nt.nodeType === Node.ELEMENT_NODE &&
        (nt.tagName  === 'LI')){
        this.lastTab = nt;
      }
      nt = nt.nextSibling;
    }
    
    this.openActiveTab();
    this.currentTab.focus();
  }
  else{  
    alert("You cannot close the last tab");
  }
  event.stopPropagation();
  event.preventDefault();
  
}