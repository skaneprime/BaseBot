/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'
import './index.css';

export default class command extends Component {
    constructor({ command, state }) {
        super();

        this.state = command;

        this.ActivatedCSSClassName = state.ActivatedCSSClassName;
    }

    SaveCommand(command) {
        this.setState(command)
    }

    render() {
        // console.log(this.ActivatedCSSClassName);
        return (
            <div className={ this.ActivatedCSSClassName }>
                SELECTED { this.state.name } 
                <button className="button" onClick={() => this.SaveCommand(this.state) }>Save</button>
                <br/>

                Description:
                <br/> 
                <textarea defaultValue={ this.state.description } />
            </div>
        )
    }
}
