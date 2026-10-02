import fs from "node:fs";
import path from "node:path";

import { parseHTML } from "linkedom";
const __dirname = import.meta.dirname;

// NOTE: this script expects compiled respec output (e.g. gh-pages branch).
// If you are working on this file, you will need to run respec first.
// E.g. get a copy from gh-pages or run `$ npx respec --src index.html --out index.html`
const inputFilename = path.resolve("index.html");
const outputFilename = path.join(__dirname, "roleInfo.js");

const { document } = parseHTML(fs.readFileSync(inputFilename).toString());
const roleTypeProps = document.querySelector("#roletype .role-properties");
const statesAndProps = {};

document.querySelectorAll("#states_and_properties :is(.state, .property)").forEach((spSection) => {
  const key = spSection.id;
  const value = {};
  statesAndProps[key] = value;
  value.is = spSection.classList.contains("state") ? "state" : "property";
  value.name = key;
  value.required = false;
  value.disallowed = false;
  value.deprecated = roleTypeProps.querySelector(`[data-deprecated="${key}"]`) ? true : false;
  // TODO: consider adding value information
});

const roleInfo = {};

const generateRoleInfoEntry = (roleSection) => {
  const key = roleSection.id;
  const value = {};
  roleInfo[key] = value;
  value.name = key;
  value.fragID = key; //TODO: [minor] is this duplication really worth it? Role names should be valid IDREFS, no?
  value.parentRoles = [];
  roleSection.querySelectorAll(".role-parent .role-reference").forEach((node) => value.parentRoles.push(node.textContent));
  let synonymRoles = [];
  roleSection.querySelectorAll("[data-role-synonyms] .role-reference").forEach((node) => synonymRoles.push(node.textContent));
  if (synonymRoles.length > 0) value.synonymRoles = synonymRoles;
  value.localprops = [];

  roleSection.querySelectorAll(":is(.role-required-properties, .role-properties, .role-disallowed) :is(.property-reference, .state-reference)").forEach((link) => {
    const name = link.textContent.split(" ")[0]; //TODO: hack because roletype has (state) inside link (as the only role to have that), cf. TODO: in ariaPreprocessing.js
    const prop = structuredClone(statesAndProps[name]);
    if (key !== "roletype") prop.deprecated = false; // TODO: should roletype have deprecated=true when the spec lists everything as supported?
    if (link.closest(".role-disallowed")) prop["disallowed"] = true;
    if (link.closest(".role-required-properties")) prop["required"] = true;
    value.localprops.push(prop);
  });
  // TODO: why localprops separately? (localprops are duplicated in allprops; maybe property)

  value.localprops.sort((a, b) => a.name < b.name);

  value.allprops = structuredClone(value.localprops); //TODO: why do we duplicate them? Does ariaChild.js need this duplication? (I understand its "allprops" but just "inherited" seems cleaner.)
  roleSection.querySelectorAll(".role-inherited :is(.property-reference, .state-reference)").forEach((link) => {
    const name = link.textContent.split(" ")[0]; //TODO: hack because roletype has (state) inside link (as the only role to have that), cf. TODO: in ariaPreprocessing.js
    const prop = structuredClone(statesAndProps[name]);
    if (link.closest(".role-disallowed")) prop["disallowed"] = true;
    value.allprops.push(prop);
  });
  // TODO: sort value.allprops
};

document.querySelectorAll("#role_definitions .role").forEach(generateRoleInfoEntry);

// sort keys
const sortKeys = (o) =>
  Object.keys(o)
    .sort()
    .reduce((r, k) => ((r[k] = o[k]), r), {});
fs.writeFileSync(outputFilename, "/* This file is generated - do not modify */ var roleInfo = " + JSON.stringify(sortKeys(roleInfo), null, 2));
