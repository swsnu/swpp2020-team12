/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../store/actions/index';
import Button from 'react-bootstrap/Button'

class Groups extends Component {
    componentDidMount(){
        this.props.getGroup(this.props.match.params.group_id)
    }
    onClickjoin=()=>{
        this.props.joingroup(this.props.unenrolledGroupInfo.id)
        this.props.history.push('/group')
    }
    render() {
        if(this.props.unenrolledGroupInfo){
            return(
                <div className='GroupInfo'>
                    <h1>{this.props.unenrolledGroupInfo.name}</h1>
                    &nbsp;
                    <h2>Description: {this.props.unenrolledGroupInfo.description}</h2>
                    &nbsp;
                    <h2>Average Study Time: {this.props.unenrolledGroupInfo.time}</h2>
                    <Button variant="outline-dark" size="sm" id="join-group-button"
                        onClick={this.onClickjoin}>Join Group</Button>
                </div>
            )
        }
        else{
            return(<div className='GroupInfo'/>)
        }
    }    
}

const mapStateToProps = state => {
    return {
        unenrolledGroupInfo: state.group.unenrolledGroupInfo
    };
  }
  
const mapDispatchToProps = dispatch => {
    return {
        getGroup: (group_id) =>
            dispatch(actionCreators.getunEnrolled(group_id)),
        joingroup: (data)=>
            dispatch(actionCreators.joinGroup(data))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Groups));