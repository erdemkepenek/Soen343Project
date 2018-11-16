import React, { Fragment, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';
import {Redirect } from 'react-router'
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
import TransactionHistory from "./Components/transactionHistory";
import LogActivity from "./Components/logActivity";
import Movie from './Components/movieProfile'
import Music from './Components/musicProfile'
import Magazine from './Components/magazineProfile'
import Book from './Components/bookProfile'
import Page404 from './Components/404page'
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
      <Route exact path="/cart/:title" component={Cart} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/rentals" component={Rentals} />
      <Route exact path="/rentals/:title" component={Rentals} />
      <Route exact path="/adduser" component={UserProfile} />
      <Route exact path="/addBook" component={Book} />
      <Route exact path="/addMagazine" component={Magazine} />
      <Route exact path="/addMusic" component={Music} />
      <Route exact path="/addMovie" component={Movie} />
        <Route exact path="/users" component={Users} />
      <Route exact path="/adminpanel" component={Adminpanel} />
      <Route exact path="/logactivity" component={LogActivity} />
      <Route exact path="/transactionhistory" component={TransactionHistory} />
     <Route exact path="/ecatalog" component={Catalog} />
    <Route exact path="/ecatalog/:title" component={Catalog} />
      <Route exact path="/404" component={Page404}/>
      <Redirect from="*" to="/404" />
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
