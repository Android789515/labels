import downloadIcon from './assets/download.svg';
import styles from './DownloadButton.module.css';

import { IconButton } from 'components/icon-button';

export const DownloadButton = () => {
   return (
      <IconButton
         buttonStyles={styles.downloadButton}
         iconStyles={styles.downloadIcon}
         icon={downloadIcon}
         description={'Download'}
      ></IconButton>
   );
};
