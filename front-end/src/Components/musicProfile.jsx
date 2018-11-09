import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'
import {Button, Form, Grid, Header, Icon, Image, Message, Segment} from 'semantic-ui-react'
import {Redirect} from "react-router";

import {notification} from "antd";


class MusicProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: this.props.musicProfile? this.props.musicProfile.Title : "",
            artist: this.props.musicProfile? this.props.musicProfile.Artist : "",
            label: this.props.musicProfile? this.props.musicProfile.Label : "",
            type: this.props.musicProfile? this.props.musicProfile.Type : "",
            releaseDate: this.props.musicProfile? this.props.musicProfile.ReleaseDate : "",
            ASIN: this.props.musicProfile? this.props.musicProfile.ASIN : "",
            errorTitle: false,
            errorArtist: false,
            errorLabel: false,
            errorType: false,
            errorReleaseDate: false,
            errorASIN: false,
        }
    }
    
    changeTitle=(e)=>{
        this.setState({Title:e.target.value})
        this.setState({errorTitle: false})
    }
    changeArtist=(e)=>{
        this.setState({artist:e.target.value})
        this.setState({errorArtist: false})
    }
    changeLabel=(e)=>{
        this.setState({label:e.target.value})
        this.setState({errorLabel: false})
    }
    changeType=(e)=>{
        this.setState({type:e.target.value})
        this.setState({errorType: false})
    }
    changeReleaseDate=(e)=>{
        this.setState({releaseDate:e.target.value})
        this.setState({errorReleaseDate: false})
    }
    changeASIN=(e)=>{
        this.setState({ASIN:e.target.value})
        this.setState({errorASIN: false})
    }

   editMusic=()=>{
        let {Title, artist, label, type, releaseDate, ASIN} = this.state;
        if(!Title || !artist || !label || !type || !releaseDate || !ASIN){
            if(!Title){
                this.setState({errorTitle: true})
            }
            if(!artist){
                this.setState({errorArtist: true})
            }
            if(!label){
                this.setState({errorLabel: true})
            }
            if(!type){
                this.setState({errorType: true})
            }
            if(!releaseDate){
                this.setState({errorReleaseDate: true})
            }
            if(!ASIN){
                this.setState({errorASIN: true})
            }
            this.musicError();
        }else{
            let data={
                Title: Title,
                Artist: artist,
                Label: label,
                Type: type,
                ReleaseDate: releaseDate,
                ASIN: ASIN,
            }
            console.log(data)

            this.editConfirmation();
            this.props.history.push(`/ecatalog`);
        }
    }



    editConfirmation = () => {
        notification.success({
            message: 'Success',
            description: 'You have Edited Music!',
            duration:6,
        });
    };

    addMusic=()=>{
        let {Title, artist, label, type, releaseDate, ASIN} = this.state;
        if(!Title || !artist || !label || !type || !releaseDate || !ASIN){
            if(!Title){
                this.setState({errorTitle: true})
            }
            if(!artist){
                this.setState({errorArtist: true})
            }
            if(!label){
                this.setState({errorLabel: true})
            }
            if(!type){
                this.setState({errorType: true})
            }
            if(!releaseDate){
                this.setState({errorReleaseDate: true})
            }
            if(!ASIN){
                this.setState({errorASIN: true})
            }
            this.musicError();
        }else{
            let data={
                Title: Title,
                Artist: artist,
                Label: label,
                Type: type,
                ReleaseDate: releaseDate,
                ASIN: ASIN,
            }
            console.log(data)

            this.addConfirmation();
            this.props.history.push(`/ecatalog`);
        }
    }



    addConfirmation = () => {
        notification.success({
            message: 'Success',
            description: 'You have Added Music!',
            duration:6,
        });
    };
    musicError = () => {
        notification.error({
            message: 'Error',
            description: 'Music information is Missing!',
            duration:6,
        });
    };


    render() {
        console.log(this.props.musicProfile);
        if(!this.props.userProfile) {
            return (<Redirect to={'/'}/>);
        }else {
            return (
                <div className='main-container'>
                    <HeaderComponent/>
                    <div className='MainContainer'>
                        <div className="MainContainer-upper-container">
                            <div className="MainContainer-upper-container-text">
                                <div className="MainContainer-upper-container-first-text">
                                   {this.props.musicProfile? "Edit Music" : "Add Music"}
                                </div>
                                <div className="MainContainer-upper-container-second-text">
                                {this.props.musicProfile? "You can edit music" : "You can add new music to the system!"}
                                    
                                </div>
                            </div>
                        </div>
                        <Form size='large' className='SettingsForm'>
                            <Header as='h2' className='login-Header' style={{marginTop:'3%'}}textAlign='center'> {
                                this.props.musicProfile? "Edit Music" : "Create Music"}
                            </Header>
                            <Form.Group width='equal'>
                                <Form.Input
                                    icon='music'
                                    iconPosition='left'
                                    placeholder='La Bohème'
                                    label='Title:'
                                    value={this.state.Title}
                                    error={this.state.errorTitle}
                                    onChange={this.changeTitle}
                                    width={8}/>
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Charles Aznavour'
                                    label='Artist:'
                                    value={this.state.artist}
                                    error={this.state.errorArtist}
                                    onChange={this.changeArtist}
                                    width={8}/>
                            </Form.Group>
                            <Form.Input
                                fluid icon='dot circle'
                                iconPosition='left'
                                placeholder='Barclay'
                                value={this.state.label}
                                error={this.state.errorLabel}
                                onChange={this.changeLabel}
                                label='Label:'/>
                            <Form.Input
                                fluid icon='th'
                                iconPosition='left'
                                placeholder='Chanson'
                                value={this.state.type}
                                error={this.state.errorType}
                                onChange={this.changeType}
                                label='Type:'/>
                                
                           
                            <Form.Input
                                fluid icon='calendar outline'
                                iconPosition='left'
                                placeholder='10/07/1965'
                                value={this.state.releaseDate}
                                error={this.state.errorReleaseDate}
                                onChange={this.changeReleaseDate}
                                label='Release Date:'
                                type="date"/>
                            <Form.Input
                                fluid icon='id card'
                                iconPosition='left'
                                label='ASIN: '
                                placeholder='B01G9A1080'
                                value={this.state.ASIN}
                                error={this.state.errorASIN}
                                onChange={this.changeASIN}    />
                            <Button className='login-button' fluid size='large' onClick={this.props.musicProfile? this.editMusic :this.addMusic}>
                            {this.props.musicProfile? "Edit Music" : "Add Music"}
                            </Button>
                        </Form>
                    </div>

                    <FooterComponent/>
                </div>
            )
        }
    }
}
function mapStateToProps(state){
    return {
        userProfile: state.AdminReducer.userProfile
    };

}
export default withRouter(connect(mapStateToProps)(MusicProfile));
