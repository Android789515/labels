import { type Label, type SetLabels } from 'types';

import styles from './Workspace.module.css';

import { LabelList } from 'features/label-list';
import { Editor } from 'features/editor';

interface Props {
   mode: 'basic' | 'advanced';
   labels: Label[];
   setLabels: SetLabels;
}

export const Workspace = ({ mode, labels, setLabels }: Props) => {
   return (
      <div
         className={`
            ${ mode === 'basic'
               ? styles.workspaceBasic
               : styles.workspaceAdvanced
            }
         `}
      >
         { mode === 'advanced'
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
