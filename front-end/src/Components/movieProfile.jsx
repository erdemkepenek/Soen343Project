import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'
import {Button, Dropdown, Form, Grid, Header, Icon, Image, Message, Segment} from 'semantic-ui-react'
import {Redirect} from "react-router";
import {Modal, notification, Tooltip,} from "antd";

let options=[];
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
            quantity:this.props.movieProfile? this.props.movieProfile.Quantity: "",
            available:this.props.movieProfile? this.props.movieProfile.available: "",
            copy:'',
            errorTitle: false,
            errorDirector: false,
            errorProducers: false,
            errorActors: false,
            errorLanguage: false,
            errorSubtitles: false,
            errorDubbed: false,
            errorReleaseDate: false,
            errorRunTime: false,
            modal1Visible:false,
            deleteID: '',
            loading:false,
        }
    }
    componentDidMount(){
        if(this.props.movieProfile && this.props.userProfile.type ===1 && !this.props.rent && !this.props.cart){
            options=[
                {text:"Copy ID 1", value:1,key:1},
                {text:"Copy ID 2", value:2,key:2},
                {text:"Copy ID 3", value:3,key:3},
                {text:"Copy ID 4", value:4,key:4},
                {text:"All Copies", value:null,key:null},
            ]
        }
    }
    changeCopy=(e)=>{
        if(e.target.value > 0 || !e.target.value){
            this.setState({copy:e.target.value})
        }else{
            this.setState({copy:0})
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
        let {Title,director,actors,producers, subtitles, language, dubbed, releaseDate, runTime,copy } = this.state;
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
            console.log(copy)
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
        let {Title,director,actors,producers, subtitles, language, dubbed, releaseDate, runTime,copy} = this.state;
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
            console.log(copy)
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
    handleModal=(e,modal1Visible)=> {
        e.preventDefault()
        this.setState({ modal1Visible, deleteID:''});
    }
    deleteCopy=(data)=>{
        this.setState({deleteID:data.value})
    }
    backToWork=()=>{
        this.props.history.push(`/workecatalog`);
        if(this.props.musicProfile){
            this.props.closeProfile();
        }
    }
    removeFromWork=()=>{

    }

    render() {
        console.log(this.props.movieProfile);
        if(!this.props.userProfile) {
            return (<Redirect to={'/'}/>);
        }else if(this.props.userProfile.type ===0 && !this.props.movieProfile){
            return (<Redirect to={'/404'}/>);
        }else {
            return (
                <div className='main-container'>
                    <Modal
                        centered
                        closable
                        title="Are you sure to Delete copy of this Movie?"
                        visible={this.state.modal1Visible}
                        onOk={this.deleteMovie}
                        okText="Delete"
                        okButtonProps={{disabled: !this.state.deleteID}}
                        onCancel={(e)=>this.handleModal(e,false)}
                    >
                        <p>Note: Deleting all copies of the book will result deleting this record.</p>
                        <div className='MainContainer-upper-container-button' style={{textAlign:'center'}}>
                            <Dropdown placeholder="Choose Copy to Delete" value={this.state.deleteID}
                                      onChange={(e, value) => this.deleteCopy(value)} options={options}
                                      selection/>
                        </div>
                    </Modal>
                    <HeaderComponent closeProfileItem={this.props.movieProfile ? this.closeProfile: ''} />
                    <div className='MainContainer'>
                        <div className="MainContainer-upper-container">
                            <div className="MainContainer-upper-container-text">
                                <div className="MainContainer-upper-container-first-text">
                                   {this.props.movieProfile?
                                       (this.props.userProfile.type ===0 || this.props.rent ||this.props.work ?
                                           "Movie Details":
                                           "Edit Movie")
                                       : "Add Movie"}
                                </div>
                                <div className="MainContainer-upper-container-second-text">
                                {this.props.movieProfile?
                                    (this.props.userProfile.type ===0 || this.props.rent || this.props.work?
                                        "You can see the details of magazine":
                                    "You can edit a Movie") :
                                    "You can add a new movie to the system!"}
                                    
                                </div>
                            </div>

                        <div className='MainContainer-upper-container-button'>
                            {this.props.work?<Button content='Back to Work' onClick={this.backToWork}/>:
                            <Button icon='user' content={this.props.rent?'Back to Rentals' : (this.props.cart? 'Back to Cart' : 'Back to Catalog')}
                                    onClick={this.props.rent? this.backToRentals : (this.props.cart? this.backToCart : this.backCatalog)}/>}
                            {this.props.movieProfile && this.props.userProfile.type ===1 && !this.props.rent && !this.props.cart && !this.props.work?
                                    <Button icon='user' content='Delete Movie' onClick={(e)=>this.handleModal(e,true)}/>
                                    : ''}
                            </div>





                        </div>
                        <Form size='large' className='SettingsForm' loading={this.state.loading}>
                            <Header as='h2' className='login-Header' style={{marginTop:'3%'}}textAlign='center'> {
                                this.props.movieProfile?
                                    (this.props.userProfile.type ===0 || this.props.rent || this.props.work ?
                                        "Movie Profile":
                                    "Edit a Movie") : "Create a Movie"}
                            </Header>
                            {this.props.movieProfile && this.props.userProfile.type ===1 && !this.props.work && !this.props.rent && !this.props.cart?
                                <Header as='h3' className='quantityHeader'>Quantity: ({this.state.quantity})</Header>: ''}
                            {this.props.movieProfile && !this.props.work && !this.props.rent && !this.props.cart?
                                <Header as='h3' className='quantityHeader'>Available: ({this.state.available})</Header>: ''}
                            <Form.Group width='equal'>
                                <Form.Input
                                    icon='film'
                                    iconPosition='left'
                                    placeholder='Bel Ami'
                                    label='Title:'
                                    disabled={this.props.userProfile.type ===0 || this.props.rent|| this.props.work}
                                    value={this.state.Title}
                                    error={this.state.errorTitle}
                                    onChange={this.changeTitle}
                                    width={8}/>
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Dylon'
                                    label='Director:'
                                    disabled={this.props.userProfile.type ===0 || this.props.rent|| this.props.work}
                                    value={this.state.director}
                                    error={this.state.errorDirector}
                                    onChange={this.changeDirector}
                                    width={8}/>
                            </Form.Group>
                            <Form.Input
                                fluid icon='user'
                                iconPosition='left'
                                placeholder='Ex: Digital'
                                disabled={this.props.userProfile.type ===0 || this.props.rent|| this.props.work}
                                value={this.state.producers}
                                error={this.state.errorProducers}
                                onChange={this.changeProducers}
                                label='Producers:'/>
                            <Form.Input
                                fluid icon='sort numeric down'
                                iconPosition='left'
                                placeholder='Ex: 500'
                                disabled={this.props.userProfile.type ===0 || this.props.rent|| this.props.work}
                                value={this.state.actors}
                                error={this.state.errorActors}
                                onChange={this.changeActors}
                                label='Actors:'
                                />
                                
                           
                            <Form.Input
                                fluid icon='language'
                                iconPosition='left'
                                placeholder='John'
                                disabled={this.props.userProfile.type ===0 || this.props.rent|| this.props.work}
                                value={this.state.subtitles}
                                error={this.state.errorSubtitles}
                                onChange={this.changeSubtitles}
                                label='Publisher:'/>
                            <Form.Input
                                fluid icon='language'
                                iconPosition='left'
                                label='Language: '
                                placeholder='Ex: English'
                                disabled={this.props.userProfile.type ===0 || this.props.rent|| this.props.work}
                                value={this.state.language}
                                error={this.state.errorLanguage}
                                onChange={this.changeLanguage}    />

                             <Form.Input
                                fluid icon='language'
                                iconPosition='left'
                                placeholder='Ex: 1524796972'
                                value={this.state.dubbed}
                                disabled={this.props.userProfile.type ===0 || this.props.rent|| this.props.work}
                                error={this.state.errorDubbed}
                                onChange={this.changeDubbed}
                                label='Dubbed: '
                                />
                            <Form.Input
                                fluid icon='calendar alternate outline'
                                iconPosition='left'
                                placeholder='Ex: 3'
                                value={this.state.releaseDate}
                                disabled={this.props.userProfile.type ===0 || this.props.rent|| this.props.work}
                                error={this.state.errorReleaseDate}
                                onChange={this.changeReleaseDate}
                                label='Release date: '
                                />
                            <Form.Input
                                fluid icon='calendar alternate outline'
                                iconPosition='left'
                                label='Run Time: '
                                disabled={this.props.userProfile.type ===0 || this.props.rent|| this.props.work}
                                placeholder='Ex: 978-1524796976'
                                value={this.state.runTime}
                                error={this.state.errorReleaseDate}
                                onChange={this.changeRunTime}    />
                            {this.props.userProfile.type ===1 && !this.props.work && !this.props.rent && !this.props.cart?
                                <Form.Input
                                    fluid icon='sort numeric down'
                                    iconPosition='left'
                                    placeholder='Ex: 1'
                                    value={this.state.copy}
                                    onChange={this.changeCopy}
                                    label={this.props.movieProfile ? 'Number of Copies would you like to Add:' : 'Number of Copies would you like to Add: (default: 1)' }
                                    type= "number"/>:''}
                            {this.props.userProfile.type ===1 && !this.props.rent?
                            <Button className='login-button' fluid size='large' onClick={this.props.movieProfile?(this.props.work? this.removeFromWork: this.editmovie) :this.addmovie}>
                            {this.props.movieProfile? (this.props.work? "Remove From Work":"Edit Movie") : "Add Movie"}
                            </Button>:(!this.props.cart && this.props.userProfile.type=== 0 ?
                                    (!this.props.rent && this.state.available===0?
                                        <Tooltip placement="top" title="There is no copy available" arrowPointAtCenter>
                                            <Button
                                                className={"login-button2"}
                                                fluid
                                                size="large"
                                                onClick={this.addToCart}>
                                                Add Movie to Cart
                                            </Button></Tooltip>:
                                        <Button
                                            className={"login-button"}
                                            fluid
                                            size="large"
                                            onClick={
                                                this.props.rent
                                                    ? this.return
                                                    : this.addToCart
                                            }
                                        >
                                            {this.props.rent ? "Return Movie" : "Add Movie to Cart"}
                                        </Button>): '')}
                        </Form>
                        {this.props.rent || this.props.cart || !this.props.movieProfile || this.props.work ?
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
