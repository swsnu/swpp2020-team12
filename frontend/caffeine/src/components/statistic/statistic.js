/* eslint react/prop-types: 0 */
/* eslint-disable no-unused-vars */
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
import {Button, Container, Row, Col} from 'react-bootstrap'
import {VictoryPie, VictoryContainer} from 'victory'
import TimeLine from './timeline/timeline'


class Statistic extends Component{
    constructor(props){
        super(props);
        this.state = {
            monthlyData:this.props.monthlyData,
            timelineShow: false,
            today: moment()
        }

    }
    componentDidMount(){
        this.props.getMonthlydata(moment())
        this.props.getWeeklydata(moment())
        this.props.getDailySubject(moment())
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
    gotoMain = () => {
        this.props.history.push('/')
    }

    handletimelineShow = () => {
        this.setState({timelineShow:false})
    }
    
    
    

    render(){
        return(
            <Container id="statistic">
                <Row>
                    <Col>
                    <Button id="timeline-button" onClick={() => {if (this.props.timelineData.length !== 0){this.setState({timelineShow: true})}}}>TimeLine</Button>
                    <TimeLine
                        show={this.state.timelineShow}
                        handletimelineShow={this.handletimelineShow}
                        timelineData={this.props.timelineData}
                    />
                        <h1>Daily</h1>
                            <VictoryPie 
                                containerComponent={<VictoryContainer padding={0} responsive={false}/>}
                                width={350}
                                height={350}
                                data={this.props.dailyData}
                                labelRadius={({ innerRadius }) => innerRadius + 35 }
                                style={{ labels: { fill: "white", fontSize: 25, fontWeight: "bold" } }}
                            ></VictoryPie>
                            <span id="total">Total: {this.props.daily_total}</span>
                            <span id="study">Study: {this.props.daily_study_time}</span>
                    </Col>
                    <Col>
                        <h1>Calendar</h1>
                        <div id="calendar">
                            <Calendar
                                className="calendar"
                                onChange={(value, event) => {
                                    this.props.getMonthlydata(moment(value))
                                    this.props.getWeeklydata(moment(value))
                                    this.props.getDailySubject(moment(value))
                                    console.log(this.props.timelineData)
                                }} 
                                value={this.state.date}
                            />
                        </div>
                        </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>Weekly</h1>
                        <VictoryPie 
                            containerComponent={<VictoryContainer padding={0} responsive={false}/>}
                            width={350}
                            height={350}
                            data={this.props.weeklyData}
                        labelRadius={({ innerRadius }) => innerRadius + 35 }
                        style={{ labels: { fill: "white", fontSize: 25, fontWeight: "bold" } }}
                        ></VictoryPie>
                        <span id="total2">Total: {this.props.weekly_total}</span>
                        <span id="study2">Study: {this.props.weekly_study_time}</span>
                    </Col>
                    <Col>
                        <CalendarHeatmap
                            startDate={moment().add(-92, 'days').format("YYYY-MM-DD")}
                            endDate={moment().format("YYYY-MM-DD")}
                            values={this.props.monthlyData}
                            classForValue={(value) => {
                                if (!value) {
                                return 'color-empty';
                                }
                                return `color-scale-${value.count}`;
                            }}
                        />
                    </Col>
                </Row>
            </Container>
            
        )
    }

}

const mapStateToProps = state => {
    return {
        monthlyData: state.statistic.monthlyData,
        weeklyData: state.statistic.weeklyData,
        weekly_total: state.statistic.weekly_total,
        weekly_study_time: state.statistic.weekly_study_time,
        dailyData: state.statistic.dailyData,
        daily_total: state.statistic.daily_total,
        daily_study_time: state.statistic.daily_study_time,
        timelineData: state.statistic.timelineData
       };
}


  
const mapDispatchToProps = dispatch => {
    return {
        signout: ()=>
        dispatch(actionCreators.signout()),
        getMonthlydata: (date)=>
        dispatch(actionCreators.getMonthlydata(date)),
        getWeeklydata: (date)=>
        dispatch(actionCreators.getWeeklydata(date)),
        getDailySubject: (date)=>
        dispatch(actionCreators.getDailySubject(date))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Statistic));
