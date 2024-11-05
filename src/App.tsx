import { useState } from 'react';

import { type Label, type WorkspaceMode } from 'types';

import styles from './App.module.css';

import { Layout } from 'components/layout';
import { Header } from 'components/header';
import { Title } from 'components/title';
import { DownloadButton } from 'features/download-button';
import { Button } from 'components/button';
import { Workspace } from 'features/workspace';

export const App = () => {
   const [ labels, setLabels ] = useState<Label[]>([]);

   const [ mode, setMode ] = useState<WorkspaceMode>('advanced');

   const toggleMode = () => {
      setMode(prevMode => {
         if (prevMode === 'basic') {
            return 'advanced';
         } else {
            return 'basic';
         }
      });
   };

   return (
      <div
         className={styles.app}
      >
         <Layout>
            <Header>
               <Title />

               <DownloadButton />
            </Header>

            <Button
               customStyles={styles.modeButton}
               onClick={toggleMode}
            >
               {mode}
            </Button>

            <Workspace
               mode={mode}
               labels={labels}
               setLabels={newLabels => setLabels(newLabels)}
            />
         </Layout>
      </div>
   );
};
