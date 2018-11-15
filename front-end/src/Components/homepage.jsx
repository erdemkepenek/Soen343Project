import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { Route, Redirect } from 'react-router'
import Book from '../images/book.jpg'
import Music from '../images/music.jpg'
import Magazine from '../images/magazine.jpg'
import Movie from '../images/movie.png'
import { Carousel } from 'antd';
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'
import _ from 'lodash'
import {Button, Image} from 'semantic-ui-react'
import DataTable from '../Components/Common/table/table'
import Controller from '../class/controller'
let controller = new Controller;

class HomepageLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: '',
        }
        this.openProfile = this.openProfile.bind(this);
    }

    componentDidMount() {
       /* axios.get('/api/customers').then(
            function (response, err) {
                console.log(response)
                if(response.data){
            console.log(response.data)
                    this.props.dispatch({type: 'addUserProfile', data: response.data
                    });
                }
            }.bind(this)
        );*/
        /*    this.props.dispatch({type: 'addUserProfile', data: JSON.parse(localStorage.getItem('jwtToken'))});*/

    }
    login=()=> this.props.history.push(`/login`);
    openProfile(data){
        console.log(data)
    }

    render() {
       if(this.props.userProfile.type === 0) {
            return (<Redirect to={'/dashboard'}/>);
        }
        else if(this.props.userProfile.type === 1){
           return (<Redirect to={'/adminpanel'}/>);
       }else{
            return(<div className='main-container'>
                <HeaderComponent />
                <div className='MainContainer-ant-carousel'>
                    <div className='MainContainer-ant-carousel-div'>
                        <div>Online Library</div>
                        <Button content='Discover'
                                size={'huge'}
                                onClick={this.login}
                        />
                    </div>
                    <Carousel autoplay effect="fade">
                        <Image src={Magazine} />
                        <Image src={Music} />
                        <Image src={Movie}/>
                        <Image src={Book} />
                    </Carousel>

                    {/*<div className='tableHeader'>
                            <DataTable
                            columnItems={columnItems}
                            data={tableItems}
                            itemsPerPage={10}
                            clickRow={this.openProfile}/>
                        </div>*/}
                </div>

                <FooterComponent />
            </div>)
        }
    }
}
function mapStateToProps(state){
    return {
        userProfile: state.AdminReducer.userProfile
    };

}
export default withRouter(connect(mapStateToProps)(HomepageLayout));