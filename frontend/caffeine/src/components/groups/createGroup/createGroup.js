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
        <Modal show={props.show} onHide={props.handlecreateshow}>
            <Modal.Header closeButton>
                <Modal.Title>Add Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control type="name" value={props.name} placeholder="Group Name"
                            onChange={(event)=>props.onChangeName(event)} />
                    </Form.Group>
                    <Form.Group controlId="formannouncement">
                        <Form.Label>Group Announcement</Form.Label>
                        <Form.Control type="name" value={props.announcement} placeholder="Group Announcement"
                            onChange={(event)=>props.onChangeAnnounce(event)} />
                    </Form.Group>
                    <Form.Group controlId="formpassword">
                        <Form.Label>Group Joining Password</Form.Label>
                        <Form.Control type="password" value={props.password} placeholder="it is optional"
                            onChange={(event)=>props.onChangepassword(event)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" size="sm" id="back-newgroup-button" 
                    onClick={props.handlecreateshow}>back</Button>
                <Button variant="outline-success" size="sm" id="confirm-newgroup-button" 
                    onClick={props.onClickconfirm}>confirm</Button>
            </Modal.Footer>
        </Modal>
    )
}    

export default CreateGroup;