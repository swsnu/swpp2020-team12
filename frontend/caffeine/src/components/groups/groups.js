import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../store/actions/index';
import Group from './group/group'
import './groups.css'

class Groups extends Component {
    state = {
        group_name:'Find groups',
        name: '',
        announcement: '',
        content:'',
        passward:'',
        isAddopend: false,
        isDeatilopend: false,
      }
    componentDidMount(){
        this.props.getAllGroups()
    }
    clickGroupHandler = (group)=>{
        this.props.getGroup(group.id)
        this.setState({isAddopend: true})
    }
    clickSearchedGroupHandelr = (group)=>{
        this.props.history.push('/groups/'+group.id)
    }
    searchHandler = ()=>{
        this.props.SearchGroups(this.state.group_name)
    }
    timecounter = (time)=>{
        const hours=time.split('H')
        return(hours)
    }
    render() {
        console.log(this.props.myGroupList)
        const groups = this.props.myGroupList.map(group => {
            return (
                <Group
                    key={group.id}
                    name={group.name}
                    members={group.members}
                    averagehours={this.timecounter(group.time)}
                    announcement={group.description}
                    clickDetail={() => this.clickGroupHandler(group)}
                />
            );
        });
        const searchedgroups = this.props.searchedGroupList.map(group => {
            return (
               <li id={'searched'+group.id} onClick={()=>this.clickSearchedGroupHandelr(group)}>{group.name} 
                    {group.members} members</li>
            );
        });
        return(
            <div className='Grouplist'>
                <h1>I'm in...</h1>
                <button id='create-group-button' onClick={()=>this.setState({isAddopend: true})}>Create</button>
                {groups}
                <div className='searchgroup'>
                    <input type='text' id='group-search-input' value={this.state.group_name} 
                        onChange={(e) => this.setState({group_name: e.target.value})}/>
                    <button id='group-search-button' onClick={this.searchHandler}>Search</button>
                    <ul>
                        {searchedgroups}
                    </ul>
                </div>
            </div>
        )
    }    
}

const mapStateToProps = state => {
    return {
        myGroupList: state.group.myGroupList,
        searchedGroupList: state.group.searchGroupList,
        specificGroupInfo: state.group.specificGroupInfo
    };
  }
  
const mapDispatchToProps = dispatch => {
    return {
        SearchGroups: (group_name) =>
            dispatch(actionCreators.SearchGroups(group_name)),
        getAllGroups: () =>
            dispatch(actionCreators.getGroups()),
        addGroup: (data) =>
            dispatch(actionCreators.addGroup(data)),
        deleteGroup: (group_id) =>
            dispatch(actionCreators.deleteGroup(group_id)),
        getGroup: (group_id) =>
            dispatch(actionCreators.getGroup(group_id))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Groups));