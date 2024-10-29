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

const canMoveToLine = (lineElement: HTMLSpanElement, currentLine: number, nextLine: number): boolean | HTMLSpanElement => {
   const cursorPosition = getCursorPosition(lineElement);

   const nextLineIsAfter = currentLine < nextLine;

   const atLineBoundary = nextLineIsAfter
      ? cursorPosition === lineElement.textContent?.length
      : cursorPosition === 0;

   const prevLine = hasLine(getLines(lineElement), nextLine);

   return atLineBoundary && prevLine || false;
};

export const getKeyMap = (line: Line, setLines: SetLines): KeyMap => {
   return {
      Enter: () => {
         setLines(addLine(line.number - 1));
         return true;
      },
      Backspace: event => {
         const canRemoveLine = canMoveToLine(event.target as HTMLSpanElement, line.number, line.number - 1);

         if (canRemoveLine) {
            setLines(removeLine(line.number));

            return true;
         } else {
            return false;
         }
      },
      Delete: event => {
         const canRemoveLine = canMoveToLine(event.target as HTMLSpanElement, line.number, line.number + 1);

         if (canRemoveLine) {
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
