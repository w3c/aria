"use strict";


/*
*   headings.js: highlight heading elements
*/

function initHeadings () {
  const appName  = getAppName('Headings');
  const cssClass = getUniqueCssClass('Headings');

  let targetList = [
    {selector: "h1", color: "navy",   label: "h1"},
    {selector: "h2", color: "olive",  label: "h2"},
    {selector: "h3", color: "purple", label: "h3"},
    {selector: "h4", color: "green",  label: "h4"},
    {selector: "h5", color: "gray",   label: "h5"},
    {selector: "h6", color: "brown",  label: "h6"}
  ];

  let selectors = targetList.map(function (tgt) {return tgt.selector;}).join(', ');

  function getInfo (element, target) {
    let info = new InfoObject(element, 'HEADING INFO');
    info.addProps('level ' + target.label.substring(1));
    return info;
  }

  let params = {
    msgTitle:   "Headings",
    msgText:    "No heading elements (" + selectors + ") found.",
    targetList: targetList,
    cssClass:   cssClass,
    getInfo:    getInfo,
    dndFlag:    true
  };

  return new Bookmarklet(appName, params);
}

/*
*   landmarks.js: highlight ARIA landmarks
*/

function initLandmarks () {
  const appName  = getAppName('Landmarks');
  const cssClass = getUniqueCssClass('Landmarks');

  // Filter function called on a list of elements returned by selector
  // 'footer, [role="contentinfo"]'. It returns true for the following
  // conditions: (1) element IS NOT a footer element; (2) element IS a
  // footer element AND IS NOT a descendant of article or section.
  function isContentinfo (element) {
    if (element.tagName.toLowerCase() !== 'footer') return true;
    if (!isDescendantOf(element, ['article', 'section'])) return true;
    return false;
  }

  // Filter function called on a list of elements returned by selector
  // 'header, [role="banner"]'. It returns true for the following
  // conditions: (1) element IS NOT a header element; (2) element IS a
  // header element AND IS NOT a descendant of article or section.
  function isBanner (element) {
    if (element.tagName.toLowerCase() !== 'header') return true;
    if (!isDescendantOf(element, ['article', 'section'])) return true;
    return false;
  }

  let targetList = [
    {selector: 'aside:not([role]), [role~="complementary"], [role~="COMPLEMENTARY"]',         color: "brown",  label: "complementary"},
    {selector: 'footer, [role~="contentinfo"], [role~="CONTENTINFO"]', filter: isContentinfo, color: "olive",  label: "contentinfo"},
    {selector: '[role~="application"], [role~="APPLICATION"]',                                color: "teal",   label: "application"},
    {selector: 'nav, [role~="navigation"], [role~="NAVIGATION"]',                             color: "green",  label: "navigation"},
    {selector: 'header, [role~="banner"], [role~="BANNER"]', filter: isBanner,                color: "gray",   label: "banner"},
    {selector: '[role~="search"], [role~="SEARCH"]',                                          color: "purple", label: "search"},
    {selector: 'main, [role~="main"], [role~="MAIN"]',                                        color: "navy",   label: "main"},
    {selector: 'section[aria-labelledby], section[aria-label]',                               color: "SteelBlue ",   label: "region"},
    {selector: '[role~="REGION"][aria-labelledby], [role~="region"][aria-labelledby]',        color: "SteelBlue ",   label: "region"},
    {selector: '[role~="REGION"][aria-label], [role~="region"][aria-label]',                  color: "SteelBlue ",   label: "region"}
  ];

  let selectors = targetList.map(function (tgt) {return '<li>' + tgt.selector + '</li>';}).join('');

  function getInfo (element, target) {
    return new InfoObject(element, 'LANDMARK INFO');
  }

  let params = {
    msgTitle:   "Landmarks",
    msgText:    "No elements with ARIA Landmark roles found: <ul>" + selectors + "</ul>",
    targetList: targetList,
    cssClass:   cssClass,
    getInfo:    getInfo,
    dndFlag:    true
  };

  return new Bookmarklet(appName, params);
}

/*
*   lists.js: highlight list elements
*/

function initLists () {
  const appName  = getAppName('Lists');
  const cssClass = getUniqueCssClass('Lists');

  let targetList = [
    {selector: "dl", color: "olive",  label: "dl"},
    {selector: "ol", color: "purple", label: "ol"},
    {selector: "ul", color: "navy",   label: "ul"}
  ];

  let selectors = targetList.map(function (tgt) {return tgt.selector;}).join(', ');

  function getInfo (element, target) {
    let listCount;

    switch (target.label) {
      case 'dl':
        listCount = countChildrenWithTagNames(element, ['DT', 'DD']);
        break;
      case 'ol':
      case 'ul':
        listCount = countChildrenWithTagNames(element, ['LI']);
        break;
    }

    let info = new InfoObject(element, 'LIST INFO');
    info.addProps(listCount + ' items');
    return info;
  }

  let params = {
    msgTitle:   "Lists",
    msgText:    "No list elements (" + selectors + ") found.",
    targetList: targetList,
    cssClass:   cssClass,
    getInfo:    getInfo,
    dndFlag:    true
  };

  return new Bookmarklet(appName, params);
}

/*
*   Bookmarklet.js
*/

function Bookmarklet (globalName, params) {
  // use singleton pattern
  if (typeof window[globalName] === 'object')
    return window[globalName];

  this.cssClass = params.cssClass;
  this.msgTitle = params.msgTitle;
  this.msgText  = params.msgText;
  this.params   = params;
  this.show     = false;

  let dialog = new MessageDialog();
  window.addEventListener('resize', event => {
    removeNodes(this.cssClass);
    dialog.resize();
    this.show = false;
  });

  window[globalName] = this;
}

