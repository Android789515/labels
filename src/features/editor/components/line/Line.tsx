import { type FormEvent, type KeyboardEvent } from 'react';
import { useRef, useEffect } from 'react';

import { type Line as LineType, type SetLines } from './types';
import { updateLine } from '../../utils';
import { getKeyMap } from './utils';

import styles from './Line.module.css';

interface Props {
   line: LineType;
   setLines: SetLines;
}

export const Line = ({ line, setLines }: Props) => {
   const lineRef = useRef<HTMLSpanElement>(null);

   const onMount = () => {
      lineRef.current?.focus();
   };

   useEffect(onMount, []);

   const handleInput = (event: FormEvent<HTMLSpanElement>) => {
      setLines(updateLine(line.id, event));
   };

   const handleKey = (event: KeyboardEvent) => {
      const keymap = getKeyMap(line, setLines);

      const wasKeyInMapPressed = Object.keys(keymap).includes(event.key);

      if (wasKeyInMapPressed) {
         const preventDefault = keymap[event.key](event);

         if (preventDefault) {
            event.preventDefault();
         }
      }
   };

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
            onInput={handleInput}
            onKeyDown={handleKey}
            ref={lineRef}
         >
            {line.content}
         </span>
      </p>
   );
};
