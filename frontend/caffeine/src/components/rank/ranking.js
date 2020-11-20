/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../store/actions/index';
import './ranking.css'
import moment from 'moment'

class Ranking extends Component {
    state = {
        dayShow: true,
        selectedGroup: null
    }

    componentDidMount() {
        this.props.getAllGroups();
        this.props.userDayRank();
        //group 없는 유저라면?
    }

    onChangeGroup = (group) => {
        if (this.state.dayShow === true) this.props.groupDayRank(group.id)
        else this.props.groupTotalRank(group.id)
        //        this.setState({selectedGroup: }) -> 필요할까?
    }
    onChangeDuration = (event) => {
        this.setState({ dayShow: !this.state.dayShow })
    }
    getHours = (duration) => {
        const m = moment.duration(duration);
        return m.humanize();
    }

    render() {
        let index=0;
        const userList = this.props.userRank.map(member => {
            return (
                <div>
                    <th scope="row">{++index}</th>
                    <td>{member.name}</td>
                    <td>{getHours(member.time)}</td>
                </div>
            )
        })
        const userTable = <table class="table">
            <thead>
                <tr>
                    <th scope="col">rank</th>
                    <th scope="col">user</th>
                    <th scope="col">time</th>
                </tr>
            </thead>
            <tbody>
                {userList}
            </tbody>
            <tbody>
                <th scope="row">{this.props.myGroupRank.rank}</th>
                <td>{this.props.myGroupRank.record.name}</td>
                <td>{getHours(this.props.myGroupRank.record.time)}</td>
            </tbody>
        </table>

        const groupOption = this.props.myGroupList.map(group => {
            return (
                <option value={group.id}>{group.name}</option>
            );
        });
        const groupSelect = <select id="group-select"
            onChange={(event) => this.onChangeGroup(event)}>
            <option value={-1}>----</option>
            {groupOption}
        </select>
        index = 0;
        const groupList = this.props.myGroupRank.map(member => {
            return (
                <div>
                    <th scope="row">{++index}</th>
                    <td>{member.name}</td>
                    <td>{this.getHours(member.time)}</td>
                </div>
            )
        })
        const groupTable = <table class="table">
            <thead>
                <tr>
                    <th scope="col">rank</th>
                    <th scope="col">user</th>
                    <th scope="col">time</th>
                </tr>
            </thead>
            <tbody>
                {groupList}
            </tbody>
            <tbody>
                <th scope="row">{this.props.myGroupRank.rank}</th>
                <td>{this.props.myGroupRank.record.name}</td>
                <td>{getHours(this.props.myGroupRank.record.time)}</td>
            </tbody>
        </table>



        return (
            <div className='Rank'>
                <div id = "user-rank">
                <h1 id="user-rank-head">User Rank</h1>
                {userTable}
                </div>

                <h1 id="group-rank-head">Group Rank</h1>
                {groupSelect}
                {groupTable}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        myGroupList: state.group.myGroupList,
        userRank: state.rank.userRank,
        myUserRank: state.rank.myGroupRank,
        groupRank: state.rank.groupRank,
        myGroupRank: state.rank.myGroupRank
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllGroups: () =>
            dispatch(actionCreators.getGroups()),
        groupDayRank: (group_id) =>
            dispatch(actionCreators.getGroupDayRank(group_id)),
        groupTotalRank: (group_id) =>
            dispatch(actionCreators.getGroupTotalRank(group_id)),
        userDayRank: () =>
            dispatch(actionCreators.getUserDayRank()),
        userTotalRank: () =>
            dispatch(actionCreators.getUserTotalRank()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Ranking));