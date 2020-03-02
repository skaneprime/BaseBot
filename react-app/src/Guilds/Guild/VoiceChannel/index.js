import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

export default class index extends Component {
    constructor({ channel }) {
        super();

        this.channel = channel;

        this.state = {};
    }

    render() {
        // console.log(this.channel);
        let joinChannel = (id) => {
            axios.post(`http://localhost:5000/api/client/channel/join/${id}`, {
                url: "https://cdn.discordapp.com/attachments/384674872787206147/681914074036305949/lolicon.mp3"
            })
        };

        return (
            <>
                <button className="channel" onClick={() => joinChannel(this.channel.id)}>
                    { this.channel.name }    
                </button>
            </>
        )
    }
}