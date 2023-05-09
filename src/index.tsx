import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import './styles/index.scss';
import '@aws-amplify/ui-react/styles.css'
import { Authenticator } from '@aws-amplify/ui-react';
import { App } from './App';
import ScrollToTop from './ScrollToTop';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Authenticator.Provider>
      <Router>
        <ScrollToTop/>
        <App />
      </Router>
    </Authenticator.Provider>
  );
