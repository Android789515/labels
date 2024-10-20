import { type KeyboardEvent } from 'react';

import { LineAction } from './types';

export const focusOnMount = (lineContent: HTMLSpanElement) => {
   lineContent.focus();
};

const blurCurrentLine = (lineContent: HTMLSpanElement) => {
   lineContent.blur();
};

const focusPreviousLine = (currentLine: HTMLSpanElement) => {
   const previousLine = currentLine.parentNode?.parentNode?.previousSibling;

   if (previousLine) {
      const previousLineContent = previousLine.firstChild?.lastChild as HTMLSpanElement;

      previousLineContent.focus();
   }
};

export const handleKeyDown = (actions: LineAction[]) => {
   return (event: KeyboardEvent) => {
      const lineElement = event.target as HTMLSpanElement;

      actions.forEach(action => {
         if (event.key === action.key) {
            event.preventDefault();

            action.onPress();

            switch (action.state) {
               case 'focusPrev':
                  focusPreviousLine(lineElement);
                  break;

               case 'blurCurrent':
                  blurCurrentLine(lineElement);
                  break;

               default:
                  break;
            }
         }
      });
   };
};
