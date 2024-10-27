import { type FormEvent } from 'react';
import { v4 as newUUID } from 'uuid';

import { type UUID } from 'types';
import { type Line } from './components/line/types';

export const newBlankLine = (nextNumber: number): Line => {
   return {
      id: newUUID(),
      number: nextNumber,
      active: true,
      content: '',
      cursorPosition: 0,
   };
};

const clearActiveLine = (lines: Line[]): Line[] => {
   return lines.map(line => {
      return {
         ...line,
         active: false,
      };
   });
};

export const setCursorPosition = (lineID: UUID, cursorPosition: number) => {
   return (prevLines: Line[]): Line[] => {
      return prevLines.map(line => {
         if (line.id === lineID) {
            return {
               ...line,
               cursorPosition,
            };
         } else {
            return line;
         }
      });
   };
};

export const setActiveLine = (lineNumber: number, placeCursorAt?: number) => {
   return (prevLines: Line[]): Line[] => {
      const newLines = clearActiveLine(prevLines);

      return newLines.map(line => {
         if (line.number === lineNumber) {
            const cursorPosition = placeCursorAt || line.cursorPosition;

            return {
               ...line,
               active: true,
               cursorPosition,
            };
         } else {
            return line;
         }
      });
   };
};

export const addLine = (lineIndex: number) => {
   return (prevLines: Line[]) => {
      const newLines = clearActiveLine(prevLines);

      const newLineNumber = lineIndex + 2;

      return [
         ...newLines.slice(0, lineIndex + 1),
         newBlankLine(newLineNumber),
         ...newLines.slice(lineIndex + 1),
      ];
   };
};

const moveContentToLineBefore = (prevLines: Line[], content: string): Line[] => {
   const newLines = clearActiveLine(prevLines);

   const lineBefore = newLines.at(-1)!;

   const updatedLineBefore = {
      ...lineBefore,
      content: lineBefore.content + content,
   };

   return setActiveLine(updatedLineBefore.number, lineBefore.content.length)([
      ...newLines.slice(0, newLines.length - 1),
      updatedLineBefore,
   ]);
};

export const removeLine = (lineID: UUID) => {
   return (prevLines: Line[]) => {
      return prevLines.reduce<Line[]>((newLines, line) => {
         const isLineToRemove = line.id === lineID;

         if (isLineToRemove) {
            return moveContentToLineBefore(newLines, line.content);
         } else {
            return [
               ...newLines,
               line,
            ];
         }
      }, []);
   };
};

export const updateLine = (lineID: UUID, event: FormEvent<HTMLSpanElement>) => {
   return (prevLines: Line[]) => {
      return prevLines.map(line => {
         const isLineToUpdate = line.id === lineID;

         if (isLineToUpdate) {
            const contentElement = event.target as HTMLSpanElement;

            return {
               ...line,
               content: contentElement.textContent || '',
            };
         } else {
            return line;
         }
      });
   };
};
