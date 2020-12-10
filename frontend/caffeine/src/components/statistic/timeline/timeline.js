/* eslint react/prop-types: 0 */
import React from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Chrono } from 'react-chrono'

const TimeLine=(props)=>{
    
    return(
        <Modal show={props.show} onHide={props.handletimelineShow}>
        <Modal.Header closeButton>
            <Modal.Title>TimeLine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Chrono items={props.timelineData} mode="VERTICAL"></Chrono>
        </Modal.Body>
        <Modal.Footer>
            <Button id='close-button' variant='secondary' onClick={()=>{props.handletimelineShow()}}>Close</Button>
        </Modal.Footer>
        </Modal>
    )   
}

export default TimeLine;