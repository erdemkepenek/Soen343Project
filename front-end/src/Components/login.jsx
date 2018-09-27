import React, {Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {Carousel} from "antd";
import Magazine from "../images/magazine.jpg";
import Music from "../images/music.jpg";
import Movie from "../images/movie.png";
import Book from "../images/book.jpg";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    signup=()=> this.props.history.push(`/signup`);
    render() {

        return (<div className='main-container'>
        <HeaderComponent/>
        <div className='MainContainer-ant-carousel'>
            <div className='login-form'>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 , opacity: 0.9}}>
                        <Form size='large'>
                            <Segment stacked>
                                <Header as='h2' className='login-Header' textAlign='center'>Log-in to your account
                                </Header>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                />

                                <Button className='login-button' fluid size='large'>
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <a onClick={this.signup}>Sign Up</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
            <Carousel autoplay effect="fade">
                <Image src={Magazine} />
                <Image src={Music} />
                <Image src={Movie}/>
                <Image src={Book} />
            </Carousel>
        </div>
        <FooterComponent/>
    </div>)
    }
}

function mapStateToProps(state){
    return {
        users: state.AdminReducer.userProfile
    };

}
export default withRouter(connect(mapStateToProps)(Login));