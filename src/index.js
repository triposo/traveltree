import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import WorldContainer from './container/WorldContainer';
import './styles/index.css';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={WorldContainer} />
    </Route>
  </Router>,
  document.getElementById('root')
);
