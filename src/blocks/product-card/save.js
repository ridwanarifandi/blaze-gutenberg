/**
 * WordPress dependencies
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Save component
 * 
 * Since this block uses server-side rendering, we return null
 * The actual rendering is handled by PHP in BlocksManager.php
 */
export default function Save() {
	return null;
}
