/* eslint react/prop-types: 0 */
import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreateSubject = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleCreateShow}>
            <Modal.Header closeButton>
                <Modal.Title>Add Subject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Subject Name</Form.Label>
                        <Form.Control id='create-subject-name-input' type="name" value={props.name} placeholder="Subject Name"
                                      onChange={(event) => props.onChangeName(event)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Subject Description</Form.Label>
                        <Form.Control id='create-subject-description-input' type="Description" value={props.description} placeholder="Subject Description"
                                      onChange={(event) => props.onChangeDescription(event)}/>
                    </Form.Group>

                    <div className="form-group">
                        <label htmlFor="select_day">Day of week</label>
                        <select className="form-control" id="day-select" value={props.day}
                                onChange={(event) => props.onChangeDay(event)}>
                            <option value={0}>Sun</option>
                            <option value={1}>Mon</option>
                            <option value={2}>Tue</option>
                            <option value={3}>Wed</option>
                            <option value={4}>Thu</option>
                            <option value={5}>Fri</option>
                            <option value={6}>Tue</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="select_start">select start time</label>
                        <input type='time' id='start-time' value={props.start_time} min='09:00' max='20:00'
                               onChange={(event) => props.onChangeStartTime(event)}/>
                    </div>
                    <div>
                        <label htmlFor="select_end">select end time</label>
                        <input type='time' id='end-time' value={props.end_time} min='09:00' max='22:00'
                               onChange={(event) => props.onChangeEndTime(event)}/>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" size="sm" id="back-new-subject-button"
                        onClick={props.handleCreateShow}>back</Button>
                <Button variant="outline-success" size="sm" id="confirm-new-subject-button"
                        onClick={props.onClickConfirm}>confirm</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateSubject;
