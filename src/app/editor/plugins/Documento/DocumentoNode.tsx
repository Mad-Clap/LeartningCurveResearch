import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { error } from 'console';
import {ElementNode, LexicalNode, type EditorConfig, Spread, SerializedElementNode,NodeKey, $createTextNode, COMMAND_PRIORITY_EDITOR, createCommand, $getRoot, $createParagraphNode, RangeSelection} from 'lexical';
import { $createTitulo } from '../TituloNode';

export type SerializedDocumentoNode = Spread<
  {
    tipo:string;
    titulo:string;
  },
  SerializedElementNode
>;


export class DocumentoNo extends ElementNode {

  /** ------ Atributos do nó, construtor e método de clonagem ----------- */
  __tipo:string;
  __titulo:string;

  constructor(tipo: string, titulo:string, key?: NodeKey) {
    super(key);
    this.__tipo = tipo;
    this.__titulo = titulo;
  }

  static clone(node:DocumentoNo ): DocumentoNo {
    return new DocumentoNo(node.__tipo,node.__titulo,node.__key);
  }
  /** --------------------------------------------------------------------------------------------------------------------------- */

  /** ------ Getters e Setters dos atributos do nó ----------- */

  static getType(): string {
    return 'documento';
  }

  getTipo(): string{
    // getLatest() ensures we are getting the most
    // up-to-date value from the EditorState.
    const self = this.getLatest();
    return self.__tipo
  }

  setTipo(tipo:string){
    // getWritable() creates a clone of the node
    // if needed, to ensure we don't try and mutate
    // a stale version of this node.
    const self = this.getWritable();
    self.__tipo = tipo;
  }

  getTitulo(): string{
    // getLatest() ensures we are getting the most
    // up-to-date value from the EditorState.
    const self = this.getLatest();
    return self.__titulo
  }

  setTitulo(titulo:string){
    // getWritable() creates a clone of the node
    // if needed, to ensure we don't try and mutate
    // a stale version of this node.
    const self = this.getWritable();
    self.__titulo = titulo;
  }

  /** --------------------------------------------------------------------------------------------------------------------------- */

  /** -------------- Funções para exportar nó para HTML e importar do HTML ----------- */

  createDOM(config: EditorConfig): HTMLElement {
    // Define the DOM element here
    const dom = document.createElement('lc-documento');
    dom.setAttribute("tipo",this.__tipo);
    dom.setAttribute("titulo", this.__titulo)
    dom.className=config.theme.documento;
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
      type:"documento",
      tipo:this.__tipo,
      titulo: this.__titulo,
      version:1
    }
      
  }

  static importJSON(serializedNode: SerializedDocumentoNode): DocumentoNo {
    const node = $createDocumentoNo(serializedNode.tipo,serializedNode.titulo);
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }
  /** --------------------------------------------------------------------------------------------------------------------------- */

  /** ----------------- Funções para configurar o comportamento do nó dentro do editor ----------------- */
  
  collapseAtStart(selection: RangeSelection): boolean {
    const root = $getRoot();  
    const children = this.getChildren();
    //children.forEach(child => root.append)
    return true;
  }

  /** --------------------------------------------------------------------------------------------------------------------------- */
}

/** ----- Funções para criação e checagem de nó -------- */
export function $createDocumentoNo(tipo:string, titulo:string): DocumentoNo {
    return new DocumentoNo(tipo, titulo);
  }
  
export function $isDocumentoNo(node: LexicalNode | null | undefined): node is DocumentoNo  {
  return node instanceof DocumentoNo;
}
/** --------------------------------------------------------------------------------------------------------------------------- */


/** ----- Plugin referente ao nó Documento e constantes referentes a ele------------------ */

 export const INSERT_DOCUMENTO_COMMAND = createCommand('insereDocumento');

export function DocumentoNoPlugin():null{
  const [editor] = useLexicalComposerContext();

  //função para verificar se o editor tem o nó registrado
  if(!editor.hasNode(DocumentoNo)){
    throw new Error("o nó Documento não está registrado no editor")
  }

  const removeTextContentListener = editor.registerNodeTransform( DocumentoNo, 
    node =>{
      let noFilho = node.getFirstChild();
      if(noFilho){
        let titulo:string = noFilho.getTextContent()
        let atual:string = node.getTitulo()
        if(atual === titulo) {
          return null
        }
        else{
          node.setTitulo(titulo);
          console.log(node.getTitulo())
        }
      }
      console.log(node.getIndexWithinParent())
    }
  );

  editor.registerCommand(INSERT_DOCUMENTO_COMMAND, ()=>{
    const root = $getRoot();
    root.append($createDocumentoNo('conceitual','vazio').append($createTitulo().append($createTextNode("Titulo do documento"))))
    root.append($createParagraphNode())
    return true;
  }, COMMAND_PRIORITY_EDITOR)
  return null
}