import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Route, Redirect } from 'react-router'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'

class Page404 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
            return(<div className='main-container'>
                <HeaderComponent />
                <div className='MainContainer-ant-carousel'>
                    <div id="notfound">
                        <div className="notfound">
                            <div className="notfound-404">
                                <h1>4<span></span>4</h1>
                            </div>
                            <h2>Oops! Page Not Be Found</h2>
                            <p>Sorry but the page you are looking for does not exist, have been removed. name changed or
                                is temporarily unavailable</p>
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </div>)
    }
}
function mapStateToProps(state){
    return {
        userProfile: state.AdminReducer.userProfile
    };

}
export default withRouter(connect(mapStateToProps)(Page404));