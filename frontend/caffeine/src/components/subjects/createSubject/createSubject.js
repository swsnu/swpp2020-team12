/* eslint react/prop-types: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../store/actions/index';

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreateSubject=(props) => {
    return(
        <Modal show={props.show} onHide={props.handlecreateshow}>
            <Modal.Header closeButton>
                <Modal.Title>Add Subject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Subject Name</Form.Label>
                        <Form.Control type="name" value={props.name} placeholder="Subject Name"
                            onChange={(event)=>props.onChangeName(event)} />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Subject Description</Form.Label>
                        <Form.Control type="Description" value={props.description} placeholder="Subject Description"
                            onChange={(event)=>props.onChangeDescription(event)} />
                    </Form.Group>
                    <Form.Group controlId="formDay">
                        <Form.Label>Subject Day</Form.Label>
                        <Form.Control type="Day" value={props.day} placeholder="Subject Day(optional)"
                            onChange={(event)=>props.onChangeDay(event)} />
                    </Form.Group>
                    <Form.Group controlId="formStartTimeHour">
                        <Form.Label>Subject StartTimeHour</Form.Label>
                        <Form.Control type="StartTimeHour" value={props.start_time_hour} placeholder="Subject Start Time Hour"
                            onChange={(event)=>props.onChangeStartTimeHour(event)} />
                    </Form.Group>
                    <Form.Group controlId="formStartTimeMin">
                        <Form.Label>Subject StartTimeMin</Form.Label>
                        <Form.Control type="StartTimeMin" value={props.start_time_min} placeholder="Subject Start Time Min"
                            onChange={(event)=>props.onChangeStartTimeMin(event)} />
                    </Form.Group>
                    <Form.Group controlId="formDurationHour">
                        <Form.Label>Subject Duration Hour</Form.Label>
                        <Form.Control type="Duration Hour" value={props.duration_hour} placeholder="Subject Duration Hour"
                            onChange={(event)=>props.onChangeDurationHour(event)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" size="sm" id="back-newsubject-button"
                    onClick={props.handleCreateShow}>back</Button>
                <Button variant="outline-success" size="sm" id="confirm-newsubject-button"
                    onClick={props.onClickConfirm}>confirm</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateSubject;