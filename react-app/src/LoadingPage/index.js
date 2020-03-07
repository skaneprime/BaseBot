import React from 'react';
import './index.css';

export default function index({ content, state}) {
    let LoadingBar;
    if(state.i === 'infinite') {
        LoadingBar = <div className="loading-bar" style={{ animation: "move 2s linear infinite", background: state.hex }} id="loading-bar" />
    }
    else {
        LoadingBar = <div className="loading-bar" id="loading-bar" style={{ width: state.i * 200, background: state.hex }} />
    }
    return (
        <>
        <div style={{ position: "absolute", top: "50%", left: "40%"}}>
            <div className="bar">
                { LoadingBar }
            </div>
            <h1 className="text" style={{ color: String(content).includes('Error') ? "#808080" : "#818199" }}>{ String(content).includes('Error') ? 'Error has occurred' : content }</h1>
        </div>
        </>
    )
}