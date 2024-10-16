import { type HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLButtonElement>;

export const Button = (props: Props) => {
   return (
      <button
         {...props}
      ></button>
   );
};
