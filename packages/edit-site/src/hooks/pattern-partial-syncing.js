/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { BaseControl, CheckboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { hasBlockSupport } from '@wordpress/blocks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import {
	useBlockEditingMode,
	InspectorControls,
} from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../store';
import { PATTERN_TYPES } from '../utils/constants';

/**
 * Override the default edit UI to include a new block inspector control for
 * assigning a partial syncing controls to supported blocks in the pattern editor.
 * Currently, only the `core/paragraph` block is supported.
 *
 * @param {Component} BlockEdit Original component.
 *
 * @return {Component} Wrapped component.
 */
const withPartialSyncingControls = createHigherOrderComponent(
	( BlockEdit ) => {
		return ( props ) => {
			const blockEditingMode = useBlockEditingMode();
			const hasCustomFieldsSupport = hasBlockSupport(
				props.name,
				'__experimentalConnections',
				false
			);
			const isEditingPattern = useSelect(
				( select ) =>
					select( editSiteStore ).getEditedPostType() ===
					PATTERN_TYPES.user,
				[]
			);
			const [ metadata, setMetadata ] = useEntityProp(
				'postType',
				PATTERN_TYPES.user,
				'meta'
			);

			// Check if editing a pattern and the current block is a paragraph block.
			// Currently, only the paragraph block is supported.
			if (
				! hasCustomFieldsSupport ||
				! props.isSelected ||
				! isEditingPattern ||
				! [ 'core/paragraph' ].includes( props.name )
			) {
				return <BlockEdit { ...props } />;
			}

			// Only the `content` attribute of the paragraph block is currently supported.
			const attributeName = 'content';

			const isPartiallySynced =
				props.attributes?.connections?.attributes?.[ attributeName ]
					?.source === 'pattern_attributes';

			function updateConnections( isChecked ) {
				if ( ! isChecked ) {
					props.setAttributes( {
						connections: undefined,
					} );
					return;
				}
				if ( typeof props.attributes.metadata?.id === 'string' ) {
					props.setAttributes( {
						connections: {
							attributes: {
								[ attributeName ]: {
									source: 'pattern_attributes',
								},
							},
						},
					} );
					return;
				}

				let maxId =
					typeof metadata.wp_pattern_max_id === 'string'
						? parseInt( metadata.wp_pattern_max_id, 36 )
						: NaN;
				maxId = Number.isNaN( maxId ) ? 0 : maxId;
				const id = ( maxId + 1 ).toString( 36 );
				setMetadata( {
					...metadata,
					wp_pattern_max_id: id,
				} );
				props.setAttributes( {
					connections: {
						attributes: {
							[ attributeName ]: { source: 'pattern_attributes' },
						},
					},
					metadata: {
						...props.attributes.metadata,
						id,
					},
				} );
			}

			return (
				<>
					<BlockEdit { ...props } />
					{ blockEditingMode === 'default' && (
						<InspectorControls group="advanced">
							<BaseControl __nextHasNoMarginBottom>
								<BaseControl.VisualLabel>
									{ __( 'Synced attributes' ) }
								</BaseControl.VisualLabel>
								<CheckboxControl
									__nextHasNoMarginBottom
									label={ __( 'Content' ) }
									checked={ isPartiallySynced }
									onChange={ ( isChecked ) => {
										updateConnections( isChecked );
									} }
								/>
							</BaseControl>
						</InspectorControls>
					) }
				</>
			);
		};
	},
	'withPartialSyncingControls'
);

if ( window.__experimentalConnections ) {
	addFilter(
		'editor.BlockEdit',
		'core/edit-site/with-partial-syncing-controls',
		withPartialSyncingControls
	);
}
