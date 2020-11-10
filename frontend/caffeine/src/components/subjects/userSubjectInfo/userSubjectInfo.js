/* eslint react/prop-types: 0 */
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../../store/actions/index';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

//TODO: 처음에 원래 값이 render 되는지 보기

const UserSubjectInfo = (props) => {
    console.log(props.duration)
    return (
        <Modal show={props.show} onHide={props.handleDetailShow}>
            <Modal.Header closeButton>
                <Modal.Title>{props.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Subject Description</Form.Label>
                        <Form.Control type="Description" defaultValue={props.description}
                                      onChange={(event) => props.onChangeDescription(event)}/>
                    </Form.Group>

                    <div className="form-group">
                        <label htmlFor="select_day">Day of week(sun:0, ..., sat: 6)</label>
                        <select className="form-control" id="duration_select" defaultValue={props.day}
                                onChange={(event) => props.onChangeDay(event)}>
                            <option></option>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="select_start">select start time</label>
                        <input type='time' id='start_time' value={props.start_time} min='09:00' max='20:00'
                               onChange={(event) => props.onChangeStartTime(event)}/>
                    </div>
                    <div>
                        <label htmlFor="select_end">select end time</label>
                        <input type='time' id='end_time' value={props.end_time} min='09:00' max='22:00'
                               onChange={(event) => props.onChangeEndTime(event)}/>
                    </div>
                </Form>
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

export default UserSubjectInfo;