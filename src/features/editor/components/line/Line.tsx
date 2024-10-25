import { type FormEvent, type KeyboardEvent } from 'react';

import { type Line as LineType, type SetLines, type KeyMap } from './types';
import { addLine, removeLine, updateLine } from '../../utils';

import styles from './Line.module.css';

interface Props {
   line: LineType;
   setLines: SetLines;
}

export const Line = ({ line, setLines }: Props) => {
   const handleInput = (event: FormEvent<HTMLSpanElement>) => {
      setLines(updateLine(line.id, event));
   };

   const handleKey = (event: KeyboardEvent) => {
      const keymap: KeyMap = {
         Enter: () => setLines(addLine(line.number - 1)),
         Backspace: () => setLines(removeLine(line.id)),
      };

      const wasKeyInMapPressed = Object.keys(keymap).includes(event.key);

      if (wasKeyInMapPressed) {
         event.preventDefault();
         keymap[event.key](event);
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
         >
            {line.content}
         </span>
      </p>
   );
};
