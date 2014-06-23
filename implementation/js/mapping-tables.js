$(document).ready(function() {
		$('.table-container').each(function() {
			//store a reference to the container and hide it
			var $tableContainer = $(this).hide();
			//store a reference to the table
			var $table = $('table', $tableContainer),
			//create a container div to hold all the details element and insert after table
			$detailsContainer = $('<div class="details removeOnSave" id="' + $table.attr('id') + '-details"></div>');
			//insert $detailsContainer after the table
			$tableContainer.after($detailsContainer);
			//array to store table rows' @ids
			var ids = [];
			//add switch to view as single table or details/summary
			$viewSwitch = $('<button class="switch-view removeOnSave">View as a single table</button>').on('click', function() {
				//array to store summary/tr @ids
				//if current view is details/summary
				if ($detailsContainer.is(':visible')) {
          $detailsContainer.hide();
					//add <summary> @id to ids array and remove @id from summary
					$('summary', $detailsContainer).each(function() {
						$(this).removeAttr('id');
					});
					$tableContainer.show();
					//add relevant @id to tr
					$('tbody tr', $tableContainer).each(function() {
					  var anId = ids[$(this).index()];
					  if (anId && anId.length > 0) {
              $(this).attr('id', anId);
            }
					});
					if ($table.attr('id') == 'role-mapping-table') {
						$(this).text('View by role');
					} else {
						$(this).text('View by state/property');
					}
				} else {
					$tableContainer.hide();
					//add tr @id to ids array and remove @id from tr
					$('tbody tr', $tableContainer).each(function() {
						$(this).removeAttr('id');
					});
					$detailsContainer.show();
					//add relevant @id to summary
					$('summary', $detailsContainer).each(function() {
  						$(this).attr('id', ids[$('details', $detailsContainer).index($(this).parent())]);
					});
					$(this).text('View as a single table');
				}
			});
			$tableContainer.before($viewSwitch);
			//store the table's column headers in array colHeaders
			var colHeaders = [];
			$('thead th', $table).each(function() {
				var colHead = $(this).html();
				colHeaders.push(colHead);
			});
			//remove first column header from array
			colHeaders.shift();
			//for each row in the table, create details/summary..
			$('tbody tr', $table).each(function() {
				//store a reference to the row
				var $row = $(this),
				//store a reference to the row header for use in details' summary and table caption
				$caption = $('th', $row).html(),
				$summary = $caption.replace(/<a [^>]+>|<\/a>/g,'');
				//get the tr's @id
				var id = $row.attr('id');
				//store the row's @id
				ids.push(id);
				//empty the tr's @id since same id will be used in the relevant summary element
				$row.removeAttr('id');
				//store the row's cells in array rowCells
				rowCells = [];
				//add row cells to array rowCells for use in the details' table
				$('td', $row).each(function() {
					rowCells.push($(this).html());
				});
				//clone colHeaders array for use in details table row headers
				var rowHeaders = colHeaders.slice(0);
				//if attributes mapping table...
				if ($table.hasClass('attributes')) {
					//remove second column header from array
					rowHeaders.shift();
					//remove and store "HTML elements" cell from rowCells array for use in details' summary and table caption
					var relevantElsCaption = rowCells.shift(),
					relevantElsSummary = relevantElsCaption.replace(/<a [^>]+>|<\/a>/g,'');
				}
				//create content for each <details> element; add row header's content to summary
				var details;
				if (id && id.length > 0) {
				  details = '<details class="map removeOnSave"><summary id="' + id + '">' + $summary;
				}
				else {
          details = '<details class="map removeOnSave"><summary>' + $summary;
        }
				//if attributes mapping table, append relevant elements to summary
				if ($table.hasClass('attributes')) {
					details += ' [' + relevantElsSummary + ']';
				}
				details += '</summary><table><caption>' + $caption;
				if ($table.hasClass('attributes')) {
					details += ' [' + relevantElsCaption + ']';
				}
				details += '</caption><tbody>';
				//add table rows using appropriate header from detailsRowHead array and relevant value from rowCells array
				for(var i=0, len=rowCells.length; i < len; i++) {
					details += '<tr><th>' + rowHeaders[i] + '</th><td>' + rowCells[i] + '</td></tr>';
				}
				details += '</tbody></table></details>';
				//append the <details> element to the detailsContainer div
				$detailsContainer.append(details);
			});
			//add 'expand/collapse all' functionality
			var $expandAllButton = $('<button class="expand removeOnSave">Expand All</button>');
			var $collapseAllButton = $('<button disabled="disabled" class="collapse removeOnSave">Collapse All</button>');
			$detailsContainer.prepend($expandAllButton, $collapseAllButton);
			var expandCollapseDetails = function($detCont, action) {
				$detCont.find('details').each(function() {
					var $details = $(this), 
					$detailsSummary = $('summary', $details),
					$detailsNotSummary = $details.children(':not(summary)');
					if (action == 'collapse') {
						$details.removeClass('open').prop('open', false);
						$detailsSummary.attr('aria-expanded', false);
						$detailsNotSummary.hide();
					} else {
						$details.addClass('open').prop('open', true);
						$detailsSummary.attr('aria-expanded', true);
						$detailsNotSummary.show();
					}
				});
			};
			$expandAllButton.on('click', function() {
				expandCollapseDetails($detailsContainer, 'expand');
				$(this).attr('disabled', 'disabled');
				$detailsContainer.find('button.collapse').removeAttr('disabled');
			});
			$collapseAllButton.on('click', function() {
				expandCollapseDetails($detailsContainer, 'collapse');
				$(this).attr('disabled', 'disabled');
				$detailsContainer.find('button.expand').removeAttr('disabled');
			});
			//add collapsible table columns functionality
			var $showHideCols = $('<div class="show-hide-cols removeOnSave"><span>Show/Hide Columns: </span></div>');
			for(var i=0, len=colHeaders.length; i < len; i++) {
				var toggleLabel = colHeaders[i].replace(/<a [^<]+>|<\/a>/g,'').replace(/<sup>\[Note [0-9]+\]<\/sup>/g, '');
				var $showHideColButton = $('<button class="hide-col" aria-pressed="false" title="Hide column"><span class="action">Hide</span> ' + toggleLabel + '</button>').on('click', function() {
					var index = $(this).index() + 1;
					if ($(this).attr('class') == 'hide-col') {
						$('tr>th:nth-child('+index+')', $table).hide();
						$('tr>td:nth-child('+index+')', $table).hide();
						$(this).attr({'class': 'show-col', 'aria-pressed': 'true', 'title': 'Show column'});
						$('span', $(this)).text('Show');
					} else {
						$('tr>th:nth-child('+index+')', $table).show();
						$('tr>td:nth-child('+index+')', $table).show();
						$(this).attr({'class': 'hide-col', 'aria-pressed': 'false', 'title': 'Hide column'});
						$('span', $(this)).text('Hide');
					}
				});
				$('span:not(.action)', $showHideColButton).remove();
				$showHideCols.append($showHideColButton);
			}
			$tableContainer.prepend($showHideCols);
		});
		//call the jquery-details plugin
		var nativeDetailsSupport = $.fn.details.support;
		if (!nativeDetailsSupport) {
			$('html').addClass('no-details');
		}
		$('details').details();
		
		//Use jquery-details plugin event handlers on details open/close to set state of expand/collapse all buttons
		$('details').on({
			'open.details': function() {
				setExpandCollapseButtons($(this).parent());
			},
			'close.details': function() {
				setExpandCollapseButtons($(this).parent());
			}
		});
		var setExpandCollapseButtons = function($detCont) {
			var totalDetails = $detCont.find('details').length;
			var detailsOpen = $detCont.find('details.open, details[open]').length;
			//if, after the details is opened or closed...
			if (detailsOpen == totalDetails) {//all details are open, enable collapse all button and disable expand all button
				$detCont.find('button.collapse').removeAttr('disabled');
				$detCont.find('button.expand').attr('disabled', 'disabled');
			} else if (totalDetails > detailsOpen && detailsOpen > 0) {//some but not all details are open, enable collapse all button
				$detCont.find('button.collapse').removeAttr('disabled');
				$detCont.find('button.expand').removeAttr('disabled');
			} else {//no details are open, disable collapse all button and enable expand all button
				$detCont.find('button.collapse').attr('disabled', 'disabled');
				$detCont.find('button.expand').removeAttr('disabled');
			}
		};
		//if URL links to frag id, reset location to frag id once details/summary view is set
		if(window.location.hash) {
			window.location = window.location.hash;
		}

  // Add a hook to expand referred items when clicked.
  $('a[href|="#el"],a[href|="#att"]').each(
    function()
    {
      $(this).on('click', expandReferredItem);
    });
});

function expandReferredItem()
{
  var href = $(this).attr("href");
  var header = $(document).find(href);
  var details = header.parent();
  if (!details.prop('open'))
    details.find('summary').first().click();
}