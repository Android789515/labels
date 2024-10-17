import { type ReactNode } from 'react';

import { type UUID, type ClassName } from 'types';

import styles from './List.module.css';

interface BasicItem {
   id: UUID;
   component: ReactNode;
}

interface Props {
   data: BasicItem[];
   listStyles?: ClassName;
   itemStyles?: ClassName;
}

export const List = ({ data, itemStyles }: Props) => {
   return (
      <ul
         className={styles.listDefaults}
      >
         {data.map(item => {
            return (
               <li
                  key={item.id}
                  className={itemStyles}
               >
                  {item.component}
               </li>
            );
         })}
      </ul>
   );
};