Bookmarklet.prototype.run = function () {
  let dialog = new MessageDialog();

  dialog.hide();
  this.show = !this.show;

  if (this.show) {
    if (addNodes(this.params) === 0) {
      dialog.show(this.msgTitle, this.msgText);
      this.show = false;
    }
  }
  else {
    removeNodes(this.cssClass);
  }

  return this.show;
};

/*
*   InfoObject.js
*/

/*
*  nameIncludesDescription: Determine whether accName object's name
*  property includes the accDesc object's name property content.
*/
function nameIncludesDescription (accName, accDesc) {
  if (accName === null || accDesc === null) return false;

  let name = accName.name, desc = accDesc.name;
  if (typeof name === 'string' && typeof desc === 'string') {
    return name.toLowerCase().includes(desc.toLowerCase());
  }

  return false;
}

function InfoObject (element, title) {
  this.title     = title;
  this.element   = getElementInfo(element);
  this.grpLabels = getGroupingLabels(element);
  this.accName   = getAccessibleName(element);
  this.accDesc   = getAccessibleDesc(element);
  this.role      = getAriaRole(element);

  // Ensure that accessible description is not a duplication
  // of accessible name content. If it is, nullify the desc.
  if (nameIncludesDescription (this.accName, this.accDesc)) {
    this.accDesc = null;
  }
}

InfoObject.prototype.addProps = function (val) {
  this.props = val;
}

/*
*   constants.js
*/

var CONSTANTS = {};
Object.defineProperty(CONSTANTS, 'appPrefix',   { value: 'a11y' });
Object.defineProperty(CONSTANTS, 'classPrefix', { value: 'a11yGfdXALm' });

function getAppName (name) {
  return CONSTANTS.appPrefix + name;
}

function getUniqueCssClass (name) {
  const prefix = CONSTANTS.classPrefix;

  switch (name) {
    case 'Forms':       return prefix + '0';
    case 'Headings':    return prefix + '1';
    case 'Images':      return prefix + '2';
    case 'Landmarks':   return prefix + '3';
    case 'Lists':       return prefix + '4';
    case 'Interactive': return prefix + '5';
  }

  return 'unrecognizedName';
}

/*
*   dialog.js: functions for creating, modifying and deleting message dialog
*/

/*
*   setBoxGeometry: Set the width and position of message dialog based on
*   the width of the browser window. Called by functions resizeMessage and
*   createMsgOverlay.
*/
function setBoxGeometry (dialog) {
  let width  = window.innerWidth / 3.2;
  let left   = window.innerWidth / 2 - width / 2;
  let scroll = getScrollOffsets();

  dialog.style.width = width + "px";
  dialog.style.left  = (scroll.x + left) + "px";
  dialog.style.top   = (scroll.y + 30) + "px";
}

/*
*   createMsgDialog: Construct and position the message dialog whose
*   purpose is to alert the user when no target elements are found by
*   a bookmarklet.
*/
function createMsgDialog (cssClass, handler) {
  let dialog = document.createElement("div");
  let button  = document.createElement("button");

  dialog.className = cssClass;
  setBoxGeometry(dialog);

  button.onclick = handler;

  dialog.appendChild(button);
  document.body.appendChild(dialog);
  return dialog;
}

/*
*   deleteMsgDialog: Use reference to delete message dialog.
*/
function deleteMsgDialog (dialog) {
  if (dialog) document.body.removeChild(dialog);
}

/*
*   MessageDialog: Wrapper for show, hide and resize methods
*/
function MessageDialog () {
  this.GLOBAL_NAME = 'a11yMessageDialog';
  this.CSS_CLASS = 'oaa-message-dialog';
}

/*
*   show: show message dialog
*/
MessageDialog.prototype.show = function (title, message) {
  const MSG_DIALOG = this.GLOBAL_NAME;
  let h2, div;

  if (!window[MSG_DIALOG])
    window[MSG_DIALOG] = createMsgDialog(this.CSS_CLASS, event => this.hide());

  h2 = document.createElement("h2");
  h2.innerHTML = title;
  window[MSG_DIALOG].appendChild(h2);

  div = document.createElement("div");
  div.innerHTML = message;
  window[MSG_DIALOG].appendChild(div);
};

/*
*   hide: hide message dialog
*/
MessageDialog.prototype.hide = function () {
  const MSG_DIALOG = this.GLOBAL_NAME;
  if (window[MSG_DIALOG]) {
    deleteMsgDialog(window[MSG_DIALOG]);
    delete(window[MSG_DIALOG]);
  }
};

/*
*   resize: resize message dialog
*/
MessageDialog.prototype.resize = function () {
  const MSG_DIALOG = this.GLOBAL_NAME;
  if (window[MSG_DIALOG])
    setBoxGeometry(window[MSG_DIALOG]);
};

/*
*   dom.js: functions and constants for adding and removing DOM overlay elements
*/

/*
*   isVisible: Recursively check element properties from getComputedStyle
*   until document element is reached, to determine whether element or any
*   of its ancestors has properties set that affect its visibility. Called
*   by addNodes function.
*/
function isVisible (element) {

  function isVisibleRec (el) {
    if (el.nodeType === Node.DOCUMENT_NODE) return true;

    let computedStyle = window.getComputedStyle(el, null);
    let display = computedStyle.getPropertyValue('display');
    let visibility = computedStyle.getPropertyValue('visibility');
    let hidden = el.getAttribute('hidden');
    let ariaHidden = el.getAttribute('aria-hidden');

    if ((display === 'none') || (visibility === 'hidden') ||
        (hidden !== null) || (ariaHidden === 'true')) {
      return false;
    }
    return isVisibleRec(el.parentNode);
  }

  return isVisibleRec(element);
}

/*
*   countChildrenWithTagNames: For the specified DOM element, return the
*   number of its child elements with tagName equal to one of the values
*   in the tagNames array.
*/
function countChildrenWithTagNames (element, tagNames) {
  let count = 0;

  let child = element.firstElementChild;
  while (child) {
    if (tagNames.indexOf(child.tagName) > -1) count += 1;
    child = child.nextElementSibling;
  }

  return count;
}

