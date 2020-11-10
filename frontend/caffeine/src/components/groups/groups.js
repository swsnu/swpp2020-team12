/* eslint react/prop-types: 0 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../store/actions/index';
import Group from './group/group'
import UserGroupInfo from './userGroupInfo/userGroupInfo'
import CreateGroup from './createGroup/createGroup'
import Selectsubject from '../study/selectSubject/selectSubject'
import './groups.css'
import moment from 'moment'

const mockuser = {
    id: 1,
    name: "tesuser1",
    stdyhour: "2hour",
    message: "I'm good"
}

class Groups extends Component {
    state = {
        group_name: '',
        name: '',
        announcement: '',
        password: '',
        Createshow: false,
        Detailshow: false,
        Subjectshow: false,
        subject: null
      }
    componentDidMount(){
        this.props.getAllGroups();
        this.props.getSubjects();
    }

    clickGroupHandler = (group) => {
        this.props.getGroup(group.id)
        this.setState({Detailshow: true})
    }
    handleDetailShow = () => {
        this.setState({Detailshow: false})
    }
    handlecreateshow = () => {
        this.setState({Createshow: false})
    }
    handlesubjectshow=()=>{
        this.setState({Subjectshow: false})
    }
    onChangeName=(event)=>{
        this.setState({name: event.target.value})
    }
    onChangeAnnounce = (event) => {
        this.setState({announcement: event.target.value})
    }
    onChangepassword = (event) => {
        this.setState({password: event.target.value})
    }
    onClickconfirm = () => {
        this.setState({Createshow: false})
        this.props.addgroup({
            name: this.state.name,
            description: this.state.announcement,
            password: this.state.password
        })
    }
    onClickquit=()=>{
        this.setState({Detailshow: false});
        this.props.quitgroup(this.props.specificGroupInfo.id);
    }
    onClickstudy=()=>{
        this.setState({Detailshow: false});
        this.setState({Subjectshow: true});
    }
    clickSearchedGroupHandelr = (group) => {
        this.props.history.push('/group/' + group.id)
    }
    searchHandler = () => {
        this.props.SearchGroups(this.state.group_name)
    }
    gethours = (duration) => {
        const m = moment.duration(duration);
        return m.humanize();
    }
    onClickcheck=(name)=>{
        this.setState({subject: name})
    }
    onClickchoose=()=>{
        this.props.startStudy(this.state.subject, this.props.specificGroupInfo.id)
    }
    render() {
         console.log(this.props.myGroupList)
        const groups = this.props.myGroupList.map(group => {
            return (
                <Group
                    key={group.id}
                    name={group.name}
                    members={group.members.length}
                    averagehours={this.gethours(group.time)}
                    announcement={group.description}
                    clickDetail={() => this.clickGroupHandler(group)}
                />
            );
        });
        const searchedgroups = this.props.searchGroupList.map(group => {
            return (
                <li id = "searched-group-list" key={group.id} onClick={() => this.clickSearchedGroupHandelr(group)}>
                    <div id="searched-group-name">{group.name}</div><div id="number-of-member">#members: {group.count}</div></li>
            );
        });
        return (
            <div className='Grouplist'>
                <h1 id="head">I &apos;m in...</h1>
                <button id='create-group-button' onClick={() => this.setState({
                    Createshow: true,
                    group_name: '',
                    name: '',
                    announcement: '',
                    password: '',
                })}>Create
                </button>
                <div id="mygroup">
                    <CreateGroup
                        name={this.state.name}
                        announcement={this.state.announcement}
                        show={this.state.Createshow}
                        password={this.state.password}
                        handlecreateshow={this.handlecreateshow}
                        onClickconfirm={this.onClickconfirm}
                        onChangeName={this.onChangeName}
                        onChangeAnnounce={this.onChangeAnnounce}
                        onChangepassword={this.onChangepassword}
                    />
                    <Selectsubject 
                        show={this.state.Subjectshow}
                        handlesubjectshow={this.handlesubjectshow}
                        mySubjectList={this.props.subjectList}
                        subject={this.state.subject}
                        onClickcheck={this.onClickcheck}
                        onClickchoose={this.onClickchoose}
                    />
                    {this.props.specificGroupInfo && <UserGroupInfo
                        key={this.props.specificGroupInfo.id}
                        Groupname={this.props.specificGroupInfo.name}
                        show={this.state.Detailshow}
                        members={this.props.specificGroupInfo.members}
                        handleDetailShow={this.handleDetailShow}
                        onClickquit={this.onClickquit}
                        onClickstudy={this.onClickstudy}
                    />
                    }
                    {groups}
                </div>
                <div id='searchgroup'>
                    <input type='text' id='group-search-input' value={this.state.group_name} placeholder="Find groups"
                           onChange={(e) => this.setState({group_name: e.target.value})}/>
                    <button id='group-search-button' onClick={this.searchHandler}>Search</button>
                    <div  id="searched">
                        <ul>
                            {searchedgroups}
                        </ul>
                    </div>
                    
                </div>
                <div id='wrap'>
                    <button id="home" onClick={() => {
                        this.props.history.push('/')
                    }}>Home
                    </button>
                </div>

            </div>
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
        addgroup: (data) =>
            dispatch(actionCreators.addGroup(data)),
        quitgroup: (group_id) =>
            dispatch(actionCreators.deleteGroup(group_id)),
        getSubjects: () =>
            dispatch(actionCreators.getSubjects()),
        startStudy: (subject, group_id) =>
            dispatch(actionCreators.startStudy(subject, group_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Groups));