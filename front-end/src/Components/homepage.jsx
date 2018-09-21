import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { Route, Redirect } from 'react-router'
import {
    withRouter
} from 'react-router-dom'
import AdminReducer from "../reducers/adminReducer";
import _ from 'lodash'
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Visibility,
} from 'semantic-ui-react'
import DataTable from '../Components/Common/table/table'

class HomepageLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuFixed: false,
            customers: '',
        }
        this.openProfile = this.openProfile.bind(this);
    }

    componentDidMount() {
        axios.get('/api/customers').then(
            function (response, err) {
                console.log(response)
                if(response.data){
            console.log(response.data)
                    this.props.dispatch({type: 'addUserProfile', data: response.data
                    });
                }
            }.bind(this)
        );
    }

    stickTopMenu = () => this.setState({ menuFixed: true })


    unStickTopMenu = () => this.setState({ menuFixed: false })
    openProfile(data){
        console.log(data)
    }

    render() {
        const { menuFixed} = this.state
        if(this.props.users) {
            let columnItems =[
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

            })
            return (
                <div className='main-container'>

                    <Visibility
                        onBottomPassed={this.stickTopMenu}
                        onBottomVisible={this.unStickTopMenu}
                        once={false}
                    >
                        <Menu
                            borderless
                            fixed={'top'}
                            className={menuFixed ? 'fixedMenuStyle' : 'menuStyle'}
                        >
                            <Container text>
                                <Menu.Item > <Icon name='film' /> <Icon name='book' />  <Icon name='newspaper outline' />  <Icon name='music' /> </Menu.Item>
                                <Menu.Item as='a'><Icon name='home' />Home</Menu.Item>
                                <Menu.Item as='a'><Icon name='globe' />E-Catalog</Menu.Item>
                                <Menu.Item as='a'><Icon name='signup' />Sign Up</Menu.Item>

                                <Menu.Menu position='right'>
                                    <Dropdown text='User Name' icon='user circle 'pointing className='link item'>
                                        <Dropdown.Menu>
                                            <Dropdown.Item icon='cart' text='Cart' />
                                            <Dropdown.Item icon='inbox' text='Rentals' />
                                            <Dropdown.Item icon='cog' text='Settings' />
                                            <Dropdown.Item icon='user' text='Users' />
                                            <Dropdown.Item icon='log out' text='Logout' />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Menu.Menu>
                            </Container>
                        </Menu>
                    </Visibility>
                    <div className='MainContainer'>
                        <div className='tableHeader'>
                            <DataTable
                            columnItems={columnItems}
                            data={tableItems}
                            itemsPerPage={10}
                            clickRow={this.openProfile}/>
                        </div>
                    </div>

                    <Segment inverted className='footer' vertical>
                        <Container textAlign='center'>
                            <List horizontal inverted divided link>
                                <List.Item as='a' href='#'>
                                    Github
                                </List.Item>
                                <List.Item as='a' href='#'>
                                    Contact Us
                                </List.Item>
                                <List.Item as='a' href='#'>
                                    Terms and Conditions
                                </List.Item>
                                <List.Item as='a' href='#'>
                                    Privacy Policy
                                </List.Item>
                            </List>
                        </Container>
                    </Segment>
                </div>
            )
        }else{
            return(<div>No Data</div>)
        }
    }
}
function mapStateToProps(state){
    return {
        users: state.AdminReducer.userProfile
    };

}
export default withRouter(connect(mapStateToProps)(HomepageLayout));