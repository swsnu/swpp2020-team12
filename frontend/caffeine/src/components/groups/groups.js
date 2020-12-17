/* eslint react/prop-types: 0 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../store/actions/index';
import Group from './group/group'
import UserGroupInfo from './userGroupInfo/userGroupInfo'
import CreateGroup from './createGroup/createGroup'
import SelectSubject from '../study/selectSubject/selectSubject'
import './groups.css'
import moment from 'moment'
import { Container , Row, Col, Button } from 'react-bootstrap';


class Groups extends Component {
    state = {
        group_name: '',
        name: '',
        announcement: '',
        password: '',
        createShow: false,
        detailShow: false,
        subjectShow: false,
        subject: null
      }
    componentDidMount(){
        this.props.getAllGroups();
        this.props.getSubjects();
    }
    onSubjectShow = () => {
        this.setState({subjectShow: false})
    }
    clickGroupHandler = (group) => {
        this.props.getGroup(group.id)
        this.setState({detailShow: true})
    }
    handleDetailShow = () => {
        this.setState({detailShow: false})
    }
    handleCreateShow = () => {
        this.setState({createShow: false})
    }
    onChangeName=(event)=>{
        this.setState({name: event.target.value})
    }
    onChangeAnnounce = (event) => {
        this.setState({announcement: event.target.value})
    }
    onChangePassword = (event) => {
        this.setState({password: event.target.value})
    }
    onClickConfirm = () => {
        this.setState({createShow: false})
        this.props.addGroup({
            name: this.state.name,
            description: this.state.announcement,
            password: this.state.password
        })
    }
    onClickQuit=()=>{
        this.setState({detailShow: false});
        this.props.quitGroup(this.props.specificGroupInfo.id);
    }
    onClickStudy=(count)=>{
        if(count>=5){
            alert("can't join. maximum members: 5");
            this.setState({detailShow:false})
        }
        else{
            this.setState({detailShow: false});
            this.setState({subjectShow: true});
        }

    }
    clickSearchedGroupHandler = (group) => {
        this.props.history.push('/group/' + group.id)
    }
    searchHandler = () => {
        this.props.SearchGroups(this.state.group_name)
    }
    //getHours = (duration) => {
    //    const m = moment.duration(duration);
    //    return m.humanize();
    //}
    onClickCheck=(name)=>{
        this.setState({subject: name})
    }
    onClickChoose=()=>{
        this.props.startStudy(this.state.subject, this.props.specificGroupInfo.id)
    }
    render() {
      //   console.log(this.props.myGroupList)
        const groups = this.props.myGroupList.map(group => {
            return (
                <Group
                    key={group.id}
                    name={group.name}
                    members={group.members.length}
                    announcement={group.description}
                    activeCount={group.active_count}
                    clickDetail={() => this.clickGroupHandler(group)}
                />
            );
        });
        const searchedGroups = this.props.searchGroupList.map(group => {
            return (
                <li id = "searched-group-list" key={group.id} onClick={() => this.clickSearchedGroupHandler(group)}>
                    <div id="searched-group-name"><span>{group.name}</span></div>
                    <div id="number-of-member"><span>#members: {group.count}</span></div>
                </li>
            );
        });
        return (
            <Container className='GroupList' id='GroupList'>
                <Row>
                    <Col id='left-col'>
                        <span id="head">I &apos;m in...</span>
                        <Button id='create-group-button' variant="outline-dark" onClick={() => this.setState({
                            createShow: true,
                            group_name: '',
                            name: '',
                            announcement: '',
                            password: '',
                        })}>Create
                        </Button>
                    </Col>
                    <Col>
                        <input type='text' id='group-search-input' value={this.state.group_name} placeholder="Find groups"
                            onChange={(e) => this.setState({group_name: e.target.value})}/>
                        <Button id='group-search-button' variant="outline-dark" onClick={this.searchHandler}>Search</Button>
                    </Col>
                </Row>
                <Row>
                    <Col id='left-col'>
                    <div id="my-group">
                    <CreateGroup
                        name={this.state.name}
                        announcement={this.state.announcement}
                        show={this.state.createShow}
                        password={this.state.password}
                        handleCreateShow={this.handleCreateShow}
                        onClickConfirm={this.onClickConfirm}
                        onChangeName={this.onChangeName}
                        onChangeAnnounce={this.onChangeAnnounce}
                        onChangePassword={this.onChangePassword}
                    />
                    <SelectSubject
                        show={this.state.subjectShow}
                        mySubjectList={this.props.subjectList}
                        subject={this.state.subject}
                        handleSubjectShow={this.onSubjectShow}
                        onClickCheck={this.onClickCheck}
                        onClickChoose={this.onClickChoose}
                    />
                    {this.props.specificGroupInfo && <UserGroupInfo
                        key={this.props.specificGroupInfo.id}
                        group_name={this.props.specificGroupInfo.name}
                        show={this.state.detailShow}
                        members={this.props.specificGroupInfo.members}
                        activeCount={this.props.specificGroupInfo.active_count}
                        handleDetailShow={this.handleDetailShow}
                        onClickQuit={this.onClickQuit}
                        onClickStudy={this.onClickStudy}
                    />
                    }
                    {groups}
                </div>
                    </Col>
                    <Col>
                        <div  id="searched">
                            <ul id="searched-group-ul">
                                {searchedGroups}
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        myGroupList: state.group.myGroupList,
        searchGroupList: state.group.searchGroupList,
        specificGroupInfo: state.group.specificGroupInfo,
        subjectList: state.subject.mySubjectList
    };
}

const mapDispatchToProps = dispatch => {
    return {
        SearchGroups: (group_name) =>
            dispatch(actionCreators.SearchGroups(group_name)),
        getAllGroups: () =>
            dispatch(actionCreators.getGroups()),
        getGroup: (group_id) =>
            dispatch(actionCreators.getGroup(group_id)),
        addGroup: (data) =>
            dispatch(actionCreators.addGroup(data)),
        quitGroup: (group_id) =>
            dispatch(actionCreators.deleteGroup(group_id)),
        getSubjects: () =>
            dispatch(actionCreators.getSubjects()),
        startStudy: (subject, group_id) =>
            dispatch(actionCreators.startStudy(subject, group_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Groups));