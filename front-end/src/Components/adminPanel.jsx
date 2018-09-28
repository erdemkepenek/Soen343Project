import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'
import {Button, Form, Grid, Icon, Image, Message, Segment} from 'semantic-ui-react'
import {Redirect} from "react-router";

class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    users=()=>this.props.history.push(`/users`);
    addUser=()=>this.props.history.push(`/adduser`);
    render() {
        if(!this.props.userProfile) {
            return (<Redirect to={'/'}/>);
        }else {
            return (
                <div className='main-container'>
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
                        <Grid  textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <div className='iconsDashboard' onClick={this.users}>
                                        <Icon name='user' />
                                        <p>Users</p>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className='iconsDashboard' onClick={this.addUser}>
                                        <Icon name='add user'  />
                                        <p>Add User</p>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>

                    <FooterComponent/>
                </div>
            )
        }
    }
}
function mapStateToProps(state){
    return {
        userProfile: state.AdminReducer.userProfile
    };

}
export default withRouter(connect(mapStateToProps)(AdminPanel));
