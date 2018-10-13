import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'
import {Button, Form, Grid, Icon, Image, Message, Segment} from 'semantic-ui-react'
import {Redirect} from "react-router";
import DataTable from '../Components/Common/table/table'
import Controller from '../class/controller'
let controller = new Controller;
let tableArray= [];
class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        let temp = this;
        controller.getUsers(function(data){
            console.log(data)
            tableArray=data;
            temp.forceUpdate();
        });
    }
    openProfile=(data)=>{
        console.log(data);
    }
    render() {
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
                    {value : userData.id, render : userData.id, type : 'number'},
                    {value : userData.FirstName, render : userData.FirstName, type : 'text'},
                    {value : userData.LastName, render : userData.LastName, type : 'text'},
                    {value : userData.email, render : userData.email, type : 'text'},
                    {value : userData.phone, render : userData.phone, type : 'number'},
                    {value : userData.Address, render : userData.Address, type : 'text'},
                    {value : userData.type, render : userData.type, type : 'number'},
                    userData
                ]
                tableItems.push(arrData);

            })
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
                                    Users
                                </div>
                                <div className="MainContainer-upper-container-second-text">
                                    You can select one of the users to see their details!
                                </div>
                            </div>
                        </div>
                        <DataTable
                            columnItems={columnItems}
                            data={tableItems}
                            itemsPerPage={10}
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
