/* eslint react/prop-types: 0 */
import React, {Component, createRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../store/actions/index';
import Webcam from 'react-webcam'
import moment from 'moment'
import Studycomp from './studycomponent/studycomp'
import './study.css'
import SelectSubject from './selectSubject/selectSubject';

const status_array = ['studying', 'absent', 'distracted', 'drowsy']

class Study extends Component {
    state = {
        members: this.props.members,
        time: moment.duration(0),
        subjectShow: false,
        subject: null
    }
    videoConstraints = {
        width: 720,
        height: 720,
        facingMode: "user"
    }
    webcamRef = createRef()
    socketRef = createRef()
    tick = () => {
        const {time} = this.state
        this.setState({time: time.clone().add(1, 'seconds')})
        if (time.seconds() % 10 === 9) {
            this.capture();
        }
    };
    startTimer = () => {
        console.log("started")
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    };

    componentDidMount() {
        this.startTimer();
        this.props.getSubjects()
        this.socketRef.current=new WebSocket('wss://caffeine-camera.shop/ws/study/'+
            this.props.match.params.group_id+'/')
        this.socketRef.current.onopen = e => {
            console.log('open', e)
        }
        this.socketRef.current.onmessage = e => {
           const d=JSON.parse(e.data)
           if(d.hasOwnProperty('inference')){
               const new_inf = this.state.members.find(obj => obj.user__id===d.inference.user__id)
               new_inf.concentration_gauge=d.inference.gauge
               const infered = this.state.members.map(obj => obj.user__id===d.inference.user__id ? new_inf : obj)
               this.setState({members: infered})
           }
           else if(d.hasOwnProperty('join')){
                const new_mem = {
                    user__id: d.join.user__id,
                    user__name: d.join.user__name,
                    user__message: d.join.user__message,
                    concentration_gauge: 0
                }
                const new_mems = [...this.state.members, new_mem]
                this.setState({members: new_mems})
           }
           else if(d.hasOwnProperty('leave')){
            const leav_mems = this.state.members.filter(obj=> obj.user__id!==d.leave.user__id)
            this.setState({members: leav_mems})
       }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentSubject !== prevProps.currentSubject){
            console.log('this.props.currentSubject')
            this.startTimer();
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.socketRef.current.close();
        this.props.endStudy(this.props.match.params.group_id);
    }

    onClickEnd = () => {
        this.props.history.push('/');
    }
    handleSubjectShow = () => {
        this.setState({subjectShow: false})
    }
    onClickCheck = (name) => {
        this.setState({subject: name})
    }
    onClickChoose = () => {
        if (this.state.subject !== this.props.currentSubject) {
            clearInterval(this.interval);
            this.setState({time: moment.duration(0)});
            this.props.changeSubject(this.state.subject, this.props.match.params.group_id);
            this.setState({subjectShow: false});
        } else
            this.setState({subjectShow: false});
    }
    capture = () => {
        this.props.postCapturetoServer(this.webcamRef.current.getScreenshot(), this.props.match.params.group_id)
    }
    render() {
        const mem=[].concat(this.state.members)
            .sort((a, b) => a.concentration_gauge < b.concentration_gauge ? 1: -1)
            .map(m=><li>{m.user__name}{m.concentration_gauge}{m.user__message}</li>);
        return (
            <div className="container">
                <h1>study room</h1>
                <div className="row">
                    <div className="col-1">
                        {mem}
                    </div>
                    <div className="col-3">
                        <Webcam
                            className='user_webcam'
                            audio={false}
                            height={360}
                            ref={this.webcamRef}
                            screenshotFormat="image/jpeg"
                            width={720}
                            videoConstraints={this.videoConstraints}
                        />
                        <SelectSubject
                            show={this.state.subjectShow}
                            handleSubjectShow={this.handleSubjectShow}
                            mySubjectList={this.props.subjectList}
                            subject={this.state.subject}
                            onClickCheck={this.onClickCheck}
                            onClickChoose={this.onClickChoose}
                        />
                    </div>
                    <div className="col-9">
                        <button id='change-subject-button' onClick={() => this.setState({subjectShow: true})}>Change
                            Subject
                        </button>
                        <button id='end-study-button' onClick={this.onClickEnd}>End</button>
                        <p>{moment().hour(0).minute(0).second(this.state.time.asSeconds()).format("HH:mm:ss")}</p>
                        <Studycomp
                            name={'demo_user'}
                            state={this.props.status !== null ? status_array[this.props.status] : 'We believe you are studying'}
                            rate={this.props.gauge !== null ? this.props.gauge : 1}
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
        subjectList: state.subject.mySubjectList,
        members: state.study.memberlist
    };
}

const mapDispatchToProps = dispatch => {
    return {
        postCapturetoServer: (image, group_id) =>
            dispatch(actionCreators.postCapturetoServer(image, group_id)),
        endStudy: (group_id) =>
            dispatch(actionCreators.endStudy(group_id)),
        getSubjects: () =>
            dispatch(actionCreators.getSubjects()),
        changeSubject: (subject, group_id) =>
            dispatch(actionCreators.changeSubject(subject, group_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Study));