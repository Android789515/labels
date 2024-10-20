import { type FormEvent, useEffect, useRef } from 'react';

import { type UUID } from 'types';
import { focusOnMount, handleKeyDown } from './utils';

import styles from './Line.module.css';

interface Props {
   line: {
      id: UUID;
      number: number;
      content: string;
   };
   addLine: () => void;
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

   const keyHandlers = handleKeyDown([
      {
         key: 'Enter',
         onPress: addLine,
         state: [ 'blur', line.number + 1 ],
      },
      {
         key: 'Backspace',
         onPress: () => {
            const noLineContent = !line.content;

            if (noLineContent) {
               removeLine(line.id);
            }
         },
         state: [ 'focus', line.number - 1 ],
      },
      {
         key: 'ArrowUp',
         onPress: () => {},
         state: [ 'focus', line.number - 1 ],
      },
      {
         key: 'ArrowDown',
         onPress: () => {},
         state: [ 'focus', line.number + 1 ],
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
