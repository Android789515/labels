import { type FormEvent, type KeyboardEvent } from 'react';
import { useRef, useEffect } from 'react';

import { type Line as LineType, type SetLines } from './types';
import { updateLine } from '../../utils';
import { getKeyMap, getCursorPosition } from './utils';

import styles from './Line.module.css';

interface Props {
   line: LineType;
   setLines: SetLines;
}

export const Line = ({ line, setLines }: Props) => {
   const cursorPositionRef = useRef(0);

   const lineRef = useRef<HTMLSpanElement>(null);

   const applyCursorPosition = () => {
      const selection = window.getSelection();
      const range = document.createRange();

      const line = lineRef.current;
      const hasText = line?.childNodes.length;

      if (hasText) {
         range.setStart(line.childNodes[0], cursorPositionRef.current);
         range.collapse(true);

         selection?.removeAllRanges();
         selection?.addRange(range);
      }
   };

   useEffect(applyCursorPosition, [ cursorPositionRef.current ]);

   const onMount = () => {
      lineRef.current?.focus();
   };

   useEffect(onMount, []);

   const handleInput = (event: FormEvent<HTMLSpanElement>) => {
      setLines(updateLine(line.id, event));

      cursorPositionRef.current = getCursorPosition(event.target as HTMLSpanElement);
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

   const handleLeftAndRightArrowKeys = (event: KeyboardEvent) => {
      const wereLeftOrRightArrowsPressed =
         event.key === 'ArrowLeft'
         || event.key === 'ArrowRight';

      if (wereLeftOrRightArrowsPressed) {
         cursorPositionRef.current = getCursorPosition(event.target as HTMLSpanElement);
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
            onKeyUp={handleLeftAndRightArrowKeys}
            onFocus={applyCursorPosition}
            ref={lineRef}
         >
            {line.content}
         </span>
      </p>
   );
};
