import PropTypes from 'prop-types'
import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'
import * as HistoryBuilder from './historyBuilder'
import {Timeline, Card} from 'antd';
import moment from "moment";
import _ from 'lodash'
import {Redirect} from "react-router";
import {Pagination, Icon} from "semantic-ui-react";

class LogActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullHistory: [],
      history: [],
      currentPage:1,
      itemsPerPage: 3,
    }
  }
    componentDidMount(){
        let arrayTest = [];
        let arrayObject1 = {
            key: 0,
            action: 'Cart Added',
            actionTakenBy: 'Line',
            color: 'green',
            time: moment(new Date).subtract(1, 'days').subtract(5, 'minutes').subtract(20, 'seconds').format()
        };
        let arrayObject = {
            key: 0,
            action: 'Item Viewed',
            actionTakenBy: 'Manpreet',
            color: 'blue',
            time: moment(new Date).format()
        };
        let arrayObject2 = {
            key: 0,
            action: 'Loaned Item',
            actionTakenBy: 'Eglen',
            color: 'yellow',
            time: moment(new Date).subtract(2, 'days').format()
        };
        let arrayObject3 = {
            key: 0,
            action: 'Returned Item',
            actionTakenBy: 'Mikee',
            color: 'gray',
            time: moment(new Date).subtract(5, 'minutes').format()
        };
        let arrayObject4 = {
            key: 0,
            action: 'Empty Cart',
            actionTakenBy: 'Marc',
            color: 'orange',
            time: moment(new Date).subtract(7, 'days').format()
        };
        let arrayObject5 = {
            key: 0,
            action: 'User Deleted',
            actionTakenBy: 'Anthony',
            color: 'red',
            time: moment(new Date).subtract(2, 'hour').subtract(10, 'seconds').format()
        };
        arrayTest.push(arrayObject5)
        arrayTest.push(arrayObject1);
        arrayTest.push(arrayObject);
        arrayTest.push(arrayObject2);
        arrayTest.push(arrayObject3);
        arrayTest.push(arrayObject4);
        let years = [];
        let historyDatashow = [];
        HistoryBuilder.historyBuilder(arrayTest,function(historyData){
            years=historyData
        })
        _.forEachRight(years, function(value, key) {
            let i = 12;
            _.forEachRight(value, function(value2, key2) {
                if(value2.filled){
                    _.forEachRight(value2, function(value3, key3) {
                        if(Array.isArray(value3) && value3.length > 0){
                            let historySubDataShow = [];
                            let arraySorted = value3;
                            arraySorted.sort(function compare(a, b) {
                                var dateA = moment(a.time || "YYYY-MM-DD HH:mm");
                                var dateB = moment(b.time || "YYYY-MM-DD HH:mm");
                                return dateB - dateA;
                            });
                            arraySorted.map((historyData)=>{
                                historySubDataShow.push(historyData)
                            })
                            let arrData =(<div className='History-Main-Container'>
                                <div style={{margin: '10px 0', fontWeight:'600', textTransform:'uppercase', color:'#34495e',  fontSize:'0.8em'}}>
                                    {(parseInt(key3) <10 ? '0'+key3 : key3)+'/'+(i < 10 ? '0'+i.toString(): i.toString())+'/'+key}</div>
                                <Timeline id={"history-timeline"} >
                                    {historySubDataShow.map((historySubData)=>{
                                        console.log(historySubData)
                                        return(<Timeline.Item  color={historySubData.color}>
                                            <Card>
                                                {historySubData.action? historySubData.action : 'N/A action'} by {historySubData.actionTakenBy? historySubData.actionTakenBy: 'N/A'}
                                                {' '} at {historySubData.time ? moment(historySubData.time).format("HH:mm:ss") : 'N/A'}
                                            </Card>
                                        </Timeline.Item>)
                                    })}
                                </Timeline>
                            </div>)
                            historyDatashow.push(arrData)
                        }
                    })
                }
                i = i -1;
            })
        })
        this.setState({fullHistory: historyDatashow})
        let indexOfLastTodo = this.state.currentPage * this.state.itemsPerPage;
        let indexOfFirstTodo = indexOfLastTodo - this.state.itemsPerPage;
        let currentTodos = historyDatashow.slice(indexOfFirstTodo, indexOfLastTodo);
        this.setState({history: currentTodos})
    }
    pageChange(event, data) {
        this.setState({currentPage: data.activePage,});
        let indexOfLastTodo = data.activePage * this.state.itemsPerPage;
        let indexOfFirstTodo = indexOfLastTodo - this.state.itemsPerPage;
        let currentTodos = this.state.fullHistory.slice(indexOfFirstTodo, indexOfLastTodo);
        this.setState({history: currentTodos})
    }
  render() {
    if (!this.props.userProfile) {
      return (<Redirect to={'/'}/>);
    } else {

      return (<div className='main-container'>
        <HeaderComponent/>
        <div className='MainContainer'>
          <div className='Main-Container-history-log'>
          <div className="MainContainer-upper-container">
            <div className="MainContainer-upper-container-text">
              <div className="MainContainer-upper-container-first-text">
                Log Activity
              </div>
              <div className="MainContainer-upper-container-second-text">
                You can see all the Log Activities!
              </div>
            </div>
          </div>
          {
            this.state.history.map((data,key) => {
              return data;
          })
          }
          </div>
            <Pagination totalPages={Math.ceil(this.state.fullHistory.length / this.state.itemsPerPage)}
                        onPageChange={(e, data) => this.pageChange(e, data)}
                        ellipsisItem={{content: <Icon name='ellipsis horizontal'/>, icon: true}}
                        firstItem={{content: <Icon name='angle double left'/>, icon: true}}
                        lastItem={{content: <Icon name='angle double right'/>, icon: true}}
                        prevItem={{content: <Icon name='angle left'/>, icon: true}}
                        nextItem={{content: <Icon name='angle right'/>, icon: true}}
                        activePage={this.state.currentPage}
                        className="common-Pagination"
                        style={{borderLeft: 'none', borderRight: 'none', borderBottom: 'none'}}
            />
        </div>

        <FooterComponent/>
      </div>)
    }
  }
}
function mapStateToProps(state) {
  return {userProfile: state.AdminReducer.userProfile};

}
export default withRouter(connect(mapStateToProps)(LogActivity));