/*
*   isDescendantOf: Determine whether element is a descendant of any
*   element in the DOM with a tagName in the list of tagNames.
*/
function isDescendantOf (element, tagNames) {
  if (typeof element.closest === 'function') {
    return tagNames.some(name => element.closest(name) !== null);
  }
  return false;
}

/*
*   hasParentWithName: Determine whether element has a parent with
*   tagName in the list of tagNames.
*/
function hasParentWithName (element, tagNames) {
  let parentTagName = element.parentElement.tagName.toLowerCase();
  if (parentTagName) {
    return tagNames.some(name => parentTagName === name);
  }
  return false;
}

/*
*   addNodes: Use targetList to generate nodeList of elements and to
*   each of these, add an overlay with a unique CSS class name.
*   Optionally, if getInfo is specified, add tooltip information;
*   if dndFlag is set, add drag-and-drop functionality.
*/
function addNodes (params) {
  let targetList = params.targetList,
      cssClass = params.cssClass,
      getInfo = params.getInfo,
      evalInfo = params.evalInfo,
      dndFlag = params.dndFlag;
  let counter = 0;

  targetList.forEach(function (target) {
    // Collect elements based on selector defined for target
    let elements = document.querySelectorAll(target.selector);

    // Filter elements if target defines a filter function
    if (typeof target.filter === 'function')
      elements = Array.prototype.filter.call(elements, target.filter);

    Array.prototype.forEach.call(elements, function (element) {
      if (isVisible(element)) {
        let info = getInfo(element, target);
        if (evalInfo) evalInfo(info, target);
        let boundingRect = element.getBoundingClientRect();
        let overlayNode = createOverlay(target, boundingRect, cssClass);
        if (dndFlag) addDragAndDrop(overlayNode);
        let labelNode = overlayNode.firstChild;
        labelNode.title = formatInfo(info);
        document.body.appendChild(overlayNode);
        counter += 1;
      }
    });
  });

  return counter;
}

/*
*   removeNodes: Use the unique CSS class name supplied to addNodes
*   to remove all instances of the overlay nodes.
*/
function removeNodes (cssClass) {
  let selector = "div." + cssClass;
  let elements = document.querySelectorAll(selector);
  Array.prototype.forEach.call(elements, function (element) {
    document.body.removeChild(element);
  });
}

/*
*   embedded.js
*/

// LOW-LEVEL FUNCTIONS

/*
*   getInputValue: Get current value of 'input' or 'textarea' element.
*/
function getInputValue (element) {
  return normalize(element.value);
}

/*
*   getRangeValue: Get current value of control with role 'spinbutton'
*   or 'slider' (i.e., subclass of abstract 'range' role).
*/
function getRangeValue (element) {
  let value;

  value = getAttributeValue(element, 'aria-valuetext');
  if (value.length) return value;

  value = getAttributeValue(element, 'aria-valuenow');
  if (value.length) return value;

  return getInputValue(element);
}

// HELPER FUNCTIONS FOR SPECIFIC ROLES

function getTextboxValue (element) {
  let inputTypes = ['email', 'password', 'search', 'tel', 'text', 'url'],
      tagName = element.tagName.toLowerCase(),
      type    = element.type;

  if (tagName === 'input' && inputTypes.indexOf(type) !== -1) {
    return getInputValue(element);
  }

  if (tagName === 'textarea') {
    return getInputValue(element);
  }

  return '';
}

function getComboboxValue (element) {
  let inputTypes = ['email', 'search', 'tel', 'text', 'url'],
      tagName = element.tagName.toLowerCase(),
      type    = element.type;

  if (tagName === 'input' && inputTypes.indexOf(type) !== -1) {
    return getInputValue(element);
  }

  return '';
}

function getSliderValue (element) {
  let tagName = element.tagName.toLowerCase(),
      type    = element.type;

  if (tagName === 'input' && type === 'range') {
    return getRangeValue(element);
  }

  return '';
}

function getSpinbuttonValue (element) {
  let tagName = element.tagName.toLowerCase(),
      type    = element.type;

  if (tagName === 'input' && type === 'number') {
    return getRangeValue(element);
  }

  return '';
}

function getListboxValue (element) {
  let tagName = element.tagName.toLowerCase();

  if (tagName === 'select') {
    let arr = [], selectedOptions = element.selectedOptions;

    for (let i = 0; i < selectedOptions.length; i++) {
      let option = selectedOptions[i];
      let value = normalize(option.value);
      if (value.length) arr.push(value);
    }

    if (arr.length) return arr.join(' ');
  }

  return '';
}

/*
*   isEmbeddedControl: Determine whether element has a role that corresponds
*   to an HTML form control that could be embedded within text content.
*/
function isEmbeddedControl (element) {
  let embeddedControlRoles = [
    'textbox',
    'combobox',
    'listbox',
    'slider',
    'spinbutton'
  ];
  let role = getAriaRole(element);

  return (embeddedControlRoles.indexOf(role) !== -1);
}

/*
*   getEmbeddedControlValue: Based on the role of element, use native semantics
*   of HTML to get the corresponding text value of the embedded control.
*/
function getEmbeddedControlValue (element) {
  let role = getAriaRole(element);

  switch (role) {
    case 'textbox':
      return getTextboxValue(element);

    case 'combobox':
      return getComboboxValue(element);

    case 'listbox':
      return getListboxValue(element);

    case 'slider':
      return getSliderValue(element);

    case 'spinbutton':
      return getSpinbuttonValue(element);
  }

  return '';
}

/*
*   getaccname.js
*
*   Note: Information in this module is based on the following documents:
*   1. HTML Accessibility API Mappings 1.0 (http://rawgit.com/w3c/aria/master/html-aam/html-aam.html)
*   2. SVG Accessibility API Mappings (http://rawgit.com/w3c/aria/master/svg-aam/svg-aam.html)
*/

