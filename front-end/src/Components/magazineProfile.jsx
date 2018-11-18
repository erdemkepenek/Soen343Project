import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import HeaderComponent from "./Common/header/header";
import FooterComponent from "./Common/footer/footer";
import { withRouter } from "react-router-dom";
import {
    Button, Dropdown,
    Form,
    Grid,
    Header,
    Icon,
    Image,
    Message,
    Segment
} from "semantic-ui-react";
import { Redirect } from "react-router";

import {Modal, notification} from "antd";

let options=[];

class MagazineProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Title: this.props.magazineProfile ? this.props.magazineProfile.Title : "",
      publisher: this.props.magazineProfile
        ? this.props.magazineProfile.Publisher
        : "",
      language: this.props.magazineProfile
        ? this.props.magazineProfile.Language
        : "",
      label: this.props.magazineProfile ? this.props.magazineProfile.Label : "",
      ISBN10: this.props.magazineProfile
        ? this.props.magazineProfile['ISBN-10']
        : "",
      ISBN13: this.props.magazineProfile
        ? this.props.magazineProfile['ISBN-13']
        : "",
      quantity: this.props.magazineProfile
        ? this.props.magazineProfile.Quantity
        : "",
        available: this.props.magazineProfile? this.props.magazineProfile.available : '',
        copy: '',
      errorTitle: false,
      errorPublisher: false,
      errorLanguage: false,
      errorLabel: false,
      errorISBN10: false,
      errorISBN13: false,
        modal1Visible:false,
        deleteID: '',
        loading:false,
    };
  }
    componentDidMount(){
        if(this.props.magazineProfile && this.props.userProfile.type ===1 && !this.props.rent && !this.props.cart){
            options=[
                {text:"Copy ID 1", value:1,key:1},
                {text:"Copy ID 2", value:2,key:2},
                {text:"Copy ID 3", value:3,key:3},
                {text:"Copy ID 4", value:4,key:4},
                {text:"All Copies", value:null,key:null},
            ]
        }
    }

  changeTitle = e => {
    this.setState({ Title: e.target.value });
    this.setState({ errorTitle: false });
  };
  changePublisher = e => {
    this.setState({ publisher: e.target.value });
    this.setState({ errorPublisher: false });
  };
  changeLanguage = e => {
    this.setState({ language: e.target.value });
    this.setState({ errorLanguage: false });
  };
  changeLabel = e => {
    this.setState({ language: e.target.value });
    this.setState({ errorLabel: false });
  };
  changeISBN10 = e => {
    this.setState({ ISBN10: e.target.value });
    this.setState({ errorISBN10: false });
  };
  changeISBN13 = e => {
    this.setState({ ISBN10: e.target.value });
    this.setState({ errorISBN13: false });
  };
    changeCopy=(e)=>{
        if(e.target.value > 0 || !e.target.value){
            this.setState({copy:e.target.value})
        }else{
            this.setState({copy:0})
        }
    }

  editMagazine = () => {
    let {
      Title,
      publisher,
      language,
      label,
      ISBN10,
      ISBN13,
        copy
    } = this.state;
    if (
      !Title ||
      !publisher ||
      !language ||
      !label ||
      !ISBN10 ||
      !ISBN13
    ) {
      if (!Title) {
        this.setState({ errorTitle: true });
      }
      if (!publisher) {
        this.setState({ errorPublisher: true });
      }
      if (!language) {
        this.setState({ errorLanguage: true });
      }
      if (!label) {
        this.setState({ errorLabel: true });
      }
      if (!ISBN10) {
        this.setState({ errorISBN10: true });
      }
      if (!ISBN13) {
        this.setState({ errorISBN13: true });
      }
      this.magazineError();
    } else {
      let data = {
        Title: Title,
        Publisher: publisher,
        ISBN10: ISBN10,
        ISBN13: ISBN13,
        Language: language,
        Label: label,
      };
      console.log(copy)
      console.log(data);

      this.editConfirmation();
      this.props.history.push(`/ecatalog`);
      this.closeProfile();
    }
  };

  editConfirmation = () => {
    notification.success({
      message: "Sucess",
      description: "You have Editted a Magazine!",
      duration: 6
    });
  };

  addMagazine = () => {
    let {
      Title,
      publisher,
      language,
      label,
      ISBN10,
      ISBN13,
        copy,
    } = this.state;
    if (
      !Title ||
      !publisher ||
      !language ||
      !label ||
      !ISBN10 ||
      !ISBN13
    ) {
      if (!Title) {
        this.setState({ errorTitle: true });
      }
      if (!publisher) {
        this.setState({ errorPublisher: true });
      }
      if (!language) {
        this.setState({ errorLanguage: true });
      }
      if (!label) {
        this.setState({ errorLabel: true });
      }
      if (!ISBN10) {
        this.setState({ errorISBN10: true });
      }
      if (!ISBN13) {
        this.setState({ errorISBN13: true });
      }
      this.magazineError();
    } else {
      let data = {
        Title: Title,
        Publisher: publisher,
        ISBN10: ISBN10,
        ISBN13: ISBN13,
        Language: language,
        Label: label,
      };
      console.log(copy)
      console.log(data);

      this.addConfirmation();
      this.props.history.push(`/ecatalog`);
    }
  };

  addConfirmation = () => {
    notification.success({
      message: "Sucess",
      description: "You have Editted a Magazine!",
      duration: 6
    });
  };
  magazineError = () => {
    notification.error({
      message: "Error",
      description: "Magazine information is Missing!",
      duration: 6
    });
  };
  closeProfile = () => {
    this.props.closeProfile();
  };
    backToCatalog= ()=> {
      this.props.history.push(`/ecatalog`);
        if(this.props.magazineProfile){
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
    deleteMagazine = ()=>
    {
        this.props.closeProfile();
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

    }

  render() {
    console.log(this.props.magazineProfile);
    if (!this.props.userProfile) {
      return <Redirect to={"/"} />;
    }else if(this.props.userProfile.type ===0 && !this.props.magazineProfile){
        return (<Redirect to={'/404'}/>);
    }else {
      return (
        <div className="main-container">
            <Modal
                centered
                closable
                title="Are you sure to Delete copy of this Magazine?"
                visible={this.state.modal1Visible}
                onOk={this.deleteMagazine}
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
          <HeaderComponent closeProfileItem={this.props.magazineProfile ? this.closeProfile : ''} />
          <div className="MainContainer">
            <div className="MainContainer-upper-container">
              <div className="MainContainer-upper-container-text">
                <div className="MainContainer-upper-container-first-text">
                  {this.props.magazineProfile?
                      (this.props.userProfile.type ===0 || this.props.rent || this.props.work?
                          "Magazine Details"
                        : "Edit Magazine")
                        : "Add Magazine"}
                </div>
                <div className="MainContainer-upper-container-second-text">
                  {this.props.magazineProfile?
                  (this.props.userProfile.type ===0 || this.props.rent || this.props.work?
                      "You can see the details of magazine"
                      : "You can edit a magazine")
                    : "You can add a new magazine to the system!"}
                </div>
              </div>
                <div className='MainContainer-upper-container-button'>
                    {this.props.work?<Button content='Back to Work' onClick={this.backToWork}/>:
                    <Button icon='user' content={this.props.rent?'Back to Rentals' : (this.props.cart? 'Back to Cart' : 'Back to Catalog')}
                            onClick={this.props.rent? this.backToRentals : (this.props.cart? this.backToCart : this.backToCatalog)}/>}
                    {this.props.magazineProfile && this.props.userProfile.type ===1 && !this.props.rent && !this.props.cart && !this.props.work?
                            <Button icon='user' content='Delete Magazine' onClick={(e)=>this.handleModal(e,true)}/>
                        : ''}
                </div>
            </div>
            <Form size="large" className="SettingsForm" loading={this.state.loading}>
              <Header
                as="h2"
                className="login-Header"
                style={{ marginTop: "3%" }}
                textAlign="center"
              >
                {this.props.magazineProfile?
              (this.props.userProfile.type ===0 || this.props.rent || this.props.work ?
                  "Magazine Profile"
                  : "Edit a Magazine")
                  : "Create a Magazine"}
              </Header>
                {this.props.magazineProfile && this.props.userProfile.type ===1 && !this.props.work && !this.props.rent && !this.props.cart?
                    <Header as='h3' className='quantityHeader'>Quantity: ({this.state.quantity})</Header>: ''}
                {this.props.magazineProfile && !this.props.work && !this.props.rent && !this.props.cart?
                    <Header as='h3' className='quantityHeader'>Available: ({this.state.available})</Header>: ''}
                <Form.Input
                  fluid
                  icon="newspaper outline"
                  iconPosition="left"
                  placeholder="Bel Ami"
                  label="Title:"
                  disabled={this.props.userProfile.type ===0 || this.props.rent|| this.props.work}
                  value={this.state.Title}
                  error={this.state.errorTitle}
                  onChange={this.changeTitle}
                />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="John"
                disabled={this.props.userProfile.type ===0 || this.props.rent|| this.props.work}
                value={this.state.publisher}
                error={this.state.errorPublisher}
                onChange={this.changePublisher}
                label="Publisher:"
              />
              <Form.Input
                fluid
                icon="language"
                iconPosition="left"
                label="Language: "
                disabled={this.props.userProfile.type ===0 || this.props.rent|| this.props.work}
                placeholder="Ex: English"
                value={this.state.language}
                error={this.state.errorLanguage}
                onChange={this.changeLanguage}
              />
              <Form.Input
                fluid
                icon="tag"
                iconPosition="left"
                label="Label: "
                disabled={this.props.userProfile.type ===0 || this.props.rent|| this.props.work}
                placeholder="Label"
                value={this.state.label}
                error={this.state.errorLabel}
                onChange={this.changeLabel}
              />

              <Form.Input
                fluid
                icon="id card"
                iconPosition="left"
                placeholder="Ex: 1524796972"
                disabled={this.props.userProfile.type ===0 ||  this.props.rent|| this.props.work}
                value={this.state.ISBN10}
                error={this.state.errorISBN10}
                onChange={this.changeISBN10}
                label="ISBN-10: "
                type="number"
              />
              <Form.Input
                fluid
                icon="id card"
                iconPosition="left"
                disabled={this.props.userProfile.type ===0 || this.props.rent|| this.props.work}
                label="ISBN-13: "
                placeholder="Ex: 978-1524796976"
                value={this.state.ISBN13}
                error={this.state.errorISBN13}
                onChange={this.changeISBN13}
              />
                {this.props.userProfile.type ===1 && !this.props.rent && !this.props.cart && !this.props.work?
                    <Form.Input
                        fluid icon='sort numeric down'
                        iconPosition='left'
                        placeholder='Ex: 1'
                        value={this.state.copy}
                        onChange={this.changeCopy}
                        label={this.props.magazineProfile ? 'Number of Copies would you like to add:' : 'Number of Copies would you like to Add: (default: 1)' }
                        type= "number"/>:''}
              {this.props.userProfile.type ===1 && !this.props.rent?
              <Button
                className="login-button"
                fluid
                size="large"
                onClick={
                  this.props.magazineProfile
                    ? (this.props.work ? this.removeFromWork :this.editMagazine)
                    : this.addMagazine
                }
              >
                {this.props.magazineProfile ?(this.props.work? "Remove From Work": "Edit Magazine") : "Add Magazine"}
              </Button>: ''}
            </Form>
              {this.props.rent || this.props.cart || !this.props.magazineProfile || this.props.work ?
                  '':
              <div className='nextprevButton-container'>
                  <Button icon='long arrow alternate left' content='Previus Item' onClick={this.backToCatalog}/>
                  <Button icon='long arrow alternate right' labelPosition='right' content='Next Item' onClick={this.backToCatalog}/>
              </div>}
          </div>

          <FooterComponent />
        </div>
      );
    }
  }
}
function mapStateToProps(state) {
  return {
    userProfile: state.AdminReducer.userProfile
  };
}
export default withRouter(connect(mapStateToProps)(MagazineProfile));
