import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';
import ScrollToTop from './components/scrolltotop';
import Analytics from 'react-router-ga';

ReactDOM.render(
    <HashRouter >
      <Analytics id="UA-5551324-4" basename="/transcribe" debug>
        <ScrollToTop>
            <App />
        </ScrollToTop>
      </Analytics>
    </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
