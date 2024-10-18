import { v4 as newUUID } from 'uuid'

import { type Label, type SetLabels } from 'types';

import styles from './LabelList.module.css';

import { List } from 'components/list';
import { Button } from 'components/button';
import { Label as LabelComponent } from './components/label';

interface Props {
   labels: Label[];
   setLabels: SetLabels;
}

export const LabelList = ({ labels, setLabels }: Props) => {
   const addLabel = () => {
      setLabels(prevLabels => {
         return [
            ...prevLabels,
            {
               id: newUUID(),
               text: '',
               amount: 1,
            },
         ];
      });
   };

   return (
      <>
         <Button
            customStyles={styles.addLabelButton}
            onClick={addLabel}
         >
            Add Label
         </Button>

         <List
            data={labels}
            listStyles={styles.labelList}
            itemStyles={styles.labelItem}
            renderItem={data => {
               return (
                  <LabelComponent
                     label={data}
                     setLabels={setLabels}
                  />
               );
            }}
         />
      </>
   );
};
