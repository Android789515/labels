import { type WorkspaceMode, type Label, type SetLabels } from 'types';

import styles from './Workspace.module.css';

import { LabelList } from 'features/label-list';
import { Editor } from 'features/editor';

interface Props {
   mode: WorkspaceMode;
   labels: Label[];
   setLabels: SetLabels;
}

export const Workspace = ({ mode, labels, setLabels }: Props) => {
   return (
      <div
         className={styles.workspace}
      >
         { mode === 'basic'
            ? <LabelList
               labels={labels}
               setLabels={setLabels}
            />
            : <Editor
               setLabels={setLabels}
            />
         }
      </div>
   );
};
