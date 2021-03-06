/* eslint react/prop-types: 0 */
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import "./mainPage.css"
import SelectSubject from "../study/selectSubject/selectSubject";
import SelectGroup from "./selectGroup/selectGroup";
import * as actionCreators from "../../store/actions";
import {connect} from "react-redux";
import {Button} from "react-bootstrap"

class MainPage extends Component {

    state = {
        subjectShow: false,
        groupShow: false,
        subject: null,
        group_id: -1,
    }

    componentDidMount() {
        this.props.getGroups();
        this.props.getSubjects();
    }

    handleSubjectShow = () => {
        this.setState({subjectShow: false})
    }
    onClickCheckSubject = (name) => {
        this.setState({subject: name})
    }
    onClickChooseSubject = () => {
        this.setState({subjectShow: false, groupShow: true})
    }
    handleGroupShow = () => {
        this.setState({groupShow: false})
    }
    onClickCheckGroup = (group_id) => {
        this.setState({group_id: group_id})
    }
    onClickChooseGroup = () => {
        this.props.startStudy(this.state.subject, this.state.group_id)
    }

    render() {
        return (
            <div id="Main">
                <span id="logo_text">Caffeine Camera</span>
                
                    <div id='body'>Register your subject</div>
                    <div id='body'>Make or find a group</div>
                    <div id='body'>Are you ready to study?</div>
                
                <div>
                    <Button id="study-button" variant="outline-danger">
                        <span id="study-button" onClick={() => {
                            this.setState({subjectShow: true})
                        }}>Study</span>
                    </Button>
                    <SelectSubject
                        show={this.state.subjectShow}
                        handleSubjectShow={this.handleSubjectShow}
                        mySubjectList={this.props.mySubjectList}
                        subject={this.state.subject}
                        onClickCheck={this.onClickCheckSubject}
                        onClickChoose={this.onClickChooseSubject}
                    />
                    <SelectGroup
                        show={this.state.groupShow}
                        handleGroupShow={this.handleGroupShow}
                        myGroupList={this.props.myGroupList}
                        group={this.state.group_id}
                        onClickCheck={this.onClickCheckGroup}
                        onClickChoose={this.onClickChooseGroup}
                    />
                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        myGroupList: state.group.myGroupList,
        mySubjectList: state.subject.mySubjectList,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getGroups: () =>
            dispatch(actionCreators.getGroups()),
        getSubjects: () =>
            dispatch(actionCreators.getSubjects()),
        startStudy: (subject, group_id) =>
            dispatch(actionCreators.startStudy(subject, group_id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage));