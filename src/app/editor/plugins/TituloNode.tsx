import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { HeadingNode, SerializedHeadingNode } from "@lexical/rich-text";
import { LexicalNode } from "lexical";

export class TituloNode extends HeadingNode {
	static getType() {
		return "Titulo";
	}

	static clone(node: any) {
		return new TituloNode(node.getTag());
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

	exportJSON(): SerializedHeadingNode {
		return {
		  ...super.exportJSON(),
		  type:"Titulo",
		  tag: this.__tag,
		  version:1
		}	  
	}

	static importJSON(serializedNode: SerializedHeadingNode): TituloNode {
		const node = $createTitulo();
		node.setFormat(serializedNode.format);
    	node.setIndent(serializedNode.indent);
    	node.setDirection(serializedNode.direction);
    	return node;
		
	}
}

/** ----- Funções para criação e checagem de nó -------- */
export function $createTitulo(): TituloNode {
    return new TituloNode('h2');
  }
  
export function $isTituloNode(node: LexicalNode | null | undefined): node is TituloNode  {
  return node instanceof TituloNode;
}
/** --------------------------------------------------------------------------------------------------------------------------- */
