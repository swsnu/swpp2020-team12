import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../store/actions/index';

import Modal from 'react-bootstrap/Modal'
import ListGroup from 'react-bootstrap/ListGroup' 

const userGroupInfo=(props) => {
    const userlist=props.GroupInfo.map(user=>{
        return(
            <ListGroup.Item>
                {user.name}
                {user.stdyhour}
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
                    {userlist}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <button id="join-stduy-botton" />
            </Modal.Footer>
        </Modal>
    )
}    

export default userGroupInfo;