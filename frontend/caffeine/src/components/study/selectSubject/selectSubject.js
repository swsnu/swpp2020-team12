/* eslint react/prop-types: 0 */
import React from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const SelectSubject=(props)=>{
    //console.log("hi")
    const subjects=props.mySubjectList.map(subject=>{
        return(
            <div className='subject' key={subject.id}>
                {subject.name}
                <input type='checkbox' checked={props.subject===subject.name}
                    onClick={()=>props.onClickCheck(subject.name)}/>
            </div>
        )
    })
    return(
        <Modal show={props.show} onHide={props.handleSubjectShow}>
        <Modal.Header closeButton>
            <Modal.Title>Subjects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                {subjects}
        </Modal.Body>
        <Modal.Footer>
            <Button size="sm" disabled={props.subject===null} id="start-study-button"
                onClick={props.onClickChoose}>Choose Subject</Button>
        </Modal.Footer>
        </Modal>
    )   
}

export default SelectSubject;