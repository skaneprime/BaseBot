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

        // console.log(this.channel)
        let VoicePanel = async () => {
            let ClientUserIdRes = await axios.get(`http://localhost:5000/api/client/user/id`);
            let CGMV = await axios.get(`http://localhost:5000/api/client/guilds/rbi/${this.channel.guild}/members/rbi/${ClientUserIdRes.data}/voice`);
            // console.log(ClientUserIdRes.data, CGMV.data);
        };
        return (
            <div>
                <button className="channel" onClick={() => joinChannel(this.channel.id)}>
                    { this.channel.name }  
                    {/* { console.log(VoicePanel()) }   */}
                </button>
            </div>
        )
    }
}