/**
 * WordPress dependencies
 */
import { details as icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import lazyLoad from '../utils/lazy-load';
import initBlock from '../utils/init-block';
import metadata from './block.json';

import save from './save';

const { name } = metadata;
export { metadata, name };

export const settings = {
	icon,
	example: {
		attributes: {
			summary: 'La Mancha',
			showContent: true,
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: __(
						'In a village of La Mancha, the name of which I have no desire to call to mind, there lived not long since one of those gentlemen that keep a lance in the lance-rack, an old buckler, a lean hack, and a greyhound for coursing.'
					),
				},
			},
		],
	},
	save,
	edit: lazyLoad( () =>
		import( /* webpackChunkName: "details/editor" */ './edit' )
	),
};

export const init = () => initBlock( { name, metadata, settings } );
