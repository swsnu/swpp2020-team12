/* eslint react/prop-types: 0 */
import React from 'react';
import Modal from 'react-bootstrap/Modal'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button' 
import moment from 'moment'

const UserGroupInfo=(props) => {
    const memberList=props.members.map(user=>{
        const getHours =(duration)=>{
            const m=moment.duration(duration);
            return m.humanize();
        }
        return(
            <ListGroup.Item key={user.id}>
                <div className="name"><h3>{user.name}</h3><h4>{getHours(user.studyhour)}</h4></div>
                <h4>{user.message}</h4>
            </ListGroup.Item>
        );
    })
    return(
        <Modal show={props.show} onHide={props.handleDetailShow}>
            <Modal.Header closeButton>
                <Modal.Title>{props.group_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {memberList}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" size="sm" id="quit-group-button"
                    onClick={props.onClickQuit}>leave group</Button>
                <button id="join-study-button" onClick={props.onClickStudy}>study with me!</button>
            </Modal.Footer>
        </Modal>
    )
}    

export default UserGroupInfo;