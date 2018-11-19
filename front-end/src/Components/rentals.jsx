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


let apicall = new ApiCalls;
let tableArray= []

class Rentals extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        this.props.history.push(`/rentals`);
        tableArray= [];
        if(this.props.userProfile.type ===1) {
            this.loadRentalsAdmin();
        }else{
            this.loadRentalsClient();
        }

    }
    loadRentalsAdmin=()=>{
        this.setState({loading:true})
        tableArray= [];
        let this1= this;

        apicall.viewRentalsAdmin(function(dataRentals){
            dataRentals.books.map((bookData)=>{
                bookData.typecategory='Book'
                tableArray.push(bookData)
            })
            dataRentals.magazines.map((magazineData)=>{
                magazineData.typecategory='Magazine'
                tableArray.push(magazineData)
            })
            dataRentals.music.map((musicData)=>{
                musicData.typecategory='Music'
                tableArray.push(musicData)
            })
            dataRentals.movies.map((movieData)=>{
                movieData.typecategory='Movie'
                tableArray.push(movieData)
            })
            this1.setState({loading:false})
            this1.forceUpdate();

        });

    }
    loadRentalsClient=()=>{
        this.setState({loading:true})
        tableArray= [];
        let this1= this;

        apicall.viewRentalsClient(this.props.userProfile.UserId,function(dataRentals){
            dataRentals.books.map((bookData)=>{
                bookData.typecategory='Book'
                tableArray.push(bookData)
            })
            dataRentals.magazines.map((magazineData)=>{
                magazineData.typecategory='Magazine'
                tableArray.push(magazineData)
            })
            dataRentals.music.map((musicData)=>{
                musicData.typecategory='Music'
                tableArray.push(musicData)
            })
            dataRentals.movies.map((movieData)=>{
                movieData.typecategory='Movie'
                tableArray.push(movieData)
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
        this.props.history.push(`/rentals/`+data.Title);
        this.setState({profile: data})
    }

    render() {
        if(!this.props.userProfile) {
            return (<Redirect to={'/'}/>);
        }else if(this.state.profile) {
            return (<RedirectItem rent closeProfile={this.closeProfile}
                                  profile= { this.state.profile}/>)

        }else{
            let columnItems =[];
            let tableItems = [];
            if(this.props.userProfile.type===1) {
                columnItems = [
                    {value: 'Id Item', render: 'Id Item', type: 'number'},
                    {value: 'Title', render: 'Title', type: 'text'},
                    {value: 'typecategory', render: 'Type', type: 'text'},
                    {value: 'Id User', render: 'Id User', type: 'number'},
                    {value: 'Loan Date', render: 'Loan Date', type: 'date'},
                    {value: 'Return Date', render: 'Return Date', type: 'date'},

                ];
                tableArray.map((itemData) => {
                    let arrData = [
                        {value: itemData.id, render: itemData.id, type: 'number'},
                        {value: itemData.Title, render: itemData.Title, type: 'text'},
                        {value: itemData.typecategory, render: itemData.typecategory, type: 'text'},
                        {value: itemData.UserId, render: itemData.UserId, type: 'number'},
                        {value: itemData.loanDate, render: itemData.loanDate, type: 'date'},
                        {value: itemData.returnDate, render: itemData.returnDate, type: 'date'},
                        itemData
                    ]
                    tableItems.push(arrData);
                })
            }else{
                columnItems = [
                    {value: 'Title', render: 'Title', type: 'text'},
                    {value: 'typecategory', render: 'Type', type: 'text'},
                    {value: 'Loan Date', render: 'Loan Date', type: 'date'},
                    {value: 'Return Date', render: 'Return Date', type: 'date'},
                ];
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
            }
            return (
                <div className='main-container'>
                    <HeaderComponent/>
                    <div className='MainContainer'>
                        <div className="MainContainer-upper-container">
                            <div className="MainContainer-upper-container-text">
                                <div className="MainContainer-upper-container-first-text">
                                    Rentals
                                </div>
                                <div className="MainContainer-upper-container-second-text">
                                    You can select one of the item to see their details and to return!
                                </div>
                            </div>


                        </div>
                        <DataTable
                            errorMessage={tableItems.length===0? "The Rentals is empty" : false}
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
export default withRouter(connect(mapStateToProps)(Rentals));
