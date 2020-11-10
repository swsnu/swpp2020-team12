/* eslint react/prop-types: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../store/actions/index';

import Modal from 'react-bootstrap/Modal'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button' 
import moment from 'moment'

const UserGroupInfo=(props) => {
    const memberlist=props.members.map(user=>{
        const gethours =(duration)=>{
            const m=moment.duration(duration);
            return m.humanize();
        }
        console.log(user.studyhour)
        return(
            <ListGroup.Item key={user.id}>
                <div className="name"><h3>{user.name}</h3><h4>{gethours(user.studyhour)}</h4></div>
                <h4>{user.message}</h4>
            </ListGroup.Item>
        );
    })
    return(
        <Modal show={props.show} onHide={props.handleDetailShow}>
            <Modal.Header closeButton>
                <Modal.Title>{props.Groupname}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {memberlist}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" size="sm" id="quit-group-botton" 
                    onClick={props.onClickquit}>leave group</Button> 
                <button id="join-stduy-botton" onClick={props.onClickstudy}>study with me!</button>
            </Modal.Footer>
        </Modal>
    )
}    

export default UserGroupInfo;