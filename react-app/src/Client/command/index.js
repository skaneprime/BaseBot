import LoadingPage from '../../LoadingPage/index';
import React, { Component } from 'react'
import './index.css';

export default class command extends Component {
    constructor({ command }) {
        super();
        
        this.state = {
            command: command,
            ActivatedCSSClassName: 'active',
            loading: true
        };
    }

    LoadData() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve();
            } catch (err) {
                reject(err)
            }
        });
    }

    componentWillMount() {
        this.setState(state => ({ ...state, loading: false }));
    }

    SaveCommand(command) {
        this.setState(command)
    }

    render() {
        if(this.state.loading)
            return <LoadingPage content="Loading" state={{ i: 2, hex: "#A4D792" }}/>

        return (
            <div className={ this.ActivatedCSSClassName }>
                SELECTED { this.state.command.name } 
                <button className="button" onClick={() => this.SaveCommand(this.state.command) }>Save</button>
                <br/>

                Description:
                <br/> 
                <p style={{ fontSize: "15px", color: "white"}}>{ this.state.command.description }</p>
                <br />
                Usage:
                <br/> 
                <p style={{ fontSize: "15px", color: "white"}}>{ this.state.command.usage }</p>
                <br />
            </div>
        )
    }
}
