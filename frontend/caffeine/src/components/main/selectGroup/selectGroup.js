/* eslint react/prop-types: 0 */
import React from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const SelectGroup=(props)=>{
    const groups=props.myGroupList.map(group=>{
        return(
            <div className='group' key={group.id}>
                 {group.name} {group.active_count}/5
                <input type='checkbox' checked={props.group===group.id}
                       disabled={group.active_count>=5}
                    onClick={()=>props.onClickCheck(group.id, group.active_count)}/>
            </div>
        )
    })
    return(
        <Modal show={props.show} onHide={props.handleGroupShow}>
        <Modal.Header closeButton>
            <Modal.Title>Groups</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                {groups}
        </Modal.Body>
        <Modal.Footer>
            <Button size="sm" disabled={props.group===-1} id="start-study-button"
                onClick={props.onClickChoose}>Choose Group</Button>
        </Modal.Footer>
        </Modal>
    )   
}

export default SelectGroup;