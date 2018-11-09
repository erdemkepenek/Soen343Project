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
import {notification,Popconfirm} from "antd";

const optionsType = [
    {key: 'Client', value: 'Client', text: 'Client'},
    {key: 'Administrator', value: 'Administrator', text: 'Administrator'}
]
class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: this.props.profile? this.props.profile.FirstName : "",
            lastName: this.props.profile? this.props.profile.LastName : "",
            phone:this.props.profile? this.props.profile.phone : "",
            address:this.props.profile? this.props.profile.Address : "",
            email:this.props.profile? this.props.profile.email : "",
            password: '',
            type: this.props.profile? (this.props.profile.type=== 1 ? "Client" : "Administrator") : "",
            errorFirstName:false,
            errorLastName:false,
            errorPhone:false,
            errorAddress:false,
            errorEmail:false,
            errorPassword:false,
            errorType: false,
        }
    }
    changeFirstName=(e)=>{
        this.setState({firstName:e.target.value})
        this.setState({errorFirstName: false})

    }
    changeLastName=(e)=>{
        this.setState({lastName:e.target.value})
        this.setState({errorLastName: false})
    }
    changePhone=(e)=>{
        this.setState({phone:e.target.value})
        this.setState({errorPhone: false})
    }
    changeAddress=(e)=>{
        this.setState({address:e.target.value})
        this.setState({errorAddress: false})
    }
    changeEmail=(e)=>{
        this.setState({email:e.target.value})
        this.setState({errorEmail: false})
    }
    changePassword=(e)=>{
        this.setState({password:e.target.value})
        this.setState({errorPassword: false})
    }
    changeType=(e,{value})=>{
        this.setState({type:value});
    }
    signUp=()=>{
        let {firstName,lastName,phone,address, email, password, type } = this.state;
        if(!firstName || !lastName || !phone || !address || !email || !password || !type){
            if(!firstName){
                this.setState({errorFirstName: true})
            }
            if(!lastName){
                this.setState({errorLastName: true})
            }
            if(!phone){
                this.setState({errorPhone: true})
            }
            if(!address){
                this.setState({errorAddress: true})
            }
            if(!email){
                this.setState({errorEmail: true})
            }
            if(!password){
                this.setState({errorPassword: true})
            }
            if(!type){
                this.setState({errorType: true})
            }
            this.signupError();
        }else{
            let data={
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                address: address,
                email: email,
                password: password,
                type: ','
            }
            if(this.state.type = 'Client'){
                data.type=false;
            }else{
                data.type=true;
            }
            console.log(data)

            this.signupConfirmation();
            this.props.history.push(`/users`);
        }
    }
    editUser=()=>{
        let {firstName,lastName,phone,address, email, password, type } = this.state;
        if(!firstName || !lastName || !phone || !address || !email || !password || !type){
            if(!firstName){
                this.setState({errorFirstName: true})
            }
            if(!lastName){
                this.setState({errorLastName: true})
            }
            if(!phone){
                this.setState({errorPhone: true})
            }
            if(!address){
                this.setState({errorAddress: true})
            }
            if(!email){
                this.setState({errorEmail: true})
            }
            if(!password){
                this.setState({errorPassword: true})
            }
            if(!type){
                this.setState({errorType: true})
            }
            this.signupError();
        }else{
            let data={
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                address: address,
                email: email,
                password: password,
                type: ','
            }
            if(this.state.type = 'Client'){
                data.type=false;
            }else{
                data.type=true;
            }
            console.log(data)

            this.editConfirmation();
            this.props.closeProfile();
            this.props.history.push(`/users`);
        }
    }

    signupConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'You have Created an Account!',
            duration:6,
        });
    };

    editConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'You have Editted a User!',
            duration:6,
        });
    };
    signupError = () => {
        notification.error({
            message: 'Error',
            description: 'You information is Missing!',
            duration:6,
        });
    };
    deleteUser=()=>{
        this.props.closeProfile();
    }
    backToUsers=()=>{
        this.props.history.push(`/users`);
        if(this.props.profile){
            this.props.closeProfile();
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
                                   {this.props.profile? "Edit User" : "Add User"}
                                </div>
                                <div className="MainContainer-upper-container-second-text">
                                {this.props.profile? "You can edit a user" : "You can register new user to the system!"}
                                    
                                </div>
                            </div>
                            <div className='MainContainer-upper-container-button'>
                                <Button icon='user' content='Back to Users' onClick={this.backToUsers}/>
                                {this.props.profile?
                                <Popconfirm title="Are you sure to delete this User?" onConfirm={this.deleteUser} placement="bottomRight" okText="Yes" cancelText="No">
                                    <Button icon='user' content='Delete User'/>
                                </Popconfirm>
                                    : ''}
                            </div>
                        </div>
                        <Form size='large' className='SettingsForm'>
                            <Header as='h2' className='login-Header' style={{marginTop:'3%'}}textAlign='center'> {
                                this.props.profile? "Edit an Account" : "Create an Account"}
                            </Header>
                            <Form.Group width='equal'>
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='John'
                                    label='First Name:'
                                    value={this.state.firstName}
                                    error={this.state.errorFirstName}
                                    onChange={this.changeFirstName}
                                    width={8}/>
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Dylon'
                                    label='Last Name:'
                                    value={this.state.lastName}
                                    error={this.state.errorLastName}
                                    onChange={this.changeLastName}
                                    width={8}/>
                            </Form.Group>
                            <Form.Input
                                fluid icon='phone'
                                iconPosition='left'
                                placeholder='Ex:514 888 111 32'
                                type='number'
                                value={this.state.phone}
                                error={this.state.errorPhone}
                                onChange={this.changePhone}
                                label='Phone:'/>
                            <Form.Input
                                fluid icon='address book'
                                iconPosition='left'
                                placeholder='Ex: 1445 Rue Guy Montreal QC, Canada'
                                value={this.state.address}
                                error={this.state.errorAddress}
                                onChange={this.changeAddress}
                                label='Address:'/>
                            <Form.Dropdown
                                className='dropdownchange'
                                fluid
                                label='Select Type of User'
                                placeholder='Select one of the options...'
                                value={this.state.type}
                                error={this.state.errorType}
                                onChange={this.changeType}
                                options={optionsType}
                            />
                            <Form.Input
                                fluid icon='mail'
                                iconPosition='left'
                                placeholder='john@concordia.ca'
                                value={this.state.email}
                                error={this.state.errorEmail}
                                onChange={this.changeEmail}
                                label='Email:'/>
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                placeholder='Password'
                                value={this.state.password}
                                error={this.state.errorPassword}
                                onChange={this.changePassword}
                                type='password'
                            />
                            <Button className='login-button' fluid size='large' onClick={this.props.profile? this.editUser :this.signUp}>
                            {this.props.profile? "Save" : "Sign Up"}
                            </Button>
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
export default withRouter(connect(mapStateToProps)(AddUser));
