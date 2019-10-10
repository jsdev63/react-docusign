import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './pages/Home';
import Callback from './pages/Callback';

class App extends Component {
  render() {
      return (
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/ds/callback" component={Callback} />
            <Route exact path="/callback" component={Home} />
          </Switch>
        </div>
      )
  }
}

export default connect(null)(App);
