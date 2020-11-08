/*

바꾼내용
시간표를 click하면 edit subject가 뜨는게 아니라 subject 이름 클릭하면 뜨는 걸로
click 했을 때 message: edit subject-> subject detail

문제: 시간표가 안겹치게 하려면? 여러 시간대에 같은 과목이 있으면? backend에서 어떻게 handle?
요일& 시간을 어떻게 전달?

create subject이 subcomponenet에 빠져있음

 */
/* eslint react/prop-types: 0 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../store/actions/index';
import Subject from './subject/subject'
import CreateSubject from './createSubject/createSubject'
import UserSubjectInfo from './userSubjectInfo/userSubjectInfo'
import './subjects.css'

const mockuser = {
    id: 1,
    name: "tesuser1",
    studyhour: "2hour",
    message: "I'm good"
}

class Subjects extends Component {
    state = {
        name: '',
        description: '',
        start_time_hour: '',
        start_time_min: '',
        day: '',
        duration_hour: '',
        //       duration_min: '',
        create_show: false,
        detail_show: false,
    }

    componentDidMount() {
        this.props.getAllSubjects()
    }

    clickSubjectHandler = (subject) => {
        this.props.getSubject(subject.id)
        this.setState({detail_show: true})
    }
    handleDetailShow = () => {
        this.setState({detail_show: false})
    }
    handleCreateShow = () => {
        this.setState({create_show: false})
    }
    onChangeName = (event) => {
        this.setState({name: event.target.value})
    }
    onChangeDescription = (event) => {
        this.setState({description: event.target.value})
    }
    onChangeStartTimeHour = (event) => {
        this.setState({start_time_hour: event.target.value})
    }
    onChangeStartTimeMin = (event) => {
        this.setState({start_time_min: event.target.value})
    }
    onChangeDay = (event) => {
        this.setState({day: event.target.value})
    }
    onChangeDurationHour = (event) => {
        this.setState({duration_hour: event.target.value})
    }
    //   onChangeDurMin = (event) => {
    //       this.setState({duration_min: event.target.value})
    //   }
    onClickConfirm = () => {
        this.setState({create_show: false})
        //let start_time = Date()
        //start_time.setTime(this.state.start_time_hour, this.state.start_time_min)
        this.props.addsubject({
            name: this.state.name,
            description: this.state.description,
            user: mockuser,
            start_time_hour: this.state.start_time_hour,
            start_time_min: this.state.start_time_min,
            duration_hour: this.state.duration_hour,
            //           duration_min: this.state.duration_min,
            day: this.state.day
        })
    }
    onClickEdit = () => {
        this.setState({detail_show: false})
        //let start_time = Date()
        //start_time.setTime(this.state.start_time_hour, this.state.start_time_min)
        this.props.editsubject({
            id: props.specificSubjectInfo.id,
            name: this.state.name,
            description: this.state.description,
            user: mockuser,
            start_time_hour: this.state.start_time_hour,
            start_time_min: this.state.start_time_min,
            duration_hour: this.state.duration_hour,
            //           duration_min: this.state.duration_min,
            day: this.state.day
        })
    }
    onClickQuit = () => {
        this.setState({detail_show: false})
        this.props.quitSubject(this.props.specificSubjectInfo.id)
    }

    render() {
        const subjects = this.props.mySubjectList.map(subject => {
            return (
                <Subject
                    key={subject.id}
                    name={subject.name}
                    clickDetail={() => this.clickSubjectHandler(subject)}
                    clickquit={this.onClickQuit(subject)}
                />
            );
        });

        return (
            <div className='Subjectlist'>
                <h1>I &apos;m in...</h1>
                <button id='create-subject-button' onClick={() => this.setState({create_show: true})}>Create</button>
                <CreateSubject
                    name={this.state.name}
                    description={this.state.description}
                    start_time_hour={this.state.start_time_hour}
                    start_time_min={this.state.start_time_min}
                    duration_hour={this.state.duration_hour}
                    day={this.state.day}
                    show={this.state.create_show}
                    handleCreateShow={this.handleCreateShow}
                    onClickConfirm={this.onClickConfirm}
                    onChangeName={this.onChangeName}
                    onChangeDescription={this.onChangeDescription}
                    onChangeStartTimeHour={this.onChangeStartTimeHour}
                    onChangeStartTimeMin={this.onChangeStartTimeMin}
                    onChangeDurationHour={this.onChangeDurationHour}
                    onChangeDay={this.onChangeDay}
                />
                {this.props.specificSubjectInfo && <UserSubjectInfo
                    key={this.props.specificSubjectInfo.id}
                    name={this.props.specificSubjectInfo.name}
                    description={this.props.specificSubjectInfo.description}
                    days={this.props.specificSubjectInfo.days}
                    start_time_hour={this.props.specificSubjectInfo.start_time_hour}
                    start_time_min={this.props.specificSubjectInfo.start_time_min}
                    duration={this.props.specificSubjectInfo.start_time_min}
                    show={this.state.detail_show}
                    handleDetailShow={this.handleDetailShow}
                    onclickEdit={this.onClickEdit}
                    onClickquit={this.onClickQuit}
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


