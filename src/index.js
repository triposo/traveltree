import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import WorldContainer from './container/WorldContainer';
import CountryContainer from './container/CountryContainer';
import CityContainer from './container/CityContainer';
import ActivityContainer from './container/ActivityContainer';
import './style/index.css';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={WorldContainer} />
      <Route path="(:countryId)" component={CountryContainer} />
      <Route path="(:countryId)/(:cityId)" component={CityContainer} />
      <Route path="(:countryId)/(:cityId)/(:activityId)(/:poiId)" component={ActivityContainer} />
    </Route>
  </Router>,
  document.getElementById('root')
);
