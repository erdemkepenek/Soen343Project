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
componentDidMount(){
        this.forceUpdate();
}

    render() {
    if (this.props.profile.typecategory === "Book"){
        return(<BookProfile changeProfile={this.props.changeProfile} workRent={this.props.workRent} cart={this.props.cart} work={this.props.work} rent={this.props.rent} bookProfile= {this.props.profile} closeProfile= {this.closeProfile}/>)
    }
    else if (this.props.profile.typecategory === "Music"){return(<MusicProfile  workRent={this.props.workRent} changeProfile={this.props.changeProfile} cart={this.props.cart} work={this.props.work} rent={this.props.rent}
                                                                               musicProfile= {this.props.profile} closeProfile= {this.closeProfile}/>)}

    else if (this.props.profile.typecategory === "Magazine") {return(<MagazineProfile  workRent={this.props.workRent} changeProfile={this.props.changeProfile} cart={this.props.cart} work={this.props.work} rent={this.props.rent}
                                                                                       magazineProfile= {this.props.profile} closeProfile= {this.closeProfile}/>)}

    else  {return(<MovieProfile changeProfile={this.props.changeProfile} cart={this.props.cart} workRent={this.props.workRent} rent={this.props.rent} work={this.props.work} movieProfile= {this.props.profile}
                                closeProfile= {this.closeProfile}/>)}
        }   
}
function mapStateToProps(state){
    return {
        userProfile: state.AdminReducer.userProfile
    };

}
export default withRouter(connect(mapStateToProps)(RedirectItem));
