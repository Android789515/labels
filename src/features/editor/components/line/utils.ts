import { type KeyMap, type Line, type SetLines } from './types';
import { addLine, removeLine } from 'features/editor/utils';

const focusLine = (lineElement: HTMLSpanElement, lineNumber: number) => {
   const linesList = lineElement.parentNode?.parentNode?.parentNode as HTMLUListElement;
   const lines = linesList.childNodes;

   const lineIndex = lineNumber - 1;
   const lineToFocus = lines[lineIndex].firstChild?.lastChild as HTMLSpanElement;

   if (lineToFocus) {
      lineToFocus.focus();

      return true;
   } else {
      return false;
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
