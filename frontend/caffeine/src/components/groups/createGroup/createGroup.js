/* eslint react/prop-types: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../store/actions/index';

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreateGroup=(props) => {
    return(
        <Modal show={props.show} onHide={props.handleCreateShow}>
            <Modal.Header closeButton>
                <Modal.Title>Add Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control id='create-group-name-input' type="name" value={props.name} placeholder="Group Name"
                            onChange={(event)=>props.onChangeName(event)} />
                    </Form.Group>
                    <Form.Group controlId="formAnnouncement">
                        <Form.Label>Group Announcement</Form.Label>
                        <Form.Control id='create-group-announce-input' type="name" value={props.announcement} placeholder="Group Announcement"
                            onChange={(event)=>props.onChangeAnnounce(event)} />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Group Joining Password</Form.Label>
                        <Form.Control id='create-group-password-input' type="password" value={props.password} placeholder="it is optional"
                            onChange={(event)=>props.onChangePassword(event)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" size="sm" id="back-newGroup-button"
                    onClick={props.handleCreateShow}>back</Button>
                <Button variant="outline-success" size="sm" id="confirm-newGroup-button"
                    onClick={props.onClickConfirm}>confirm</Button>
            </Modal.Footer>
        </Modal>
    )
}    

export default CreateGroup;