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
    }
    render() {
        console.log(moment().hour(0).minute(0).second(3672).format("HH:mm:ss"))
        return(
            <div className='Studyroom'>
                <Webcam
                    className='invisible-webcam'
                    audio={false}
                    height={720}
                    ref={this.webcamRef}
                    screenshotFormat="image/jpeg"
                    width={720}
                    videoConstraints={this.videoConstraints}
                />
                <button onClick={this.capture}>click</button>
                <p>{moment().hour(0).minute(0).second(this.state.time.asSeconds()).format("HH:mm:ss")}</p>
                <img className='test-img' src={this.state.last_image}/>
                <Studycomp image={this.state.last_image}
                    name={'testuser'}
                    state={'study'}
                    rate={0.9}
                    />
            </div>
        )
    }    
}

const mapStateToProps = state => {
    return {
    };
  }
  
const mapDispatchToProps = dispatch => {
    return {
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Study));