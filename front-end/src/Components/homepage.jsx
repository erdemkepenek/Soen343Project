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
       if(this.props.userProfile) {
            /*let columnItems =[
                {value : 'User ID', render : 'User ID', type : 'number'},
                {value : 'First Name', render : 'First Name', type : 'text'},
                {value : 'Last Name', render : 'Last Name', type : 'text'},
                {value : 'Email', render : 'Email', type : 'text'},
                {value : 'Phone', render : 'Phone', type : 'number'},
                {value : 'Address', render : 'Address', type : 'text'},
            ];
            let tableItems = [];
            this.props.users.map((userData)=>{
                let arrData=[
                    {value : userData.id, render : userData.id, type : 'number'},
                    {value : userData.firstName, render : userData.firstName, type : 'text'},
                    {value : userData.lastName, render : userData.lastName, type : 'text'},
                    {value : userData.email, render : userData.email, type : 'text'},
                    {value : userData.phone, render : userData.phone, type : 'number'},
                    {value : userData.address, render : userData.address, type : 'text'},
                    userData
                ]
                tableItems.push(arrData);

            })*/
            return (<Redirect to={'/dashboard'}/>);
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