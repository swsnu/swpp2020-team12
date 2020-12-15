/* eslint react/prop-types: 0 */
import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../store/actions/index';
import Webcam from 'react-webcam'
import moment from 'moment'
import Studycomp from './studycomponent/studycomp'
import './study.css'
import SelectSubject from './selectSubject/selectSubject';
import ProgressBar from 'react-bootstrap/ProgressBar'
import {Container, Row, Col, Table} from 'react-bootstrap'
import axios from "axios";
import Jimp from 'jimp';

const status_array = ['studying', 'absent', 'distracted', 'drowsy']

class Study extends Component {
    state = {
        members: this.props.members,
        time: moment.duration(0),
        subjectShow: false,
        subject: null,
        openEyeShow: false,
        closeEyeShow: false,
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
        this.setState({openEyeShow: true});
        this.props.getSubjects()
        this.socketRef.current = new WebSocket('wss://caffeine-camera.shop/ws/study/' +
            this.props.match.params.group_id + '/')
        this.socketRef.current.onopen = e => {
            console.log('open', e)
        }
        this.socketRef.current.onmessage = e => {
            const d = JSON.parse(e.data)
            if (Object.prototype.hasOwnProperty.call(d, 'inference')) {
                const new_inf = this.state.members.find(obj => obj.user__id === d.inference.user__id)
                new_inf.concentration_gauge = d.inference.gauge
                new_inf.image = d.image
                const infered = this.state.members.map(obj => obj.user__id === d.inference.user__id ? new_inf : obj)
                this.setState({members: infered})
            } else if (Object.prototype.hasOwnProperty.call(d, 'join')) {
                const new_mem = {
                    user__id: d.join.user__id,
                    user__name: d.join.user__name,
                    user__message: d.join.user__message,
                    image: null,
                    concentration_gauge: 0
                }
                const new_mems = [...this.state.members, new_mem]
                this.setState({members: new_mems})
            } else if (Object.prototype.hasOwnProperty.call(d, 'leave')) {
                const leav_mems = this.state.members.filter(obj => obj.user__id !== d.leave.user__id)
                this.setState({members: leav_mems})
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentSubject !== prevProps.currentSubject) {
            console.log('this.props.currentSubject')
            this.startTimer();
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.socketRef.current.close();
        this.props.endStudy(this.props.match.params.group_id);
    }

    onClickOpenEye = () => {
        return axios.post('/api/study/tune/', {
            image: this.webcamRef.current.getScreenshot(),
            id: this.props.match.params.group_id
        })
            .then(() => this.setState({openEyeShow: false, closeEyeShow: true}))
            .catch(() => alert("please capture again."))

    }
    onClickCloseEye = () => {
        return axios.put('/api/study/tune/', {
            image: this.webcamRef.current.getScreenshot(),
            id: this.props.match.params.group_id
        })
            .then(() => {
                this.setState({closeEyeShow: false})
                this.startTimer()
            })
            .catch(() => alert("please capture again."))
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
        const screenshot=this.webcamRef.current.getScreenshot();
        let shotdata = screenshot.split(',')[1];
        const buf = Buffer.from(shotdata, 'base64');
        Jimp.read(buf, (err, image) => {
            if (err) throw err;
            else {
              image.resize(100, 100)
                .quality(80)
                .getBase64(Jimp.MIME_JPEG, (err, src) => {
                this.props.postCapturetoServer(screenshot, src, this.props.match.params.group_id)
                })
            }
          })
    }

    render() {
        const mem = [].concat(this.state.members)
            .sort((a, b) => a.concentration_gauge < b.concentration_gauge ? 1 : -1)
            .map((m, i) => <tr key={i}>
                <td>{i}</td>
                <td>{m.user__name}</td>
                <td><img src={m.image} /></td>
                <td>{(m.concentration_gauge).toFixed(3)}</td>
                <td> {m.concentration_gauge > 0.8 ?
                    <ProgressBar striped variant="danger" label={`${Math.round(m.concentration_gauge * 100)}%`} animated
                                 now={m.concentration_gauge * 100}/>
                    : m.concentration_gauge > 0.6 ?
                        <ProgressBar variant="warning" label={`${Math.round(m.concentration_gauge * 100)}%`} animated
                                     now={m.concentration_gauge * 100}/> :
                        <ProgressBar variant="info" label={`${Math.round(m.concentration_gauge * 100)}%`} animated
                                     now={m.concentration_gauge * 100}/>}</td>
                <td>{m.user__message}</td>
            </tr>);
        const tuneModel =
            !this.webcamRef.current ? <div>wait until your camera is on...</div> :
                this.state.openEyeShow ?
                    <button id='open-eye' onClick={this.onClickOpenEye}>
                        open your eyes and click this button</button> :
                    this.state.closeEyeShow ?
                        <button id='close-eye' onClick={this.onClickCloseEye}>
                            close your eyes and click this button</button> :
                        <div>
                            <SelectSubject
                                show={this.state.subjectShow}
                                handleSubjectShow={this.handleSubjectShow}
                                mySubjectList={this.props.subjectList}
                                subject={this.state.subject}
                                onClickCheck={this.onClickCheck}
                                onClickChoose={this.onClickChoose}
                            />
                            <button id='change-subject-button' onClick={() => this.setState({subjectShow: true})}>Change
                                Subject
                            </button>
                            <button id='end-study-button' onClick={this.onClickEnd}>End</button>
                            <p>{moment().hour(0).minute(0).second(this.state.time.asSeconds()).format("HH:mm:ss")}</p>
                            <Studycomp
                                name={this.props.username.name}
                                state={this.props.status !== null ? status_array[this.props.status] : 'We believe you are studying'}
                                rate={this.props.gauge !== null ? this.props.gauge : 1}
                            />
                        </div>


        return (
            <Container>
                <Row>
                    <h1>study room</h1>
                </Row>
                <Row>
                    <Col>
                        <Webcam
                            className='user_webcam'
                            audio={false}
                            height={540}
                            ref={this.webcamRef}
                            screenshotFormat="image/jpeg"
                            width={540}
                            videoConstraints={this.videoConstraints}
                        />
                        {tuneModel}
                    </Col>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>name</th>
                                <th>image</th>
                                <th>concentration</th>
                                <th>gauge-bar</th>
                                <th>message</th>
                            </tr>
                            </thead>
                            <tbody>
                            {mem}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        status: state.study.status,
        gauge: state.study.gauge,
        currentSubject: state.study.subject,
        subjectList: state.subject.mySubjectList,
        members: state.study.memberlist,
        username: state.user.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        //captureOpenEye: (image, group_id) =>
        //    dispatch(actionCreators.captureOpenEye(image, group_id)),
        //captureCloseEye: (image, group_id) =>
        //    dispatch(actionCreators.captureCloseEye(image, group_id)),
        postCapturetoServer: (image, simage, group_id) =>
            dispatch(actionCreators.postCapturetoServer(image, simage, group_id)),
        endStudy: (group_id) =>
            dispatch(actionCreators.endStudy(group_id)),
        getSubjects: () =>
            dispatch(actionCreators.getSubjects()),
        changeSubject: (subject, group_id) =>
            dispatch(actionCreators.changeSubject(subject, group_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Study));