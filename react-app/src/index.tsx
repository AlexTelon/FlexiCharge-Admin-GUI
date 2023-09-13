import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import flexiChargeTheme from './components/theme';
import { CssBaseline } from '@material-ui/core';

const root = (document.getElementById('root') as HTMLElement);
const appRoot = ReactDOM.createRoot(root);

appRoot.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={flexiChargeTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();