import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text';
import {$getSelection, $isRangeSelection } from 'lexical';
import { INSERT_DOCUMENTO_COMMAND } from '../../plugins/Documento/DocumentoNode';
import { $setBlocksType } from '@lexical/selection';
import { Dropdown } from './customButtons/Dropdown';


function Head(): JSX.Element{
    const [editor] = useLexicalComposerContext();
    const onClick = (head:HeadingTagType,e:React.MouseEvent):void => {
        editor.update(() => {
            const selection = $getSelection();
            if($isRangeSelection(selection)){
                $setBlocksType(selection,()=> $createHeadingNode(head))
            }
        })
    }

    return(
        <Dropdown
        trigger={<button>Head</button>}
        menu={[
          <button onClick={(e)=> onClick('h1',e)}>Head 1</button>,
          <button onClick={(e)=> onClick('h1',e)}>Head 2</button>,
          <button onClick={(e)=> onClick('h3',e)}>Head 3</button>,
          <button onClick={(e)=> onClick('h4',e)}>Head 4</button>,
          <button onClick={(e)=> onClick('h5',e)}>Head 5</button>,
          <button onClick={(e)=> onClick('h6',e)}>Head 6</button>,
        ]}
      />
    )
}

function DocCreate(): JSX.Element{
    const [editor] = useLexicalComposerContext()
    const onClick = (e:React.MouseEvent):void => {
       editor.dispatchCommand(INSERT_DOCUMENTO_COMMAND, undefined)
    }

    return(
        <button onClick={onClick}>Documento</button>
    )
}

export function Toolbar(): JSX.Element{

    return(
        <div>
            <DocCreate/>
            <Head/>
        </div>
    )
}