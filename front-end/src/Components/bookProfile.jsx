import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import { withRouter } from 'react-router-dom'
import { Button, Dropdown, Form, Grid, Header, Icon, Image, Message, Segment } from 'semantic-ui-react'
import { Redirect } from "react-router";
import { notification, Modal, Tooltip } from "antd";
import ApiCalls from '../class/apiCalls'


let apicall = new ApiCalls;

let options = [];

class BookProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {

            Title: this.props.bookProfile ? this.props.bookProfile.Title : "",
            author: this.props.bookProfile ? this.props.bookProfile.Author : "",
            format: this.props.bookProfile ? this.props.bookProfile.Format : "",
            pages: this.props.bookProfile ? this.props.bookProfile.Pages : "",
            publisher: this.props.bookProfile ? this.props.bookProfile.Publisher : "",
            language: this.props.bookProfile ? this.props.bookProfile.Language : "",
            ISBN10: this.props.bookProfile ? this.props.bookProfile['ISBN-10'] : "",
            ISBN13: this.props.bookProfile ? this.props.bookProfile['ISBN-13'] : "",
            quantity: this.props.bookProfile ? this.props.bookProfile.Quantity : "",
            available: this.props.bookProfile ? this.props.bookProfile.available : '',
            copy: '',
            errorTitle: false,
            errorAuthor: false,
            errorFormat: false,
            errorPages: false,
            errorPublisher: false,
            errorLanguage: false,
            errorISBN10: false,
            errorISBN13: false,
            modal1Visible: false,
            deleteID: '',
            loading: false,
        }
    }
    componentDidMount() {
        if (this.props.bookProfile && this.props.userProfile.type === 1 && !this.props.rent && !this.props.cart) {
            options = [];
            if (this.props.bookProfile.copies) {
                this.props.bookProfile.copies.map((copyData, key) => {
                    let arrData = { text: "Item ID" + copyData.toString(), value: copyData, key: key }
                    options.push(arrData)
                })
                options.push({ text: "All Items", value: 'All', key: 9999 })
                console.log(options)
            }
        }
    }
    changeTitle = (e) => {
        this.setState({ Title: e.target.value })
        this.setState({ errorTitle: false })
    }
    changeAuthor = (e) => {
        this.setState({ author: e.target.value })
        this.setState({ errorAuthor: false })
    }
    changeFormat = (e) => {
        this.setState({ format: e.target.value })
        this.setState({ errorFormat: false })
    }
    changePages = (e) => {
        this.setState({ pages: e.target.value })
        this.setState({ errorPages: false })
    }
    changePublisher = (e) => {
        this.setState({ publisher: e.target.value })
        this.setState({ errorPublisher: false })
    }
    changeLanguage = (e) => {
        this.setState({ language: e.target.value })
        this.setState({ errorLanguage: false })
    }
    changeISBN10=(e)=>{
        if(e.target.value< 10000000000)
        {
            this.setState({ISBN10: e.target.value})
        }
        this.setState({errorISBN10: false})
    }
    changeISBN13=(e)=>{
        if(e.target.value< 10000000000000) {
            this.setState({ISBN13: e.target.value})
        }
        this.setState({errorISBN13: false})
    }
    changeCopy = (e) => {
        if (e.target.value > 0 || !e.target.value) {
            this.setState({ copy: e.target.value })
        } else {
            this.setState({ copy: 0 })
        }
    }

    editBook = () => {
        let { Title, author, format, pages, publisher, language, ISBN10, ISBN13, copy } = this.state;
        if (!Title || !author || !format || !pages || !publisher || !language || !ISBN10 || !ISBN13) {
            if (!Title) {
                this.setState({ errorTitle: true })
            }
            if (!author) {
                this.setState({ errorAuthor: true })
            }
            if (!format) {
                this.setState({ errorFormat: true })
            }
            if (!pages) {
                this.setState({ errorPages: true })
            }
            if (!publisher) {
                this.setState({ errorPublisher: true })
            }
            if (!language) {
                this.setState({ errorLanguage: true })
            }
            if (!ISBN10) {
                this.setState({ errorISBN10: true })
            }
            if (!ISBN13) {
                this.setState({ errorISBN13: true })
            }
            this.bookError();
        } else {
            this.setState({ loading: true })
            let data = {
                Title: Title,
                Author: author,
                Format: format,
                Pages: pages,
                Publisher: publisher,
                Language: language,
                category: 'book',
                idDesc: this.props.bookProfile.idDesc,
            }
            let numberOfCopies = 0;
            if (copy) {
                numberOfCopies = copy
            }
            data['ISBN-10'] = ISBN10;
            data['ISBN-13'] = ISBN13;
            let temp = this;
            apicall.editBook(this.props.userProfile.UserId, data, function (callbackData) {
                if (numberOfCopies > 0) {
                    apicall.addBookCopy(temp.props.userProfile.UserId, numberOfCopies, data, function (callbackData2) {
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
            description: 'Editted Book has been added to Work Table',
            duration: 6,
        });
    }
    deleteConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Deleted Book has been added to Work Table',
            duration: 6,
        });
    };
    removeWorkConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Book has been removed from Work Table',
            duration: 6,
        });
    };

    addBook = () => {
        let { Title, author, format, pages, publisher, language, ISBN10, ISBN13, copy } = this.state;
        if (!Title || !author || !format || !pages || !publisher || !language || !ISBN10 || !ISBN13) {
            if (!Title) {
                this.setState({ errorTitle: true })
            }
            if (!author) {
                this.setState({ errorAuthor: true })
            }
            if (!format) {
                this.setState({ errorFormat: true })
            }
            if (!pages) {
                this.setState({ errorPages: true })
            }
            if (!publisher) {
                this.setState({ errorPublisher: true })
            }
            if (!language) {
                this.setState({ errorLanguage: true })
            }
            if (!ISBN10) {
                this.setState({ errorISBN10: true })
            }
            if (!ISBN13) {
                this.setState({ errorISBN13: true })
            }
            this.bookError();
        } else {
            this.setState({ loading: true })
            let data = {
                Title: Title,
                Author: author,
                Format: format,
                Pages: pages,
                Publisher: publisher,
                Language: language,
                category: 'book'
            }
            data['ISBN-10'] = ISBN10;
            data['ISBN-13'] = ISBN13;
            let temp = this;
            apicall.addBook(this.props.userProfile.UserId, data, function (dataRentals) {
                console.log(dataRentals)
                temp.setState({ loading: false })
                temp.addConfirmation();
                temp.props.history.push(`/ecatalog`);

            });

        }
    }



    addConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Created Book has been added to Work Table!',
            duration: 6,
        });
    };
    bookError = () => {
        notification.error({
            message: 'Error',
            description: 'Book information is Missing!',
            duration: 6,
        });
    };
    closeProfile = () => {
        this.props.closeProfile();
    }

    backToCatalog = () => {
        this.props.history.push(`/ecatalog`);
        if (this.props.bookProfile) {
            this.props.closeProfile();
        }
    }
    backToCart = () => {
        this.props.history.push(`/cart`);
        if (this.props.bookProfile) {
            this.props.closeProfile();
        }
    }
    backToRentals = () => {
        this.props.history.push(`/rentals`);
        if (this.props.bookProfile) {
            this.props.closeProfile();
        }
    }

    deleteBook = () => {
        this.setState({ loading: true })
        let data = {
            Title: this.props.bookProfile.Title,
            Author: this.props.bookProfile.Author,
            Format: this.props.bookProfile.Format,
            Pages: this.props.bookProfile.Pages,
            Publisher: this.props.bookProfile.Publisher,
            Language: this.props.bookProfile.Language,
            Quantity: this.props.bookProfile.Quantity,
            available: this.props.bookProfile.available,
            copies: this.props.bookProfile.copies,
        }
        data['ISBN-10'] = this.props.bookProfile['ISBN-10'];
        data['ISBN-13'] = this.props.bookProfile['ISBN-13'];
        if (this.state.deleteID === 'All') {
            data.idDesc = this.props.bookProfile.idDesc
        } else {
            data.itemId = this.state.deleteID
        }
        console.log(data)
        let temp = this;
        apicall.deleteBook(this.props.userProfile.UserId, data, function (dataCallback) {
            console.log(dataCallback)
            temp.setState({ loading: false })
            temp.deleteConfirmation();
            temp.props.closeProfile();
            temp.props.history.push(`/ecatalog`);

        });
    }
    previous = ()=>{
        if(this.props.bookProfile.index !== 0){
            this.props.changeProfile(this.props.catalog[this.props.bookProfile.index-1])
            this.setState({
            Title: this.props.catalog[this.props.bookProfile.index-1].Title,
            author: this.props.catalog[this.props.bookProfile.index-1].Author,
            format: this.props.catalog[this.props.bookProfile.index-1].Format,
            pages: this.props.catalog[this.props.bookProfile.index-1].Pages,
            publisher: this.props.catalog[this.props.bookProfile.index-1].Publisher,
            language: this.props.catalog[this.props.bookProfile.index-1].Language,
            ISBN10: this.props.catalog[this.props.bookProfile.index-1]['ISBN-10'],
            ISBN13: this.props.catalog[this.props.bookProfile.index-1]['ISBN-13'],
            quantity: this.props.catalog[this.props.bookProfile.index-1].Quantity,
            available: this.props.catalog[this.props.bookProfile.index-1].available,});
            this.props.history.push(`/ecatalog/${this.props.catalog[this.props.bookProfile.index-1].Title}`);
            this.forceUpdate();
        }else{
            this.props.changeProfile(this.props.catalog[this.props.catalog.length-1])
            this.setState({
                Title: this.props.catalog[this.props.catalog.length-1].Title,
                author: this.props.catalog[this.props.catalog.length-1].Author,
                format: this.props.catalog[this.props.catalog.length-1].Format,
                pages: this.props.catalog[this.props.catalog.length-1].Pages,
                publisher: this.props.catalog[this.props.catalog.length-1].Publisher,
                language: this.props.catalog[this.props.catalog.length-1].Language,
                ISBN10: this.props.catalog[this.props.catalog.length-1]['ISBN-10'],
                ISBN13: this.props.catalog[this.props.bookProfile.index-1]['ISBN-13'],
                quantity: this.props.catalog[this.props.catalog.length-1].Quantity,
                available: this.props.catalog[this.props.catalog.length-1].available,});
            this.props.history.push(`/ecatalog/${this.props.catalog[this.props.catalog.length-1].Title}`);
            this.forceUpdate();
        }
    }
    next = ()=>{
        if(this.props.bookProfile.index !== this.props.catalog.length-1){
            this.props.changeProfile(this.props.catalog[this.props.bookProfile.index+1]);
            this.setState({
                Title: this.props.catalog[this.props.bookProfile.index+1].Title,
                author: this.props.catalog[this.props.bookProfile.index+1].Author,
                format: this.props.catalog[this.props.bookProfile.index+1].Format,
                pages: this.props.catalog[this.props.bookProfile.index+1].Pages,
                publisher: this.props.catalog[this.props.bookProfile.index+1].Publisher,
                language: this.props.catalog[this.props.bookProfile.index+1].Language,
                ISBN10: this.props.catalog[this.props.bookProfile.index+1]['ISBN-10'],
                ISBN13: this.props.catalog[this.props.bookProfile.index+1]['ISBN-13'],
                quantity: this.props.catalog[this.props.bookProfile.index+1].Quantity,
                available: this.props.catalog[this.props.bookProfile.index+1].available,});
            this.props.history.push(`/ecatalog/${this.props.catalog[this.props.bookProfile.index+1].Title}`);
            this.forceUpdate();
        }else{
            this.props.changeProfile(this.props.catalog[0]);
            this.setState({
                Title: this.props.catalog[0].Title,
                author: this.props.catalog[0].Author,
                format: this.props.catalog[0].Format,
                pages: this.props.catalog[0].Pages,
                publisher: this.props.catalog[0].Publisher,
                language: this.props.catalog[0].Language,
                ISBN10: this.props.catalog[0]['ISBN-10'],
                ISBN13: this.props.catalog[0]['ISBN-13'],
                quantity: this.props.catalog[0].Quantity,
                available: this.props.catalog[0].available,});
            this.props.history.push(`/ecatalog/${this.props.catalog[0].Title}`);
            this.forceUpdate();
        }
    }
    return = () => {

    }
    addToCart = () => {

    }
    handleModal = (e, modal1Visible) => {
        e.preventDefault()
        this.setState({ modal1Visible, deleteID: '' });
    }
    deleteCopy = (data) => {
        this.setState({ deleteID: data.value })
    }
    backToWork = () => {
        this.props.history.push(`/workecatalog`);
        if (this.props.bookProfile) {
            this.props.closeProfile();
        }
    }
    removeFromWork = () => {
        this.setState({ loading: true })
        let temp = this;
        if (this.props.bookProfile.typeWork === "Delete Book") {
            apicall.removeWorkBookDelete(this.props.userProfile.UserId, this.props.bookProfile.index, function (dataCallback) {
                temp.setState({ loading: false })
                temp.removeWorkConfirmation();
                temp.props.closeProfile();
                temp.props.history.push(`/workecatalog`);

            });
        } else if (this.props.bookProfile.typeWork === 'Add Book') {
            apicall.removeWorkBookAdd(this.props.userProfile.UserId, this.props.bookProfile.index, function (dataCallback) {
                temp.setState({ loading: false })
                temp.removeWorkConfirmation();
                temp.props.closeProfile();
                temp.props.history.push(`/workecatalog`);

            });
        } else {
            apicall.removeWorkBookModify(this.props.userProfile.UserId, this.props.bookProfile.index, function (dataCallback) {
                temp.setState({ loading: false })
                temp.removeWorkConfirmation();
                temp.props.closeProfile();
                temp.props.history.push(`/workecatalog`);

            });
        }

    }

    render() {
        console.log(this.props.bookProfile);
        if (!this.props.userProfile) {
            return (<Redirect to={'/'} />);
        } else if (this.props.userProfile.type === 0 && !this.props.bookProfile) {
            return (<Redirect to={'/404'} />);
        } else {
            return (
                <div className='main-container'>
                    <Modal
                        centered
                        closable
                        title="Are you sure to Delete copy of this Book?"
                        visible={this.state.modal1Visible}
                        onOk={this.deleteBook}
                        okText="Delete"
                        okButtonProps={{ disabled: !this.state.deleteID }}
                        onCancel={(e) => this.handleModal(e, false)}
                    >
                        <p>Note: Deleting all copies of the book will result deleting this record.</p>
                        <div className='MainContainer-upper-container-button' style={{ textAlign: 'center' }}>
                            <Dropdown placeholder="Choose Copy to Delete" value={this.state.deleteID}
                                onChange={(e, value) => this.deleteCopy(value)} options={options}
                                selection />
                        </div>
                    </Modal>
                    <HeaderComponent closeProfileItem={this.props.bookProfile ? this.closeProfile : ''} />
                    <div className='MainContainer'>
                        <div className="MainContainer-upper-container">
                            <div className="MainContainer-upper-container-text">
                                <div className="MainContainer-upper-container-first-text">
                                    {this.props.bookProfile ?
                                        (this.props.userProfile.type === 0 || this.props.rent || this.props.work ?
                                            "Book Details" : "Edit Book") : "Add Book"}
                                </div>
                                <div className="MainContainer-upper-container-second-text">
                                    {this.props.bookProfile ?
                                        (this.props.userProfile.type === 0 || this.props.rent || this.props.work ?
                                            "You can see the details of Music" :
                                            "You can edit a book")
                                        : "You can add a new book to the system!"}

                                </div>
                            </div>
                            <div className='MainContainer-upper-container-button'>
                                {this.props.work ? <Button content='Back to Work' onClick={this.backToWork} /> :
                                    <Button icon='user' content={this.props.rent ? 'Back to Rentals' : (this.props.cart ? 'Back to Cart' : 'Back to Catalog')}
                                        onClick={this.props.rent ? this.backToRentals : (this.props.cart ? this.backToCart : this.backToCatalog)} />}
                                {this.props.bookProfile && this.props.userProfile.type === 1 && !this.props.rent && !this.props.cart && !this.props.work ?
                                    <Button icon='user' content='Delete Book' onClick={(e) => this.handleModal(e, true)} />
                                    : ''}
                            </div>
                        </div>
                        <Form size='large' className='SettingsForm' loading={this.state.loading}>
                            <Header as='h2' className='login-Header' style={{ marginTop: '3%' }} textAlign='center'> {
                                this.props.bookProfile ?
                                    (this.props.userProfile.type === 0 || this.props.rent || this.props.work ?
                                        "Book Profile" :
                                        "Edit a Book") : "Create a Book"}
                            </Header>
                            {this.props.bookProfile && this.props.userProfile.type === 1 && !this.props.work && !this.props.rent && !this.props.cart ?
                                <Header as='h3' className='quantityHeader'>Quantity: ({this.state.quantity})</Header> : ''}
                            {this.props.bookProfile && !this.props.work && !this.props.rent && !this.props.cart ?
                                <Header as='h3' className='quantityHeader'>Available: ({this.state.available})</Header> : ''}
                            <Form.Group width='equal'>
                                <Form.Input
                                    icon='book'
                                    iconPosition='left'
                                    placeholder='Bel Ami'
                                    label='Title:'
                                    disabled={this.props.userProfile.type === 0 || this.props.rent || this.props.work}
                                    value={this.state.Title}
                                    error={this.state.errorTitle}
                                    onChange={this.changeTitle}
                                    width={8} />
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Dylon'
                                    label='Author:'
                                    disabled={this.props.userProfile.type === 0 || this.props.rent || this.props.work}
                                    value={this.state.author}
                                    error={this.state.errorAuthor}
                                    onChange={this.changeAuthor}
                                    width={8} />
                            </Form.Group>
                            <Form.Input
                                fluid icon='file outline'
                                iconPosition='left'
                                placeholder='Ex: Digital'
                                disabled={this.props.userProfile.type === 0 || this.props.rent || this.props.work}
                                value={this.state.format}
                                error={this.state.errorFormat}
                                onChange={this.changeFormat}
                                label='Format:' />
                            <Form.Input
                                fluid icon='sort numeric down'
                                iconPosition='left'
                                placeholder='Ex: 500'
                                disabled={this.props.userProfile.type === 0 || this.props.rent || this.props.work}
                                value={this.state.pages}
                                error={this.state.errorPages}
                                onChange={this.changePages}
                                label='Pages:'
                                type="number" />


                            <Form.Input
                                fluid icon='user'
                                iconPosition='left'
                                placeholder='John'
                                disabled={this.props.userProfile.type === 0 || this.props.rent || this.props.work}
                                value={this.state.publisher}
                                error={this.state.errorPublisher}
                                onChange={this.changePublisher}
                                label='Publisher:' />
                            <Form.Input
                                fluid icon='language'
                                iconPosition='left'
                                label='Language: '
                                disabled={this.props.userProfile.type === 0 || this.props.rent || this.props.work}
                                placeholder='Ex: English'
                                value={this.state.language}
                                error={this.state.errorLanguage}
                                onChange={this.changeLanguage} />

                            <Form.Input
                                fluid icon='id card'
                                iconPosition='left'
                                placeholder='Ex: 1524796972'
                                value={this.state.ISBN10}
                                disabled={this.props.userProfile.type === 0 || this.props.rent || this.props.work}
                                error={this.state.errorISBN10}
                                onChange={this.changeISBN10}
                                label='ISBN-10: '
                                type="number" />
                            <Form.Input
                                fluid icon='id card'
                                iconPosition='left'
                                label='ISBN-13: '
                                placeholder='Ex: 978-1524796976'
                                disabled={this.props.userProfile.type === 0 || this.props.rent || this.props.work}
                                value={this.state.ISBN13}
                                error={this.state.errorISBN13}
                                onChange={this.changeISBN13} />
                            {this.props.userProfile.type === 1 && !this.props.rent && !this.props.cart && !this.props.work ?
                                <Form.Input
                                    fluid icon='sort numeric down'
                                    iconPosition='left'
                                    placeholder='Default: 0'
                                    value={this.props.bookProfile ? this.state.copy : 1}
                                    disabled={!this.props.bookProfile}
                                    onChange={this.changeCopy}
                                    label={this.props.bookProfile ? 'Number of Copies would you like to Add:' : 'Number of Copies will be added as Default:'}
                                    type="number" /> : ''}
                            {this.props.userProfile.type === 1 && !this.props.rent ?
                                <Button className='login-button' fluid size='large' onClick={this.props.bookProfile ? (this.props.work ? this.removeFromWork : this.editBook) : this.addBook}>
                                    {this.props.bookProfile ? (this.props.work ? "Remove From Work" : "Edit Book") : "Add Book"}
                                </Button> : (!this.props.cart && this.props.userProfile.type === 0 ?
                                    (!this.props.rent && this.state.available === 0 ?
                                        <Tooltip placement="top" title="There is no copy available" arrowPointAtCenter>
                                            <Button
                                                className={"login-button2"}
                                                fluid
                                                size="large"
                                                onClick={this.addToCart}>
                                                Add Book to Cart
                                        </Button></Tooltip> :
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
                                            {this.props.rent ? "Return Book" : "Add Book to Cart"}
                                        </Button>) : '')}
                        </Form>
                        {this.props.rent || this.props.cart || !this.props.bookProfile || this.props.work ?
                            '' :
                            <div className='nextprevButton-container'>
                                <Button icon='long arrow alternate left' content='Previus Item' onClick={this.previous} />
                                <Button icon='long arrow alternate right' labelPosition='right' content='Next Item' onClick={this.next} />
                            </div>}
                    </div>

                    <FooterComponent />
                </div>
            )
        }
    }
}
function mapStateToProps(state) {
    return {
        userProfile: state.AdminReducer.userProfile,
        catalog: state.AdminReducer.catalog,
    };

}
export default withRouter(connect(mapStateToProps)(BookProfile));
