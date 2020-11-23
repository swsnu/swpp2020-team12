/* eslint react/prop-types: 0 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../store/actions/index';
import './ranking.css'
import moment from 'moment'

class Ranking extends Component {
    state = {
        dayShow: true,
        selectedGroupId: -1
    }

    componentDidMount() {
        this.props.getAllGroups();
        this.props.userDayRank();
        this.props.groupDayRank(this.state.selectedGroupId);
    }

    onChangeGroup = (event) => {
        this.setState({selectedGroupId: event.target.value})
        if (this.state.dayShow) this.props.groupDayRank(event.target.value)
        else this.props.groupTotalRank(event.target.value)
    }
    onChangeDuration = (event) => {
        this.setState({dayShow: !this.state.dayShow})
        if (this.state.dayShow) {
            this.props.userTotalRank()
            this.props.groupTotalRank(this.state.selectedGroupId)
        } else {
            this.props.userDayRank()
            this.props.groupDayRank(this.state.selectedGroupId)
        }
    }
    getHours = (duration) => {
        const m = moment.duration(duration);
        return m.humanize();
    }

    render() {
        let index = 0;
        const userList = this.props.userRank && (this.props.userRank.map(member => {
                return (
                    <tr key={++index}>
                        <th scope="row">{index}</th>
                        <td>{member.name}</td>
                        <td>{this.getHours(member.time)}</td>
                    </tr>
                )
            })
        )
        const userTable = this.props.myUserRank &&
            <tbody>
            {userList}
            <tr>
                <th scope="row">{this.props.myUserRank.rank}</th>
                <td>{this.props.myUserRank.record.name}</td>
                <td>{this.getHours(this.props.myUserRank.record.time)}</td>
            </tr>
            </tbody>

        const groupOption = this.props.myGroupList && (this.props.myGroupList.map(group => {
                return (
                    <option key={group.id} value={group.id}>{group.name}</option>
                );
            })
        )
        const groupSelect = <select id="group-select" value={this.state.selectedGroupId}
                                    onChange={(event) => this.onChangeGroup(event)}>
            <option key={-1} value={-1}>---------</option>
            {groupOption}
        </select>
        index = 0;
        const groupList = this.props.groupRank && this.props.groupRank.map(member => {
            return (
                <tr key={++index}>
                    <th scope="row">{index}</th>
                    <td>{member.name}</td>
                    <td>{this.getHours(member.time)}</td>
                </tr>
            )
        })
        const groupTable = this.props.myGroupRank &&
            <tbody>
            {groupList}
            <tr>

                <th scope="row">{this.props.myGroupRank.rank}</th>
                <td>{this.props.myGroupRank.record.name}</td>
                <td>{this.getHours(this.props.myGroupRank.record.time)}</td>
            </tr>
            </tbody>


        return (
            <div className='Rank'>
                <button id='show-day-rank'
                        onClick={() => this.onChangeDuration()}
                        disabled={this.state.dayShow}>day
                </button>
                <button id='show-total-rank'
                        onClick={() => this.onChangeDuration()}
                        disabled={!this.state.dayShow}>total
                </button>
                <div id="user-rank">
                    <h1 id="user-rank-head">User Rank</h1>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">rank</th>
                            <th scope="col">user</th>
                            <th scope="col">time</th>
                        </tr>
                        </thead>
                        {userTable}
                    </table>
                </div>

                <h1 id="group-rank-head">Group Rank</h1>
                {groupSelect}
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">rank</th>
                        <th scope="col">user</th>
                        <th scope="col">time</th>
                    </tr>
                    </thead>
                    {groupTable}
                </table>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        myGroupList: state.group.myGroupList,
        userRank: state.rank.userRank,
        myUserRank: state.rank.myUserRank,
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