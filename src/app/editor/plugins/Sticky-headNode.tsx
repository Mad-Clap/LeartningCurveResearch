import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { HeadingNode } from "@lexical/rich-text";
import { LexicalNode } from "lexical";

export class StickyHeadingNode extends HeadingNode {
	static getType() {
		return "sticky-heading";
	}

	static clone(node: any) {
		return new StickyHeadingNode(node.getTag());
	}

	// do not remove node if it is the first child of root
	remove(preserveEmptyParent?: boolean | undefined): void {
       
	}

	// do not replace node if it is the first child of root
	replace<N extends LexicalNode>(
		replaceWith: N,
		includeChildren?: boolean | undefined
	): N {
		return this as unknown as N;
	}
}

/** ----- Funções para criação e checagem de nó -------- */
export function $createStickyHeading(): StickyHeadingNode {
    return new StickyHeadingNode('h2');
  }
  
export function $isStickyHeadingNode(node: LexicalNode | null | undefined): node is StickyHeadingNode  {
  return node instanceof StickyHeadingNode;
}
/** --------------------------------------------------------------------------------------------------------------------------- */
