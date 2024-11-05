import { v4 as newUUID } from 'uuid';

import { type UUID } from 'types';
import { type Line } from './components/line/types';

export const newBlankLine = (nextNumber: number, content: string = ''): Line => {
   return {
      id: newUUID(),
      number: nextNumber,
      active: true,
      content,
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
            const cursorPosition = placeCursorAt !== undefined ? placeCursorAt : line.cursorPosition;

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

      const lineAt = newLines[lineIndex];
      const contentAfterCursor = lineAt.content.slice(lineAt.cursorPosition);

      const linesBefore = newLines.slice(0, lineIndex);

      const currentLine = {
         ...lineAt,
         content: lineAt.content.slice(0, lineAt.cursorPosition),
      };

      const linesAfter = newLines.slice(lineIndex + 1).map(line => {

         return {
            ...line,
            number: line.number + 1,
         };
      });

      return [
         ...linesBefore,
         currentLine,
         newBlankLine(linesBefore.length + 2, contentAfterCursor),
         ...linesAfter,
      ];
   };
};

export const removeLine = (lineNumber: number) => {
   return (prevLines: Line[]) => {
      const linesBefore = prevLines.slice(0, lineNumber - 1).map(line => {
         const isLineBeforeRemove = line.number === lineNumber - 1;

         if (isLineBeforeRemove) {
            const currentLine = prevLines[lineNumber - 1];

            return {
               ...line,
               active: true,
               content: line.content + currentLine.content,
            };
         } else {
            return line;
         }
      });

      const linesAfter = prevLines.slice(lineNumber).map(line => {
         return {
            ...line,
            number: line.number - 1,
         };
      });

      return [
         ...linesBefore,
         ...linesAfter,
      ];
   };
};

export const updateLine = (newLine: Line) => {
   return (prevLines: Line[]) => {
      return prevLines.map(line => {
         const isLineToUpdate = line.id === newLine.id;

         if (isLineToUpdate) {
            return newLine;
         } else {
            return line;
         }
      });
   };
};
