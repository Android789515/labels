import { type ReactNode } from 'react';

import styles from './Header.module.css';

interface Props {
   children: ReactNode;
}

export const Header = ({ children }: Props) => {
   return (
      <header
         className={styles.header}
      >
         {children}
      </header>
   );
};
