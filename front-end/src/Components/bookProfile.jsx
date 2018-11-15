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


class BookProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {

            Title: this.props.bookProfile? this.props.bookProfile.Title : "",

            author: this.props.bookProfile? this.props.bookProfile.Author : "",
            format: this.props.bookProfile? this.props.bookProfile.Format : "",
            pages: this.props.bookProfile? this.props.bookProfile.Pages : "",
            publisher: this.props.bookProfile? this.props.bookProfile.Publisher : "",
            language: this.props.bookProfile? this.props.bookProfile.Language : "",
            ISBN10: this.props.bookProfile? this.props.bookProfile.ISBN10 : "",
            ISBN13: this.props.bookProfile? this.props.bookProfile.ISBN13 : "",
            quantity: this.props.bookProfile? this.props.bookProfile.Quantity : "",
            errorTitle: false,
            errorAuthor: false,
            errorFormat: false,
            errorPages: false,
            errorPublisher: false,
            errorLanguage: false,
            errorISBN10: false,
            errorISBN13: false,
            errorQuantity: false,
        }
    }
    
    changeTitle=(e)=>{
        this.setState({Title:e.target.value})
        this.setState({errorTitle: false})
    }
    changeAuthor=(e)=>{
        this.setState({author:e.target.value})
        this.setState({errorAuthor: false})
    }
    changeFormat=(e)=>{
        this.setState({format:e.target.value})
        this.setState({errorFormat: false})
    }
    changePages=(e)=>{
        this.setState({pages:e.target.value})
        this.setState({errorPages: false})
    }
    changePublisher=(e)=>{
        this.setState({publisher:e.target.value})
        this.setState({errorPublisher: false})
    }
    changeLanguage=(e)=>{
        this.setState({language:e.target.value})
        this.setState({errorLanguage: false})
    }
    changeISBN10=(e)=>{
        this.setState({ISBN10:e.target.value})
        this.setState({errorISBN10: false})
    }
    changeISBN13=(e)=>{
        this.setState({ISBN10:e.target.value})
        this.setState({errorISBN13: false})
    }
    changeQuantity=(e)=>{
        this.setState({quantity:e.target.value})
        this.setState({errorQuantity: false})
    }

   editBook=()=>{
        let {Title,author,format,pages, publisher, language, ISBN10, ISBN13, quantity } = this.state;
        if(!Title || !author || !format || !pages || !publisher || !language || !ISBN10 || !ISBN13 || !quantity){
            if(!Title){
                this.setState({errorTitle: true})
            }
            if(!author){
                this.setState({errorAuthor: true})
            }
            if(!format){
                this.setState({errorFormat: true})
            }
            if(!pages){
                this.setState({errorPages: true})
            }
            if(!publisher){
                this.setState({errorPublisher: true})
            }
            if(!language){
                this.setState({errorLanguage: true})
            }
            if(!ISBN10){
                this.setState({errorISBN10: true})
            }
            if(!ISBN13){
                this.setState({errorISBN13: true})
            }
            if(!quantity){
                this.setState({errorQuantity: true})
            }
            this.bookError();
        }else{
            let data={
                Title: Title,
                Author: author,
                Format: format,
                Pages: pages,
                Publisher: publisher,
                ISBN10: ISBN10,
                ISBN13: ISBN13,
                Language: language,
                Quantity: quantity,
            }
            console.log(data)

            this.editConfirmation();
            this.props.history.push(`/ecatalog`);
            this.closeProfile();
        }
    }



    editConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'You have Editted a Book!',
            duration:6,
        });
    };

    addBook=()=>{
        let {Title,author,format,pages, publisher, language, ISBN10, ISBN13, quantity } = this.state;
        if(!Title || !author || !format || !pages || !publisher || !language || !ISBN10 || !ISBN13 || !quantity){
            if(!Title){
                this.setState({errorTitle: true})
            }
            if(!author){
                this.setState({errorAuthor: true})
            }
            if(!format){
                this.setState({errorFormat: true})
            }
            if(!pages){
                this.setState({errorPages: true})
            }
            if(!publisher){
                this.setState({errorPublisher: true})
            }
            if(!language){
                this.setState({errorLanguage: true})
            }
            if(!ISBN10){
                this.setState({errorISBN10: true})
            }
            if(!ISBN13){
                this.setState({errorISBN13: true})
            }
            if(!quantity){
                this.setState({errorQuantity: true})
            }
            this.bookError();
        }else{
            let data={
                Title: Title,
                Author: author,
                Format: format,
                Pages: pages,
                Publisher: publisher,
                ISBN10: ISBN10,
                ISBN13: ISBN13,
                Language: language,
                Quantity: quantity,
            }
            console.log(data)

            this.addConfirmation();
            this.props.history.push(`/ecatalog`);
        }
    }



    addConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'You have Editted a Book!',
            duration:6,
        });
    };
    bookError = () => {
        notification.error({
            message: 'Error',
            description: 'Book information is Missing!',
            duration:6,
        });
    };
    closeProfile=()=>{
        this.props.closeProfile();
    }

    backToCatalog= ()=>
    {
        this.props.history.push(`/ecatalog`);
        if(this.props.bookProfile){
            this.props.closeProfile();
            } 
    }

    deleteBook = ()=>
    {
        this.props.closeProfile();
    }


    render() {
        console.log(this.props.bookProfile);
        if(!this.props.userProfile) {
            return (<Redirect to={'/'}/>);
        }else if(this.props.userProfile.type ===0 && !this.props.bookProfile){
            return (<Redirect to={'/404'}/>);
        }else {
            return (
                <div className='main-container'>
                    <HeaderComponent closeProfileItem={this.props.bookProfile ? this.closeProfile : ''} />
                    <div className='MainContainer'>
                        <div className="MainContainer-upper-container">
                            <div className="MainContainer-upper-container-text">
                                <div className="MainContainer-upper-container-first-text">
                                   {this.props.bookProfile? "Edit Book" : "Add Book"}
                                </div>
                                <div className="MainContainer-upper-container-second-text">
                                {this.props.bookProfile? "You can edit a book" : "You can add a new book to the system!"}
                                    
                                </div>
                            </div>
                            <div className='MainContainer-upper-container-button'>
                                <Button icon='user' content='Back to Catalog' onClick={this.backToCatalog}/>
                                {this.props.bookProfile?
                                <Popconfirm title="Are you sure to delete this User?" onConfirm={this.deleteBook} placement="bottomRight" okText="Yes" cancelText="No">
                                    <Button icon='user' content='Delete Book'/>
                                </Popconfirm>
                                    : ''}
                            </div>
                        </div>
                        <Form size='large' className='SettingsForm'>
                            <Header as='h2' className='login-Header' style={{marginTop:'3%'}}textAlign='center'> {
                                this.props.bookProfile? "Edit a Book" : "Create a Book"}
                            </Header>
                            <Form.Group width='equal'>
                                <Form.Input
                                    icon='book'
                                    iconPosition='left'
                                    placeholder='Bel Ami'
                                    label='Title:'
                                    value={this.state.Title}
                                    error={this.state.errorTitle}
                                    onChange={this.changeTitle}
                                    width={8}/>
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Dylon'
                                    label='Author:'
                                    value={this.state.author}
                                    error={this.state.errorAuthor}
                                    onChange={this.changeAuthor}
                                    width={8}/>
                            </Form.Group>
                            <Form.Input
                                fluid icon='file outline'
                                iconPosition='left'
                                placeholder='Ex: Digital'
                                value={this.state.format}
                                error={this.state.errorFormat}
                                onChange={this.changeFormat}
                                label='Format:'/>
                            <Form.Input
                                fluid icon='sort numeric down'
                                iconPosition='left'
                                placeholder='Ex: 500'
                                value={this.state.pages}
                                error={this.state.errorPages}
                                onChange={this.changePages}
                                label='Pages:'
                                type= "number"/>
                                
                           
                            <Form.Input
                                fluid icon='user'
                                iconPosition='left'
                                placeholder='John'
                                value={this.state.publisher}
                                error={this.state.errorPublisher}
                                onChange={this.changePublisher}
                                label='Publisher:'/>
                            <Form.Input
                                fluid icon='language'
                                iconPosition='left'
                                label='Language: '
                                placeholder='Ex: English'
                                value={this.state.language}
                                error={this.state.errorLanguage}
                                onChange={this.changeLanguage}    />

                             <Form.Input
                                fluid icon='id card'
                                iconPosition='left'
                                placeholder='Ex: 1524796972'
                                value={this.state.ISBN10}
                                error={this.state.errorISBN10}
                                onChange={this.changeISBN10}
                                label='ISBN-10: '
                                type= "number"/>
                            <Form.Input
                                fluid icon='sort numeric down'
                                iconPosition='left'
                                placeholder='Ex: 3'
                                value={this.state.quantity}
                                error={this.state.errorQuantity}
                                onChange={this.changeQuantity}
                                label='Quantity: '
                                type= "number"/>
                            <Form.Input
                                fluid icon='id card'
                                iconPosition='left'
                                label='ISBN-13: '
                                placeholder='Ex: 978-1524796976'
                                value={this.state.ISBN13}
                                error={this.state.errorISBN13}
                                onChange={this.changeISBN13}    />
                            <Button className='login-button' fluid size='large' onClick={this.props.bookProfile? this.editBook :this.addBook}>
                            {this.props.bookProfile? "Edit Book" : "Add Book"}
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
export default withRouter(connect(mapStateToProps)(BookProfile));
