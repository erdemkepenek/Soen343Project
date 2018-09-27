import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'
import {Button, Image} from 'semantic-ui-react'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
            return (
                <div className='main-container'>
                    <HeaderComponent />
                    <div className='MainContainer'>
                    </div>

                    <FooterComponent />
                </div>
            )
    }
}
function mapStateToProps(state){
    return {
        users: state.AdminReducer.userProfile
    };

}
export default withRouter(connect(mapStateToProps)(Dashboard));
