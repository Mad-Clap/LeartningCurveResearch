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
import { $createTextNode, $getRoot } from 'lexical';
import { $createParagraphNode } from "lexical";
import { DocType, $createDoctypeConceitual } from "../../plugins/conceitual_node/conceitual";


import './style.css'

interface Props{}

const theme = {
  heading:{
    h1: 'glyf-editor-h1'
  },
  Doctype: 'docType'
}

  function onError(error:any) {
    console.error(error);
  }

  function Head_1(): JSX.Element{
    const [editor] = useLexicalComposerContext()
    const onClick = (e:React.MouseEvent):void => {
        editor.update(() => {
            const root = $getRoot()
            root.append($createDoctypeConceitual().append($createTextNode("some text")))
            root.append($createParagraphNode())
        })
    }

    return(
        <button onClick={onClick}>Doctype</button>
    )
}

export function Editor({}:Props):JSX.Element{
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
        nodes: [DocType, HeadingNode]
      };
    return(
      <div>
        
        <LexicalComposer initialConfig={initialConfig}>
          <Head_1/>
          <RichTextPlugin
          contentEditable={<ContentEditable className="contentEditable" />}
          placeholder={<div className="placeholder">Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin></HistoryPlugin>
        

        </LexicalComposer >
      </div>
      
      
    )
}