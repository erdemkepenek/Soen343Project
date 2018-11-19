import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'
import {Menu, Dropdown, Button} from 'semantic-ui-react'
import {Redirect} from "react-router";
import DataTable from '../Components/Common/table/table'
import RedirectItem from "./redirectItem"
import ApiCalls from '../class/apiCalls'
let apicall = new ApiCalls;

let tableArray= []
const options = [
    { key: 1, text: 'Book', value: "Book" },
    { key: 2, text: 'Magazine', value: "Magazine" },
    { key: 3, text: 'Music', value: "Music" },
    { key: 4, text: 'Movie', value: "Movie" },
]
class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addItem: '',
            loading:false
        }
    }

    componentDidMount() {
        this.props.history.push(`/ecatalog`);
        this.loadCatalog();
        }
    
    closeProfile=()=>{
            this.setState({profile: ""})
    }
    changeProfile=(data)=>{
        console.log(data);
        this.setState({profile:data})
    }
    loadCatalog=()=>{
        this.setState({loading:true})
        tableArray= [];
        let this1= this;
        let i =0;
        apicall.viewBook(function(dataBook){
            dataBook.map((bookData)=>{
                bookData.index=i
                bookData.typecategory='Book'
                tableArray.push(bookData)
                i=i+1;
            })
            apicall.viewMagazine(function(dataMagazine){
                dataMagazine.map((magazineData)=>{
                    magazineData.index=i
                    magazineData.typecategory='Magazine'
                    tableArray.push(magazineData)
                    i=i+1;
                })
                apicall.viewMovie(function(dataMovie){
                    dataMovie.map((movieData)=>{
                        movieData.index=i
                        movieData.typecategory='Movie'
                        tableArray.push(movieData)
                        i=i+1;
                    })
                    apicall.viewMusic(function(dataMusic){
                        dataMusic.map((musicData)=>{
                            musicData.index=i
                            musicData.typecategory='Music'
                            tableArray.push(musicData)
                            i=i+1;
                        })
                        this1.props.dispatch({type: 'catalog', data: tableArray });
                        this1.setState({loading:false})
                        this1.forceUpdate();
                    });
                });
            });
        });

    }
    addItem=(data)=>{
        this.setState({addItem:data.value})
        switch(data.value){
            case 'Music':
                this.props.history.push(`/addMusic`);
                break;
            case 'Movie':
                this.props.history.push(`/addMovie`);
                break;
            case 'Magazine':
                this.props.history.push(`/addMagazine`);
                break;
            case 'Book':
                this.props.history.push(`/addBook`);
                break;
            default:
                this.props.history.push(`/addMusic`);
                break;

        }
    }
    
    openProfile=(data)=>{
        console.log(data);
        this.props.history.push(`/ecatalog/`+data.Title);
        this.setState({profile: data})
    }
    work=()=>{
        this.props.history.push(`/workecatalog`);
    }
    render() {
        if(!this.props.userProfile) {
            return (<Redirect to={'/'}/>);
        }else if(this.state.profile) {
            return (<RedirectItem closeProfile={this.closeProfile} changeProfile={this.changeProfile}
                profile= { this.state.profile}/>)

        }else{
            let columnItems =[
                {value : 'Title', render : 'Title', type : 'text'},
                {value : 'Type', render : 'Type', type : 'text'},
                {value : 'Quantity', render : 'Quantity', type : 'number'},
                {value : 'Available', render : 'Available', type : 'number'},
                
            ];
            let tableItems = [];
        tableArray.map((itemData)=>{
                let arrData=[
                    {value : itemData.Title, render : itemData.Title, type : 'text'},
                    {value : itemData.typecategory, render : itemData.typecategory, type : 'text'},
                    {value : itemData.Quantity, render : itemData.Quantity, type : 'number'},
                    {value : itemData.available, render : itemData.available, type : 'number'},
                    itemData
                ]
                tableItems.push(arrData);
            })
                return (
                    <div className='main-container'>
                        <HeaderComponent/>
                        <div className='MainContainer'>
                            <div className="MainContainer-upper-container">
                                <div className="MainContainer-upper-container-text">
                                    <div className="MainContainer-upper-container-first-text">
                                        Catalog
                                    </div>
                                    <div className="MainContainer-upper-container-second-text">
                                        You can select one of the item to see their details!
                                    </div>
                                </div>
                                {this.props.userProfile.type === 1 ?
                                    <div className='MainContainer-upper-container-button'>
                                        <Button content='Work Catalog' onClick={this.work}/>
                                        <Dropdown placeholder="Add Item" value={this.state.addItem}
                                                  onChange={(e, value) => this.addItem(value)} options={options}
                                                  selection/>
                                    </div> : ''}


                            </div>
                            <DataTable
                                columnItems={columnItems}
                                data={tableItems}
                                itemsPerPage={10}
                                loading={this.state.loading}
                                clickRow={this.openProfile}/>
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
export default withRouter(connect(mapStateToProps)(Catalog));