/*
*   getFieldsetLegendLabels: Recursively collect legend contents of
*   fieldset ancestors, starting with the closest (innermost).
*   Return collection as a possibly empty array of strings.
*/
function getFieldsetLegendLabels (element) {
  let arrayOfStrings = [];

  if (typeof element.closest !== 'function') {
    return arrayOfStrings;
  }

  function getLabelsRec (elem, arr) {
    let fieldset = elem.closest('fieldset');

    if (fieldset) {
      let legend = fieldset.querySelector('legend');
      if (legend) {
        let text = getElementContents(legend);
        if (text.length){
          arr.push({ name: text, source: 'fieldset/legend' });
        }
      }
      // process ancestors
      getLabelsRec(fieldset.parentNode, arr);
    }
  }

  getLabelsRec(element, arrayOfStrings);
  return arrayOfStrings;
}

/*
*   getGroupingLabels: Return an array of grouping label objects for
*   element, each with two properties: 'name' and 'source'.
*/
function getGroupingLabels (element) {
  // We currently only handle labelable elements as defined in HTML 5.1
  if (isLabelableElement(element)) {
    return getFieldsetLegendLabels(element);
  }

  return [];
}

/*
*   nameFromNativeSemantics: Use method appropriate to the native semantics
*   of element to find accessible name. Includes methods for all interactive
*   elements. For non-interactive elements, if the element's ARIA role allows
*   its acc. name to be derived from its text contents, or if recFlag is set,
*   indicating that we are in a recursive aria-labelledby calculation, the
*   nameFromContents method is used.
*/
function nameFromNativeSemantics (element, recFlag) {
  let tagName = element.tagName.toLowerCase(),
      ariaRole = getAriaRole(element),
      accName = null;

  // TODO: Verify that this applies to all elements
  if (ariaRole && (ariaRole === 'presentation' || ariaRole === 'none')) {
    return null;
  }

  switch (tagName) {
    // FORM ELEMENTS: INPUT
    case 'input':
      switch (element.type) {
        // HIDDEN
        case 'hidden':
          if (recFlag) {
            accName = nameFromLabelElement(element);
          }
          break;

        // TEXT FIELDS
        case 'email':
        case 'password':
        case 'search':
        case 'tel':
        case 'text':
        case 'url':
          accName = nameFromLabelElement(element);
          if (accName === null) accName = nameFromAttribute(element, 'placeholder');
          break;

        // OTHER INPUT TYPES
        case 'button':
          accName = nameFromAttribute(element, 'value');
          break;

        case 'reset':
          accName = nameFromAttribute(element, 'value');
          if (accName === null) accName = nameFromDefault('Reset');
          break;

        case 'submit':
          accName = nameFromAttribute(element, 'value');
          if (accName === null) accName = nameFromDefault('Submit');
          break;

        case 'image':
          accName = nameFromAltAttribute(element);
          if (accName === null) accName = nameFromAttribute(element, 'value');
          break;

        default:
          accName = nameFromLabelElement(element);
          break;
      }
      break;

    // FORM ELEMENTS: OTHER
    case 'button':
      accName = nameFromContents(element);
      break;

    case 'label':
      accName = nameFromContents(element);
      break;

    case 'keygen':
    case 'meter':
    case 'output':
    case 'progress':
    case 'select':
      accName = nameFromLabelElement(element);
      break;

    case 'textarea':
      accName = nameFromLabelElement(element);
      if (accName === null) accName = nameFromAttribute(element, 'placeholder');
      break;

    // EMBEDDED ELEMENTS
    case 'audio': // if 'controls' attribute is present
      accName = { name: 'NOT YET IMPLEMENTED', source: '' };
      break;

    case 'embed':
      accName = { name: 'NOT YET IMPLEMENTED', source: '' };
      break;

    case 'iframe':
      accName = nameFromAttribute(element, 'title');
      break;

    case 'img':
    case 'area': // added
      accName = nameFromAltAttribute(element);
      break;

    case 'object':
      accName = { name: 'NOT YET IMPLEMENTED', source: '' };
      break;

    case 'svg': // added
      accName = nameFromDescendant(element, 'title');
      break;

    case 'video': // if 'controls' attribute is present
      accName = { name: 'NOT YET IMPLEMENTED', source: '' };
      break;

    // OTHER ELEMENTS
    case 'a':
      accName = nameFromContents(element);
      break;

    case 'details':
      accName = nameFromDetailsOrSummary(element);
      break;

    case 'figure':
      accName = nameFromDescendant(element, 'figcaption');
      break;

    case 'table':
      accName = nameFromDescendant(element, 'caption');
      break;

    // ELEMENTS NOT SPECIFIED ABOVE
    default:
      if (nameFromIncludesContents(element) || recFlag)
        accName = nameFromContents(element);
      break;
  }

  // LAST RESORT USE TITLE
  if (accName === null) accName = nameFromAttribute(element, 'title');

  return accName;
}

/*
*   nameFromAttributeIdRefs: Get the value of attrName on element (a space-
*   separated list of IDREFs), visit each referenced element in the order it
*   appears in the list and obtain its accessible name (skipping recursive
*   aria-labelledby or aria-describedby calculations), and return an object
*   with name property set to a string that is a space-separated concatena-
*   tion of those results if any, otherwise return null.
*/
function nameFromAttributeIdRefs (element, attribute) {
  let value = getAttributeValue(element, attribute);
  let idRefs, i, refElement, accName, arr = [];

  if (value.length) {
    idRefs = value.split(' ');

    for (i = 0; i < idRefs.length; i++) {
      refElement = document.getElementById(idRefs[i]);
      if (refElement) {
        accName = getAccessibleName(refElement, true);
        if (accName && accName.name.length) arr.push(accName.name);
      }
    }
  }

  if (arr.length)
    return { name: arr.join(' '), source: attribute };

  return null;
}

