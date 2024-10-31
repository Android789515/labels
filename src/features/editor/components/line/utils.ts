import { type KeyMap, type Line, type SetLines } from './types';
import { addLine, removeLine, setActiveLine, updateLine } from 'features/editor/utils';

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

const tabKeyValue = '\u00a0\u00a0\u00a0\u00a0';

export const getKeyMap = (line: Line, setLines: SetLines): KeyMap => {
   return {
      Enter: () => {
         setLines(addLine(line.number - 1));
         return true;
      },
      Backspace: event => {
         const lineElement = event.target as HTMLSpanElement;
         const prevLine = hasLine(getLines(lineElement), line.number - 1);

         const canRemoveLine = line.cursorPosition === 0 && prevLine;
         const removeTabKey = line.content.endsWith(tabKeyValue);

         if (canRemoveLine) {
            setLines(removeLine(line.number));

            return true;
         } else if (removeTabKey) {
            const [ contentWithTabRemoved ] = line.content.split(tabKeyValue);

            setLines(updateLine({
               ...line,
               content: contentWithTabRemoved,
            }));

            return true;
         } else {
            return false;
         }
      },
      Delete: event => {
         const lineElement = event.target as HTMLSpanElement;
         const nextLine = hasLine(getLines(lineElement), line.number + 1);

         const canRemoveLine = line.cursorPosition === lineElement.textContent?.length && nextLine;

         if (canRemoveLine) {
            setLines(removeLine(line.number + 1));

            return true;
         } else {
            return false;
         }
      },
      Tab: () => {
         const newContent = line.content + tabKeyValue;

         setLines(updateLine({
            ...line,
            content: newContent,
            cursorPosition: newContent.length,
         }));

         return true;
      },
      ArrowUp: () => {
         setLines(setActiveLine(line.number - 1));

         return true;
      },
      ArrowDown: () => {
         setLines(setActiveLine(line.number + 1));

         return true;
      },
      ArrowLeft: event => {
         const lineElement = event.target as HTMLSpanElement;
         const prevLine = hasLine(getLines(lineElement), line.number - 1);

         const canFocusPrevLine = line.cursorPosition === 0 && prevLine;

         if (canFocusPrevLine) {
            setLines(setActiveLine(line.number - 1, prevLine.textContent?.length || 0));

            return true;
         }

         return false;
      },
      ArrowRight: event => {
         const lineElement = event.target as HTMLSpanElement;
         const nextLine = hasLine(getLines(lineElement), line.number + 1);

         const canFocusNextLine = line.cursorPosition === lineElement.textContent?.length && nextLine;

         if (canFocusNextLine) {
            setLines(setActiveLine(line.number + 1, 0));

            return true;
         }

         return false;
      },
   };
};
