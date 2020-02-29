import React, { Component } from 'react';
import Command from './command/index';
import './index.css';

export default class index extends Component {
    constructor({ client }) {
        super();

        this.client = client;

        this.state = { SelectedCommand: null, ActivatedCSSClassName: 'active' };

    }
    
    ToggleCommand(command) {
        this.setState(state => ({ 
            ...state,
            SelectedCommand: command.name, 
        }));
    }

    render() {
        return (
            <div className="client">
                { this.client.user.username }'s Commands
                <hr/>
                <div className="command-container">
                { this.client.commands.map(command => (
                    <div className="command" key={command.name} onClick={() => this.ToggleCommand(command)}>
                        { this.state.SelectedCommand !== command.name ? <p className="command_name">{ command.name }</p> : <Command command={command} state={this.state}/> }
                    </div> 
                ))}
                </div>
            </div>
        )
    }
}


// export default function index({ this.client, SelectedCommandName, setSelectedCommandName }) {

//     const ToggleCommand = (command) => {
//         setSelectedCommandName(SelectedCommandName === command.name ? SelectedCommandName : command.name);
//     };
//     return (
//         <div className="this.client">
//             { this.client.user.tag }

//             { this.client.commands.map(command => (
//                 <div className="command" onClick={() => ToggleCommand(command)}>
//                     { SelectedCommandName !== command.name ? command.name : <Command command={command}/> }
//                 </div> 
//             ))}

//         </div>
//     )
// }
