import { type KeyMap, type Line, type SetLines } from './types';
import { addLine, removeLine } from 'features/editor/utils';

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

export const getKeyMap = (line: Line, setLines: SetLines): KeyMap => {
   return {
      Enter: () => {
         setLines(addLine(line.number - 1));
         return true;
      },
      Backspace: event => {
         const lineElement = event.target as HTMLSpanElement;
         
         if (focusLine(lineElement, line.number - 1)) {
            setLines(removeLine(line.id));

            return true;
         } else {
            return false;
         }
      },
      ArrowUp: event => {
         const lineElement = event.target as HTMLSpanElement;
         
         return focusLine(lineElement, line.number - 1);
      },
      ArrowDown: event => {
         const lineElement = event.target as HTMLSpanElement;

         return focusLine(lineElement, line.number + 1)
      },
   };
};
