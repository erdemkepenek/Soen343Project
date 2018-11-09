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
import RedirectItem from "./redirectItem"
let tableArray= [];
class Rentals extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        tableArray= [];
        let book={
            BookTitle: "marc",
            Author: "marc noon",
            Format: "marc format",
            Pages: 567,
            Publisher: "marc again",
            Language: "marc's language",
            ISBN10: 1234567890,
            ISBN13: "7927927892",
            Quantity: 67,
            Type: "Book",
        }
        tableArray.push(book);
        this.forceUpdate();
    }

    closeProfile=()=>{
        this.setState({profile: ""})
    }

    openProfile=(data)=>{
        console.log(data);
        this.setState({profile: data})
    }

    render() {
        if(!this.props.userProfile) {
            return (<Redirect to={'/'}/>);
        }else if(this.state.profile) {
            return (<RedirectItem closeProfile={this.closeProfile}
                                  profile= { this.state.profile}/>)

        }else{
            let columnItems =[
                {value : 'Title', render : 'Title', type : 'text'},
                {value : 'Type', render : 'Type', type : 'text'},

            ];
            let tableItems = [];
            tableArray.map((itemData)=>{
                let arrData=[
                    {value : itemData.BookTitle, render : itemData.BookTitle, type : 'text'},
                    {value : itemData.Type, render : itemData.Type, type : 'text'},
                    itemData
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
                                    Rentals
                                </div>
                                <div className="MainContainer-upper-container-second-text">
                                    You can select one of the item to see their details!
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
export default withRouter(connect(mapStateToProps)(Rentals));
