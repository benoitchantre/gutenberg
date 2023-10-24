/**
 * WordPress dependencies
 */
import { title as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import lazyLoad from '../utils/lazy-load';
import initBlock from '../utils/init-block';
import metadata from './block.json';

import deprecated from './deprecated';

const { name } = metadata;
export { metadata, name };

export const settings = {
	icon,
	edit: lazyLoad( () =>
		import( /* webpackChunkName: "post-title/editor" */ './edit' )
	),
	deprecated,
};

export const init = () => initBlock( { name, metadata, settings } );
