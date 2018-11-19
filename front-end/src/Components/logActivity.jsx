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
import {Pagination, Icon, Loader} from "semantic-ui-react";
import ApiCalls from '../class/apiCalls'


let apicall = new ApiCalls;
let historyDatashow = [];
let historyDatashowAll = [];
class LogActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullHistory: [],
      history: [],
      currentPage:1,
      itemsPerPage: 1,
    loading:false,
        historyAll:[]
    }
  }
    componentDidMount(){
        this.setState({loading:true})
        let years = [];
        let this1=this;
        let state=this.state;
        apicall.viewLogActivity(function(data) {
            this1.setState({historyAll: data})
            HistoryBuilder.historyBuilder(data, function (historyData) {
                years = historyData
            })
            _.forEachRight(years, function (value, key) {
                let i = 12;
                _.forEachRight(value, function (value2, key2) {
                    if (value2.filled) {
                        _.forEachRight(value2, function (value3, key3) {
                            if (Array.isArray(value3) && value3.length > 0) {
                                let historySubDataShow = [];
                                let arraySorted = value3;
                                arraySorted.sort(function compare(a, b) {
                                    var dateA = moment(a.timeStamp || "YYYY-MM-DD HH:mm");
                                    var dateB = moment(b.timeStamp || "YYYY-MM-DD HH:mm");
                                    return dateB - dateA;
                                });
                                arraySorted.map((historyData) => {
                                    historySubDataShow.push(historyData)
                                })
                                let arrData = (<div className='History-Main-Container'>
                                    <div style={{
                                        margin: '10px 0',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        color: '#34495e',
                                        fontSize: '0.8em'
                                    }}>
                                        {(parseInt(key3) < 10 ? '0' + key3 : key3) + '/' + (i < 10 ? '0' + i.toString() : i.toString()) + '/' + key}</div>
                                    <Timeline id={"history-timeline"}>
                                        {historySubDataShow.map((historySubData) => {
                                            console.log(historySubData)
                                            return (<Timeline.Item color={historySubData.color}>
                                                <Card>
                                                    {historySubData.action ? historySubData.action : 'N/A action'} by User ID {historySubData.userId? historySubData.userId: 'N/A'}
                                                    {' '} at {historySubData.timeStamp ? moment(historySubData.timeStamp).format("HH:mm:ss") : 'N/A'}
                                                </Card>
                                            </Timeline.Item>)
                                        })}
                                    </Timeline>
                                </div>)
                                historyDatashow.push(arrData)
                            }
                        })
                    }
                    i = i - 1;
                })
            })
            this1.setState({fullHistory: historyDatashow})
            let indexOfLastTodo = state.currentPage * state.itemsPerPage;
            let indexOfFirstTodo = indexOfLastTodo - state.itemsPerPage;
            let currentTodos = historyDatashow.slice(indexOfFirstTodo, indexOfLastTodo);
            this1.setState({history: currentTodos})
            setTimeout(function(){ this1.setState({loading:false}) }, 1000)
            this1.forceUpdate();
        })
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
    }else if(this.props.userProfile.type ===0){
        return (<Redirect to={'/404'}/>);
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
              {this.state.loading ?
                  <div className="table-Container">
                      <div className='table-Search-Container'>
                          <div className='table-Search-Bar'>
                          </div>
                      </div>
                      <Loader inverted active>Loading</Loader>
                  </div>
                  :
                  this.state.history.map((data,key) => {
                      return data;
                  })
              }
          </div>
            {this.state.loading ? '' :
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
            />}
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
