/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { tag as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Register Filter by Attribute block
 */
registerBlockType(metadata.name, {
	...metadata,
	icon: {
		src: icon,
		foreground: '#1e3a8a',
	},
	edit,
	save,
});
