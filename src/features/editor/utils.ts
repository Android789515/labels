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

      const newLineNumber = lineIndex + 2;

      const currentLine = newLines[lineIndex];
      const contentAfterCursor = currentLine.content.slice(currentLine.cursorPosition);

      return [
         ...newLines.slice(0, lineIndex),
         {
            ...currentLine,
            content: currentLine.content.slice(0, currentLine.cursorPosition),
         },
         newBlankLine(newLineNumber, contentAfterCursor),
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

export const removeLine = (lineNumber: number) => {
   return (prevLines: Line[]) => {
      return prevLines.reduce<Line[]>((newLines, line) => {
         const isLineToRemove = line.number === lineNumber;

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
