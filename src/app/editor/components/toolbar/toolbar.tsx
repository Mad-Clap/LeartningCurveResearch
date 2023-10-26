import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode } from '@lexical/rich-text';
import { $createTextNode, $getRoot } from 'lexical';

export function Head_1(): JSX.Element{
    const [editor] = useLexicalComposerContext();
    const onClick = (e:React.MouseEvent):void => {
        editor.update(() => {
            const root = $getRoot();
            root.append($createHeadingNode('h1').append($createTextNode("Isso é uma seção conceitual")))
        })
    }

    return(
        <button onClick={onClick}>Head_1</button>
    )
}