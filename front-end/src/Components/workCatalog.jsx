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
import {Modal, notification,Tooltip} from "antd";


let apicall = new ApiCalls;

let tableArray = [];
class WorkUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {profile:'',
            loading:false,
            modal1Visible:false,
        }
    }
    componentDidMount() {
        this.props.history.push(`/workecatalog`);
        this.loadUnitofWorkUsers();
    }
    loadUnitofWorkUsers=()=>{
        /*this.setState({loading:true})*/
        tableArray= [];
        let this1=this;
        /*apicall.viewUncommitted(this.props.userProfile.UserId,function(dataWork){
            console.log(dataWork)
            dataWork.registration.map((dataRegistration)=>{
                dataRegistration.typeWork = 'Add User'
                if(dataRegistration.type ===1){
                    dataRegistration.userType='Administrator'
                }else if(dataRegistration.type ===0){
                    dataRegistration.userType='Client'
                }else{
                    dataRegistration.userType=''
                }
                tableArray.push(dataRegistration)
            })
            dataWork.erase.map((dataErase)=>{
                if(dataErase.type ===1){
                    dataErase.userType='Administrator'
                }else if(dataErase.type ===0){
                    dataErase.userType='Client'
                }else{
                    dataErase.userType=''
                }
                dataErase.typeWork = 'Delete User'
                tableArray.push(dataErase)
            })
            dataWork.updates.map((dataUpdates)=>{
                if(dataUpdates.type ===1){
                    dataUpdates.userType='Administrator'
                }else if(dataUpdates.type ===0){
                    dataUpdates.userType='Client'
                }else{
                    dataUpdates.userType=''
                }
                dataUpdates.typeWork = 'Modify User'
                tableArray.push(dataUpdates)
            })
            this1.setState({loading:false})
            this1.forceUpdate();

        });*/
    }

    closeProfile=()=>{
        this.setState({profile: ""})
    }

    openProfile=(data)=>{
        console.log(data);
        this.props.history.push(`/workecatalog/`+data.Title);
        this.setState({profile: data})
    }
    commit=()=>{
        this.setState({loading: true})
        let temp = this.props;
        let temp2 = this;
        this.setState({ modal1Visible:false });
        /*apicall.commitUser(this.props.userProfile.UserId,function(data){
            temp2.setState({loading:false})
            temp2.commitConfirmation();
            temp.history.push(`/users`);
        })*/
    }
    commitConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Work has been Committed Successfully!',
            duration:6,
        });
    };
    catalog=()=>{
        this.props.history.push(`/ecatalog`);
    }
    handleModal=(e,modal1Visible)=> {
        e.preventDefault()
        this.setState({ modal1Visible });
    }
    render() {
        if(!this.props.userProfile) {
            return (<Redirect to={'/'}/>);

        }else if(this.props.userProfile.type ===0){
            return (<Redirect to={'/404'}/>);
        }else if (this.state.profile){
            return(<UserProfile
                work
                closeProfile={this.closeProfile}
                profile= { this.state.profile}/>)
        }
        else {
            let columnItems =[
                {value : 'Title', render : 'Title', type : 'text'},
                {value : 'Type', render : 'Type', type : 'text'},
                {value : 'Quantity', render : 'Quantity', type : 'number'},
                {value : 'Available', render : 'Available', type : 'number'},

            ];
            let tableItems = [];
            tableArray.map((itemData)=>{
                let arrData=[
                    {value : itemData.Title, render : itemData.Title, type : 'text'},
                    {value : itemData.Type, render : itemData.Type, type : 'text'},
                    {value : itemData.Quantity, render : itemData.Quantity, type : 'number'},
                    {value : itemData.available, render : itemData.available, type : 'number'},
                    itemData
                ]
                tableItems.push(arrData);
            })
            return (
                <div className='main-container'>
                    <Modal
                        centered
                        closable
                        title="Are you sure Commit Work Item?"
                        visible={this.state.modal1Visible}
                        onOk={this.commit}
                        okText="Commit"
                        onCancel={(e)=>this.handleModal(e,false)}
                    />
                    <HeaderComponent/>
                    <div className='MainContainer'>
                        <div className="MainContainer-upper-container">
                            <div className="MainContainer-upper-container-text">
                                <div className="MainContainer-upper-container-first-text">
                                    Catalog
                                </div>
                                <div className="MainContainer-upper-container-second-text">
                                    You can select one of the item to see their details!
                                </div>
                            </div>
                            <div className='MainContainer-upper-container-button'>
                                <Button content='Catalog' onClick={this.catalog}/>
                                <Button content='Commit All' onClick={(e)=>this.handleModal(e,true)} disabled={tableItems.length===0}/>
                            </div>
                        </div>
                        <DataTable
                            errorMessage={tableItems.length===0? "The Work is empty" : false}
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
export default withRouter(connect(mapStateToProps)(WorkUsers));
