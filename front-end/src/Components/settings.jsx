import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'
import {Button, Form, Grid, Header, Icon, Image, Message, Segment} from 'semantic-ui-react'
import {Redirect} from "react-router";
import DataTable from '../Components/Common/table/table'

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

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
                                    Settings
                                </div>
                                <div className="MainContainer-upper-container-second-text">
                                    You can see your profile information!
                                </div>
                            </div>
                        </div>
                        <Form size='large' className='SettingsForm'>
                                <Header as='h2' className='login-Header' style={{marginTop:'3%'}}textAlign='center'>Your Profile Information
                                </Header>
                                <Form.Group width='equal'>
                                    <Form.Input
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='John'
                                        label='First Name:'
                                        value={this.state.firstName}
                                        width={8}/>
                                    <Form.Input
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='Dylon'
                                        label='Last Name:'
                                        value={this.state.lastName}
                                        width={8}/>
                                </Form.Group>
                                <Form.Input
                                    fluid icon='phone'
                                    iconPosition='left'
                                    placeholder='Ex:514 888 111 32'
                                    type='number'
                                    value={this.state.phone}
                                    label='Phone:'/>
                                <Form.Input
                                    fluid icon='address book'
                                    iconPosition='left'
                                    placeholder='Ex: 1445 Rue Guy Montreal QC, Canada'
                                    value={this.state.address}
                                    label='Address:'/>
                                <Form.Input
                                    fluid icon='mail'
                                    iconPosition='left'
                                    placeholder='john@concordia.ca'
                                    value={this.state.email}
                                    label='Email:'/>
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    label='Password'
                                    placeholder='Password'
                                    value={this.state.password}
                                    type='password'
                                />
                        </Form>
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
export default withRouter(connect(mapStateToProps)(Settings));
