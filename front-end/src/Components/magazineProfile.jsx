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

import { notification } from "antd";

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

  render() {
    console.log(this.props.magazineProfile);
    if (!this.props.userProfile) {
      return <Redirect to={"/"} />;
    } else {
      return (
        <div className="main-container">
          <HeaderComponent closeProfileItem={this.closeProfile} />
          <div className="MainContainer">
            <div className="MainContainer-upper-container">
              <div className="MainContainer-upper-container-text">
                <div className="MainContainer-upper-container-first-text">
                  {this.props.magazineProfile
                    ? "Edit Magazine"
                    : "Add Magazine"}
                </div>
                <div className="MainContainer-upper-container-second-text">
                  {this.props.magazineProfile
                    ? "You can edit a magazine"
                    : "You can add a new magazine to the system!"}
                </div>
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
                {this.props.magazineProfile
                  ? "Edit a Magazine"
                  : "Create a Magazine"}
              </Header>
              <Form.Group width="equal">
                <Form.Input
                  icon="newspaper outline"
                  iconPosition="left"
                  placeholder="Bel Ami"
                  label="Title:"
                  value={this.state.Title}
                  error={this.state.errorTitle}
                  onChange={this.changeTitle}
                  width={8}
                />
              </Form.Group>

              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="John"
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
                error={this.state.errorQuantity}
                onChange={this.changeQuantity}
                label="Quantity: "
                type="number"
              />
              <Form.Input
                fluid
                icon="id card"
                iconPosition="left"
                label="ISBN-13: "
                placeholder="Ex: 978-1524796976"
                value={this.state.ISBN13}
                error={this.state.errorISBN13}
                onChange={this.changeISBN13}
              />
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
              </Button>
            </Form>
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
