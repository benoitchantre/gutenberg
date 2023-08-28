/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { hasBlockSupport } from '@wordpress/blocks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { InspectorControls } from '../components';

function BehaviorsControl( {
	blockBehaviors,
	onChangeBehavior,
	onChangeAnimation,
	disabled = false,
} ) {
	const defaultBehaviors = {
		default: {
			value: 'default',
			label: __( 'Default' ),
		},
		noBehaviors: {
			value: '',
			label: __( 'No behaviors' ),
		},
	};

	const options = [ ...Object.values( defaultBehaviors ) ];

	const { behaviors, behaviorsValue } = useMemo( () => {
		const mergedBehaviors = {
			...( blockBehaviors || {} ),
		};

		let value = '';
		if ( blockBehaviors === undefined ) {
			value = 'default';
		}
		if ( blockBehaviors?.lightbox.enabled ) {
			value = 'lightbox';
		}
		return {
			behaviors: mergedBehaviors,
			behaviorsValue: value,
		};
	}, [ blockBehaviors ] );

	const helpText = disabled
		? __( 'The lightbox behavior is disabled for linked images.' )
		: '';

	return (
		<InspectorControls group="advanced">
			<div>
				<SelectControl
					label={ __( 'Behaviors' ) }
					// At the moment we are only supporting one behavior (Lightbox)
					value={ behaviorsValue }
					options={ options }
					onChange={ onChangeBehavior }
					hideCancelButton={ true }
					help={ helpText }
					size="__unstable-large"
					disabled={ disabled }
				/>
				{ behaviorsValue === 'lightbox' && (
					<SelectControl
						label={ __( 'Animation' ) }
						// At the moment we are only supporting one behavior (Lightbox)
						value={
							behaviors?.lightbox.animation
								? behaviors?.lightbox.animation
								: ''
						}
						options={ [
							{
								value: 'zoom',
								label: __( 'Zoom' ),
							},
							{
								value: 'fade',
								label: __( 'Fade' ),
							},
						] }
						onChange={ onChangeAnimation }
						hideCancelButton={ false }
						size="__unstable-large"
						disabled={ disabled }
					/>
				) }
			</div>
		</InspectorControls>
	);
}

/**
 * Override the default edit UI to include a new block inspector control for
 * assigning behaviors to blocks if behaviors are enabled in the theme.json.
 *
 * Currently, only the `core/image` block is supported.
 *
 * @param {WPComponent} BlockEdit Original component.
 *
 * @return {WPComponent} Wrapped component.
 */
export const withBehaviors = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const blockEdit = <BlockEdit key="edit" { ...props } />;
		// Only add behaviors to blocks with support.
		if ( ! hasBlockSupport( props.name, 'behaviors' ) ) {
			return blockEdit;
		}
		const blockHasLink =
			typeof props.attributes?.linkDestination !== 'undefined' &&
			props.attributes?.linkDestination !== 'none';
		return (
			<>
				{ blockEdit }
				<BehaviorsControl
					blockName={ props.name }
					blockBehaviors={ props.attributes.behaviors }
					onChangeBehavior={ ( nextValue ) => {
						if ( nextValue === 'default' ) {
							props.setAttributes( {
								behaviors: undefined,
							} );
						} else {
							// If the user selects something, it means that they want to
							// change the default value (true) so we save it in the attributes.
							props.setAttributes( {
								behaviors: {
									lightbox: {
										enabled: nextValue === 'lightbox',
										animation:
											nextValue === 'lightbox'
												? 'zoom'
												: '',
									},
								},
							} );
						}
					} }
					onChangeAnimation={ ( nextValue ) => {
						props.setAttributes( {
							behaviors: {
								lightbox: {
									enabled:
										props.attributes.behaviors.lightbox
											.enabled,
									animation: nextValue,
								},
							},
						} );
					} }
					disabled={ blockHasLink }
				/>
			</>
		);
	};
}, 'withBehaviors' );

// TODO: Remove this whole file once the image block is updated to use the
// lightbox directly
// addFilter(
// 	'editor.BlockEdit',
// 	'core/behaviors/with-inspector-control',
// 	withBehaviors
// );
