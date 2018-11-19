import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'
import {Button, Form, Grid, Icon, Image, Menu, Message, Segment} from 'semantic-ui-react'
import {Redirect} from "react-router";
import DataTable from '../Components/Common/table/table';
import UserProfile from "./userProfile";
import ApiCalls from '../class/apiCalls'


let apicall = new ApiCalls;

let tableArray = [];
class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {profile:'',
            loading:false,
        }
    }
    componentDidMount() {
        this.props.history.push(`/users`);
        this.loadUsers();
    }
    loadUsers=()=>{
        this.setState({loading:true})
        tableArray= [];
        let this1=this;
        apicall.viewUsers(function(data){
            console.log(data);
            data.map((userData)=>{
                if(userData.type ===1){
                    userData.userType='Administrator'
                }else if(userData.type ===0){
                    userData.userType='Client'
                }else{
                    userData.userType=''
                }
            })
            tableArray=data
            this1.setState({loading:false})
            this1.forceUpdate();
        });
    }

    closeProfile=()=>{
        this.setState({profile: ""})
}

    openProfile=(data)=>{
        console.log(data);
        this.setState({profile: data})
        this.props.history.push(`/users/${data.email}`);
    }
    addUSer=()=>{
        this.props.history.push(`/adduser`);
    }
    work=()=>{
        this.props.history.push(`/workusers`);
    }
    render() {
        if(!this.props.userProfile) {
            return (<Redirect to={'/'}/>);
        
        }else if(this.props.userProfile.type ===0){
            return (<Redirect to={'/404'}/>);
        }else if (this.state.profile){
            return(<UserProfile 
                closeProfile={this.closeProfile}
                    profile= { this.state.profile}/>)
        }
        else {
            let columnItems =[
                {value : 'User ID', render : 'User ID', type : 'number'},
                {value : 'First Name', render : 'First Name', type : 'text'},
                {value : 'Last Name', render : 'Last Name', type : 'text'},
                {value : 'Email', render : 'Email', type : 'text'},
                {value : 'Phone', render : 'Phone', type : 'number'},
                {value : 'Address', render : 'Address', type : 'text'},
                {value : 'Type', render : 'Type', type : 'text'},
            ];
            let tableItems = [];
        tableArray.map((userData)=>{
                let arrData=[
                    {value : userData.UserId, render : userData.UserId, type : 'number'},
                    {value : userData.FirstName, render : userData.FirstName, type : 'text'},
                    {value : userData.LastName, render : userData.LastName, type : 'text'},
                    {value : userData.email, render : userData.email, type : 'text'},
                    {value : userData.phone, render : userData.phone, type : 'number'},
                    {value : userData.Address, render : userData.Address, type : 'text'},
                    {value : userData.userType, render : userData.userType, type : 'text'},
                    userData
                ]
                tableItems.push(arrData);
            })
                return (
                    <div className='main-container'>
                        <HeaderComponent/>
                        <div className='MainContainer'>
                            <div className="MainContainer-upper-container">
                                <div className="MainContainer-upper-container-text">
                                    <div className="MainContainer-upper-container-first-text">
                                        Users
                                    </div>
                                    <div className="MainContainer-upper-container-second-text">
                                        You can select one of the users to see their details!
                                    </div>
                                </div>
                                <div className='MainContainer-upper-container-button'>
                                    <Button content='Work Users' onClick={this.work}/>
                                    <Button icon='user' content='Add User' onClick={this.addUSer}/>
                                </div>
                            </div>
                            <DataTable
                                columnItems={columnItems}
                                data={tableItems}
                                itemsPerPage={10}
                                loading={this.state.loading}
                                clickRow={this.openProfile}/>
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
export default withRouter(connect(mapStateToProps)(Users));
