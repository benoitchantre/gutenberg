/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	__experimentalGrid as Grid,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	__experimentalText as Text,
	FlexBlock,
	Placeholder,
} from '@wordpress/components';
import { useAsyncList } from '@wordpress/compose';
import { useCallback, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ItemActions from './item-actions';

export function ViewGrid( { data, fields, view, actions, getItemId } ) {
	const mediaField = fields.find(
		( field ) => field.id === view.layout.mediaField
	);
	const visibleFields = fields.filter(
		( field ) =>
			! view.hiddenFields.includes( field.id ) &&
			field.id !== view.layout.mediaField
	);
	const shownData = useAsyncList( data, { step: 3 } );
	return (
		<Grid
			gap={ 8 }
			columns={ 2 }
			alignment="top"
			className="dataviews-grid-view"
		>
			{ shownData.map( ( item, index ) => (
				<ViewGridItem
					key={ getItemId?.( item ) || index }
					mediaField={ mediaField }
					visibleFields={ visibleFields }
					item={ item }
					view={ view }
					actions={ actions }
				/>
			) ) }
		</Grid>
	);
}

function ViewGridItem( { mediaField, visibleFields, item, view, actions } ) {
	const [ isHovered, setIsHovered ] = useState( false );
	const onMouseEnter = useCallback( () => setIsHovered( true ), [] );
	const onMouseLeave = useCallback( () => setIsHovered( false ), [] );
	return (
		<VStack
			className={ classnames(
				'dataviews-view-grid__media-item-container',
				// Adding `is-hovered` class to the wrapper element is needed
				// because the actions Popover is rendered outside of this node.
				{ 'is-hovered': isHovered }
			) }
			onMouseEnter={ onMouseEnter }
			onMouseLeave={ onMouseLeave }
		>
			<ItemActions item={ item } actions={ actions } />
			<div className="dataviews-view-grid__media">
				{ mediaField?.render( { item, view } ) || (
					<Placeholder
						withIllustration
						style={ {
							width: '100%',
							minHeight: '200px',
						} }
					/>
				) }
			</div>
			<VStack className="dataviews-view-grid__fields">
				{ visibleFields.map( ( field ) => (
					<HStack justify="space-between" key={ field.id }>
						<FlexBlock>
							<Text variant="muted">{ field.header }</Text>
						</FlexBlock>
						<FlexBlock>
							{ field.render( { item, view } ) }
						</FlexBlock>
					</HStack>
				) ) }
			</VStack>
		</VStack>
	);
}
