import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

export default class index extends Component {
    constructor({ channel }) {
        super();

        this.channel = channel;

        this.url = null;
        this.state = {};
    }

    render() {
        // console.log(this.channel);
        let joinChannel = (id, e) => {
            axios.post(`http://localhost:5000/api/client/channel/join/${id}`, {
                url: this.url.value
            });
            e.preventDefault();
        };

        // console.log(this.channel)
        // let VoicePanel = async () => {
            // let ClientUserIdRes = await axios.get(`http://localhost:5000/api/client/user/id`);
            // let CGMV = await axios.get(`http://localhost:5000/api/client/guilds/rbi/${this.channel.guild}/members/rbi/${ClientUserIdRes.data}/voice`);
            // console.log(ClientUserIdRes.data, CGMV.data);
        // };
        return (
            <div>
                <form style={{ background: "#2e364d", padding: "5px", marginTop: "15px" }}>

                <button type="submit" style={{ border: "none" }} className="channel" onClick={(e) => joinChannel(this.channel.id, e)}>
                    { this.channel.name }  
                    {/* { console.log(VoicePanel()) }   */}
                </button>
                <input type="text" className="channel_message_param_input" placeholder="Link to Youtube video or audio" ref={ (input) => {
                    return this.url = input
                }} />
                </form>
            </div>
        )
    }
}