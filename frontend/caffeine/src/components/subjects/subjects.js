/*

바꾼내용
시간표를 click하면 edit subject가 뜨는게 아니라 subject 이름 클릭하면 뜨는 걸로
click 했을 때 message: edit subject-> subject detail

문제: 시간표가 안겹치게 하려면? 여러 시간대에 같은 과목이 있으면? backend에서 어떻게 handle?
요일& 시간을 어떻게 전달?

create subject이 subcomponenet에 빠져있음

 */
/* eslint react/prop-types: 0 */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../store/actions/index';
import Subject from './subject/subject'
import CreateSubject from './createSubject/createSubject'
import UserSubjectInfo from './userSubjectInfo/userSubjectInfo'
import './subjects.css'

class Subjects extends Component {
    state = {
        name: '',
        description: '',
        start_time: '00:00',
        day: 0,
        end_time: '00:00',
        createShow: false,
        detailShow: false,
    }

    componentDidUpdate(prevProps) {
        if (prevProps.specificSubjectInfo !== this.props.specificSubjectInfo)
            this.setState({
                name: this.props.specificSubjectInfo.name,
                description: this.props.specificSubjectInfo.description,
                start_time: this.props.specificSubjectInfo.days[0].start_time,
                day: this.props.specificSubjectInfo.days[0].day,
                end_time: this.props.specificSubjectInfo.days[0].end_time,
            })
    }

    componentDidMount() {
        this.props.getAllSubjects()
    }

    clickSubjectHandler = (subject) => {
        this.props.getSubject(subject.id)
        this.setState({detailShow: true})
    }
    handleDetailShow = () => {
        this.setState({detailShow: false})
    }
    handleCreateShow = () => {
        this.setState({createShow: false})
    }
    onChangeName = (event) => {
        this.setState({name: event.target.value})
    }
    onChangeDescription = (event) => {
        this.setState({description: event.target.value})
    }
    onChangeStartTime = (event) => {
      //  console.log(event.target.value)
        this.setState({start_time: event.target.value})
    }
    onChangeEndTime = (event) => {
        this.setState({end_time: event.target.value})
    }
    onChangeDay = (event) => {
        this.setState({day: event.target.value})
    }
    onClickConfirm = () => {
        if (this.state.name===''){
            alert('subject name cannot be an empty string')
            return;
        }
        else {
            this.setState({createShow: false})
            this.props.addSubject({
                name: this.state.name,
                description: this.state.description,
                days: [{
                    day: this.state.day,
                    start_time: this.state.start_time,
                    end_time: this.state.end_time,
                }]
            })
            this.setState({
                name: '',
                description: '',
                start_time: '00:00',
                day: 0,
                end_time: '00:00',
            })
        }
    }
    onClickEdit = () => {
        this.setState({detailShow: false})
        this.props.editSubject({
            id: this.props.specificSubjectInfo.id,
            name: this.props.specificSubjectInfo.name,
            description: this.state.description,
            days: [{
                day: this.state.day,
                start_time: this.state.start_time,
                end_time: this.state.end_time,
            }]
        })
        this.setState({
            name: '',
            description: '',
            start_time: '00:00',
            day: 0,
            end_time: '00:00',
        })
    }
    onClickQuit = () => {
        this.setState({detailShow: false})
        this.props.quitSubject(this.props.specificSubjectInfo.id)
    }

    render() {
        const subjects = this.props.mySubjectList.map(subject => {
            return (
                <Subject
                    key={subject.id}
                    name={subject.name}
                    clickDetail={() => this.clickSubjectHandler(subject)}
                />
            );
        });

        return (
            <div className='SubjectList' id="SubjectList">
                <div className='wrap' id='wrap'>
                    <h1>My Subject</h1>
                    <button id='create-subject-button' onClick={() => this.setState({
                        createShow: true, name: '',
                        description: '',
                        start_time: '00:00',
                        day: 0,
                        end_time: '00:00'
                    })}>Create
                </button>
                </div>
                <CreateSubject
                    name={this.state.name}
                    description={this.state.description}
                    start_time={this.state.start_time}
                    end_time={this.state.end_time}
                    day={this.state.day}
                    show={this.state.createShow}
                    handleCreateShow={this.handleCreateShow}
                    onClickConfirm={this.onClickConfirm}
                    onChangeName={this.onChangeName}
                    onChangeDescription={this.onChangeDescription}
                    onChangeDay={this.onChangeDay}
                    onChangeStartTime={this.onChangeStartTime}
                    onChangeEndTime={this.onChangeEndTime}
                />
                {this.props.specificSubjectInfo && <UserSubjectInfo
                    key={this.props.specificSubjectInfo.id}
                    name={this.props.specificSubjectInfo.name}
                    description={this.props.specificSubjectInfo.description}
                    day={this.props.specificSubjectInfo.days[0].day}
                    start_time={this.props.specificSubjectInfo.days[0].start_time}
                    end_time={this.props.specificSubjectInfo.days[0].end_time}
                    show={this.state.detailShow}
                    onChangeName={this.onChangeName}
                    onChangeDescription={this.onChangeDescription}
                    onChangeDay={this.onChangeDay}
                    onChangeEndTime={this.onChangeEndTime}
                    onChangeStartTime={this.onChangeStartTime}
                    handleDetailShow={this.handleDetailShow}
                    onClickEdit={this.onClickEdit}
                    onClickQuit={this.onClickQuit}
                />
                } 
                {subjects}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        mySubjectList: state.subject.mySubjectList,
        specificSubjectInfo: state.subject.specificSubjectInfo
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAllSubjects: () =>
            dispatch(actionCreators.getSubjects()),
        getSubject: (subject_id) =>
            dispatch(actionCreators.getSubject(subject_id)),
        addSubject: (data) =>
            dispatch(actionCreators.addSubject(data)),
        editSubject: (data) =>
            dispatch(actionCreators.editSubject(data)),
        quitSubject: (subject_id) =>
            dispatch(actionCreators.deleteSubject(subject_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Subjects));



