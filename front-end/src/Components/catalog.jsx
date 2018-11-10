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
        }
    }

    componentDidMount() {
            tableArray= [];
            let book={
            Title: "Marc's book",
            Author: "marc noon",
            Format: "marc format",
            Pages: 567,
            Publisher: "marc again",
            Language: "marc's language",
            ISBN10: 1234567890,
            ISBN13: "7927927892",
            Quantity: 67,
            Type: "Book",
            }
            tableArray.push(book);
            this.forceUpdate();

            let music={
                Title: "marc' music",
                Artist: "marc noon",
                MusicType: "marc type",
                Label: "label marc",
                ReleaseDate: "marc again",
                ASIN: "TY157373",
                Quantity: 67,
                Type: "Music",
                }
                tableArray.push(music);
            this.forceUpdate();

            let magazine={
                Title: "marc' magazine",
                Publisher: "marc again",
                Language: "marc's language",
                Label: "label marc",
                ISBN10: 1234567890,
                ISBN13: "7927927892",
                Quantity: 67,
                Type: "Magazine",
                }
                tableArray.push(magazine);
            this.forceUpdate();
            
            let movie={
                Title: "marc' movie",
                Director: "marc noon",
                Producers: "marc type",
                Actors: "label marc",
                Language: "marc's language",
                Subtitles: "marc's language",
                Dubbed: "marc's language",
                ReleaseDate: "marc again",
                RunTime: "TY157373",
                Quantity: 67,
                Type: "Movie",
                }
                tableArray.push(movie);
                this.forceUpdate();
        }
    
        closeProfile=()=>{
            this.setState({profile: ""})
    }
    addItem=(data)=>{
        this.setState({addItem:data.value})
        switch(data.value){
            case 'Music':
                this.props.history.push(`/addMusic/`);
                break;
            case 'Movie':
                this.props.history.push(`/addMovie/`);
                break;
            case 'Magazine':
                this.props.history.push(`/addMagazine/`);
                break;
            case 'Book':
                this.props.history.push(`/addBook/`);
                break;
            default:
                this.props.history.push(`/addMusic/`);
                break;

        }
    }
    
        openProfile=(data)=>{
            console.log(data);
            this.props.history.push(`/ecatalog/`+data.BookTitle);
            this.setState({profile: data})
        }

    render() {
        if(!this.props.userProfile) {
            return (<Redirect to={'/'}/>);
        }else if(this.state.profile) { 
            return (<RedirectItem closeProfile={this.closeProfile}
                profile= { this.state.profile}/>)

        }else{
            let columnItems =[
                {value : 'Title', render : 'Title', type : 'text'},
                {value : 'Type', render : 'Type', type : 'text'},
                {value : 'Quantity', render : 'Quantity', type : 'number'},
                
            ];
            let tableItems = [];
        tableArray.map((itemData)=>{
                let arrData=[
                    {value : itemData.Title, render : itemData.Title, type : 'text'},
                    {value : itemData.Type, render : itemData.Type, type : 'text'},
                    {value : itemData.Quantity, render : itemData.Quantity, type : 'number'},
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
                            <div className='MainContainer-upper-container-button'>
                                <Dropdown placeholder="Add Item" value={this.state.addItem} onChange={(e,value)=>this.addItem(value)} options={options}  selection />
                            </div>

                            
                        </div>
                        <DataTable
                            columnItems={columnItems}
                            data={tableItems}
                            itemsPerPage={10}
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
