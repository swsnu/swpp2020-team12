/* eslint react/prop-types: 0 */
import React from 'react';
import './group.css'

const Group = (props) => {
    console.log(props.announcement)
    return (
        <div id="Group" onClick={props.clickDetail}>
            <div id="name">
                {props.name}
            </div>
            <div id="members">
                {props.members} members
            </div>
            <div id="studytime">
                Average time: {props.averagehours}
            </div>
            {props.announcement!==''&&
            <div id="announcement">
                Announcement: {props.announcement}
            </div>
            }
        </div>
    );
};
export default Group;
