/* eslint react/prop-types: 0 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../../store/actions/index';
import Button from 'react-bootstrap/Button'
import moment from "moment";
import './GroupInfo.css'

class Groups extends Component {

    componentDidMount() {
        this.props.getGroup(this.props.match.params.group_id)
    }

    onClickJoin = () => {
        if (this.props.unenrolledGroupInfo.password === '' || this.props.unenrolledGroupInfo.password === undefined)
            this.props.joinGroup({'id': this.props.unenrolledGroupInfo.id, 'password': ''});
        else {
            let password = prompt('enter password');
            this.props.joinGroup({'id': this.props.unenrolledGroupInfo.id, 'password': password});
        }
    }
    getHours = (duration) => {
        const m = moment.duration(duration);
        return m.humanize();
    }

    render() {
        if (this.props.unenrolledGroupInfo) {
            return (
                <body>
                    <div className='GroupInfo' id="GroupInfo">
                    <h1 id="GroupName">{this.props.unenrolledGroupInfo.name}</h1>
                    &nbsp;
                    <h2>Description: {this.props.unenrolledGroupInfo.description}</h2>
                    &nbsp;
                    <h2>Average Study Time: {this.getHours(this.props.unenrolledGroupInfo.time)}</h2>
                    <Button variant="outline-dark" size="sm" id="join-group-button"
                            onClick={this.onClickJoin}>Join Group</Button>
                    <Button variant="outline-dark" size="sm" id="cancel-button"
                            onClick={()=>this.props.history.push('/group')}>Cancel</Button>
                </div>
                </body>
                
            )
        } else {
            return (<div className='GroupInfo'/>)
        }
    }
}

const mapStateToProps = state => {
    return {
        unenrolledGroupInfo: state.group.unenrolledGroupInfo,
        myGroupList: state.group.myGroupList
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getGroup: (group_id) =>
            dispatch(actionCreators.getunEnrolled(group_id)),
        joinGroup: (data) =>
            dispatch(actionCreators.joinGroup(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Groups));