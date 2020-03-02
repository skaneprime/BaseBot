import React from 'react';
import './index.css';

export default function index({ content, state}) {
    console.log(content);
    return (
        <div style={{ position: "absolute", top: "50%", left: "40%"}}>
            <div className="bar">
                <div className="loading-bar" id="loading-bar" style={{ width: state.i * 200, background: state.hex }} />
            </div>
            <h1 className="text" style={{ color: String(content).includes('Error') ? "#808080" : "#818199" }}>{ String(content).includes('Error') ? 'Error has occurred' : content }</h1>
        </div>
    )
}