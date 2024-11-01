import { type ReactNode } from 'react';

import { type UUID, type ClassName } from 'types';

import styles from './List.module.css';

interface BasicItem {
   id: UUID;
}

interface Props<DataType extends BasicItem> {
   data: DataType[];
   listStyles?: ClassName;
   itemStyles?: ClassName;
   renderItem: (data: DataType, index: number) => ReactNode;
}

export const List = <DataType extends BasicItem,>({ data, listStyles, itemStyles, renderItem }: Props<DataType>) => {

   return (
      <ul
         className={`
            ${styles.listDefaults}
            ${listStyles}
         `}
      >
         {data.map((item, index) => {
            return (
               <li
                  key={item.id}
                  className={itemStyles}
               >
                  {renderItem(item, index)}
               </li>
            );
         })}
      </ul>
   );
};