/*
*   getAccessibleName: Use the ARIA Roles Model specification for accessible
*   name calculation based on its precedence order:
*   (1) Use aria-labelledby, unless a traversal is already underway;
*   (2) Use aria-label attribute value;
*   (3) Use whatever method is specified by the native semantics of the
*   element, which includes, as last resort, use of the title attribute.
*/
function getAccessibleName (element, recFlag) {
  let accName = null;

  if (!recFlag) accName = nameFromAttributeIdRefs(element, 'aria-labelledby');
  if (accName === null) accName = nameFromAttribute(element, 'aria-label');
  if (accName === null) accName = nameFromNativeSemantics(element, recFlag);

  return accName;
}

/*
*   getAccessibleDesc: Use the ARIA Roles Model specification for accessible
*   description calculation based on its precedence order:
*   (1) Use aria-describedby, unless a traversal is already underway;
*   (2) As last resort, use the title attribute.
*/
function getAccessibleDesc (element, recFlag) {
  let accDesc = null;

  if (!recFlag) accDesc = nameFromAttributeIdRefs(element, 'aria-describedby');
  if (accDesc === null) accDesc = nameFromAttribute(element, 'title');

  return accDesc;
}

/*
*   info.js: Function for displaying information on highlighted elements
*/

/*
*   getElementInfo: Extract tagName and other attribute information
*   based on tagName and return as formatted string.
*/
function getElementInfo (element) {
  let tagName = element.tagName.toLowerCase(),
      elementInfo = tagName;

  if (tagName === 'input') {
    let type = element.type;
    if (type && type.length) elementInfo += ' [type="' + type + '"]';
  }

  if (tagName === 'label') {
    let forVal = getAttributeValue(element, 'for');
    if (forVal.length) elementInfo += ' [for="' + forVal + '"]';
  }

  if (isLabelableElement(element)) {
    let id = element.id;
    if (id && id.length) elementInfo += ' [id="' + id + '"]';
  }

  if (element.hasAttribute('role')) {
    let role = getAttributeValue(element, 'role');
    if (role.length) elementInfo += ' [role="' + role + '"]';
  }

  return elementInfo;
}

/*
*   formatInfo: Convert info properties into a string with line breaks.
*/
function formatInfo (info) {
  let value = '';
  let title = info.title,
      element = info.element,
      grpLabels = info.grpLabels,
      accName = info.accName,
      accDesc = info.accDesc,
      role = info.role,
      props = info.props;

  value += '=== ' + title + ' ===';

  if (element) value += '\nELEMENT: ' + element;

  if (grpLabels && grpLabels.length) {
    // array starts with innermost label, so process from the end
    for (let i = grpLabels.length - 1; i >= 0; i--) {
      value += '\nGRP. LABEL: ' + grpLabels[i].name + '\nFROM: ' + grpLabels[i].source;
    }
  }

  if (accName) {
    value += '\nACC. NAME: ' + accName.name + '\nFROM: ' + accName.source;
  }

  if (accDesc) {
    value += '\nACC. DESC: ' + accDesc.name + '\nFROM: ' + accDesc.source;
  }

  if (role) value += '\nROLE: ' + role;

  if (props) value += '\nPROPERTIES: ' + props;

  return value;
}

/*
*   namefrom.js
*/

// LOW-LEVEL FUNCTIONS

/*
*   normalize: Trim leading and trailing whitespace and condense all
*   interal sequences of whitespace to a single space. Adapted from
*   Mozilla documentation on String.prototype.trim polyfill. Handles
*   BOM and NBSP characters.
*/
function normalize (s) {
  let rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  return s.replace(rtrim, '').replace(/\s+/g, ' ');
}

/*
*   getAttributeValue: Return attribute value if present on element,
*   otherwise return empty string.
*/
function getAttributeValue (element, attribute) {
  let value = element.getAttribute(attribute);
  return (value === null) ? '' : normalize(value);
}

/*
*   couldHaveAltText: Based on HTML5 specification, determine whether
*   element could have an 'alt' attribute.
*/
function couldHaveAltText (element) {
  let tagName = element.tagName.toLowerCase();

  switch (tagName) {
    case 'img':
    case 'area':
      return true;
    case 'input':
      return (element.type && element.type === 'image');
  }

  return false;
}

/*
*   hasEmptyAltText: Determine whether the alt attribute is present
*   and its value is the empty string.
*/
function hasEmptyAltText (element) {
  let value = element.getAttribute('alt');

   // Attribute is present
  if (value !== null)
    return (normalize(value).length === 0);

  return false;
}

/*
*   isLabelableElement: Based on HTML5 specification, determine whether
*   element can be associated with a label.
*/
function isLabelableElement (element) {
  let tagName = element.tagName.toLowerCase(),
      type    = element.type;

  switch (tagName) {
    case 'input':
      return (type !== 'hidden');
    case 'button':
    case 'keygen':
    case 'meter':
    case 'output':
    case 'progress':
    case 'select':
    case 'textarea':
      return true;
    default:
      return false;
  }
}

/*
*   addCssGeneratedContent: Add CSS-generated content for pseudo-elements
*   :before and :after. According to the CSS spec, test that content value
*   is other than the default computed value of 'none'.
*
*   Note: Even if an author specifies content: 'none', because browsers add
*   the double-quote character to the beginning and end of computed string
*   values, the result cannot and will not be equal to 'none'.
*/
function addCssGeneratedContent (element, contents) {
  let result = contents,
      prefix = getComputedStyle(element, ':before').content,
      suffix = getComputedStyle(element, ':after').content;

  if (prefix !== 'none') result = prefix + result;
  if (suffix !== 'none') result = result + suffix;

  return result;
}

