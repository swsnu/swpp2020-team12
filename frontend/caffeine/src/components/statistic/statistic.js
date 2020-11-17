/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../store/actions/index';
import Calendar from 'react-calendar'
import "./statistic.css"
import 'react-calendar/dist/Calendar.css';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import moment from 'moment'
import {VictoryPie, VictoryContainer} from 'victory'



class Statistic extends Component{
    constructor(props){
        super(props);
        this.state = {
            date: null,
        }

    }

    gotoGroup = () => {
        this.props.history.push('/group')
    }
    gotoSubject = () => {
        this.props.history.push('/subject')
    }
    gotoStatistic = () => {
        this.props.history.push('/statistic')
    }
    gotoRanking = () => {
        this.props.history.push('/ranking')
    }

    
    render(){
        return(
            <div class="static">
                <div class = "container">
                    <nav>
                        <span id="label">MyPage</span>
                        <span id="label" onClick={this.gotoSubject}>Subject</span>
                        <span id="label" onClick={this.gotoGroup}>Group</span>
                        <span id="label" onClick={this.gotoStatistic}>Statistic</span>
                        <span id="label" onClick={this.gotoRanking}>Ranking</span>
                        <span id="label">SignOut</span>
                    </nav>
                    <div id='leftup'>
                        <h1>Daily</h1>
                        <VictoryPie 
                            containerComponent={<VictoryContainer padding={0} responsive={false}/>}
                            width={350}
                            height={350}
                            data={[
                            { x: "Cats", y: 35 },
                            { x: "Dogs", y: 40 },
                            { x: "Birds", y: 55 }   
                        ]}
                        labelRadius={({ innerRadius }) => innerRadius + 35 }
                        style={{ labels: { fill: "white", fontSize: 25, fontWeight: "bold" } }}
                        ></VictoryPie>
                        <span id="total">Total: </span>
                        <span id="study">Study: </span>
                    </div>
                    <div id='leftdown'>
                        <h1>Weekly</h1>
                        <VictoryPie 
                            containerComponent={<VictoryContainer padding={0} responsive={false}/>}
                            width={350}
                            height={350}
                            data={[
                            { x: "Cats", y: 35 },
                            { x: "Dogs", y: 40 },
                            { x: "Birds", y: 55 }   
                        ]}
                        labelRadius={({ innerRadius }) => innerRadius + 35 }
                        style={{ labels: { fill: "white", fontSize: 25, fontWeight: "bold" } }}
                        ></VictoryPie>
                        <span id="total2">Total: </span>
                        <span id="study2">Study: </span>
                    </div>
                    <div id="rightup">
                        <Calendar
                            className="calendar"
                            onChange={(value, event) => {
                                this.setState({date:value})
                                console.log(moment(value).format("YYYY-MM-DD"))
                            }} 
                            value={this.state.date}
                        />
                    </div>
                    <div id="rightdown">
                    <CalendarHeatmap
                        startDate={new Date('2020-08-15')}
                        endDate={new Date('2020-12-31')}
                        values={[
                            { date: '2020-11-01', count: 1 },
                            { date: '2020-11-22', count: 2 },
                            { date: '2020-11-30', count: 3 },
                        ]}
                        classForValue={(value) => {
                            if (!value) {
                              return 'color-empty';
                            }
                            return `color-scale-${value.count}`;
                          }}
                    />
                    </div>
                </div>
            </div>
            
        )
    }

}
  
const mapDispatchToProps = dispatch => {
    return {
        
    }
  }

export default connect(null, mapDispatchToProps)(withRouter(Statistic));
