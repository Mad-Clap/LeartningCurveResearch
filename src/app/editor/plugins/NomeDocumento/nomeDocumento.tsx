import {ElementNode, LexicalNode, type EditorConfig, Spread, SerializedElementNode,NodeKey} from 'lexical';

export type SerializedDocumentoNode = Spread<
  {
  },
  SerializedElementNode
>;


export class NomeDocumentoNo extends ElementNode {

  /** ------ Atributos do nó, construtor e método de clonagem ----------- */
  

  constructor(key?: NodeKey) {
    super(key);
  }

  static clone(node:NomeDocumentoNo ): NomeDocumentoNo {
    return new NomeDocumentoNo(node.__key);
  }
  /** --------------------------------------------------------------------------------------------------------------------------- */

  /** ------ Getters e Setters dos atributos do nó ----------- */

  static getType(): string {
    return 'nomeDocumento';
  }

  /** --------------------------------------------------------------------------------------------------------------------------- */


  /** -------------- Funções para exportar nó para HTML e importar do HTML ----------- */

  createDOM(config: EditorConfig): HTMLElement {
    // Define the DOM element here
    const dom = document.createElement('lc-nomeDocumento');
    dom.className=config.theme.estiloNomeDocumento;
    return dom;
  }

  updateDOM(): boolean {
    // Returning false tells Lexical that this node does not need its
    // DOM element replacing with a new copy from createDOM.
    return false;
  }

  /** --------------------------------------------------------------------------------------------------------------------------- */


  /** -------------- Funções para exportar nó para JSON e importar do JSON ----------- */

  exportJSON(): SerializedDocumentoNode {
    
    return {
      ...super.exportJSON(),
      type:"nomeDocumento",
      version:1
    }
      
  }

  importJSON(serializedNode: SerializedDocumentoNode): NomeDocumentoNo {
    const node = $createNomeDocumentoNo();
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }
  /** --------------------------------------------------------------------------------------------------------------------------- */

}

/** ----- Funções para criação e checagem de nó -------- */
export function $createNomeDocumentoNo(): NomeDocumentoNo {
    return new NomeDocumentoNo();
  }
  
export function $isNomeDocumentoNo(node: LexicalNode | null | undefined): node is NomeDocumentoNo  {
  return node instanceof NomeDocumentoNo;
}
/** --------------------------------------------------------------------------------------------------------------------------- */

