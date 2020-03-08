import React, { Component } from 'react';
import getData from './../Functions/GetData';
import LoadingPage from '../LoadingPage/index';
import Command from './command/index';
import './index.css';

export default class index extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            client: {}, 
            SelectedCommand: null, 
            ActivatedCSSClassName: 'active' 
        };

    }
    
    ToggleCommand(command) {
        this.setState(state => ({ 
            ...state,
            SelectedCommand: command.name, 
        }));
    }

    LoadData() {
        return new Promise(async (resolve, reject) => {
            try {
                let client = await getData('client');
                client.user = await getData('client/user');
                client.commands = await getData('client/commands');
                resolve(client);
            } catch (err) {
                reject(err)
            }
        });
    }

    componentWillMount() {
        this.setState(state => ({ ...state, loading: true }));
        this.LoadData()
        .then(data => {
            this.setState(state => ({ ...state, client: data, loading: false }));
        });
    }

    render() {
        if(this.state.loading)
            return <LoadingPage content="Loading" state={{ i: 2, hex: "#A4D792" }}/>

        return (
            <>
            <div className="client">
                <div class="title-container"><h1>{ this.state.client.user.username }'s Commands</h1></div>

                <div className="command-container">
                { this.state.client.commands.filter(c => !c.invincible).map(command => (
                    <div className="command" key={command.name} onClick={() => this.ToggleCommand(command)}>
                        { this.state.SelectedCommand !== command.name ? <p className="command_name">{ command.name }</p> : <Command command={command} /> }
                    </div> 
                ))}
                </div>
            </div>
            </>
        )
    }
}


// export default function index({ this.state.client, SelectedCommandName, setSelectedCommandName }) {

//     const ToggleCommand = (command) => {
//         setSelectedCommandName(SelectedCommandName === command.name ? SelectedCommandName : command.name);
//     };
//     return (
//         <div className="this.state.client">
//             { this.state.client.user.tag }

//             { this.state.client.commands.map(command => (
//                 <div className="command" onClick={() => ToggleCommand(command)}>
//                     { SelectedCommandName !== command.name ? command.name : <Command command={command}/> }
//                 </div> 
//             ))}

//         </div>
//     )
// }
