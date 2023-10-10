/**
 * WordPress dependencies
 */
import { getFilesFromDataTransfer } from '@wordpress/dom';

/**
 * Normalizes a given string of HTML to remove the Windows-specific "Fragment"
 * comments and any preceding and trailing content.
 *
 * @param {string} html the html to be normalized
 * @return {string} the normalized html
 */
export function removeWindowsFragments( html ) {
	// Strip Windows markers.
	return html
		.replace(
			/^\s*<html[^>]*>\s*<body[^>]*>(?:\s*<!--\s*StartFragment\s*-->)?/i,
			''
		)
		.replace(
			/(?:<!--\s*EndFragment\s*-->\s*)?<\/body>\s*<\/html>\s*$/i,
			''
		);
}

/**
 * Removes the charset meta tag inserted by Chromium.
 * See:
 * - https://github.com/WordPress/gutenberg/issues/33585
 * - https://bugs.chromium.org/p/chromium/issues/detail?id=1264616#c4
 *
 * @param {string} html the html to be stripped of the meta tag.
 * @return {string} the cleaned html
 */
export function removeMetaTags( html ) {
	return html.replace( /<meta[^>]+>/gi, '' );
}

export function getClipboardEventData( event ) {
	const { clipboardData } = event;
	let plainText = '';
	let html = '';

	// IE11 only supports `Text` as an argument for `getData` and will
	// otherwise throw an invalid argument error, so we try the standard
	// arguments first, then fallback to `Text` if they fail.
	try {
		plainText = clipboardData.getData( 'text/plain' );
		html = clipboardData.getData( 'text/html' );
	} catch ( error1 ) {
		try {
			html = clipboardData.getData( 'Text' );
		} catch ( error2 ) {
			// Some browsers like UC Browser paste plain text by default and
			// don't support clipboardData at all, so allow default
			// behaviour.
			return;
		}
	}

	html = removeWindowsFragments( html );
	html = removeMetaTags( html );

	const files = getFilesFromDataTransfer( clipboardData );

	if (
		files.length &&
		! shouldDismissPastedFiles( files, html, plainText )
	) {
		return { files };
	}

	return { html, plainText, files: [] };
}

/**
 * Given a collection of DataTransfer files and HTML and plain text strings,
 * determine whether the files are to be dismissed in favor of the HTML.
 *
 * Certain office-type programs, like Microsoft Word or Apple Numbers,
 * will, upon copy, generate a screenshot of the content being copied and
 * attach it to the clipboard alongside the actual rich text that the user
 * sought to copy. In those cases, we should let Gutenberg handle the rich text
 * content and not the screenshot, since this allows Gutenberg to insert
 * meaningful blocks, like paragraphs, lists or even tables.
 *
 * @param {File[]} files File objects obtained from a paste event
 * @param {string} html  HTML content obtained from a paste event
 * @return {boolean}     True if the files should be dismissed
 */
export function shouldDismissPastedFiles( files, html /*, plainText */ ) {
	// The question is only relevant when there is actual HTML content and when
	// there is exactly one image file.
	if (
		html &&
		files?.length === 1 &&
		files[ 0 ].type.indexOf( 'image/' ) === 0
	) {
		// A single <img> tag found in the HTML source suggests that the
		// content being pasted revolves around an image. Sometimes there are
		// other elements found, like <figure>, but we assume that the user's
		// intention is to paste the actual image file.
		const IMAGE_TAG = /<\s*img\b/gi;
		if ( html.match( IMAGE_TAG )?.length !== 1 ) return true;

		// Even when there is exactly one <img> tag in the HTML payload, we
		// choose to weed out local images, i.e. those whose source starts with
		// "file://". These payloads occur in specific configurations, such as
		// when copying an entire document from Microsoft Word, that contains
		// text and exactly one image, and pasting that content using Google
		// Chrome.
		const IMG_WITH_LOCAL_SRC = /<\s*img\b[^>]*\bsrc="file:\/\//i;
		if ( html.match( IMG_WITH_LOCAL_SRC ) ) return true;
	}

	return false;
}