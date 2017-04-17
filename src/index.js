import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import tr from "robe-react-ui/lib/assets/tr_TR.json";
import Application from "robe-react-ui/lib/Application";

ReactDOM.render(<Application language={tr}><App /></Application>, document.getElementById('root')
);
