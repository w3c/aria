import * as fs from "node:fs";
import { parseHTML } from "linkedom";

const { document } = parseHTML(fs.readFileSync("../aria/index.html").toString());

// mock functions for aria.js
let updateReferences = () => {};
document.URL = "";

const script = fs.readFileSync("./common/script/aria.js").toString();

const scriptWithoutRespecUI = script.substring(0, script.indexOf("require(")); // TODO: HACK remove everything past "require(" (NOTE: if we went only with this SSG approach, we could remove that end of aria.js and this hack)

// HACK call ariaAttributeReferences() and log out roleInfo with prefix
const scriptAddition = 'ariaAttributeReferences();console.log("/* This file is generated - do not modify */ var roleInfo = "+JSON.stringify(roleInfo, null, 2));';

// HACK: eval!
eval(scriptWithoutRespecUI + scriptAddition);
