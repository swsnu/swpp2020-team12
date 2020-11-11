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
import Selectsubject from './selectSubject/selectSubject';
const status_array=['studying', 'absent', 'distracted', 'drowssy']
class Study extends Component {
    state = {
        last_image: null,
        time: moment.duration(0),
        Subjectshow: false,
        subject: null
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
        this.props.getSubjects()
    }
    componentDidUpdate(prevProps){
        if(this.props.currentSubject!==prevProps.currentSubject)
            this.startTimer();
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
    onClickend=()=>{
        this.props.endStudy();
        this.props.history.push('/');
    }
    handlesubjectshow=()=>{
        this.setState({Subjectshow: false})
    }
    onClickcheck=(name)=>{
        this.setState({subject: name})
    }
    onClickchoose=()=>{
        if(this.state.subject!==this.props.currentSubject){
            clearInterval(this.interval);
            this.setState({time: moment.duration(0)});
            this.props.changeSubject(this.state.subject, this.props.match.params.group_id);
            this.setState({Subjectshow: false});
        }
        else
            this.setState({Subjectshow: false});
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
        console.log(this.props.subject)
        return(
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <Webcam
                        className='invisible-webcam'
                        audio={false}
                        height={200}
                        ref={this.webcamRef}
                        screenshotFormat="image/jpeg"
                        width={200}
                        videoConstraints={this.videoConstraints}
                    />
                     <Selectsubject 
                        show={this.state.Subjectshow}
                        handlesubjectshow={this.handlesubjectshow}
                        mySubjectList={this.props.subjectList}
                        subject={this.state.subject}
                        onClickcheck={this.onClickcheck}
                        onClickchoose={this.onClickchoose}
                    />
                    </div>
                    <div className="col-9">
                        <button id='change-subject-button' onClick={()=>this.setState({Subjectshow: true})}>Change Subject</button>
                        <button onClick={this.capture}>click</button>
                        <button id='end-study-button' onClick={this.onClickend}>End</button>
                        <p>{moment().hour(0).minute(0).second(this.state.time.asSeconds()).format("HH:mm:ss")}</p>
                        <Studycomp 
                        name={'demo_user'}
                        state={this.props.status!==null? status_array[this.props.status] : 'We believe you are studying'}
                        rate={this.props.gauge!==null? this.props.gauge : 1}
                        />
                    </div>
                </div>
                
            </div>
        )
    }    
}

const mapStateToProps = state => {
    return {
        status: state.study.status,
        gauge: state.study.gauge,
        currentSubject: state.study.subject,
        subjectList: state.subject.mySubjectList
    };
  }
  
const mapDispatchToProps = dispatch => {
    return {
        postCapturetoServer: (image)=>
            dispatch(actionCreators.postCapturetoServer(image)),
        endStudy: () =>
            dispatch(actionCreators.endStudy()),
        getSubjects: () =>
            dispatch(actionCreators.getSubjects()),
        changeSubject: (subject, group_id) =>
            dispatch(actionCreators.changeSubject(subject, group_id))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Study));