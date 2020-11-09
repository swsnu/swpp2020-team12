/* eslint react/prop-types: 0 */
import React from 'react';

const Subject = (props) => {
    return (
        <div className="Subject">
            <div className="name"
                onClick={props.clickDetail}>
                <h3>{props.name}</h3>
            </div>

        </div>
    );
};
export default Subject;
