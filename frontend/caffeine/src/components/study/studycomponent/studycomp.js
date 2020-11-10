/* eslint react/prop-types: 0 */
import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'

const Studycomp = (props) => {
    const bar = props.rate>0.8 ? <ProgressBar striped variant="danger" animated now={props.rate*100} />
    : props.rate>0.6 ? <ProgressBar variant="warning" now={props.rate*100} /> :
    <ProgressBar variant="info" now={props.rate*100} />;
    return (
        <div className="User">
            <div className="img">
                <img className='last_img' src={props.image}/>
            </div>
            <div className="username">{props.name}</div>
            <div className="state"> {props.state} </div>
            <div className="bar">
                {bar}
            </div>
        </div>
    );
};
export default Studycomp;
