import { type FormEvent, type KeyboardEvent, useEffect, useRef } from 'react';

import { type UUID } from 'types';

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

   const focusOnMount = () => {
      if (lineContentRef.current) {
         lineContentRef.current.focus();
      }
   };

   useEffect(focusOnMount, []);

   const blurCurrentLine = () => {
      if (lineContentRef.current) {
         lineContentRef.current.blur();
      }
   };

   const focusPreviousLine = (currentLine: HTMLSpanElement) => {
      const previousLine = currentLine.parentNode?.parentNode?.previousSibling;

      if (previousLine) {
         const previousLineContent = previousLine.firstChild?.lastChild as HTMLSpanElement;

         previousLineContent.focus();
      }
   };

   const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
         case 'Enter': {
            event.preventDefault();
            addLine();
            blurCurrentLine();

            break;
         }

         case 'Backspace': {
            const noLineContent = !line.content;

            if (noLineContent) {
               event.preventDefault();
               removeLine(line.id);
               focusPreviousLine(event.target as HTMLSpanElement);
            }

            break;
         }

         default:
            break;
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
            onInput={event => updateLine(line.id, event)}
            onKeyDown={handleKeyDown}
            ref={lineContentRef}
         >
            {line.content}
         </span>
      </p>
   );
};
