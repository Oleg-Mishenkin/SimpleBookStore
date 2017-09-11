import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import App from './components/pages/app';
import CreateNew from './components/pages/new';
import EditNew from './components/pages/edit';

render((
  <Router>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/new' component={CreateNew} />
      <Route path='/edit/:id' component={EditNew} />
    </Switch>
  </Router>
), document.getElementById('app'))