/* Utility functions */

// Change the authors credit to mapping contributors credit
// Right now this will run on any author credit, not scoped to AAMs
function addPlatformMaintainers() {
  const dt = [...document.querySelectorAll("div.head dt")].find(node => node.textContent.trim() === "Authors:");
  if (dt) dt.textContent = "Platform Mapping Maintainers:";
}

