'use client'

import * as React from "react"
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, $createHeadingNode } from '@lexical/rich-text';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ListNode, ListItemNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { DocumentoNo, DocumentoNoPlugin } from "../../plugins/Documento/DocumentoNode";
import { TituloNode } from "../../plugins/TituloNode";


import { Toolbar } from "../toolbar/toolbar";
import './style.css'
import { LexicalEditor } from "lexical";

interface Props{}

const theme = {
  heading:{
    h1: 'glyf-editor-h1'
  },
  documento: 'documentoEstilo'
}

  function onError(error:any) {
    console.error(error);
  }

 

export function Editor({}:Props):JSX.Element{
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
        nodes: [DocumentoNo, HeadingNode, TituloNode]
      };
    return(
      <div>
        
        <LexicalComposer initialConfig={initialConfig}>
          <Toolbar/>
          <RichTextPlugin
          contentEditable={<ContentEditable className="contentEditable" />}
          placeholder={<div className="placeholder">Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin></HistoryPlugin>
          <DocumentoNoPlugin/>
          <SaveJSON/>
        </LexicalComposer >
      </div>
    )
}


/** ---------- Funções que se utilizam do estado do editor -------------*/

/** Salva o atual estado do editor em formato JSON */
function SaveJSON(){
  const [editor] = useLexicalComposerContext();
  const onClick = (e:React.MouseEvent):void => {
    const json = editor.getEditorState().toJSON();
    console.log(json);
  }
  return(<button onClick={onClick}>Salvar JSON</button>)
}