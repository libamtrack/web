import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';
import App from './components/App';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render((
    <Router hashType="noslash">
        <App/>
    </Router>
), document.getElementById('index'));
