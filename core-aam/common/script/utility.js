/* Utility functions */

//check for require() and respec context
if (typeof require !== "undefined") {
    require(["core/pubsubhub"], function(respecEvents) {
        respecEvents.sub('end', function(message) {
            if (message === 'core/link-to-dfn')
                convertAuthorsToMaintainers();
        });
    });
} else {
    $(document).ready(function() {
	convertAuthorsToMaintainers();
    });
}

// Change the authors credit to mapping contributors credit
// Right now this will run on any author credit, not scoped to AAMs
function convertAuthorsToMaintainers() {
    "use strict";
    document.querySelectorAll("div.head dt").forEach(function(node){
        if (node.textContent == "Authors:") node.textContent = "Platform Mapping Maintainers:";
    });
}
