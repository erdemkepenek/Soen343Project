import PropTypes from 'prop-types'
import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'
import * as HistoryBuilder from './historyBuilder'
import {Timeline, Icon, Card, Button} from 'antd';
import moment from "moment";
import _ from 'lodash'
import {Redirect} from "react-router";
import DataTable from '../Components/Common/table/table'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    }
  }

  componentDidMount() {
    let arrayTest = [];
    let arrayObject = {
      key: 0,
      action: 'Profile updated',
      actionTakenBy: 'Mikee',
      time: moment(new Date).format()
    };
    arrayTest.push(arrayObject);
    let years = [];
    let historyDatashow = [];
    HistoryBuilder.historyBuilder(arrayTest, function(historyData) {
      years = historyData
    })
    _.forEachRight(years, function(value, key) {
      let i = 12;
      _.forEachRight(value, function(value2, key2) {
        if (value2.filled) {
          _.forEachRight(value2, function(value3, key3) {
            if (Array.isArray(value3) && value3.length > 0) {
              let historySubDataShow = [];
              value3.reverse().map((historyData) => {
                historySubDataShow.push(historyData)
              })
              let arrData = (<div> < div style = {{margin: '10px 0', fontWeight:'600', textTransform:'uppercase', color:'#34495e',  fontSize:'0.8em'}} > {
                (
                  parseInt(key3) < 10
                  ? '0' + key3
                  : key3) + '/' + (
                  i < 10
                  ? '0' + i.toString()
                  : i.toString()) + '/' + key
              }</div> < Timeline key={key3}> {
                historySubDataShow.map((historySubData,key1) => {
                  console.log(historySubData)
                  return (<Timeline.Item key={key1} color="green">
                    <Card>
                      {
                        historySubData.action
                          ? historySubData.action
                          : 'N/A action'
                      }
                      by {
                        historySubData.byProfile
                          ? historySubData.actionTakenBy
                          : 'N/A'
                      }
                      {' '}
                      at {
                        historySubData.time
                          ? moment(historySubData.time).format("HH:mm:ss")
                          : 'N/A'
                      }
                    </Card>
                  </Timeline.Item>)
                })
              } < /Timeline>
                               </div>)
              historyDatashow.push(arrData)
            }
          })
        }
        i = i - 1;
      })
    })
    this.setState({history: historyDatashow})
  }

  render() {
    if (!this.props.userProfile) {
      return (<Redirect to={'/'}/>);
    } else {
      return (<div className='main-container'>
        <HeaderComponent/>
        <div className='MainContainer'>
          <div className="MainContainer-upper-container">
            <div className="MainContainer-upper-container-text">
              <div className="MainContainer-upper-container-first-text">
                Cart
              </div>
              <div className="MainContainer-upper-container-second-text">
                You can select one of the item to see their details!
              </div>
            </div>
          </div>
          {
            this.state.history.map((data,key) => {
              return data;
            })
          }
        </div>

        <FooterComponent/>
      </div>)
    }
  }
}
function mapStateToProps(state) {
  return {userProfile: state.AdminReducer.userProfile};

}
export default withRouter(connect(mapStateToProps)(Cart));
