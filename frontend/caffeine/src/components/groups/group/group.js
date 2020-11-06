/* eslint react/prop-types: 0 */
import React from 'react';

const Group = (props) => {
    console.log(props.announcement)
    return (
        <div className="Group">
            <div className="name"
                onClick={props.clickDetail}>
                <h3>{props.name}</h3>
            </div>
            <div className="members">
                <h4>{props.members} members</h4>
            </div>
            <div className="studytime">
                <h4>Average time: {props.averagehours}</h4>
            </div>
            {props.announcement!==''&&
            <div className="announcement">
                Announcement: {props.announcement}
            </div>
            }
        </div>
    );
};
export default Group;
