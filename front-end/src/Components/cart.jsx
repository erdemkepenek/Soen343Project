import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'
import {Button, Dropdown, Form, Grid, Icon, Image, Message, Segment} from 'semantic-ui-react'
import {Redirect} from "react-router";
import DataTable from '../Components/Common/table/table'
import RedirectItem from "./redirectItem"
import ApiCalls from '../class/apiCalls'
import {Modal, notification, Tooltip} from "antd";
let apicall = new ApiCalls;

let tableArray= []
let rentals=[];
let loanNumber=0;
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            modal1Visible:false,
        }
    }
    componentDidMount() {
        this.props.history.push(`/cart`);
        this.loadCart();
    }
    loadCart=()=>{
        this.setState({loading:true})
        tableArray= [];
        let this1=this;
        apicall.viewCart(this.props.userProfile.UserId,function(data){
            data.registration.map((registrationData,key)=>{
                if(registrationData.typecategory === 'Book'){
                    registrationData.due="7 Days"
                }else{
                    registrationData.due="2 Days"
                }
                registrationData.index=key
                tableArray.push(registrationData)
            })
            this1.loadRentalsClient();
            this1.forceUpdate();
        });
    }

    closeProfile=()=>{
        this.setState({profile: ""})
    }
    loadRentalsClient=()=>{
        rentals= [];
        let this1= this;
        loanNumber=0
        apicall.viewRentalsClient(this.props.userProfile.UserId,function(dataRentals){
            dataRentals.books.map((bookData)=>{
                bookData.typecategory='Book'
                rentals.push(bookData)
            })
            dataRentals.magazines.map((magazineData)=>{
                magazineData.typecategory='Magazine'
                rentals.push(magazineData)
            })
            dataRentals.music.map((musicData)=>{
                musicData.typecategory='Music'
                rentals.push(musicData)
            })
            dataRentals.movies.map((movieData)=>{
                movieData.typecategory='Movie'
                rentals.push(movieData)
            })
            loanNumber = rentals.length + tableArray.length;
            this1.forceUpdate();
            this1.setState({loading:false})

        });

    }
    openProfile=(data)=>{
        console.log(data);
        this.props.history.push(`/cart/`+data.Title);
        this.setState({profile: data})
    }
    commit=()=>{
        this.setState({loading: true})
        let temp = this.props;
        let temp2 = this;
        this.setState({ modal1Visible:false });
        apicall.commitCart(temp.userProfile.UserId,function(data){
            temp2.setState({loading:false})
            temp2.commitConfirmation();
            temp.history.push(`/rentals`);
        })
    }
    commitConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Items in Cart has been Rented Successfully!',
            duration:6,
        });
    };
    handleModal=(e,modal1Visible)=> {
        e.preventDefault()
        this.setState({ modal1Visible });
    }
    empty=()=>{

    }

    render() {
        if(!this.props.userProfile) {
            return (<Redirect to={'/'}/>);
        }else if(this.props.userProfile.type ===1){
            return (<Redirect to={'/404'}/>);
        }else if(this.state.profile) {
            return (<RedirectItem cart closeProfile={this.closeProfile}
                                  profile= { this.state.profile}/>)

        }else{
            let columnItems =[
                {value : 'Title', render : 'Title', type : 'text'},
                {value : 'typecategory', render : 'Type', type : 'text'},
                {value : 'due', render : 'Due', type : 'text'},

            ];
            let tableItems = [];
            tableArray.map((itemData)=>{
                let arrData=[
                    {value : itemData.Title, render : itemData.Title, type : 'text'},
                    {value : itemData.typecategory, render : itemData.typecategory, type : 'text'},
                    {value : itemData.due, render : itemData.due, type : 'number'},
                    itemData
                ]
                tableItems.push(arrData);
            })
            console.log(loanNumber)
            return (
                <div className='main-container'>
                    <Modal
                        centered
                        closable
                        title="Are you sure to Rent Items in the Cart?"
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
                                    Cart
                                </div>
                                <div className="MainContainer-upper-container-second-text">
                                    You can select one of the item to see their details!
                                </div>
                            </div>
                            <div className='MainContainer-upper-container-button'>
                                {loanNumber >5 ?
                                <Tooltip className={"login-button2"} placement="top" title="There is a limit of renting 5 items" arrowPointAtCenter>
                                <Button content='Commit All' onClick={this.empty}/>
                                </Tooltip>:
                                <Button content='Commit All' onClick={(e)=>this.handleModal(e,true)} disabled={tableItems.length===0 || this.state.loading}/>}
                            </div>

                        </div>
                        <DataTable
                            errorMessage={tableItems.length===0? "The Cart is empty" : false}
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
export default withRouter(connect(mapStateToProps)(Cart));
