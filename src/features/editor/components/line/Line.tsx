import { type FormEvent, useEffect, useRef } from 'react';

import { type UUID } from 'types';
import { type LineFocusState } from './types';
import { focusOnMount, handleKeyDown } from './utils';

import styles from './Line.module.css';

interface Props {
   line: {
      id: UUID;
      number: number;
      content: string;
   };
   addLine: (lineIndex: number) => void;
   removeLine: (lineID: UUID) => void;
   updateLine: (lineID: UUID, event: FormEvent<HTMLSpanElement>) => void;
}

export const Line = ({ line, addLine, removeLine, updateLine }: Props) => {
   const lineContentRef = useRef<HTMLSpanElement>(null);

   const onMount = () => {
      if (lineContentRef.current) {
         focusOnMount(lineContentRef.current);
      }
   };

   useEffect(onMount, []);

   const actualLineNumber = line.number - 1;

   const doNothing: LineFocusState = [ '', 0 ];

   const keyHandlers = handleKeyDown([
      {
         key: 'Enter',
         onPress: () => addLine(actualLineNumber),
         state: doNothing,
      },
      {
         key: 'Backspace',
         onPress: () => {
            const noLineContent = !line.content;

            if (noLineContent) {
               removeLine(line.id);
            }
         },
         state: !line.content ? [ 'focus', actualLineNumber - 1 ] : doNothing,
      },
      {
         key: 'ArrowUp',
         onPress: () => {},
         state: [ 'focus', actualLineNumber - 1 ],
      },
      {
         key: 'ArrowDown',
         onPress: () => {},
         state: [ 'focus', actualLineNumber + 1 ],
      }
   ]);

   return (
      <p
         className={styles.line}
      >
         <span
            className={styles.lineNumber}
         >
            {line.number}
         </span>

         <span
            className={styles.lineContent}
            contentEditable
            suppressContentEditableWarning
            onInput={event => updateLine(line.id, event)}
            onKeyDown={keyHandlers}
            ref={lineContentRef}
         >
            {line.content}
         </span>
      </p>
   );
};