/*
*   getNodeContents: Recursively process element and text nodes by aggregating
*   their text values for an ARIA text equivalent calculation.
*   1. This includes special handling of elements with 'alt' text and embedded
*      controls.
*   2. The forElem parameter is needed for label processing to avoid inclusion
*      of an embedded control's value when the label is for the control itself.
*/
function getNodeContents (node, forElem) {
  let contents = '';

  if (node === forElem) return '';

  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      if (couldHaveAltText(node)) {
        contents = getAttributeValue(node, 'alt');
      }
      else if (isEmbeddedControl(node)) {
        contents = getEmbeddedControlValue(node);
      }
      else {
        if (node.hasChildNodes()) {
          let children = node.childNodes,
              arr = [];

          for (let i = 0; i < children.length; i++) {
            let nc = getNodeContents(children[i], forElem);
            if (nc.length) arr.push(nc);
          }

          contents = (arr.length) ? arr.join(' ') : '';
        }
      }
      // For all branches of the ELEMENT_NODE case...
      contents = addCssGeneratedContent(node, contents);
      break;

    case Node.TEXT_NODE:
      contents = normalize(node.textContent);
  }

  return contents;
}

/*
*   getElementContents: Construct the ARIA text alternative for element by
*   processing its element and text node descendants and then adding any CSS-
*   generated content if present.
*/
function getElementContents (element, forElement) {
  let result = '';

  if (element.hasChildNodes()) {
    let children = element.childNodes,
        arrayOfStrings = [];

    for (let i = 0; i < children.length; i++) {
      let contents = getNodeContents(children[i], forElement);
      if (contents.length) arrayOfStrings.push(contents);
    }

    result = (arrayOfStrings.length) ? arrayOfStrings.join(' ') : '';
  }

  return addCssGeneratedContent(element, result);
}

/*
*   getContentsOfChildNodes: Using predicate function for filtering element
*   nodes, collect text content from all child nodes of element.
*/
function getContentsOfChildNodes (element, predicate) {
  let arr = [], content;

  Array.prototype.forEach.call(element.childNodes, function (node) {
    switch (node.nodeType) {
      case (Node.ELEMENT_NODE):
        if (predicate(node)) {
          content = getElementContents(node);
          if (content.length) arr.push(content);
        }
        break;
      case (Node.TEXT_NODE):
        content = normalize(node.textContent);
        if (content.length) arr.push(content);
        break;
    }
  });

  if (arr.length) return arr.join(' ');
  return '';
}

// HIGHER-LEVEL FUNCTIONS THAT RETURN AN OBJECT WITH SOURCE PROPERTY

/*
*   nameFromAttribute
*/
function nameFromAttribute (element, attribute) {
  let name;

  name = getAttributeValue(element, attribute);
  if (name.length) return { name: name, source: attribute };

  return null;
}

/*
*   nameFromAltAttribute
*/
function nameFromAltAttribute (element) {
  let name = element.getAttribute('alt');

  // Attribute is present
  if (name !== null) {
    name = normalize(name);
    return (name.length) ?
      { name: name, source: 'alt' } :
      { name: '<empty>', source: 'alt' };
  }

  // Attribute not present
  return null;
}

/*
*   nameFromContents
*/
function nameFromContents (element) {
  let name;

  name = getElementContents(element);
  if (name.length) return { name: name, source: 'contents' };

  return null;
}

/*
*   nameFromDefault
*/
function nameFromDefault (name) {
  return name.length ? { name: name, source: 'default' } : null;
}

/*
*   nameFromDescendant
*/
function nameFromDescendant (element, tagName) {
  let descendant = element.querySelector(tagName);
  if (descendant) {
    let name = getElementContents(descendant);
    if (name.length) return { name: name, source: tagName + ' element' };
  }

  return null;
}

/*
*   nameFromLabelElement
*/
function nameFromLabelElement (element) {
  let name, label;

  // label [for=id]
  if (element.id) {
    label = document.querySelector('[for="' + element.id + '"]');
    if (label) {
      name = getElementContents(label, element);
      if (name.length) return { name: name, source: 'label reference' };
    }
  }

  // label encapsulation
  if (typeof element.closest === 'function') {
    label = element.closest('label');
    if (label) {
      name = getElementContents(label, element);
      if (name.length) return { name: name, source: 'label encapsulation' };
    }
  }

  return null;
}

/*
*   nameFromDetailsOrSummary: If element is expanded (has open attribute),
*   return the contents of the summary element followed by the text contents
*   of element and all of its non-summary child elements. Otherwise, return
*   only the contents of the first summary element descendant.
*/
function nameFromDetailsOrSummary (element) {
  let name, summary;

  function isExpanded (elem) { return elem.hasAttribute('open'); }

  // At minimum, always use summary contents
  summary = element.querySelector('summary');
  if (summary) name = getElementContents(summary);

  // Return either summary + details (non-summary) or summary only
  if (isExpanded(element)) {
    name += getContentsOfChildNodes(element, function (elem) {
      return elem.tagName.toLowerCase() !== 'summary';
    });
    if (name.length) return { name: name, source: 'contents' };
  }
  else {
    if (name.length) return { name: name, source: 'summary element' };
  }

  return null;
}

/*
*   overlay.js: functions for creating and modifying DOM overlay elements
*/

var zIndex = 100000;

