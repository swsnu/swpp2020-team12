import React from 'react';

const Group = (props) => {
    return (
        <div className="Group">
            <div className="name"
                onClick={props.clickDetail}>
                {props.name}
            </div>
            <div className="members">
                {props.members} members 
            </div>
            <div className="studytime">
                Average time: {props.averagehours}
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
