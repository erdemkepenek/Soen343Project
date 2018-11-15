import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import HeaderComponent from "./Common/header/header";
import FooterComponent from "./Common/footer/footer";
import { withRouter } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import { Redirect } from "react-router";

import {notification, Popconfirm} from "antd";

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
        ? this.props.magazineProfile.ISBN10
        : "",
      ISBN13: this.props.magazineProfile
        ? this.props.magazineProfile.ISBN13
        : "",
      quantity: this.props.magazineProfile
        ? this.props.magazineProfile.Quantity
        : "",
      errorTitle: false,
      errorPublisher: false,
      errorLanguage: false,
      errorLabel: false,
      errorISBN10: false,
      errorISBN13: false,
      errorQuantity: false
    };
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
  changeQuantity = e => {
    this.setState({ quantity: e.target.value });
    this.setState({ errorQuantity: false });
  };

  editMagazine = () => {
    let {
      Title,
      publisher,
      language,
      label,
      ISBN10,
      ISBN13,
      quantity
    } = this.state;
    if (
      !Title ||
      !publisher ||
      !language ||
      !label ||
      !ISBN10 ||
      !ISBN13 ||
      !quantity
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
      if (!quantity) {
        this.setState({ errorQuantity: true });
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
        Quantity: quantity
      };
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
      quantity
    } = this.state;
    if (
      !Title ||
      !publisher ||
      !language ||
      !label ||
      !ISBN10 ||
      !ISBN13 ||
      !quantity
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
      if (!quantity) {
        this.setState({ errorQuantity: true });
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
        Quantity: quantity
      };
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
    return=()=>{

    }
    addToCart=()=>{

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
          <HeaderComponent closeProfileItem={this.props.magazineProfile ? this.closeProfile : ''} />
          <div className="MainContainer">
            <div className="MainContainer-upper-container">
              <div className="MainContainer-upper-container-text">
                <div className="MainContainer-upper-container-first-text">
                  {this.props.magazineProfile?
                      (this.props.userProfile.type ===0 || this.props.rent ?
                          "Magazine Details"
                        : "Edit Magazine")
                        : "Add Magazine"}
                </div>
                <div className="MainContainer-upper-container-second-text">
                  {this.props.magazineProfile?
                  (this.props.userProfile.type ===0 || this.props.rent ?
                      "You can see the details of magazine"
                      : "You can edit a magazine")
                    : "You can add a new magazine to the system!"}
                </div>
              </div>
                <div className='MainContainer-upper-container-button'>
                    <Button icon='user' content={this.props.rent?'Back to Rentals' : (this.props.cart? 'Back to Cart' : 'Back to Catalog')}
                            onClick={this.props.rent? this.backToRentals : (this.props.cart? this.backToCart : this.backToCatalog)}/>
                    {this.props.magazineProfile && this.props.userProfile.type ===1 && !this.props.rent && !this.props.cart?
                        <Popconfirm title="Are you sure to delete this Magazine?" onConfirm={this.deleteMagazine} placement="bottomRight" okText="Yes" cancelText="No">
                            <Button icon='user' content='Delete Magazine'/>
                        </Popconfirm>
                        : ''}
                </div>
            </div>
            <Form size="large" className="SettingsForm">
              <Header
                as="h2"
                className="login-Header"
                style={{ marginTop: "3%" }}
                textAlign="center"
              >
                {" "}
                {this.props.magazineProfile?
              (this.props.userProfile.type ===0  ?
                  "Magazine Profile"
                  : "Edit a Magazine")
                  : "Create a Magazine"}
              </Header>
                <Form.Input
                  fluid
                  icon="newspaper outline"
                  iconPosition="left"
                  placeholder="Bel Ami"
                  label="Title:"
                  disabled={this.props.userProfile.type ===0 || this.props.rent}
                  value={this.state.Title}
                  error={this.state.errorTitle}
                  onChange={this.changeTitle}
                />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="John"
                disabled={this.props.userProfile.type ===0 || this.props.rent}
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
                disabled={this.props.userProfile.type ===0 || this.props.rent}
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
                disabled={this.props.userProfile.type ===0 || this.props.rent}
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
                disabled={this.props.userProfile.type ===0 ||  this.props.rent}
                value={this.state.ISBN10}
                error={this.state.errorISBN10}
                onChange={this.changeISBN10}
                label="ISBN-10: "
                type="number"
              />
              <Form.Input
                fluid
                icon="sort numeric down"
                iconPosition="left"
                placeholder="Ex: 3"
                value={this.state.quantity}
                disabled={this.props.userProfile.type ===0 || this.props.rent}
                error={this.state.errorQuantity}
                onChange={this.changeQuantity}
                label="Quantity: "
                type="number"
              />
              <Form.Input
                fluid
                icon="id card"
                iconPosition="left"
                disabled={this.props.userProfile.type ===0 || this.props.rent}
                label="ISBN-13: "
                placeholder="Ex: 978-1524796976"
                value={this.state.ISBN13}
                error={this.state.errorISBN13}
                onChange={this.changeISBN13}
              />
              {this.props.userProfile.type ===1 && !this.props.rent?
              <Button
                className="login-button"
                fluid
                size="large"
                onClick={
                  this.props.magazineProfile
                    ? this.editMagzine
                    : this.addMagzine
                }
              >
                {this.props.magazineProfile ? "Edit Magazine" : "Add Magazine"}
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
                              {this.props.rent ? "Return Magazine" : "Add Magazine to Cart"}
                          </Button>: '')}
            </Form>
              {this.props.rent || this.props.cart || !this.props.magazineProfile ?
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
