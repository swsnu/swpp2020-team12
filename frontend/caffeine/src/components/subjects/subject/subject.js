/* eslint react/prop-types: 0 */
import React from 'react';
import './subject.css'

const Subject = (props) => {
    return (
        <div className="Subject">
            <div className="name"
                onClick={props.clickDetail}>
                <h3 id="subject-name">{props.name}</h3>
            </div>

        </div>
    );
};
export default Subject;
