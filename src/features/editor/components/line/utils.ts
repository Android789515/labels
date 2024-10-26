import { type KeyMap, type Line, type SetLines } from './types';
import { addLine, removeLine } from 'features/editor/utils';

export const getKeyMap = (line: Line, setLines: SetLines): KeyMap => {
   return {
      Enter: () => {
         setLines(addLine(line.number - 1));
         return true;
      },
      Backspace: event => {
         const lineElement = event.target as HTMLSpanElement;
         const previousLine = lineElement
            .parentNode?.parentNode?.previousSibling?.firstChild?.lastChild as HTMLSpanElement;

         if (previousLine) {
            setLines(removeLine(line.id));

            previousLine.focus();
            return true;
         } else {
            return false;
         }
      },
   };
};