/*
*   createOverlay: Create overlay div with size and position based on the
*   boundingRect properties of its corresponding target element.
*/
function createOverlay (tgt, rect, cname) {
  let scrollOffsets = getScrollOffsets();
  const MINWIDTH  = 68;
  const MINHEIGHT = 27;

  let node = document.createElement("div");
  node.setAttribute("class", [cname, 'oaa-element-overlay'].join(' '));
  node.startLeft = (rect.left + scrollOffsets.x) + "px";
  node.startTop  = (rect.top  + scrollOffsets.y) + "px";

  node.style.left = node.startLeft;
  node.style.top  = node.startTop;
  node.style.width  = Math.max(rect.width, MINWIDTH) + "px";
  node.style.height = Math.max(rect.height, MINHEIGHT) + "px";
  node.style.borderColor = tgt.color;
  node.style.zIndex = zIndex;

  let label = document.createElement("div");
  label.setAttribute("class", 'oaa-overlay-label');
  label.style.backgroundColor = tgt.color;
  label.innerHTML = tgt.label;

  node.appendChild(label);
  return node;
}

/*
*   addDragAndDrop: Add drag-and-drop and reposition functionality to an
*   overlay div element created by the createOverlay function.
*/
function addDragAndDrop (node) {

  function hoistZIndex (el) {
    let incr = 100;
    el.style.zIndex = zIndex += incr;
  }

  function repositionOverlay (el) {
    el.style.left = el.startLeft;
    el.style.top  = el.startTop;
  }

  let labelDiv = node.firstChild;

  labelDiv.onmousedown = function (event) {
    drag(this.parentNode, hoistZIndex, event);
  };

  labelDiv.ondblclick = function (event) {
    repositionOverlay(this.parentNode);
  };
}

/*
*   roles.js
*
*   Note: The information in this module is based on the following documents:
*   1. ARIA in HTML (https://specs.webplatform.org/html-aria/webspecs/master/)
*   2. WAI-ARIA 1.1 (http://www.w3.org/TR/wai-aria-1.1/)
*   3. WAI-ARIA 1.0 (http://www.w3.org/TR/wai-aria/)
*/

/*
*   inListOfOptions: Determine whether element is a child of
*   1. a select element
*   2. an optgroup element that is a child of a select element
*   3. a datalist element
*/
function inListOfOptions (element) {
  let parent = element.parentElement,
      parentName = parent.tagName.toLowerCase(),
      parentOfParentName = parent.parentElement.tagName.toLowerCase();

  if (parentName === 'select')
    return true;

  if (parentName === 'optgroup' && parentOfParentName === 'select')
    return true;

  if (parentName === 'datalist')
    return true;

  return false;
}

/*
*   validRoles: Reference list of all concrete ARIA roles as specified in
*   WAI-ARIA 1.1 Working Draft of 14 July 2015
*/
var validRoles = [

  // LANDMARK
  'application',
  'banner',
  'complementary',
  'contentinfo',
  'form',
  'main',
  'navigation',
  'search',

  // WIDGET
  'alert',
  'alertdialog',
  'button',
  'checkbox',
  'dialog',
  'gridcell',
  'link',
  'log',
  'marquee',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
  'option',
  'progressbar',
  'radio',
  'scrollbar',
  'searchbox',             // ARIA 1.1
  'slider',
  'spinbutton',
  'status',
  'switch',                // ARIA 1.1
  'tab',
  'tabpanel',
  'textbox',
  'timer',
  'tooltip',
  'treeitem',

  // COMPOSITE WIDGET
  'combobox',
  'grid',
  'listbox',
  'menu',
  'menubar',
  'radiogroup',
  'tablist',
  'tree',
  'treegrid',

  // DOCUMENT STRUCTURE
  'article',
  'cell',                  // ARIA 1.1
  'columnheader',
  'definition',
  'directory',
  'document',
  'group',
  'heading',
  'img',
  'list',
  'listitem',
  'math',
  'none',                  // ARIA 1.1
  'note',
  'presentation',
  'region',
  'row',
  'rowgroup',
  'rowheader',
  'separator',
  'table',                 // ARIA 1.1
  'text',                  // ARIA 1.1
  'toolbar'
];

/*
*   getValidRole: Examine each value in space-separated list by attempting
*   to find its match in the validRoles array. If a match is found, return
*   it. Otherwise, return null.
*/
function getValidRole (spaceSepList) {
  let arr = spaceSepList.split(' ');

  for (let i = 0; i < arr.length; i++) {
    let value = arr[i].toLowerCase();
    let validRole = validRoles.find(role => role === value);
    if (validRole) return validRole;
  }

  return null;
}

