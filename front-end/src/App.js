import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';
import { BrowserRouter , Route, Switch ,HashRouter,withRouter, Link} from 'react-router-dom';
import HomePage from './Components/homepage.jsx'
import Login from './Components/login'
import Signup from './Components/signup'
import Dashboard from './Components/dashboard'
import Rentals from './Components/rentals'
import Cart from './Components/cart'
import Catalog from './Components/catalog';
import Settings from './Components/settings'
import Adminpanel from './Components/adminPanel'
import Users from './Components/users'
import UserProfile from './Components/userProfile'
import connect from "react-redux/es/connect/connect";
class App extends Component {
    componentDidMount(){
        /*this.props.dispatch({type: 'addUserProfile', data: 'hello' });*/
    }
  render() {
        console.log(this.props.userProfile)
    return (
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/rentals" component={Rentals} />
        <Route exact path="/ecatalog" component={Catalog} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/adduser" component={UserProfile} />
        <Route exact path="/adminpanel" component={Adminpanel} />
          </Switch>
    );
  }
}
function mapStateToProps(state){
    return {
        userProfile: state.AdminReducer.userProfile
    };

}
export default withRouter(connect(mapStateToProps)(App));
