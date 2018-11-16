import {Component,React} from "react";
import axios from 'axios'

class ApiCalls extends Component {
    constructor(props) {
        super(props);
        console.log("from api calls")
    }


    viewUsers=(callback)=> {
        axios.post('/user/view').then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data.data);
                }
            }.bind(this)
        );
    }
    viewTransactionHistory=(callback)=> {
        axios.post('/history/transaction/view').then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data.data);
                }
            }.bind(this)
        );
    }
    viewLogActivity=(callback)=> {
        axios.post('/history/log/view').then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data.data);
                }
            }.bind(this)
        );
    }
    viewBook=(callback)=>{
        axios.post('/book/view').then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data.data)
                    callback(response.data.data)
                }

            }.bind(this)
        );
    }
    viewMovie=(callback)=>{
        axios.post('/movie/view').then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data.data)
                    callback(response.data.data)
                }

            }.bind(this)
        );
    }
    viewMagazine=(callback)=>{
        axios.post('/magazine/view').then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data.data)
                    callback(response.data.data)
                }

            }.bind(this)
        );
    }
    viewMusic=(callback)=>{
        axios.post('/music/view').then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    callback(response.data.data)
                }

            }.bind(this)
        );
    }

    login=(email, password,callback)=> {
        axios.post('/user/login',{
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
    logOut=(userId,callback)=> {
        console.log(userId)
        axios.post('/user/logout',{
            data:{
                UserId:userId,
            }
        }).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data);
                }
            }.bind(this)
        );
    }
    signUp=(data,callback)=> {
        axios.post('/user/add',data).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data);
                }
            }.bind(this)
        );
    }
    commit=(callback)=> {
        axios.post('/user/commit',{userId:9999}).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data);
                }
            }.bind(this)
        );
    }
}

export default ApiCalls