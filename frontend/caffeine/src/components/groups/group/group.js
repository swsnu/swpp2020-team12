/* eslint react/prop-types: 0 */
import React from 'react';
import './group.css'

const Group = (props) => {
    //console.log(props.announcement)
    return (
        <div id="Group" onClick={props.clickDetail}>
            <span id="name">
                {props.name}
            </span>
            <span id="members">
                {props.members} members
            </span>
            <span id="studyTime">
                Average time: {props.averageHours}
            </span>
            {props.announcement!==''&&
            <span id="announcement">
                Announcement: {props.announcement}
            </span>
            }
        </div>
    );
};
export default Group;
