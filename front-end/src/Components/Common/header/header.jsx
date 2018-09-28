import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Container,Dropdown, Icon, Menu, Visibility,} from 'semantic-ui-react'

class HeaderComponent extends Component { //
    constructor(props) {
        super(props);
        this.state = {
            menuFixed: false,
        }
    }
    home=()=> this.props.history.push(`/`);
    signup=()=> this.props.history.push(`/signup`);
    cart=()=>this.props.history.push(`/cart`);
    settings=()=>this.props.history.push(`/settings`);
    adminPanel=()=>this.props.history.push(`/adminpanel`);
    catalog=()=>this.props.history.push(`/ecatalog`);
    rentals=()=>this.props.history.push(`/rentals`);
    logout=()=> {
        localStorage.removeItem("jwtToken");
        this.props.dispatch({type: 'addUserProfile', data: ''});
        this.props.history.push(`/login`);
    }
    login=()=> this.props.history.push(`/login`);
    stickTopMenu = () => this.setState({ menuFixed: true })
    unStickTopMenu = () => this.setState({ menuFixed: false })
    render() {
        const { menuFixed} = this.state;
            return (
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
                                {!this.props.userProfile? <Menu.Item as='a' onClick={this.home}><Icon name='home' />Home</Menu.Item> : <Menu.Item as='a' onClick={this.home}><Icon name='home' />Dashboard</Menu.Item>}
                                {this.props.userProfile?<Menu.Item as='a' onClick={this.catalog}><Icon name='globe' />E-Catalog</Menu.Item> : ''}
                                {!this.props.userProfile?<Menu.Item position='right'  as='a' onClick={this.signup}><Icon name='signup' />Sign Up</Menu.Item> : ''}
                                {!this.props.userProfile?<Menu.Item  as='a' onClick={this.login}><Icon name='sign-in' />Login</Menu.Item> :
                                <Menu.Menu position='right'>
                                    <Dropdown text={this.props.userProfile} pointing className='link item'>
                                        <Dropdown.Menu>
                                            <Dropdown.Item icon='cart' text='Cart' onClick={this.cart}/>
                                            <Dropdown.Item icon='inbox' text='Rentals' onClick={this.rentals} />
                                            <Dropdown.Item icon='cog' text='Settings' onClick={this.settings}/>
                                            <Dropdown.Item icon='user' text='Admin Panel' onClick={this.adminPanel}/>
                                            <Dropdown.Item icon='log out' text='Logout' onClick={this.logout} />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Menu.Menu>}
                            </Container>
                        </Menu>
                    </Visibility>)
    }
}
function mapStateToProps(state){
    return {
        userProfile: state.AdminReducer.userProfile
    };

}
export default withRouter(connect(mapStateToProps)(HeaderComponent));
