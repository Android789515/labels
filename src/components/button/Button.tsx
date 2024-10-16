import { type HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLButtonElement>;

export const Button = (props: Props) => {
   return (
      <button
         style={{
            background: 'none',
            padding: 0,
            border: 'none',
            borderRadius: '.125em',
         }}
         {...props}
      ></button>
   );
};
