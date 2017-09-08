import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import App from './components/app';
import CreateNew from './components/new';
import EditNew from './components/edit';

render((
  <Router>
    <Switch>
      <Route exact path='/Books/' component={App} />
      <Route path='/Books/new' component={CreateNew} />
      <Route path='/Books/edit/:id' component={EditNew} />
    </Switch>
  </Router>
), document.getElementById('app'))