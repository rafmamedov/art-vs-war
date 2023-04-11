import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import './index.css';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <App />
    </Router>,
  );