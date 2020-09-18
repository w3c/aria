function fixImportedRefs() {
	// hack to rewrite internal aria section links in imported vocabulary
	var dl = document.querySelectorAll('section#terms dl.termlist dd a');
	dl.forEach(atag => {
		if (atag.hash && (atag.hash == "#deprecated" || atag.hash == "#statevsprop")) {
			atag.href = 'https://www.w3.org/TR/wai-aria-1.1/' + atag.hash;
		}
	})
	// delete the paragraph of terms used to work around recursive import
	document.getElementById('hack').remove();
}
