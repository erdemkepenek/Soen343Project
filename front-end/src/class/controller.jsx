import {Component,React} from "react";
const axios = require('axios');

class Controller extends Component {
    constructor(props) {
        super(props);
        console.log("from controller")
    }

    hello=()=> {
        console.log("HELLO")
    }

    getUsers=()=> {
        axios.post('/operation/getusers', {
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
    }

    login=(email, password)=> {
        axios.post('/auth/login', {
            email: email,
            password: password
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
    }
}

export default Controller