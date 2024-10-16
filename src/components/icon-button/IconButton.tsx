import { type HTMLAttributes } from 'react';

import { Button } from 'components/button';

interface Props extends HTMLAttributes<HTMLButtonElement> {
   icon: string;
   description: string;
   iconProps?: HTMLAttributes<HTMLImageElement>;
}

export const IconButton = ({ icon, description, iconProps, ...rest }: Props) => {
   return (
      <Button
         {...rest}
      >
         <img
            src={icon}
            alt={description}
            {...iconProps}
         />
      </Button>
   );
};
