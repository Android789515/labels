import styles from './App.module.css';

import { Layout } from 'components/layout';
import { Header } from 'components/header';
import { Title } from 'components/title';
import { DownloadButton } from 'features/download-button';
import { Workspace } from 'features/workspace';

export const App = () => {
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
               setLabels={setLabels}
            />
         </Layout>
      </div>
   );
};
