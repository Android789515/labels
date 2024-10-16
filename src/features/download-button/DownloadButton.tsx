import downloadIcon from './assets/download.svg';
import styles from './DownloadButton.module.css';

import { IconButton } from 'components/icon-button';

export const DownloadButton = () => {
   return (
      <IconButton
         customStyles={{
            button: styles.downloadButton,
            icon: styles.downloadIcon,
         }}
         icon={downloadIcon}
         description={'Download'}
      ></IconButton>
   );
};
