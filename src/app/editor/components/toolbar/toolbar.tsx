import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode } from '@lexical/rich-text';
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';
import { $createDocumentoNo } from '../../plugins/Documento/DocumentoNode';
import { $createStickyHeading } from '../../plugins/Sticky-headNode';


export function Head_1(): JSX.Element{
    const [editor] = useLexicalComposerContext();
    const onClick = (e:React.MouseEvent):void => {
        editor.update(() => {
            const root = $getRoot();
            root.append($createHeadingNode('h1').append($createTextNode("Isso é uma sessão conceitual")))
        })
    }

    return(
        <button onClick={onClick}>Head_1</button>
    )
}

export function DocCreate(): JSX.Element{
    const [editor] = useLexicalComposerContext()
    const onClick = (e:React.MouseEvent):void => {
        editor.update(() => {
            const root = $getRoot()
            root.append($createDocumentoNo('conceitual','vazio').append($createStickyHeading().append($createTextNode("some text"))))
            root.append($createParagraphNode())
        })
    }

    return(
        <button onClick={onClick}>Documento</button>
    )
}