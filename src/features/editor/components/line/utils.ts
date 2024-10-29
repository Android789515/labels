import { type KeyMap, type Line, type SetLines } from './types';
import { addLine, removeLine, setActiveLine } from 'features/editor/utils';

export const getCursorPosition = (element: HTMLElement): number => {
   const selection = window.getSelection();
   const range = selection?.getRangeAt(0);

   if (range) {
      const clonedRange = range.cloneRange();
      clonedRange.selectNodeContents(element);
      clonedRange.setEnd(range.endContainer, range.endOffset);

      const cursorPosition = clonedRange.toString().length;

      return cursorPosition;
   } else {
      return 0;
   }
};

const getLines = (line: HTMLSpanElement): HTMLUListElement => {
   return line.parentNode!.parentNode!.parentNode! as HTMLUListElement;
};

const hasLine = (lines: HTMLUListElement, lineNumber: number): HTMLSpanElement | null => {
   const lineIndex = lineNumber - 1;
   const lineToFocus = lines.childNodes[lineIndex]?.firstChild?.lastChild as HTMLSpanElement;
   
   return lineToFocus;
};

export const getKeyMap = (line: Line, setLines: SetLines): KeyMap => {
   return {
      Enter: () => {
         setLines(addLine(line.number - 1));
         return true;
      },
      Backspace: event => {
         const lineElement = event.target as HTMLSpanElement;

         const atLineStart = getCursorPosition(lineElement) === 0;

         const prevLine = hasLine(getLines(lineElement), line.number - 1);

         if (atLineStart && prevLine) {
            setLines(removeLine(line.number));

            return true;
         } else {
            return false;
         }
      },
      Delete: event => {
         const lineElement = event.target as HTMLSpanElement;

         const atLineEnd = getCursorPosition(lineElement) === lineElement.textContent?.length || 0;

         const nextLine = hasLine(getLines(lineElement), line.number + 1);

         if (atLineEnd && nextLine) {
            setLines(removeLine(line.number + 1));

            return true;
         } else {
            return false;
         }
      },
      ArrowUp: () => {
         setLines(setActiveLine(line.number - 1));

         return true;
      },
      ArrowDown: () => {
         setLines(setActiveLine(line.number + 1));

         return true;
      },
   };
};
