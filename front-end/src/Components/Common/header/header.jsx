import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Container,Dropdown, Icon, Menu, Visibility,} from 'semantic-ui-react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuFixed: false,
        }
    }
    home=()=> this.props.history.push(`/`);
    signup=()=> this.props.history.push(`/signup`);
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
                                <Menu.Item as='a' onClick={this.home}><Icon name='home' />Home</Menu.Item>
                                <Menu.Item as='a'><Icon name='globe' />E-Catalog</Menu.Item>
                                <Menu.Item as='a' onClick={this.signup}><Icon name='signup' />Sign Up</Menu.Item>

                                <Menu.Menu position='right'>
                                    <Dropdown text='User Name' pointing className='link item'>
                                        <Dropdown.Menu>
                                            <Dropdown.Item icon='cart' text='Cart' />
                                            <Dropdown.Item icon='inbox' text='Rentals' />
                                            <Dropdown.Item icon='cog' text='Settings' />
                                            <Dropdown.Item icon='user' text='Admin Panel' />
                                            <Dropdown.Item icon='log out' text='Logout' />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Menu.Menu>
                            </Container>
                        </Menu>
                    </Visibility>)
    }
}
function mapStateToProps(state){
    return {
        users: state.AdminReducer.userProfile
    };

}
export default withRouter(connect(mapStateToProps)(HeaderComponent));
