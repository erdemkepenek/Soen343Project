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
import ApiCalls from '../class/apiCalls'
import moment from "moment";


let apicall = new ApiCalls;


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
            releaseDate: this.props.movieProfile? moment(this.props.movieProfile.ReleaseDate).format("YYYY-MM-DD") : "",
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
            options = [];
            if (this.props.movieProfile.copies) {
                this.props.movieProfile.copies.map((copyData, key) => {
                    let arrData = { text: "Item ID" + copyData.toString(), value: copyData, key: key }
                    options.push(arrData)
                })
                options.push({ text: "All Items", value: 'All', key: 9999 })
                console.log(options)
            }
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
            this.setState({ loading: true })
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
                category: 'movie',
                idDesc: this.props.movieProfile.idDesc,
            }
            let numberOfCopies = 0;
            if (copy) {
                numberOfCopies = copy
            }
            let temp = this;
            apicall.editMovie(this.props.userProfile.UserId, data, function (callbackData) {
                if (numberOfCopies > 0) {
                    apicall.addMovieCopy(temp.props.userProfile.UserId, numberOfCopies, data, function (callbackData2) {
                        temp.setState({ loading: false })
                        temp.editConfirmation();
                        temp.closeProfile();
                        temp.props.history.push(`/ecatalog`);

                    })
                } else {
                    temp.setState({ loading: false })
                    temp.editConfirmation();
                    temp.closeProfile();
                    temp.props.history.push(`/ecatalog`);
                }
            });
        }
    }



    editConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Editted Movie has been added to Work Table',
            duration: 6,
        });
    }
    deleteConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Deleted Movie has been added to Work Table',
            duration: 6,
        });
    };
    removeWorkConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Movie has been removed from Work Table',
            duration: 6,
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
            this.setState({ loading: true })
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
                category: 'movie'
            }
            let temp = this;
            apicall.addMovie(this.props.userProfile.UserId, data, function (dataRentals) {
                console.log(dataRentals)
                temp.setState({ loading: false })
                temp.addConfirmation();
                temp.props.history.push(`/ecatalog`);

            });
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
        if(this.props.movieProfile){
            this.props.closeProfile();
        }
    }
    backToRentals= ()=> {
        this.props.history.push(`/rentals`);
        if(this.props.movieProfile){
            this.props.closeProfile();
        }
    }
    deleteMovie = ()=>
    {
        this.setState({ loading: true })
        let data = {
            Title: this.props.movieProfile.Title,
            Director: this.props.movieProfile.Director,
            Producers: this.props.movieProfile.Producers,
            Actors: this.props.movieProfile.Actors,
            Language: this.props.movieProfile.Language,
            Subtitles: this.props.movieProfile.Subtitles,
            Dubbed:this.props.movieProfile.Dubbed,
            ReleaseDate: this.props.movieProfile.ReleaseDate,
            RunTime: this.props.movieProfile.RunTime,
            Quantity:this.props.movieProfile.Quantity,
            available:this.props.movieProfile.available,
            copies: this.props.movieProfile.copies,
        }
        if (this.state.deleteID === 'All') {
            data.idDesc = this.props.movieProfile.idDesc
        } else {
            data.itemId = this.state.deleteID
        }
        console.log(data)
        let temp = this;
        apicall.deleteMovie(this.props.userProfile.UserId, data, function (dataCallback) {
            console.log(dataCallback)
            temp.setState({ loading: false })
            temp.deleteConfirmation();
            temp.props.closeProfile();
            temp.props.history.push(`/ecatalog`);

        });
    }

    return=()=>{

    }
    addToCart=()=>{

    }

    addConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Created Movie has been added to Work Table!',
            duration: 6,
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
        if(this.props.movieProfile){
            this.props.closeProfile();
        }
    }
    removeFromWork = () => {
        this.setState({ loading: true })
        let temp = this;
        if (this.props.movieProfile.typeWork === "Delete Movie") {
            apicall.removeWorkBookDelete(this.props.userProfile.UserId, this.props.movieProfile.index, function (dataCallback) {
                temp.setState({ loading: false })
                temp.removeWorkConfirmation();
                temp.props.closeProfile();
                temp.props.history.push(`/workecatalog`);

            });
        } else if (this.props.movieProfile.typeWork === 'Add Movie') {
            apicall.removeWorkBookAdd(this.props.userProfile.UserId, this.props.movieProfile.index, function (dataCallback) {
                temp.setState({ loading: false })
                temp.removeWorkConfirmation();
                temp.props.closeProfile();
                temp.props.history.push(`/workecatalog`);

            });
        } else {
            apicall.removeWorkBookModify(this.props.userProfile.UserId, this.props.movieProfile.index, function (dataCallback) {
                temp.setState({ loading: false })
                temp.removeWorkConfirmation();
                temp.props.closeProfile();
                temp.props.history.push(`/workecatalog`);

            });
        }

    }
    previous = ()=>{
        if(this.props.movieProfile.index !== 0){
            this.props.changeProfile(this.props.catalog[this.props.movieProfile.index-1])
            this.setState({
                Title: this.props.catalog[this.props.movieProfile.index-1].Title,
                director: this.props.catalog[this.props.movieProfile.index-1].Director,
                producers: this.props.catalog[this.props.movieProfile.index-1].Producers,
                actors: this.props.catalog[this.props.movieProfile.index-1].Actors,
                language: this.props.catalog[this.props.movieProfile.index-1].Language,
                subtitles: this.props.catalog[this.props.movieProfile.index-1].Subtitles,
                dubbed: this.props.catalog[this.props.movieProfile.index-1].Dubbed,
                releaseDate: this.props.catalog[this.props.movieProfile.index-1].ReleaseDate,
                runTime: this.props.catalog[this.props.movieProfile.index-1].RunTime,
                quantity: this.props.catalog[this.props.movieProfile.index-1].Quantity,
                available: this.props.catalog[this.props.movieProfile.index-1].available,});
            this.props.history.push(`/ecatalog/${this.props.catalog[this.props.movieProfile.index-1].Title}`);
            this.forceUpdate();
        }else{
            this.props.changeProfile(this.props.catalog[this.props.catalog.length-1])
            this.setState({
                Title: this.props.catalog[this.props.catalog.length-1].Title,
                director: this.props.catalog[this.props.catalog.length-1].Director,
                producers: this.props.catalog[this.props.catalog.length-1].Producers,
                actors: this.props.catalog[this.props.catalog.length-1].Actors,
                language: this.props.catalog[this.props.catalog.length-1].Language,
                subtitles: this.props.catalog[this.props.catalog.length-1].Subtitles,
                dubbed: this.props.catalog[this.props.catalog.length-1].Dubbed,
                releaseDate: this.props.catalog[this.props.catalog.length-1].ReleaseDate,
                runTime: this.props.catalog[this.props.catalog.length-1].RunTime,
                quantity: this.props.catalog[this.props.catalog.length-1].Quantity,
                available: this.props.catalog[this.props.catalog.length-1].available,});
            this.props.history.push(`/ecatalog/${this.props.catalog[this.props.catalog.length-1].Title}`);
            this.forceUpdate();
        }
    }
    next = ()=>{
        if(this.props.movieProfile.index !== this.props.catalog.length-1){
            this.props.changeProfile(this.props.catalog[this.props.movieProfile.index+1]);
            this.setState({
                Title: this.props.catalog[this.props.movieProfile.index+1].Title,
                director: this.props.catalog[this.props.movieProfile.index+1].Director,
                producers: this.props.catalog[this.props.movieProfile.index+1].Producers,
                actors: this.props.catalog[this.props.movieProfile.index+1].Actors,
                language: this.props.catalog[this.props.movieProfile.index+1].Language,
                subtitles: this.props.catalog[this.props.movieProfile.index+1].Subtitles,
                dubbed: this.props.catalog[this.props.movieProfile.index+1].Dubbed,
                releaseDate: this.props.catalog[this.props.movieProfile.index+1].ReleaseDate,
                runTime: this.props.catalog[this.props.movieProfile.index+1].RunTime,
                quantity: this.props.catalog[this.props.movieProfile.index+1].Quantity,
                available: this.props.catalog[this.props.movieProfile.index+1].available,});
            this.props.history.push(`/ecatalog/${this.props.catalog[this.props.movieProfile.index+1].Title}`);
            this.forceUpdate();
        }else{
            this.props.changeProfile(this.props.catalog[0]);
            this.setState({
                Title: this.props.catalog[0].Title,
                director: this.props.catalog[0].Director,
                producers: this.props.catalog[0].Producers,
                actors: this.props.catalog[0].Actors,
                language: this.props.catalog[0].Language,
                subtitles: this.props.catalog[0].Subtitles,
                dubbed: this.props.catalog[0].Dubbed,
                releaseDate: this.props.catalog[0].ReleaseDate,
                runTime: this.props.catalog[0].RunTime,
                quantity: this.props.catalog[0].Quantity,
                available: this.props.catalog[0].available,});
            this.props.history.push(`/ecatalog/${this.props.catalog[0].Title}`);
            this.forceUpdate();
        }
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
                        <p>Note: Deleting all copies of the movie will result deleting this record.</p>
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
                                type="date"
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
                                    placeholder='Default: 0'
                                    value={this.props.movieProfile ? this.state.copy : 1}
                                    disabled={!this.props.movieProfile}
                                    onChange={this.changeCopy}
                                    label={this.props.movieProfile ? 'Number of Copies would you like to Add:' : 'Number of Copies will be added as Default:' }
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
                                <Button icon='long arrow alternate left' content='Previus Item' onClick={this.previous}/>
                                <Button icon='long arrow alternate right' labelPosition='right' content='Next Item' onClick={this.next}/>
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
        userProfile: state.AdminReducer.userProfile,
        catalog: state.AdminReducer.catalog,
    };

}
export default withRouter(connect(mapStateToProps)(MovieProfile));