/*
*   getAriaRole: Get the value of the role attribute, if it is present. If
*   not specified, get the default role of element if it has one. Based on
*   ARIA in HTML as of 21 October 2015.
*/
function getAriaRole (element) {
  let tagName = element.tagName.toLowerCase(),
      type    = element.type;

  if (element.hasAttribute('role')) {
    return getValidRole(getAttributeValue(element, 'role'));
  }

  switch (tagName) {

    case 'a':
      if (element.hasAttribute('href'))
        return 'link';
      break;

    case 'area':
      if (element.hasAttribute('href'))
        return 'link';
      break;

    case 'article':     return 'article';
    case 'aside':       return 'complementary';
    case 'body':        return 'document';
    case 'button':      return 'button';
    case 'datalist':    return 'listbox';
    case 'details':     return 'group';
    case 'dialog':      return 'dialog';
    case 'dl':          return 'list';
    case 'fieldset':    return 'group';

    case 'footer':
      if (!isDescendantOf(element, ['article', 'section']))
        return 'contentinfo';
      break;

    case 'form':        return 'form';

    case 'h1':          return 'heading';
    case 'h2':          return 'heading';
    case 'h3':          return 'heading';
    case 'h4':          return 'heading';
    case 'h5':          return 'heading';
    case 'h6':          return 'heading';

    case 'header':
      if (!isDescendantOf(element, ['article', 'section']))
        return 'banner';
      break;

    case 'hr':          return 'separator';

    case 'img':
      if (!hasEmptyAltText(element))
        return 'img';
      break;

    case 'input':
      if (type === 'button')    return 'button';
      if (type === 'checkbox')  return 'checkbox';
      if (type === 'email')     return (element.hasAttribute('list')) ? 'combobox' : 'textbox';
      if (type === 'image')     return 'button';
      if (type === 'number')    return 'spinbutton';
      if (type === 'password')  return 'textbox';
      if (type === 'radio')     return 'radio';
      if (type === 'range')     return 'slider';
      if (type === 'reset')     return 'button';
      if (type === 'search')    return (element.hasAttribute('list')) ? 'combobox' : 'textbox';
      if (type === 'submit')    return 'button';
      if (type === 'tel')       return (element.hasAttribute('list')) ? 'combobox' : 'textbox';
      if (type === 'text')      return (element.hasAttribute('list')) ? 'combobox' : 'textbox';
      if (type === 'url')       return (element.hasAttribute('list')) ? 'combobox' : 'textbox';
      break;

    case 'li':
      if (hasParentWithName(element, ['ol', 'ul']))
        return 'listitem';
      break;

    case 'link':
      if (element.hasAttribute('href'))
        return 'link';
      break;

    case 'main':      return 'main';

    case 'menu':
      if (type === 'toolbar')
        return 'toolbar';
      break;

    case 'menuitem':
      if (type === 'command')   return 'menuitem';
      if (type === 'checkbox')  return 'menuitemcheckbox';
      if (type === 'radio')     return 'menuitemradio';
      break;

    case 'meter':       return 'progressbar';
    case 'nav':         return 'navigation';
    case 'ol':          return 'list';

    case 'option':
      if (inListOfOptions(element))
        return 'option';
      break;

    case 'output':      return 'status';
    case 'progress':    return 'progressbar';
    case 'section':     return 'region';
    case 'select':      return 'listbox';
    case 'summary':     return 'button';

    case 'tbody':       return 'rowgroup';
    case 'tfoot':       return 'rowgroup';
    case 'thead':       return 'rowgroup';

    case 'textarea':    return 'textbox';

    // TODO: th can have role 'columnheader' or 'rowheader'
    case 'th':          return 'columnheader';

    case 'ul':          return 'list';
  }

  return null;
}

/*
*   nameFromIncludesContents: Determine whether the ARIA role of element
*   specifies that its 'name from' includes 'contents'.
*/
function nameFromIncludesContents (element) {
  let elementRole = getAriaRole(element);
  if (elementRole === null) return false;

  let contentsRoles = [
    'button',
    'cell',                // ARIA 1.1
    'checkbox',
    'columnheader',
    'directory',
    'gridcell',
    'heading',
    'link',
    'listitem',
    'menuitem',
    'menuitemcheckbox',
    'menuitemradio',
    'option',
    'radio',
    'row',
    'rowgroup',
    'rowheader',
    'switch',              // ARIA 1.1
    'tab',
    'text',                // ARIA 1.1
    'tooltip',
    'treeitem'
  ];

  let contentsRole = contentsRoles.find(role => role === elementRole);
  return (typeof contentsRole !== 'undefined');
}

/*
*   utils.js: utility functions
*/

/*
*   getScrollOffsets: Use x and y scroll offsets to calculate positioning
*   coordinates that take into account whether the page has been scrolled.
*   From Mozilla Developer Network: Element.getBoundingClientRect()
*/
function getScrollOffsets () {
  let t;

  let xOffset = (typeof window.pageXOffset === "undefined") ?
    (((t = document.documentElement) || (t = document.body.parentNode)) &&
      typeof t.ScrollLeft === 'number' ? t : document.body).ScrollLeft :
    window.pageXOffset;

  let yOffset = (typeof window.pageYOffset === "undefined") ?
    (((t = document.documentElement) || (t = document.body.parentNode)) &&
      typeof t.ScrollTop === 'number' ? t : document.body).ScrollTop :
    window.pageYOffset;

  return { x: xOffset, y: yOffset };
}

/*
*   drag: Add drag and drop functionality to an element by setting this
*   as its mousedown handler. Depends upon getScrollOffsets function.
*   From JavaScript: The Definitive Guide, 6th Edition (slightly modified)
*/
function drag (elementToDrag, dragCallback, event) {
  let scroll = getScrollOffsets();
  let startX = event.clientX + scroll.x;
  let startY = event.clientY + scroll.y;

  let origX = elementToDrag.offsetLeft;
  let origY = elementToDrag.offsetTop;

  let deltaX = startX - origX;
  let deltaY = startY - origY;

  if (dragCallback) dragCallback(elementToDrag);

  if (document.addEventListener) {
    document.addEventListener("mousemove", moveHandler, true);
    document.addEventListener("mouseup", upHandler, true);
  }
  else if (document.attachEvent) {
    elementToDrag.setCapture();
    elementToDrag.attachEvent("onmousemove", moveHandler);
    elementToDrag.attachEvent("onmouseup", upHandler);
    elementToDrag.attachEvent("onlosecapture", upHandler);
  }

  if (event.stopPropagation) event.stopPropagation();
  else event.cancelBubble = true;

  if (event.preventDefault) event.preventDefault();
  else event.returnValue = false;

  function moveHandler (e) {
    if (!e) e = window.event;

    let scroll = getScrollOffsets();
    elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + "px";
    elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + "px";

    elementToDrag.style.cursor = "move";

    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
  }

  function upHandler (e) {
    if (!e) e = window.event;

    elementToDrag.style.cursor = "grab";
    elementToDrag.style.cursor = "-moz-grab";
    elementToDrag.style.cursor = "-webkit-grab";

    if (document.removeEventListener) {
        document.removeEventListener("mouseup", upHandler, true);
        document.removeEventListener("mousemove", moveHandler, true);
    }
    else if (document.detachEvent) {
        elementToDrag.detachEvent("onlosecapture", upHandler);
        elementToDrag.detachEvent("onmouseup", upHandler);
        elementToDrag.detachEvent("onmousemove", moveHandler);
        elementToDrag.releaseCapture();
    }

    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
  }
}
