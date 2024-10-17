import { useState } from 'react';

import { type Label } from 'types';

import styles from './App.module.css';

import { Layout } from 'components/layout';
import { Header } from 'components/header';
import { Title } from 'components/title';
import { DownloadButton } from 'features/download-button';
import { Workspace } from 'features/workspace';

export const App = () => {
   const [ labels, setLabels ] = useState<Label[]>([]);

   return (
      <div
         className={styles.app}
      >
         <Layout>
            <Header>
               <Title />

               <DownloadButton />
            </Header>

            <Workspace
               mode={'basic'}
               labels={labels}
               setLabels={newLabels => setLabels(newLabels)}
            />
         </Layout>
      </div>
   );
};
