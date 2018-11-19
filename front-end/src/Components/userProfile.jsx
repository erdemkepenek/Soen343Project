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
import {notification,Modal} from "antd";
import ApiCalls from '../class/apiCalls'


let apicall = new ApiCalls;

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
            type: this.props.profile? (this.props.profile.type=== 1 ? "Administrator" : "Client") : "",
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
            this.setState({loading:true})
            let data={
                userId: this.props.userProfile.UserId,
                data:{
                FirstName: firstName,
                LastName: lastName,
                phone: phone,
                Address: address,
                email: email,
                password: password,
                type: ''
                },
            }
            if(type === 'Client'){
                data.data.type=0;
            }else{
                data.data.type=1;
            }
            let temp = this.props;
            let temp2 = this;
            console.log(data)
            apicall.addUser(data,function(data){
                temp2.signupConfirmation();
                temp.history.push(`/users`);
                temp2.setState({loading:false})
            });
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
            this.setState({loading:true})
            let data={
                userId: this.props.userProfile.UserId,
                data:{
                    UserId:this.props.profile.UserId,
                    FirstName: firstName,
                    LastName: lastName,
                    phone: phone,
                    Address: address,
                    email: email,
                    password: password,
                    type: ''
                },
            }
            if(type === 'Client'){
                data.data.type=0;
            }else{
                data.data.type=1;
            }
            let temp = this.props;
            let temp2 = this;
            console.log(data)
            apicall.modifyUser(data,function(data){
                temp2.editConfirmation();
                temp.closeProfile();
                temp.history.push(`/users`);
                temp2.setState({loading:false})
            });
            console.log(data)

        }
    }

    signupConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Created Account has been added to Work Table!',
            duration:6,
        });
    };

    editConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Editted Account has been added to Work Table',
            duration:6,
        });
    }
    deleteConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Deleted Account has been added to Work Table',
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
        this.setState({loading:true})
        let temp = this.props;
        let temp2 = this;
        let data={
            userId: this.props.userProfile.UserId,
            data:this.props.profile,
        }
        console.log(data)
        apicall.deleteUser(data,function(data){
            temp2.deleteConfirmation();
            temp.closeProfile();
            temp.history.push(`/users`);
            temp2.setState({loading:false})
        });
    }
    backToUsers=()=>{
        this.props.history.push(`/users`);
        if(this.props.profile){
            this.props.closeProfile();
        }
    }
    backToWork=()=>{
        this.props.history.push(`/workusers`);
        if(this.props.profile){
            this.props.closeProfile();
        }
    }
    handleModal=(e,modal1Visible)=> {
        e.preventDefault()
        this.setState({ modal1Visible });
    }
    removeFromWork=()=>{

    }


    render() {
        if(!this.props.userProfile) {
            return (<Redirect to={'/'}/>);
        }else if(this.props.userProfile.type ===0){
            return (<Redirect to={'/404'}/>);
        }else {
            return (
                <div className='main-container'>
                    <Modal
                        centered
                        closable
                        title="Are you sure to Delete this User?"
                        visible={this.state.modal1Visible}
                        onOk={this.deleteUser}
                        okText="Delete"
                        onCancel={(e)=>this.handleModal(e,false)}
                    />
                    <HeaderComponent/>
                    <div className='MainContainer'>
                        <div className="MainContainer-upper-container">
                            <div className="MainContainer-upper-container-text">
                                <div className="MainContainer-upper-container-first-text">
                                   {this.props.profile? (this.props.work? "Profile" :"Edit User") : "Add User"}
                                </div>
                                <div className="MainContainer-upper-container-second-text">
                                {this.props.profile? (this.props.work? "You can see the details of user" : "You can edit a user") : "You can register new user to the system!"}
                                    
                                </div>
                            </div>
                            <div className='MainContainer-upper-container-button'>
                                {this.props.work?
                                <Button  content='Back to Work' onClick={this.backToWork}/>:
                                <Button icon='user' content='Back to Users' onClick={this.backToUsers}/>}
                                {this.props.profile && !this.props.work?
                                    <Button icon='user' content='Delete User' onClick={(e)=>this.handleModal(e,true)}/>
                                    : ''}
                            </div>
                        </div>
                        <Form size='large' className='SettingsForm' loading={this.state.loading}>
                            <Header as='h2' className='login-Header' style={{marginTop:'3%'}}textAlign='center'> {
                                this.props.profile? (this.props.work? "User Profile" : "Edit an Account" ) : "Create an Account"}
                            </Header>
                            <Form.Group width='equal'>
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='John'
                                    label='First Name:'
                                    value={this.state.firstName}
                                    disabled={this.props.work}
                                    error={this.state.errorFirstName}
                                    onChange={this.changeFirstName}
                                    width={8}/>
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Dylon'
                                    label='Last Name:'
                                    disabled={this.props.work}
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
                                disabled={this.props.work}
                                error={this.state.errorPhone}
                                onChange={this.changePhone}
                                label='Phone:'/>
                            <Form.Input
                                fluid icon='address book'
                                iconPosition='left'
                                placeholder='Ex: 1445 Rue Guy Montreal QC, Canada'
                                value={this.state.address}
                                disabled={this.props.work}
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
                                disabled={this.props.work || (this.props.profile?this.props.userProfile.UserId===this.props.profile.UserId : false)}
                                onChange={this.changeType}
                                options={optionsType}
                            />
                            <Form.Input
                                fluid icon='mail'
                                iconPosition='left'
                                placeholder='john@concordia.ca'
                                value={this.state.email}
                                disabled={this.props.work}
                                error={this.state.errorEmail}
                                onChange={this.changeEmail}
                                label='Email:'/>
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                disabled={this.props.work}
                                placeholder='Password'
                                value={this.state.password}
                                error={this.state.errorPassword}
                                onChange={this.changePassword}
                                type='password'
                            />
                            <Button className='login-button' fluid size='large' onClick={this.props.profile? (this.props.work? this.removeFromWork : this.editUser ) :this.signUp}>
                            {this.props.profile? (this.props.work? "Remove From Work" : "Save" ): "Sign Up"}
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
