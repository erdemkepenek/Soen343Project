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
    viewRentalsAdmin=(callback)=>{
        axios.post('/loan/view/all').then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    viewRentalsClient=(userId,callback)=>{
        axios.post('/loan/view/user',{userId:userId}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
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

/* ===============================================================================================================================*/
                /*                   BOOOOOK                        */
/* =================================================================================================================================*/

    viewBook=(callback)=> {
        axios.post('/book/view').then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if (response.data) {
                    console.log(response.data.data)
                    callback(response.data.data)
                }

            }.bind(this)
        );
    }
    viewWorkBook=(userId,callback)=>{
        axios.post('/book/save/view',{userId:userId}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    commitBook=(userId,callback)=> {
        axios.post('/book/commit',{userId:userId}).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data);
                }
            }.bind(this)
        );
    }
    addBook=(userId,item,callback)=>{
        console.log({userId:userId,item:item})
        axios.post('/book/add',{userId:userId,item:item}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    editBook=(userId,item,callback)=>{
        console.log({userId:userId,item:item})
        axios.post('/book/modify',{userId:userId,item:item}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    deleteBook=(userId,item,callback)=>{
        console.log({userId:userId,item:item})
        axios.post('/book/delete',{userId:userId,item:item}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    removeWorkBookDelete=(userId,index,callback)=>{
        console.log({userId:userId,index:index})
        axios.post('/book/remove/delete',{userId:userId,index:index}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    removeWorkBookAdd=(userId,index,callback)=>{
        console.log({userId:userId,index:index})
        axios.post('/book/remove/add',{userId:userId,index:index}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    removeWorkBookModify=(userId,index,callback)=>{
        console.log({userId:userId,index:index})
        axios.post('/book/remove/modify',{userId:userId,index:index}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    addBookCopy=(userId,quantity,item,callback)=>{
        console.log({userId:userId,quantity:quantity,item:item})
        axios.post('/book/add/copy',{userId:userId,quantity:quantity,item:item}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
/* ===============================================================================================================================*/
/*                          MOVIE                                        */
/*==================================================================================================================================*/
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
    viewWorkMovie=(userId,callback)=>{
        axios.post('/movie/save/view',{userId:userId}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    commitMovie=(userId,callback)=> {
        axios.post('/movie/commit',{userId:userId}).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data);
                }
            }.bind(this)
        );
    }
    addMovie=(userId,item,callback)=>{
        console.log({userId:userId,item:item})
        axios.post('/movie/add',{userId:userId,item:item}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    editMovie=(userId,item,callback)=>{
        console.log({userId:userId,item:item})
        axios.post('/movie/modify',{userId:userId,item:item}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    deleteMovie=(userId,item,callback)=>{
        console.log({userId:userId,item:item})
        axios.post('/movie/delete',{userId:userId,item:item}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    removeWorkMovieDelete=(userId,index,callback)=>{
        console.log({userId:userId,index:index})
        axios.post('/movie/remove/delete',{userId:userId,index:index}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    removeWorkMovieAdd=(userId,index,callback)=>{
        console.log({userId:userId,index:index})
        axios.post('/movie/remove/add',{userId:userId,index:index}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    removeWorkMovieModify=(userId,index,callback)=>{
        console.log({userId:userId,index:index})
        axios.post('/movie/remove/modify',{userId:userId,index:index}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    addMovieCopy=(userId,quantity,item,callback)=>{
        console.log({userId:userId,quantity:quantity,item:item})
        axios.post('/movie/add/copy',{userId:userId,quantity:quantity,item:item}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
/* ===============================================================================================================================*/
/*                     MAGAZINE                                             */
/*==================================================================================================================================*/
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
    viewWorkMagazine=(userId,callback)=>{
        axios.post('/magazine/save/view',{userId:userId}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    commitMagazine=(userId,callback)=> {
        axios.post('/magazine/commit',{userId:userId}).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data);
                }
            }.bind(this)
        );
    }
    addMagazine=(userId,item,callback)=>{
        console.log({userId:userId,item:item})
        axios.post('/magazine/add',{userId:userId,item:item}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    editMagazine=(userId,item,callback)=>{
        console.log({userId:userId,item:item})
        axios.post('/magazine/modify',{userId:userId,item:item}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    deleteMagazine=(userId,item,callback)=>{
        console.log({userId:userId,item:item})
        axios.post('/magazine/delete',{userId:userId,item:item}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    removeWorkMagazineDelete=(userId,index,callback)=>{
        console.log({userId:userId,index:index})
        axios.post('/magazine/remove/delete',{userId:userId,index:index}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    removeWorkMagazineAdd=(userId,index,callback)=>{
        console.log({userId:userId,index:index})
        axios.post('/magazine/remove/add',{userId:userId,index:index}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    removeWorkMagazineModify=(userId,index,callback)=>{
        console.log({userId:userId,index:index})
        axios.post('/magazine/remove/modify',{userId:userId,index:index}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    addMagazineCopy=(userId,quantity,item,callback)=>{
        console.log({userId:userId,quantity:quantity,item:item})
        axios.post('/magazine/add/copy',{userId:userId,quantity:quantity,item:item}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
/* ===============================================================================================================================*/
/*                       Music                                            */
/*====================================================================================================================================*/
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
    viewWorkMusic=(userId,callback)=>{
        axios.post('/music/save/view',{userId:userId}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    commitMusic=(userId,callback)=> {
        axios.post('/music/commit',{userId:userId}).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data);
                }
            }.bind(this)
        );
    }
    addMusic=(userId,item,callback)=>{
        console.log({userId:userId,item:item})
        axios.post('/music/add',{userId:userId,item:item}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    editMusic=(userId,item,callback)=>{
        console.log({userId:userId,item:item})
        axios.post('/music/modify',{userId:userId,item:item}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    deleteMusic=(userId,item,callback)=>{
        console.log({userId:userId,item:item})
        axios.post('/music/delete',{userId:userId,item:item}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    removeWorkMusicDelete=(userId,index,callback)=>{
        console.log({userId:userId,index:index})
        axios.post('/music/remove/delete',{userId:userId,index:index}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    removeWorkMusicAdd=(userId,index,callback)=>{
        console.log({userId:userId,index:index})
        axios.post('/music/remove/add',{userId:userId,index:index}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    removeWorkMusicModify=(userId,index,callback)=>{
        console.log({userId:userId,index:index})
        axios.post('/music/remove/modify',{userId:userId,index:index}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
    addMusicCopy=(userId,quantity,item,callback)=>{
        console.log({userId:userId,quantity:quantity,item:item})
        axios.post('/music/add/copy',{userId:userId,quantity:quantity,item:item}).then(
            function (response, err) {
                console.log(response)
                console.log(err)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }

            }.bind(this)
        );
    }
/* ===============================================================================================================================*/
/*                       User                                            */
/*====================================================================================================================================*/
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
    addUser=(data,callback)=> {
        axios.post('/user/add',data).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data);
                }
            }.bind(this)
        );
    }
    modifyUser=(data,callback)=> {
        axios.post('/user/modify',data).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data);
                }
            }.bind(this)
        );
    }
    deleteUser=(data,callback)=> {
        axios.post('/user/delete',data).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data);
                }
            }.bind(this)
        );
    }
    viewUncommittedUser=(userId,callback)=> {
        axios.post('/user/save/view',{userId:userId}).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    console.log(response.data)
                    callback(response.data)
                }
            }.bind(this)
        );
    }

    commitSignup=(callback)=> {
        axios.post('/user/commit',{userId:9999}).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data);
                }
            }.bind(this)
        );
    }
    commitUser=(userId,callback)=> {
        axios.post('/user/commit',{userId:userId}).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data);
                }
            }.bind(this)
        );
    }

/* ===============================================================================================================================*/
/*                       Loan                                            */
/*====================================================================================================================================*/
    addCart=(userId,item,callback)=> {
        axios.post('/loan/cart/add',{userId:userId,item:item}).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data);
                }
            }.bind(this)
        );
    }
    viewCart=(userId,callback)=> {
        axios.post('/loan/save/view',{userId:userId}).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    console.log(response.data)
                    callback(response.data);
                }
            }.bind(this)
        );
    }
    removeCart=(userId,index,callback)=> {
        axios.post('/loan/cart/remove',{userId:userId,index:index}).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    console.log(response.data)
                    callback(response.data);
                }
            }.bind(this)
        );
    }
    commitCart=(userId,callback)=> {
        axios.post('/loan/commit',{userId:userId}).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data);
                }
            }.bind(this)
        );
    }
    rentalReturn=(userId,item,callback)=> {
        axios.post('/loan/return/add',{userId:userId,item:item}).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    callback(response.data);
                }
            }.bind(this)
        );
    }
    viewRentalReturnWork=(userId,callback)=> {
        axios.post('/loan/return/view',{userId:userId}).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    console.log(response.data)
                    callback(response.data);
                }
            }.bind(this)
        );
    }
    removeRentalReturnWork=(userId,index,callback)=> {
        axios.post('/loan/return/remove',{userId:userId,index:index}).then(
            function (response, err) {
                console.log(response)
                if(response.data){
                    console.log(response.data)
                    callback(response.data);
                }
            }.bind(this)
        );
    }
    commitRentalReturnWork=(userId,callback)=> {
        axios.post('/loan/return/commit',{userId:userId}).then(
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