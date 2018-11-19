import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'
import {Button, Dropdown, Form, Grid, Header, Icon, Image, Message, Segment} from 'semantic-ui-react'
import {Redirect} from "react-router";
import {Modal, notification, Tooltip} from "antd";
import moment from 'moment'
import ApiCalls from '../class/apiCalls'


let apicall = new ApiCalls;

let options=[];
class MusicProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: this.props.musicProfile? this.props.musicProfile.Title : "",
            artist: this.props.musicProfile? this.props.musicProfile.Artist : "",
            label: this.props.musicProfile? this.props.musicProfile.Label : "",
            musicType: this.props.musicProfile? this.props.musicProfile.Type : "",
            releaseDate: this.props.musicProfile? moment(this.props.musicProfile.ReleaseDate).format("YYYY-MM-DD") : "",
            ASIN: this.props.musicProfile? this.props.musicProfile.ASIN : "",
            quantity: this.props.musicProfile? this.props.musicProfile.Quantity : "",
            available: this.props.musicProfile? this.props.musicProfile.available: '',
            copy: '',
            errorTitle: false,
            errorArtist: false,
            errorLabel: false,
            errorMusicType: false,
            errorReleaseDate: false,
            errorASIN: false,
            modal1Visible:false,
            deleteID: '',
            loading:false,
        }
    }
    componentDidMount(){
        if(this.props.musicProfile && this.props.userProfile.type ===1 && !this.props.rent && !this.props.cart){
            options=[];
            if(this.props.musicProfile.copies) {
                this.props.musicProfile.copies.map((copyData, key) => {
                    let arrData = {text: "Item ID" + copyData.toString(), value: copyData, key: key}
                    options.push(arrData)
                })
                options.push({text: "All Items", value: 'All', key: 9999})
                console.log(options)
            }
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
    changeCopy=(e)=>{
        if(e.target.value > 0 || !e.target.value){
            this.setState({copy:e.target.value})
        }else{
            this.setState({copy:0})
        }
    }
   editMusic=()=>{

        let {Title, artist, label, musicType, releaseDate, ASIN,copy} = this.state;
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
            this.setState({loading:true})
            let data={
                Title: Title,
                Artist: artist,
                Label: label,
                Type: musicType,
                ReleaseDate: releaseDate,
                ASIN: ASIN,
                category: 'music',
                idDesc:this.props.musicProfile.idDesc,
            }
            let numberOfCopies = 0;
            if(copy){
                numberOfCopies = copy
            }
            let temp = this;
            apicall.editMusic(this.props.userProfile.UserId,data,function(callbackData){
                if(numberOfCopies >0){
                    apicall.addMusicCopy(temp.props.userProfile.UserId,numberOfCopies,data,function(callbackData2){
                        temp.setState({loading:false})
                        temp.editConfirmation();
                        temp.closeProfile();
                        temp.props.history.push(`/ecatalog`);

                    })
                }else{
                    temp.setState({loading:false})
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
            description: 'Editted Music has been added to Work Table',
            duration:6,
        });
    }
    deleteConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Deleted Music has been added to Work Table',
            duration:6,
        });
    };
    removeWorkConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Music has been removed from Work Table',
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
            this.setState({loading:true})
            let data={
                Title: Title,
                Artist: artist,
                Label: label,
                Type: musicType,
                ReleaseDate: releaseDate,
                ASIN: ASIN,
                category: 'music',
            }
            let temp = this;
            apicall.addMusic(this.props.userProfile.UserId,data,function(dataRentals){
                console.log(dataRentals)
                temp.setState({loading:false})
                temp.addConfirmation();
                temp.props.history.push(`/ecatalog`);

            });
        }
    }



    addConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Created Music has been added to Work Table!',
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
        if(this.props.musicProfile){
            this.props.closeProfile();
        }
    }
    backToRentals= ()=> {
        this.props.history.push(`/rentals`);
        if(this.props.musicProfile){
            this.props.closeProfile();
        }
    }
    deleteMusic= ()=> {
        this.setState({loading:true})
        let data={
            Title: this.props.musicProfile.Title,
            Artist: this.props.musicProfile.Artist,
            Label: this.props.musicProfile.Label,
            Type: this.props.musicProfile.Type,
            ReleaseDate: this.props.musicProfile.ReleaseDate,
            ASIN: this.props.musicProfile.ASIN,
            Quantity: this.props.musicProfile.Quantity,
            available: this.props.musicProfile.available,
            copies: this.props.musicProfile.copies,
        }
        if(this.state.deleteID === 'All'){
            data.idDesc=this.props.musicProfile.idDesc
        }else{
            data.itemId=this.state.deleteID
        }
        console.log(data)
        let temp = this;
        apicall.deleteMusic(this.props.userProfile.UserId,data,function(dataCallback){
            console.log(dataCallback)
            temp.setState({loading:false})
            temp.deleteConfirmation();
            temp.props.closeProfile();
            temp.props.history.push(`/ecatalog`);

        });
    }
    return=()=>{

    }
    addToCart=()=>{

    }
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
        this.setState({loading:true})
        let temp = this;
        if(this.props.musicProfile.typeWork=== "Delete Music"){
            apicall.removeWorkMusicDelete(this.props.userProfile.UserId,this.props.musicProfile.index,function(dataCallback){
                temp.setState({loading:false})
                temp.removeWorkConfirmation();
                temp.props.closeProfile();
                temp.props.history.push(`/workecatalog`);

            });
        }else if(this.props.musicProfile.typeWork === 'Add Music'){
            apicall.removeWorkMusicAdd(this.props.userProfile.UserId,this.props.musicProfile.index,function(dataCallback){
                temp.setState({loading:false})
                temp.removeWorkConfirmation();
                temp.props.closeProfile();
                temp.props.history.push(`/workecatalog`);

            });
        }else{
            apicall.removeWorkMusicModify(this.props.userProfile.UserId,this.props.musicProfile.index,function(dataCallback){
                temp.setState({loading:false})
                temp.removeWorkConfirmation();
                temp.props.closeProfile();
                temp.props.history.push(`/workecatalog`);

            });
        }

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
                    <Modal
                        centered
                        closable
                        title="Are you sure to Delete copy of this Music?"
                        visible={this.state.modal1Visible}
                        onOk={this.deleteMusic}
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
                    <HeaderComponent closeProfileItem={this.props.musicProfile ? this.closeProfile : ''} />
                    <div className='MainContainer'>
                        <div className="MainContainer-upper-container">
                            <div className="MainContainer-upper-container-text">
                                <div className="MainContainer-upper-container-first-text">
                                   {this.props.musicProfile?
                                       (this.props.userProfile.type ===0 || this.props.rent || this.props.work ?
                                           "Music Details":
                                       "Edit Music") : "Add Music"}
                                </div>
                                <div className="MainContainer-upper-container-second-text">
                                {this.props.musicProfile?
                                    (this.props.userProfile.type ===0 || this.props.rent || this.props.work?
                                        "You can see the details of Music":
                                    "You can edit music" )
                                    : "You can add new music to the system!"}
                                    
                                </div>
                            </div>

                            <div className='MainContainer-upper-container-button'>
                                {this.props.work?<Button content='Back to Work' onClick={this.backToWork}/>:
                                <Button icon='user' content={this.props.rent?'Back to Rentals' : (this.props.cart? 'Back to Cart' : 'Back to Catalog')}
                                        onClick={this.props.rent? this.backToRentals : (this.props.cart? this.backToCart : this.backToCatalog)}/>}
                                {this.props.musicProfile && this.props.userProfile.type ===1 && !this.props.rent && !this.props.cart && !this.props.work?
                                    <Button icon='user' content='Delete Music' onClick={(e)=>this.handleModal(e,true)}/>
                                    : ''}
                            </div>
                        </div>
                        <Form size='large' className='SettingsForm' loading={this.state.loading}>
                            <Header as='h2' className='login-Header' style={{marginTop:'3%'}}textAlign='center'> {
                                this.props.musicProfile?
                                    (this.props.userProfile.type ===0 || this.props.rent || this.props.work ?
                                        "Music Profile":"Edit Music")
                                    : "Create Music"}
                            </Header>
                            {this.props.musicProfile && this.props.userProfile.type ===1 && !this.props.work && !this.props.rent && !this.props.cart?
                                <Header as='h3' className='quantityHeader'>Quantity: ({this.state.quantity})</Header>: ''}
                            {this.props.musicProfile && !this.props.work && !this.props.rent && !this.props.cart?
                                <Header as='h3' className='quantityHeader'>Available: ({this.state.available})</Header>: ''}
                            <Form.Group width='equal'>
                                <Form.Input
                                    icon='music'
                                    iconPosition='left'
                                    placeholder='La Bohème'
                                    label='Title:'
                                    disabled={this.props.userProfile.type ===0 || this.props.rent || this.props.work}
                                    value={this.state.Title}
                                    error={this.state.errorTitle}
                                    onChange={this.changeTitle}
                                    width={8}/>
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Charles Aznavour'
                                    label='Artist:'
                                    disabled={this.props.userProfile.type ===0 || this.props.rent || this.props.work}
                                    value={this.state.artist}
                                    error={this.state.errorArtist}
                                    onChange={this.changeArtist}
                                    width={8}/>
                            </Form.Group>
                            <Form.Input
                                fluid icon='dot circle'
                                iconPosition='left'
                                disabled={this.props.userProfile.type ===0 || this.props.rent || this.props.work}
                                placeholder='Barclay'
                                value={this.state.label}
                                error={this.state.errorLabel}
                                onChange={this.changeLabel}
                                label='Label:'/>
                            <Form.Input
                                fluid icon='th'
                                iconPosition='left'
                                placeholder='Chanson'
                                disabled={this.props.userProfile.type ===0 || this.props.rent || this.props.work}
                                value={this.state.musicType}
                                error={this.state.errorMusicType}
                                onChange={this.changeMusicType}

                                label='Type:'/>
                                
                           
                            <Form.Input
                                fluid icon='calendar outline'
                                iconPosition='left'
                                placeholder='10/07/1965'
                                value={this.state.releaseDate}
                                disabled={this.props.userProfile.type ===0 || this.props.rent || this.props.work}
                                error={this.state.errorReleaseDate}
                                onChange={this.changeReleaseDate}
                                label='Release Date:'
                                type="date"/>
                            <Form.Input
                                fluid icon='id card'
                                iconPosition='left'
                                label='ASIN: '
                                placeholder='B01G9A1080'
                                disabled={this.props.userProfile.type ===0 || this.props.rent|| this.props.work}
                                value={this.state.ASIN}
                                error={this.state.errorASIN}
                                onChange={this.changeASIN}    />
                            {this.props.userProfile.type ===1 && !this.props.work && !this.props.rent && !this.props.cart?
                                <Form.Input
                                    fluid icon='sort numeric down'
                                    iconPosition='left'
                                    placeholder='Default: 0'
                                    value={this.props.musicProfile ? this.state.copy : 1}
                                    disabled={!this.props.musicProfile}
                                    onChange={this.changeCopy}
                                    label={this.props.musicProfile ? 'Number of Copies would you like to Add:' : 'Number of Copies will be added as Default:' }
                                    type= "number"/>:''}
                            {this.props.userProfile.type ===1 && !this.props.rent?
                            <Button className='login-button' fluid size='large' onClick={this.props.musicProfile?(this.props.work? this.removeFromWork: this.editMusic) :this.addMusic}>
                            {this.props.musicProfile? (this.props.work? "Remove From Work": "Edit Music") : "Add Music"}
                            </Button>: (!this.props.cart && this.props.userProfile.type=== 0?
                                    (!this.props.rent && this.state.available===0 ?
                                        <Tooltip placement="top" title="There is no copy available" arrowPointAtCenter>
                                            <Button
                                                className={"login-button2"}
                                                fluid
                                                size="large"
                                                onClick={this.addToCart}>
                                                Add Music to Cart
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
                                            {this.props.rent ? "Return Music" : "Add Music to Cart"}
                                        </Button>): '')}
                        </Form>
                        {this.props.rent || this.props.cart || !this.props.musicProfile || this.props.work?
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
