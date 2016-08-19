import 'stylesheets/application';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import Application from 'components/application';
import Main from 'components/main';
import ImageList from 'components/image/list';
import { requireAuth } from 'helpers/routes';

render((
  <Router history={ browserHistory }>
    <Route component={ Application }>
      <Route path="/" component={ Main }/>
      <Route
        path="images"
        component={ ImageList }
        onEnter={ requireAuth }
      />
      <Redirect from="*" to="/"/>
    </Route>
  </Router>
), document.getElementById('app'));
