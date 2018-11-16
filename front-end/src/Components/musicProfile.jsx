import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'
import {Button, Form, Grid, Header, Icon, Image, Message, Segment} from 'semantic-ui-react'
import {Redirect} from "react-router";
import {notification,Popconfirm} from "antd";
import moment from 'moment'

class MusicProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: this.props.musicProfile? this.props.musicProfile.Title : "",
            artist: this.props.musicProfile? this.props.musicProfile.Artist : "",
            label: this.props.musicProfile? this.props.musicProfile.Label : "",

            musicType: this.props.musicProfile? this.props.musicProfile.MusicType : "",

            releaseDate: this.props.musicProfile? moment(this.props.musicProfile.ReleaseDate).format("YYYY-MM-DD") : "",
            ASIN: this.props.musicProfile? this.props.musicProfile.ASIN : "",
            errorTitle: false,
            errorArtist: false,
            errorLabel: false,

            errorMusicType: false,

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

    changeMusicType=(e)=>{
        this.setState({musicType:e.target.value})
        this.setState({errorMusicType: false})

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

        let {Title, artist, label, musicType, releaseDate, ASIN} = this.state;
        if(!Title || !artist || !label || !musicType || !releaseDate || !ASIN){

            if(!Title){
                this.setState({errorTitle: true})
            }
            if(!artist){
                this.setState({errorArtist: true})
            }
            if(!label){
                this.setState({errorLabel: true})
            }

            if(!musicType){
                this.setState({errorMusicType: true})

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

                MusicType: musicType,

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

        let {Title, artist, label, musicType, releaseDate, ASIN} = this.state;
        if(!Title || !artist || !label || !musicType || !releaseDate || !ASIN){

            if(!Title){
                this.setState({errorTitle: true})
            }
            if(!artist){
                this.setState({errorArtist: true})
            }
            if(!label){
                this.setState({errorLabel: true})
            }

            if(!musicType){
                this.setState({errorMusicType: true})

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

                MusicType: musicType,

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


    closeProfile=()=>{
        this.props.closeProfile();
    }
    backToCatalog= ()=> {this.props.history.push(`/ecatalog`);
    if(this.props.musicProfile){
        this.props.closeProfile();
    } 
    }
    backToCart= ()=> {
        this.props.history.push(`/cart`);
        if(this.props.magazineProfile){
            this.props.closeProfile();
        }
    }
    backToRentals= ()=> {
        this.props.history.push(`/rentals`);
        if(this.props.magazineProfile){
            this.props.closeProfile();
        }
    }
    deleteMusic = ()=>
    {
        this.props.closeProfile();
    }
    return=()=>{

    }
    addToCart=()=>{

    }
   

    render() {
        console.log(this.props.musicProfile);
        if(!this.props.userProfile) {
            return (<Redirect to={'/'}/>);
        }else if(this.props.userProfile.type ===0 && !this.props.musicProfile){
            return (<Redirect to={'/404'}/>);
        }else {
            return (
                <div className='main-container'>
                    <HeaderComponent closeProfileItem={this.props.musicProfile ? this.closeProfile : ''} />
                    <div className='MainContainer'>
                        <div className="MainContainer-upper-container">
                            <div className="MainContainer-upper-container-text">
                                <div className="MainContainer-upper-container-first-text">
                                   {this.props.musicProfile?
                                       (this.props.userProfile.type ===0 || this.props.rent ?
                                           "Music Details":
                                       "Edit Music") : "Add Music"}
                                </div>
                                <div className="MainContainer-upper-container-second-text">
                                {this.props.musicProfile?
                                    (this.props.userProfile.type ===0 || this.props.rent ?
                                        "You can see the details of Music":
                                    "You can edit music" )
                                    : "You can add new music to the system!"}
                                    
                                </div>

                            




                            </div>

                            <div className='MainContainer-upper-container-button'>
                                <Button icon='user' content={this.props.rent?'Back to Rentals' : (this.props.cart? 'Back to Cart' : 'Back to Catalog')}
                                        onClick={this.props.rent? this.backToRentals : (this.props.cart? this.backToCart : this.backToCatalog)}/>
                                {this.props.musicProfile && this.props.userProfile.type ===1 && !this.props.rent && !this.props.cart?
                                <Popconfirm title="Are you sure to delete this Music Media?" onConfirm={this.deleteMusic} placement="bottomRight" okText="Yes" cancelText="No">
                                    <Button icon='user' content='Delete Music'/>
                                </Popconfirm>
                                    : ''}
                            </div>
                        </div>
                        <Form size='large' className='SettingsForm'>
                            <Header as='h2' className='login-Header' style={{marginTop:'3%'}}textAlign='center'> {
                                this.props.musicProfile?
                                    (this.props.userProfile.type ===0 || this.props.rent  ?
                                        "Music Profile":"Edit Music")
                                    : "Create Music"}
                            </Header>
                            <Form.Group width='equal'>
                                <Form.Input
                                    icon='music'
                                    iconPosition='left'
                                    placeholder='La Bohème'
                                    label='Title:'
                                    disabled={this.props.userProfile.type ===0 || this.props.rent}
                                    value={this.state.Title}
                                    error={this.state.errorTitle}
                                    onChange={this.changeTitle}
                                    width={8}/>
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Charles Aznavour'
                                    label='Artist:'
                                    disabled={this.props.userProfile.type ===0 || this.props.rent}
                                    value={this.state.artist}
                                    error={this.state.errorArtist}
                                    onChange={this.changeArtist}
                                    width={8}/>
                            </Form.Group>
                            <Form.Input
                                fluid icon='dot circle'
                                iconPosition='left'
                                disabled={this.props.userProfile.type ===0 || this.props.rent}
                                placeholder='Barclay'
                                value={this.state.label}
                                error={this.state.errorLabel}
                                onChange={this.changeLabel}
                                label='Label:'/>
                            <Form.Input
                                fluid icon='th'
                                iconPosition='left'
                                placeholder='Chanson'
                                disabled={this.props.userProfile.type ===0 || this.props.rent}
                                value={this.state.musicType}
                                error={this.state.errorMusicType}
                                onChange={this.changeMusicType}

                                label='Type:'/>
                                
                           
                            <Form.Input
                                fluid icon='calendar outline'
                                iconPosition='left'
                                placeholder='10/07/1965'
                                value={this.state.releaseDate}
                                disabled={this.props.userProfile.type ===0 || this.props.rent}
                                error={this.state.errorReleaseDate}
                                onChange={this.changeReleaseDate}
                                label='Release Date:'
                                type="date"/>
                            <Form.Input
                                fluid icon='id card'
                                iconPosition='left'
                                label='ASIN: '
                                placeholder='B01G9A1080'
                                disabled={this.props.userProfile.type ===0 || this.props.rent}
                                value={this.state.ASIN}
                                error={this.state.errorASIN}
                                onChange={this.changeASIN}    />
                            {this.props.userProfile.type ===1 && !this.props.rent?
                            <Button className='login-button' fluid size='large' onClick={this.props.musicProfile? this.editMusic :this.addMusic}>
                            {this.props.musicProfile? "Edit Music" : "Add Music"}
                            </Button>: (this.props.rent || this.props.cart?
                                    <Button
                                        className="login-button"
                                        fluid
                                        size="large"
                                        onClick={
                                            this.props.rent
                                                ? this.return
                                                : this.addToCart
                                        }
                                    >
                                        {this.props.rent ? "Return Music" : "Add Music to Cart"}
                                    </Button>: '')}
                        </Form>
                        {this.props.rent || this.props.cart || !this.props.musicProfile ?
                            '':
                            <div className='nextprevButton-container'>
                                <Button icon='long arrow alternate left' content='Previus Item' onClick={this.backToCatalog}/>
                                <Button icon='long arrow alternate right' labelPosition='right' content='Next Item' onClick={this.backToCatalog}/>
                            </div>}
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
