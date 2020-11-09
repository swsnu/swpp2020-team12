/* eslint react/prop-types: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../store/actions/index';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

//TODO: 처음에 원래 값이 render 되는지 보기

const UserGroupInfo=(props) => {
    return(
        <Modal show={props.show} onHide={props.handleDetailShow}>
            <Modal.Header closeButton>
                <Modal.Title>{props.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formDescription">
                        <Form.Label>Subject Description</Form.Label>
                        <Form.Control type="Description" value={props.description}
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" size="sm" id="quit-subject-button"
                    onClick={props.onClickQuit}>delete</Button>
                <Button variant="outline-success" size="sm" id="edit-subject-button"
                    onClick={props.onClickEdit}>edit</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UserGroupInfo;