/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Save component
 * 
 * Since this block uses server-side rendering,
 * we return null to let PHP handle the output
 */
export default function Save() {
    return null;
}
