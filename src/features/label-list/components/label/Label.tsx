import { type ChangeEvent } from 'react';

import { type Label as LabelType, type SetLabels } from 'types';

import styles from './Label.module.css';

import { DeleteLabelButton } from '../delete-label-button';

interface Props {
   label: LabelType;
   setLabels: SetLabels;
}

export const Label = ({ label, setLabels }: Props) => {
   const setLabel = (keyToSet: 'text' | 'amount') => (event: ChangeEvent) => {
      const input = event.target as HTMLInputElement;

      setLabels(prevLabels => {
         return prevLabels.map(newLabel => {
            const isLabelToSet = label.id === newLabel.id;

            if (isLabelToSet) {
               return {
                  ...newLabel,
                  [ keyToSet ]: input.value,
               };
            } else {
               return newLabel;
            }
         });
      });
   };

   return (
      <label
         className={styles.label}
      >
         <input
            type={'text'}
            value={label.text}
            onChange={setLabel('text')}
         />

         <input
            type={'number'}
            value={label.amount}
            onChange={setLabel('amount')}
         />

         <DeleteLabelButton
            labelID={label.id}
            setLabels={setLabels}
         />
      </label>
   );
};
