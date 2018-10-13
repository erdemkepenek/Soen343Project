import {Component,React} from "react";
import axios from 'axios'

class Controller extends Component {
    constructor(props) {
        super(props);
        console.log("from controller")
    }

    hello=()=> {
        console.log("HELLO")
    }

    getUsers=(callback)=> {
        axios.post('/operation/getusers').then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data);
                }
            }.bind(this)
        );
    }

    login=(email, password,callback)=> {
        axios.post('/auth/login',{
            email:email,
            password:password}).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data);
                }
            }.bind(this)
        );
    }
}

export default Controller