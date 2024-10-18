import { type Label, type SetLabels } from 'types';

import styles from './Workspace.module.css';

export const Workspace = () => {
interface Props {
   mode: 'basic' | 'advanced';
   labels: Label[];
   setLabels: SetLabels;
}

export const Workspace = ({ mode, labels, setLabels }: Props) => {
   return (
      <div
         className={styles.workspace}
      ></div>
   );
};
