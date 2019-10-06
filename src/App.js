import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './pages/Home';
import Result from './pages/Result';

class App extends Component {
   render() {
      return (
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/result" component={Result} />
          </Switch>
        </div>
      )
  }
}

export default connect(null)(App);
