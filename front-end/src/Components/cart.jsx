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
let tableArray= []

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
        }
    }
    componentDidMount() {
        this.props.history.push(`/cart`);


    }

    closeProfile=()=>{
        this.setState({profile: ""})
    }
    openProfile=(data)=>{
        console.log(data);
        this.props.history.push(`/cart/`+data.Title);
        this.setState({profile: data})
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
                {value : 'Type', render : 'Type', type : 'text'},
                {value : 'Quantity', render : 'Quantity', type : 'number'},

            ];
            let tableItems = [];
            tableArray.map((itemData)=>{
                let arrData=[
                    {value : itemData.Title, render : itemData.Title, type : 'text'},
                    {value : itemData.Type, render : itemData.Type, type : 'text'},
                    {value : itemData.Quantity, render : itemData.Quantity, type : 'number'},
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
                                    Cart
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
