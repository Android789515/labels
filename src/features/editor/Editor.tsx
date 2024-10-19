import { type FormEvent, useState, useEffect } from 'react';
import { v4 as newUUID } from 'uuid';

import { type SetLabels, type Label, type UUID } from 'types';

import styles from './Editor.module.css';

import { List } from 'components/list';
import { Line } from './components/line';

interface Props {
   setLabels: SetLabels;
}

export const Editor = ({ setLabels }: Props) => {
   const newBlankLine = () => {
      return {
         id: newUUID(),
         content: '',
      };
   };

   const [ expressionLines, setExpressionLines ] = useState([newBlankLine()]);

   const previewExpressionResult = () => {
      const labels = expressionLines.reduce<Label[]>((labels, { content }) => {
         const [ expression, amount ] = content.split(':');

         const newLabels = Array(amount).map(() => {
            return {
               id: newUUID(),
               text: expression,
               amount: Number(amount),
            };
         });

         return [
            ...labels,
            ...newLabels,
         ];
      }, []);

      setLabels(labels);
   };

   useEffect(previewExpressionResult, [ expressionLines ]);

   const addLine = () => {
      setExpressionLines(prevLines => {
         return [
            ...prevLines,
            newBlankLine(),
         ];
      });
   };

   const removeLine = (lineID: UUID) => {
      setExpressionLines(prevLines => {
         return prevLines.filter(line => {
            const keepLine = line.id !== lineID;
            const atLeastOneLine = expressionLines.length === 1;

            return keepLine
               || atLeastOneLine;
         });
      });
   };

   const updateLine = (lineID: UUID, event: FormEvent<HTMLSpanElement>) => {
      setExpressionLines(prevLines => {
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
      });
   };

   return (
      <main
         className={styles.editor}
      >
         <List
            data={expressionLines}
            listStyles={styles.lineNumbers}
            renderItem={(line, lineNumber) => {
               return (
                  <Line
                     line={{
                        ...line,
                        number: lineNumber + 1,
                     }}
                     addLine={addLine}
                     removeLine={removeLine}
                     updateLine={updateLine}
                  />
               );
            }}
         />
      </main>
   );
};
