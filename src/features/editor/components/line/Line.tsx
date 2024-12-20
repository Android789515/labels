import { type FormEvent, type KeyboardEvent } from 'react';
import { useRef, useEffect } from 'react';

import { type Line as LineType, type SetLines } from './types';
import { updateLine, setCursorPosition } from '../../utils';
import { getKeyMap, getCursorPosition } from './utils';

import styles from './Line.module.css';

interface Props {
   line: LineType;
   setLines: SetLines;
}

export const Line = ({ line, setLines }: Props) => {
   const lineRef = useRef<HTMLSpanElement>(null);

   if (line.active) {
      lineRef.current?.focus();
   }

   const applyCursorPosition = (): void => {
      const selection = window.getSelection();
      const range = document.createRange();

      const lineElement = lineRef.current;
      const hasContent = lineElement?.childNodes.length;

      if (hasContent) {
         range.setStart(lineElement.childNodes[0], line.cursorPosition);
         range.collapse(true);

         selection?.removeAllRanges();
         selection?.addRange(range);
      }
   };

   useEffect(applyCursorPosition, [ line.content, line.cursorPosition ])

   const handleInput = (event: FormEvent<HTMLSpanElement>) => {
      const lineElement = event.target as HTMLSpanElement;

      setLines(updateLine({
         ...line,
         content: lineElement.textContent || '',
      }));

      const updatedCursorPosition = getCursorPosition(event.target as HTMLSpanElement);
      setLines(setCursorPosition(line.id, updatedCursorPosition));
   };

   const handleKey = (event: KeyboardEvent) => {
      const hasSelection = window.getSelection()?.toString().length;

      if (hasSelection) {
         return;
      }

      const keymap = getKeyMap(line, setLines);

      const wasKeyInMapPressed = Object.keys(keymap).includes(event.key);

      if (wasKeyInMapPressed) {
         const preventDefault = keymap[event.key](event);

         if (preventDefault) {
            event.preventDefault();
         }
      }
   };

   const handleKeyUp = (event: KeyboardEvent) => {
      const wereLeftOrRightArrowsPressed =
         event.key === 'ArrowLeft'
         || event.key === 'ArrowRight';

      if (wereLeftOrRightArrowsPressed) {
         const newCursorPosition = getCursorPosition(event.target as HTMLSpanElement);

         setLines(setCursorPosition(line.id, newCursorPosition));
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
            onKeyUp={handleKeyUp}
            onFocus={applyCursorPosition}
            ref={lineRef}
         >
            {line.content}
         </span>
      </p>
   );
};
