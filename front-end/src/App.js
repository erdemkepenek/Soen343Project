import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter , Route, Switch ,HashRouter,withRouter, Link} from 'react-router-dom';
import HomePage from './homepage.jsx'
class App extends Component {
  render() {
    return (
        <BrowserRouter>
        <Switch>
        <Route exact path="/" component={HomePage} />
          </Switch>
          </BrowserRouter>
    );
  }
}

export default App;
