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
import { StickyHeadingNode } from "../../plugins/Sticky-headNode";


import { Head_1, DocCreate } from "../toolbar/toolbar";
import './style.css'

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
        nodes: [DocumentoNo, HeadingNode, StickyHeadingNode]
      };
    return(
      <div>
        
        <LexicalComposer initialConfig={initialConfig}>
          <DocCreate/>
          <Head_1/>
          <RichTextPlugin
          contentEditable={<ContentEditable className="contentEditable" />}
          placeholder={<div className="placeholder">Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin></HistoryPlugin>
          <DocumentoNoPlugin/>

        </LexicalComposer >
      </div>
      
      
    )
}