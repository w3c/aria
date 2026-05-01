import * as fs from "node:fs";
import { parseHTML } from "linkedom";

const { document } = parseHTML(fs.readFileSync("../aria/index.html").toString());

// mock functions for aria.js
let updateReferences = () => {};
document.URL = "";

const script = fs.readFileSync("./common/script/aria.js").toString();
const prescript = fs.readFileSync("./common/script/ariaPreprocessing.js").toString();

// HACK call ariaPreprocessing(), ariaAttributeReferences(), and log out roleInfo with prefix
const scriptAddition = 'ariaPreprocessing();ariaAttributeReferences();console.log("/* This file is generated - do not modify */ var roleInfo = "+JSON.stringify(roleInfo, null, 2));';

// HACK: eval!
eval(prescript + script + scriptAddition);
