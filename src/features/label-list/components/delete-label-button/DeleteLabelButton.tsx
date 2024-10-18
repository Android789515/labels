import { type UUID, type SetLabels } from 'types';

import deleteIcon from './assets/delete.svg';
import styles from './DeleteLabelButton.module.css';

import { IconButton } from 'components/icon-button';

interface Props {
   labelID: UUID;
   setLabels: SetLabels;
}

export const DeleteLabelButton = ({ labelID, setLabels }: Props) => {
   const deleteLabel = () => {
      setLabels(prevLabels => {
         return prevLabels.filter(label => label.id !== labelID);
      });
   };

   return (
      <IconButton
         icon={deleteIcon}
         description={'Delete Label'}
         buttonStyles={styles.deleteButton}
         iconStyles={styles.deleteIcon}
         onClick={deleteLabel}
      />
   );
};
