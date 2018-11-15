import PropTypes from 'prop-types'
import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'
import {
  Button,
  Form,
  Grid,
  Icon,
  Image,
  Message,
  Segment
} from 'semantic-ui-react'
import {Redirect} from "react-router";

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  users = () => this.props.history.push(`/users`);
  addUser = () => this.props.history.push(`/adduser`);
  transactions = () => this.props.history.push(`/transactionhistory`);
  logactivity = () => this.props.history.push(`/logactivity`);
  settings=()=>this.props.history.push(`/settings`);
  catalog=()=>this.props.history.push(`/ecatalog`);
  render() {
    if (!this.props.userProfile) {
      return (<Redirect to={'/'}/>);
    }else if(this.props.userProfile.type ===0){
        return (<Redirect to={'/404'}/>);
    }else {
      return (<div className='main-container'>
        <HeaderComponent/>
        <div className='MainContainer'>
          <div className="MainContainer-upper-container">
            <div className="MainContainer-upper-container-text">
              <div className="MainContainer-upper-container-first-text">
                Admin Panel
              </div>
              <div className="MainContainer-upper-container-second-text">
                You can select one of the options!
              </div>
            </div>
          </div>
          <Grid textAlign='center' style={{
              height: '100%'
            }} verticalAlign='middle'>
            <Grid.Row columns={3}>
              <Grid.Column>
                  <div className='iconsDashboard2' onClick={this.catalog}>
                      <Icon name='globe' />
                      <p>  E-Catalog</p>
                  </div>
              </Grid.Column>
              <Grid.Column>
                <div className='iconsDashboard2' onClick={this.users}>
                  <Icon name='users'/>
                  <p>Users</p>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className='iconsDashboard2' onClick={this.addUser}>
                  <Icon name='inbox'/>
                  <p>Rentals</p>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <div className='iconsDashboard2' onClick={this.transactions}>
                  <Icon name='folder open'/>
                  <p>Transaction History</p>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className='iconsDashboard2' onClick={this.logactivity}>
                  <Icon name='history'/>
                  <p>Log Activity</p>
                </div>
              </Grid.Column>
              <Grid.Column>
                  <div className='iconsDashboard2' onClick={this.settings}>
                      <Icon name='cog' />
                      <p>Settings</p>
                  </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

        <FooterComponent/>
      </div>)
    }
  }
}
function mapStateToProps(state) {
  return {userProfile: state.AdminReducer.userProfile};

}
export default withRouter(connect(mapStateToProps)(AdminPanel));
