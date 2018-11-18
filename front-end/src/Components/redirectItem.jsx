import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'
import {Button, Form, Grid, Icon, Image, Message, Segment} from 'semantic-ui-react'
import {Redirect} from "react-router";
import BookProfile from "./bookProfile";

import MusicProfile from "./musicProfile";
import MovieProfile from "./movieProfile";
import MagazineProfile from "./magazineProfile";


class RedirectItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    closeProfile=()=>{
        this.props.closeProfile();
}

    render() {
    if (this.props.profile.Type === "Book"){
        return(<BookProfile cart={this.props.cart} work={this.props.work} rent={this.props.rent} bookProfile= {this.props.profile} closeProfile= {this.closeProfile}/>)
    }
    else if (this.props.profile.Type === "Music"){return(<MusicProfile cart={this.props.cart} work={this.props.work} rent={this.props.rent} musicProfile= {this.props.profile} closeProfile= {this.closeProfile}/>)}

    else if (this.props.profile.Type === "Magazine") {return(<MagazineProfile  cart={this.props.cart} work={this.props.work} rent={this.props.rent} magazineProfile= {this.props.profile} closeProfile= {this.closeProfile}/>)}

    else  {return(<MovieProfile cart={this.props.cart} rent={this.props.rent} work={this.props.work} movieProfile= {this.props.profile} closeProfile= {this.closeProfile}/>)}
        }   
}
function mapStateToProps(state){
    return {
        userProfile: state.AdminReducer.userProfile
    };

}
export default withRouter(connect(mapStateToProps)(RedirectItem));
