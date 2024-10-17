import { type HTMLAttributes } from 'react';

import { type ClassName } from 'types';

import { Button } from 'components/button';

interface Props extends HTMLAttributes<HTMLButtonElement> {
   icon: string;
   description: string;
   buttonStyles?: ClassName;
   iconStyles?: ClassName;
   iconProps?: HTMLAttributes<HTMLImageElement>;
}

export const IconButton = ({ icon, description, buttonStyles, iconStyles, iconProps, ...rest }: Props) => {
   return (
      <Button
         customStyles={buttonStyles}
         {...rest}
      >
         <img
            src={icon}
            alt={description}
            className={iconStyles}
            {...iconProps}
         />
      </Button>
   );
};
