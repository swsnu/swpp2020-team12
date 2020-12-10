/* eslint react/prop-types: 0 */
import React from 'react';
import './group.css'

const Group = (props) => {
    //console.log(props.announcement)
    return (
        <div id="Group" onClick={props.clickDetail}>
            <div id ="name">
                <span id="name">
                    {props.name}
                </span>
            </div>
            <div id="members">
                <span id="members">
                {props.members} members
            </span>
            </div>
            <div id="active">
                <span id="active">
                {props.activeCount}/5 members active
            </span>
            </div>
            <div id="studyTime"> 
                <span id="studyTime">
                    Average time: {props.averageHours}
                </span>
            </div>
            <div id="announcement">
                {props.announcement!==''&&
                <span id="announcement">
                    Announcement: {props.announcement}
                </span>
                }
            </div>
        </div>
    );
};
export default Group;
