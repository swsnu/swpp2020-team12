/* eslint react/prop-types: 0 */
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../store/actions/index';
import Webcam from 'react-webcam'
import Table from 'react-bootstrap/Table'
import moment from 'moment'
import Studycomp from './studycomponent/studycomp'
import './study.css'
import store from '../../store/store';

class Study extends Component {
    state = {
        last_image: null,
        time: moment.duration(0)
    }
    videoConstraints={
        width: 720,
        height: 720,
        facingMode: "user"
    }
    tick = () => {
        const { time } = this.state
        this.setState({time : time.clone().add(1, 'seconds')})
        if(time.seconds()%5==4){
            this.capture();
        }
    };
    startTimer = () => {
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    };
    componentDidMount(){
        this.startTimer();
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
    webcamRef=createRef()
    capture=()=>{
        this.setState({
            last_image : this.webcamRef.current.getScreenshot()
        })
        this.props.postCapturetoServer(this.state.last_image)
        console.log("captured")
        console.log()
    }
    render() {
        return(
            <div className='Studyroom'>
                <button id='change-subject-button'>Change Subject</button>
                <button onClick={this.capture}>click</button>
                <p>{moment().hour(0).minute(0).second(this.state.time.asSeconds()).format("HH:mm:ss")}</p>
                <Webcam
                    className='invisible-webcam'
                    audio={false}
                    height={200}
                    ref={this.webcamRef}
                    screenshotFormat="image/jpeg"
                    width={200}
                    videoConstraints={this.videoConstraints}
                />
                <Studycomp 
                    name={'demo_user'}
                    state={this.props.status!==null? this.props.status : 'We believe you are studying'}
                    rate={this.props.gauge!==null? this.props.gauge : 100}
                    />
                <button id='end-study-button'>End</button>
            </div>
        )
    }    
}

const mapStateToProps = state => {
    return {
        status: state.study.status,
        gauge: state.study.gauge
    };
  }
  
const mapDispatchToProps = dispatch => {
    return {
        postCapturetoServer: (image)=>{
            dispatch(actionCreators.postCapturetoServer(image))
        }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Study));