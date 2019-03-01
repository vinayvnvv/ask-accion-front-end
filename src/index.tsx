import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Login } from './login';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Auth } from './services';

const app = (!Auth.isAuth() ? <Login /> : <App />);

ReactDOM.render(
  app,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
