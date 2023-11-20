/**
 * External dependencies
 */
import removeAccents from 'remove-accents';

/**
 * WordPress dependencies
 */
import {
	Icon,
	__experimentalHeading as Heading,
	__experimentalText as Text,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { useState, useMemo, useCallback } from '@wordpress/element';
import { useEntityRecords } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import Page from '../page';
import Link from '../routes/link';
import { useAddedBy, AvatarImage } from '../list/added-by';
import { TEMPLATE_POST_TYPE } from '../../utils/constants';
import { DataViews } from '../dataviews';
import { ENUMERATION_TYPE, OPERATOR_IN } from '../dataviews/constants';
import {
	useResetTemplateAction,
	deleteTemplateAction,
	renameTemplateAction,
} from './template-actions';

const EMPTY_ARRAY = [];

const DEFAULT_VIEW = {
	type: 'list',
	search: '',
	page: 1,
	perPage: 20,
	// All fields are visible by default, so it's
	// better to keep track of the hidden ones.
	hiddenFields: [],
	layout: {},
	filters: [],
};

function normalizeSearchInput( input = '' ) {
	return removeAccents( input.trim().toLowerCase() );
}

// TODO: these are going to be reused in the template part list.
// That's the reason for leaving the template parts code for now.
function TemplateTitle( { item } ) {
	const { isCustomized } = useAddedBy( item.type, item.id );
	return (
		<VStack spacing={ 1 }>
			<Heading as="h3" level={ 5 }>
				<Link
					params={ {
						postId: item.id,
						postType: item.type,
						canvas: 'edit',
					} }
				>
					{ decodeEntities( item.title?.rendered || item.slug ) ||
						__( '(no title)' ) }
				</Link>
			</Heading>
			{ isCustomized && (
				<span className="edit-site-list-added-by__customized-info">
					{ item.type === TEMPLATE_POST_TYPE
						? _x( 'Customized', 'template' )
						: _x( 'Customized', 'template part' ) }
				</span>
			) }
		</VStack>
	);
}

function AuthorField( { item } ) {
	const { text, icon, imageUrl } = useAddedBy( item.type, item.id );
	return (
		<HStack alignment="left">
			{ imageUrl ? (
				<AvatarImage imageUrl={ imageUrl } />
			) : (
				<div className="edit-site-list-added-by__icon">
					<Icon icon={ icon } />
				</div>
			) }
			<span>{ text }</span>
		</HStack>
	);
}

export default function DataviewsTemplates() {
	const [ view, setView ] = useState( DEFAULT_VIEW );
	const { records: allTemplates, isResolving: isLoadingData } =
		useEntityRecords( 'postType', TEMPLATE_POST_TYPE, {
			per_page: -1,
		} );
	const allAuthorElements = useMemo( () => {
		if ( ! allTemplates ) {
			return EMPTY_ARRAY;
		}
		const authors = new Set();
		allTemplates.forEach( ( template ) => {
			authors.add( template.author_text );
		} );
		return Array.from( authors ).map( ( author, i ) => ( {
			value: author,
			label: author,
		} ) );
	}, [ allTemplates ] );
	const { shownTemplates, paginationInfo } = useMemo( () => {
		if ( ! allTemplates ) {
			return {
				shownTemplates: EMPTY_ARRAY,
				paginationInfo: { totalItems: 0, totalPages: 0 },
			};
		}
		let filteredTemplates = [ ...allTemplates ];
		// Handle global search.
		if ( view.search ) {
			const normalizedSearch = normalizeSearchInput( view.search );
			filteredTemplates = filteredTemplates.filter( ( item ) => {
				const title = item.title?.rendered || item.slug;
				return (
					normalizeSearchInput( title ).includes(
						normalizedSearch
					) ||
					normalizeSearchInput( item.description ).includes(
						normalizedSearch
					)
				);
			} );
		}

		if ( view.filters.length > 0 ) {
			view.filters.forEach( ( filter ) => {
				if (
					filter.field === 'author' &&
					filter.operator === OPERATOR_IN &&
					filter.value !== ''
				) {
					filteredTemplates = filteredTemplates.filter( ( item ) => {
						return item.author_text === filter.value;
					} );
				}
			} );
		}
		// Handle sorting.
		// TODO: Explore how this can be more dynamic..
		if ( view.sort ) {
			if ( view.sort.field === 'title' ) {
				filteredTemplates.sort( ( a, b ) => {
					const titleA = a.title?.rendered || a.slug;
					const titleB = b.title?.rendered || b.slug;
					return view.sort.direction === 'asc'
						? titleA.localeCompare( titleB )
						: titleB.localeCompare( titleA );
				} );
			}
			if ( view.sort.field === 'author' ) {
				filteredTemplates.sort( ( a, b ) => {
					const authorA = a.author_text;
					const authorB = b.author_text;
					return view.sort.direction === 'asc'
						? authorA.localeCompare( authorB )
						: authorB.localeCompare( authorA );
				} );
			}
		}
		// Handle pagination.
		const start = ( view.page - 1 ) * view.perPage;
		const totalItems = filteredTemplates?.length || 0;
		filteredTemplates = filteredTemplates?.slice(
			start,
			start + view.perPage
		);
		return {
			shownTemplates: filteredTemplates,
			paginationInfo: {
				totalItems,
				totalPages: Math.ceil( totalItems / view.perPage ),
			},
		};
	}, [ allTemplates, view ] );
	const fields = useMemo(
		() => [
			{
				header: __( 'Template' ),
				id: 'title',
				getValue: ( { item } ) => item.title?.rendered || item.slug,
				render: ( { item } ) => <TemplateTitle item={ item } />,
				maxWidth: 400,
				enableHiding: false,
			},
			{
				header: __( 'Description' ),
				id: 'description',
				getValue: ( { item } ) => item.description,
				render: ( { item } ) => {
					return (
						item.description && (
							<Text variant="muted">
								{ decodeEntities( item.description ) }
							</Text>
						)
					);
				},
				maxWidth: 200,
				enableSorting: false,
			},
			{
				header: __( 'Author' ),
				id: 'author',
				getValue: ( { item } ) => item.author_text,
				render: ( { item } ) => {
					return <AuthorField item={ item } />;
				},
				enableHiding: false,
				enableSorting: true,
				type: ENUMERATION_TYPE,
				elements: allAuthorElements,
			},
		],
		[ allAuthorElements ]
	);
	const resetTemplateAction = useResetTemplateAction();
	const actions = useMemo(
		() => [
			resetTemplateAction,
			deleteTemplateAction,
			renameTemplateAction,
		],
		[ resetTemplateAction ]
	);
	const onChangeView = useCallback(
		( viewUpdater ) => {
			const updatedView =
				typeof viewUpdater === 'function'
					? viewUpdater( view )
					: viewUpdater;
			setView( updatedView );
		},
		[ view, setView ]
	);
	return (
		<Page title={ __( 'Templates' ) }>
			<DataViews
				paginationInfo={ paginationInfo }
				fields={ fields }
				actions={ actions }
				data={ shownTemplates }
				isLoading={ isLoadingData }
				view={ view }
				onChangeView={ onChangeView }
				supportedLayouts={ [ 'list' ] }
			/>
		</Page>
	);
}
