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
import RedirectItem from "./redirectItem"
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
        this.setState({loading:true})
        tableArray= [];
        let this1=this;
        apicall.viewWorkBook(this.props.userProfile.UserId,function(dataWork){
            console.log(dataWork)
            dataWork.registration.map((dataRegistration)=>{
                dataRegistration.Type = 'Book'
                dataRegistration.typeWork = 'Add Book'
                tableArray.push(dataRegistration)
            })
            dataWork.erase.map((dataErase)=>{
                dataErase.Type = 'Book'
                dataErase.typeWork = 'Delete Book'
                tableArray.push(dataErase)
            })
            dataWork.updates.map((dataUpdates)=>{
                dataUpdates.Type = 'Book'
                dataUpdates.typeWork = 'Modify Book'
                tableArray.push(dataUpdates)
            })
            this1.setState({loading:false})
            this1.forceUpdate();

        });
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
        apicall.commitBook(this.props.userProfile.UserId,function(data){
            temp2.setState({loading:false})
            temp2.commitConfirmation();
            temp.history.push(`/ecatalog`);
        })
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
            return(<RedirectItem work closeProfile={this.closeProfile}
                                 profile= {this.state.profile}/>)
        }
        else {
            let columnItems =[
                {value : 'typeWork', render : 'Action', type : 'number'},
                {value : 'Title', render : 'Title', type : 'text'},
                {value : 'Type', render : 'Type', type : 'text'},

            ];
            let tableItems = [];
            tableArray.map((itemData)=>{
                let arrData=[
                    {value : itemData.typeWork, render : itemData.typeWork, type : 'text'},
                    {value : itemData.Title, render : itemData.Title, type : 'text'},
                    {value : itemData.Type, render : itemData.Type, type : 'text'},
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
                                   Work Catalog
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
