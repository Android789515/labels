import { type HTMLAttributes } from 'react';

import { type ClassName } from 'types';

import styles from './Button.module.css';

interface Props extends HTMLAttributes<HTMLButtonElement> {
   customStyles?: ClassName;
}

export const Button = ({ customStyles, ...rest }: Props) => {
   return (
      <button
         className={`
            ${styles.buttonDefaults}
            ${customStyles}
         `}
         {...rest}
      ></button>
   );
};
