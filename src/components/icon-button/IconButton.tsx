import { type HTMLAttributes } from 'react';

import { type ClassName } from 'types';

import { Button } from 'components/button';

interface Props extends HTMLAttributes<HTMLButtonElement> {
   icon: string;
   description: string;
   customStyles?: {
      button: ClassName;
      icon: ClassName;
   };
   iconProps?: HTMLAttributes<HTMLImageElement>;
}

export const IconButton = ({ icon, description, customStyles, iconProps, ...rest }: Props) => {
   return (
      <Button
         customStyles={customStyles?.button}
         {...rest}
      >
         <img
            src={icon}
            alt={description}
            className={customStyles?.icon}
            {...iconProps}
         />
      </Button>
   );
};
