import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter , Route, Switch ,HashRouter,withRouter, Link} from 'react-router-dom';
import HomePage from './Components/homepage.jsx'
import Login from './Components/login'
class App extends Component {
  render() {
    return (
        <BrowserRouter>
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
          </Switch>
          </BrowserRouter>
    );
  }
}

export default App;
