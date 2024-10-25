import { type FormEvent } from 'react';
import { v4 as newUUID } from 'uuid';

import { type UUID } from 'types';
import { type Line } from './components/line/types';

export const newBlankLine = () => {
   return {
      id: newUUID(),
      content: '',
      number: 1,
   };
};

export const addLine = (lineIndex: number) => {
   return (prevLines: Line[]) => {
      return [
         ...prevLines.slice(0, lineIndex + 1),
         newBlankLine(),
         ...prevLines.slice(lineIndex + 1),
      ];
   };
};

const moveContentToLineBefore = (lines: Line[], content: string): Line[] => {
   const lineBefore = lines.at(-1)!;
   return [
      ...lines.slice(0, lines.length - 1),
      {
         ...lineBefore,
         content: lineBefore.content + content,
      },
   ];
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
