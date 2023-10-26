import {ElementNode, LexicalNode, type EditorConfig, Spread, SerializedElementNode} from 'lexical';

export type SerializeddoctypeNode = Spread<
  {
    doc:string;
  },
  SerializedElementNode
>;


export class DocType extends ElementNode {

  static getType(): string {
    return 'DocType';
  }

  static clone(node:DocType ): DocType {
    return new DocType(node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    // Define the DOM element here
    const dom = document.createElement('doctype');
    dom.setAttribute("doc","conceitual");
    dom.className=config.theme.Doctype;
    return dom;
  }

  updateDOM(): boolean {
    // Returning false tells Lexical that this node does not need its
    // DOM element replacing with a new copy from createDOM.
    return false;
  }

  exportJSON(): SerializeddoctypeNode {
    
    return {
      ...super.exportJSON(),
      doc:"conceitual",
      type:"DocType",
      version:1
    }
      
  }

  importJSON(serializedNode: SerializeddoctypeNode): DocType {
    const node = $createDoctypeConceitual();
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }
}

  
export function $createDoctypeConceitual(): DocType {
    return new DocType();
  }
  
  export function $isCustomParagraphNode(node: LexicalNode | null | undefined): node is DocType  {
    return node instanceof DocType;
  }