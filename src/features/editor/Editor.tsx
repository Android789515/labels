import { useState, useEffect } from 'react';
import { v4 as newUUID } from 'uuid';

import { type SetLabels, type Label } from 'types';
import { newBlankLine } from './utils';

import styles from './Editor.module.css';

import { List } from 'components/list';
import { Line } from './components/line';

interface Props {
   setLabels: SetLabels;
}

export const Editor = ({ setLabels }: Props) => {
   const [ lines, setLines ] = useState([newBlankLine()]);

   const previewExpressionResult = () => {
      const labels = lines.reduce<Label[]>((labels, { content }) => {
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

   useEffect(previewExpressionResult, [ lines ]);

   return (
      <main
         className={styles.editor}
      >
         <List
            data={lines}
            listStyles={styles.lineNumbers}
            renderItem={(line, lineNumber) => {
               return (
                  <Line
                     line={{
                        ...line,
                        number: lineNumber + 1,
                     }}
                     setLines={setLines}
                  />
               );
            }}
         />
      </main>
   );
};
