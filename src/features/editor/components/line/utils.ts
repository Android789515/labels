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

export const setLineCursor = (lineContent: HTMLElement, position: number) => {
   const selection = window.getSelection();

   const range = document.createRange();

   const hasText = lineContent.childNodes.length;
   
   if (hasText) {
      range.setStart(lineContent.childNodes[0], position);
      range.collapse(true);
   
      selection?.removeAllRanges();
      selection?.addRange(range);
   }
};

export const handleKeyDown = (actions: LineAction[]) => {
   return (event: KeyboardEvent) => {
      const lineElement = event.target as HTMLSpanElement;

      actions.forEach(action => {
         if (event.key === action.key) {
            action.onPress(event);

            switch (action.state[0]) {
               case 'focus': {
                  const line = getLineByNumber(action.state[ 1 ], lineElement);

                  if (line) {
                     line.focus();
                  }
                  break;
               }

               case 'focusFresh': {
                  const line = getLineByNumber(action.state[ 1 ], lineElement);

                  if (line) {
                     line.focus();
                     event.preventDefault();
                     setLineCursor(line, line.textContent?.length || 0);
                  }
                  break;
               }

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
