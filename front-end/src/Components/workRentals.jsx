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
class WorkRentals extends Component {
    constructor(props) {
        super(props);
        this.state = {profile:'',
            loading:false,
            modal1Visible:false,
        }
    }
    componentDidMount() {
        this.props.history.push(`/workrentals`);
        this.loadUnitofWorkReturns();
    }
    loadUnitofWorkReturns=()=>{
        this.setState({loading:true})
        tableArray= [];
        let this1=this;
        apicall.viewRentalReturnWork(this.props.userProfile.UserId,function(dataRentals){
          dataRentals.updates.map((dataWork,key)=>{
              dataWork.index = key;
              tableArray.push(dataWork)
          })
            this1.setState({loading:false})
            this1.forceUpdate();

        });

    }

    closeProfile=()=>{
        this.setState({profile: ""})
        this.loadUnitofWorkReturns();
    }

    openProfile=(data)=>{
        console.log(data);
        this.props.history.push(`/workrentals/`+data.Title);
        this.setState({profile: data})
    }
    commit=()=>{
        this.setState({loading: true})
        let temp = this.props;
        let temp2 = this;
        this.setState({ modal1Visible:false });
        apicall.commitRentalReturnWork(temp.userProfile.UserId,function(data){
            temp2.setState({loading:false})
            temp2.commitConfirmation();
            temp.history.push(`/rentals`);
        })
    }
    commitConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Work has been Committed Successfully!',
            duration:6,
        });
    };
    rentals=()=>{
        this.props.history.push(`/rentals`);
    }
    handleModal=(e,modal1Visible)=> {
        e.preventDefault()
        this.setState({ modal1Visible });
    }
    render() {
        if(!this.props.userProfile) {
            return (<Redirect to={'/'}/>);

        }else if(this.props.userProfile.type ===1){
            return (<Redirect to={'/404'}/>);
        }else if (this.state.profile){
            return(<RedirectItem workRent closeProfile={this.closeProfile}
                                 profile= {this.state.profile}/>)
        }
        else {
            let columnItems = [
                {value: 'Title', render: 'Title', type: 'text'},
                {value: 'typecategory', render: 'Type', type: 'text'},
                {value: 'Loan Date', render: 'Loan Date', type: 'date'},
                {value: 'Return Date', render: 'Return Date', type: 'date'},
            ];
            let tableItems=[];
            tableArray.map((itemData) => {
                let arrData = [
                    {value: itemData.Title, render: itemData.Title, type: 'text'},
                    {value: itemData.typecategory, render: itemData.typecategory, type: 'text'},
                    {value: itemData.loanDate, render: itemData.loanDate, type: 'date'},
                    {value: itemData.returnDate, render: itemData.returnDate, type: 'date'},
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
                                    Work Rentals
                                </div>
                                <div className="MainContainer-upper-container-second-text">
                                    You can select one of the item to see their details!
                                </div>
                            </div>
                            <div className='MainContainer-upper-container-button'>
                                <Button content='Rentals' onClick={this.rentals}/>
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
export default withRouter(connect(mapStateToProps)(WorkRentals));
