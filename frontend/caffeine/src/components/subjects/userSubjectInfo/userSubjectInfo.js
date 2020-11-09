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
    return (
        <Modal show={props.show} onHide={props.handleDetailShow}>
            <Modal.Header closeButton>
                <Modal.Title>{props.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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

                <div className="form-group">
                    <label htmlFor="select_hour">Start time hour</label>
                    <select className="form-control" id="hour_select" defaultValue={props.start_time_hour}
                            onChange={(event) => props.onChangeStartTimeHour(event)}>
                        <option></option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="select_minute">Start time(minute)</label>
                    <select className="form-control" id="minute_select" defaultValue={props.start_time_min}
                            onChange={(event) => props.onChangeStartTimeMin(event)}>
                        <option></option>
                        <option>00</option>
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="select_duration">Duration(hour)</label>
                    <select className="form-control" id="duration_select" defaultValue={props.duration_hour}
                            onChange={(event) => props.onChangeDurationHour(event)}>
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </div>
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