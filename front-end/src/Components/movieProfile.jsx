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


class MovieProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: this.props.movieProfile? this.props.movieProfile.Title : "",
            director: this.props.movieProfile? this.props.movieProfile.Director: "",
            producers: this.props.movieProfile? this.props.movieProfile.Producers : "",
            actors: this.props.movieProfile? this.props.movieProfile.Actors : "",
            language: this.props.movieProfile? this.props.movieProfile.Language : "",
            subtitles: this.props.movieProfile? this.props.movieProfile.Subtitles : "",
            dubbed: this.props.movieProfile? this.props.movieProfile.Dubbed : "",
            releaseDate: this.props.movieProfile? this.props.movieProfile.ReleaseDate : "",
            runTime: this.props.movieProfile? this.props.movieProfile.RunTime: "",
            errorTitle: false,
            errorDirector: false,
            errorProducers: false,
            errorActors: false,
            errorLanguage: false,
            errorSubtitles: false,
            errorDubbed: false,
            errorReleaseDate: false,
            errorRunTime: false,
        }
    }
    
    changeTitle=(e)=>{
        this.setState({Title:e.target.value})
        this.setState({errorTitle: false})
    }
    changeActors=(e)=>{
        this.setState({actors:e.target.value})
        this.setState({errorActors: false})
    }
    changeDirector=(e)=>{
        this.setState({director:e.target.value})
        this.setState({errorDirector: false})
    }
    changeProducers=(e)=>{
        this.setState({producers:e.target.value})
        this.setState({errorProducers: false})
    }
    changeSubtitles=(e)=>{
        this.setState({subtitles:e.target.value})
        this.setState({errorSubtitles: false})
    }
    changeLanguage=(e)=>{
        this.setState({language:e.target.value})
        this.setState({errorLanguage: false})
    }
    changeDubbed=(e)=>{
        this.setState({dubbed:e.target.value})
        this.setState({errorDubbed: false})
    }
    changeReleaseDate=(e)=>{
        this.setState({releaseDate:e.target.value})
        this.setState({errorReleaseDate: false})
    }
    changeRunTime=(e)=>{
        this.setState({runTime:e.target.value})
        this.setState({errorRunTime: false})
    }

   editmovie=()=>{
        let {Title,director,actors,producers, subtitles, language, dubbed, releaseDate, runTime } = this.state;
        if(!Title || !director || !actors || !producers || !subtitles|| !language || !dubbed|| !releaseDate || !runTime){
            if(!Title){
                this.setState({errorTitle: true})
            }
            if(!director){
                this.setState({errorDirector: true})
            }
            if(!actors){
                this.setState({errorActors: true})
            }
            if(!producers){
                this.setState({errorProducers: true})
            }
            if(!subtitles){
                this.setState({errorSubtitles: true})
            }
            if(!language){
                this.setState({errorLanguage: true})
            }
            if(!dubbed){
                this.setState({errorDubbed: true})
            }
            if(!releaseDate){
                this.setState({errorReleaseDate: true})
            }
            if(!runTime){
                this.setState({errorRunTime: true})
            }
            this.movieError();
        }else{
            let data={
                Title: Title,
                Actors: actors,
                Director: director,
                Producers: producers,
                Subtitles: subtitles,
                Language: language,
                Dubbed: dubbed,
                ReleaseDate: releaseDate,
                RunTime: runTime,
            }
            console.log(data)

            this.editConfirmation();
            this.props.history.push(`/ecatalog`);
        }
    }



    editConfirmation = () => {
        notification.success({
            message: 'Success',
            description: 'You have Edited a Movie!',
            duration:6,
        });
    };

    addmovie=()=>{
        let {Title,director,actors,producers, subtitles, language, dubbed, releaseDate, runTime } = this.state;
        if(!Title || !director || !actors || !producers || !subtitles|| !language || !dubbed|| !releaseDate || !runTime){
            if(!Title){
                this.setState({errorTitle: true})
            }
            if(!director){
                this.setState({errorDirector: true})
            }
            if(!actors){
                this.setState({errorActors: true})
            }
            if(!producers){
                this.setState({errorProducers: true})
            }
            if(!subtitles){
                this.setState({errorSubtitles: true})
            }
            if(!language){
                this.setState({errorLanguage: true})
            }
            if(!dubbed){
                this.setState({errorDubbed: true})
            }
            if(!releaseDate){
                this.setState({errorReleaseDate: true})
            }
            if(!runTime){
                this.setState({errorRunTime: true})
            }
            this.movieError();
        }else{
            let data={
                Title: Title,
                Actors: actors,
                Director: director,
                Producers: producers,
                Subtitles: subtitles,
                Language: language,
                Dubbed: dubbed,
                ReleaseDate: releaseDate,
                RunTime: runTime,
            }
            console.log(data)

            this.addConfirmation();
            this.props.history.push(`/ecatalog`);
        }
    }

    closeProfile=()=>{
        this.props.closeProfile();
    }
    backCatalog= ()=>{this.props.history.push(`/ecatalog`);
    if(this.props.movieProfile){
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
    deleteMovie = ()=>
    {
        this.props.closeProfile();
    }

    return=()=>{

    }
    addToCart=()=>{

    }

    addConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'You have Editted a movie!',
            duration:6,
        });
    };
    movieError = () => {
        notification.error({
            message: 'Error',
            description: 'Movie information is Missing!',
            duration:6,
        });
    };


    render() {
        console.log(this.props.movieProfile);
        if(!this.props.userProfile) {
            return (<Redirect to={'/'}/>);
        }else if(this.props.userProfile.type ===0 && !this.props.movieProfile){
            return (<Redirect to={'/404'}/>);
        }else {
            return (
                <div className='main-container'>
                    <HeaderComponent closeProfileItem={this.props.movieProfile ? this.closeProfile: ''} />
                    <div className='MainContainer'>
                        <div className="MainContainer-upper-container">
                            <div className="MainContainer-upper-container-text">
                                <div className="MainContainer-upper-container-first-text">
                                   {this.props.movieProfile?
                                       (this.props.userProfile.type ===0 || this.props.rent ?
                                           "Movie Details":
                                           "Edit Movie")
                                       : "Add Movie"}
                                </div>
                                <div className="MainContainer-upper-container-second-text">
                                {this.props.movieProfile?
                                    (this.props.userProfile.type ===0 || this.props.rent ?
                                        "You can see the details of magazine":
                                    "You can edit a Movie") :
                                    "You can add a new movie to the system!"}
                                    
                                </div>
                            </div>

                        <div className='MainContainer-upper-container-button'>
                            <Button icon='user' content={this.props.rent?'Back to Rentals' : (this.props.cart? 'Back to Cart' : 'Back to Catalog')}
                                    onClick={this.props.rent? this.backToRentals : (this.props.cart? this.backToCart : this.backCatalog)}/>
                            {this.props.movieProfile && this.props.userProfile.type ===1 && !this.props.rent && !this.props.cart?
                                <Popconfirm title="Are you sure to delete this Movie?" onConfirm={this.deleteMovie} placement="bottomRight" okText="Yes" cancelText="No">
                                    <Button icon='user' content='Delete Movie'/>
                                </Popconfirm>
                                    : ''}
                            </div>





                        </div>
                        <Form size='large' className='SettingsForm'>
                            <Header as='h2' className='login-Header' style={{marginTop:'3%'}}textAlign='center'> {
                                this.props.movieProfile?
                                    (this.props.userProfile.type ===0 || this.props.rent  ?
                                        "Movie Profile":
                                    "Edit a Movie") : "Create a Movie"}
                            </Header>
                            <Form.Group width='equal'>
                                <Form.Input
                                    icon='film'
                                    iconPosition='left'
                                    placeholder='Bel Ami'
                                    label='Title:'
                                    disabled={this.props.userProfile.type ===0 || this.props.rent}
                                    value={this.state.Title}
                                    error={this.state.errorTitle}
                                    onChange={this.changeTitle}
                                    width={8}/>
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Dylon'
                                    label='Director:'
                                    disabled={this.props.userProfile.type ===0 || this.props.rent}
                                    value={this.state.director}
                                    error={this.state.errorDirector}
                                    onChange={this.changeDirector}
                                    width={8}/>
                            </Form.Group>
                            <Form.Input
                                fluid icon='user'
                                iconPosition='left'
                                placeholder='Ex: Digital'
                                disabled={this.props.userProfile.type ===0 || this.props.rent}
                                value={this.state.producers}
                                error={this.state.errorProducers}
                                onChange={this.changeProducers}
                                label='Producers:'/>
                            <Form.Input
                                fluid icon='sort numeric down'
                                iconPosition='left'
                                placeholder='Ex: 500'
                                disabled={this.props.userProfile.type ===0 || this.props.rent}
                                value={this.state.actors}
                                error={this.state.errorActors}
                                onChange={this.changeActors}
                                label='Actors:'
                                />
                                
                           
                            <Form.Input
                                fluid icon='language'
                                iconPosition='left'
                                placeholder='John'
                                disabled={this.props.userProfile.type ===0 || this.props.rent}
                                value={this.state.subtitles}
                                error={this.state.errorSubtitles}
                                onChange={this.changeSubtitles}
                                label='Publisher:'/>
                            <Form.Input
                                fluid icon='language'
                                iconPosition='left'
                                label='Language: '
                                placeholder='Ex: English'
                                disabled={this.props.userProfile.type ===0 || this.props.rent}
                                value={this.state.language}
                                error={this.state.errorLanguage}
                                onChange={this.changeLanguage}    />

                             <Form.Input
                                fluid icon='language'
                                iconPosition='left'
                                placeholder='Ex: 1524796972'
                                value={this.state.dubbed}
                                disabled={this.props.userProfile.type ===0 || this.props.rent}
                                error={this.state.errorDubbed}
                                onChange={this.changeDubbed}
                                label='Dubbed: '
                                />
                            <Form.Input
                                fluid icon='calendar alternate outline'
                                iconPosition='left'
                                placeholder='Ex: 3'
                                value={this.state.releaseDate}
                                disabled={this.props.userProfile.type ===0 || this.props.rent}
                                error={this.state.errorReleaseDate}
                                onChange={this.changeReleaseDate}
                                label='Release date: '
                                />
                            <Form.Input
                                fluid icon='calendar alternate outline'
                                iconPosition='left'
                                label='Run Time: '
                                disabled={this.props.userProfile.type ===0 || this.props.rent}
                                placeholder='Ex: 978-1524796976'
                                value={this.state.runTime}
                                error={this.state.errorReleaseDate}
                                onChange={this.changeRunTime}    />
                            {this.props.userProfile.type ===1 && !this.props.rent?
                            <Button className='login-button' fluid size='large' onClick={this.props.movieProfile? this.editmovie :this.addmovie}>
                            {this.props.movieProfile? "Edit Movie" : "Add Movie"}
                            </Button>:(this.props.rent || this.props.cart?
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
                                        {this.props.rent ? "Return Movie" : "Add Movie to Cart"}
                                    </Button>: '')}
                        </Form>
                        {this.props.rent || this.props.cart || !this.props.movieProfile ?
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
export default withRouter(connect(mapStateToProps)(MovieProfile));
