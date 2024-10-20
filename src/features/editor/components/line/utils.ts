import { type KeyboardEvent } from 'react';

import { LineAction } from './types';

export const focusOnMount = (lineContent: HTMLSpanElement) => {
   lineContent.focus();
};

const getLineByNumber = (lineNumber: number, lineContent: HTMLSpanElement) => {
   const lines = lineContent.parentNode!.parentNode!.parentNode!;

   const lineToFocus = lines.childNodes[ lineNumber ];

   if (lineToFocus) {
      const nextLineContent = lineToFocus.firstChild?.lastChild as HTMLSpanElement;

      return nextLineContent;
   }
};

export const handleKeyDown = (actions: LineAction[]) => {
   return (event: KeyboardEvent) => {
      const lineElement = event.target as HTMLSpanElement;

      actions.forEach(action => {
         if (event.key === action.key) {
            event.preventDefault();

            action.onPress();

            switch (action.state[0]) {
               case 'focus':
                  getLineByNumber(action.state[1], lineElement)?.focus();
                  break;

               case 'blur':
                  getLineByNumber(action.state[1], lineElement)?.blur();
                  break;

               default:
                  break;
            }
         }
      });
   };
};
