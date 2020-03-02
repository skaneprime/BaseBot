import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import TextChannel from './TextChannel/index';
import VoiceChannel from './VoiceChannel/index';
import Member from './Member/index';
import './FullGuild.css';

export default class FullGuild extends Component {
    constructor({ guild }) {
        super();

        this.guild = guild;

        this.state = {};
    }
    render() {
        let ChannelList = [];
        this.guild.channels.map((channel) => {
            if(channel.type === 'category')
                ChannelList.push({ category: channel, channels: [] });    
            else {
                for (let i = 0; i < ChannelList.length; i++) {  
                    if(ChannelList[i].category.id === channel.parentID && channel.type === 'text')
                        ChannelList[i].channels.push(<TextChannel channel={channel} key={channel.id} />);
                    else if(ChannelList[i].category.id === channel.parentID && channel.type === 'voice')
                        ChannelList[i].channels.push(<VoiceChannel channel={channel} key={channel.id} />);
                }
            }
            return channel; 
        });

        let JSXChannels = ChannelList.map(data => (
            <div key={Math.floor(Math.random() * 500000)} style={{ display: "block" }}>
                <button className="category" onClick={() => document.getElementById(data.category.id).style.display = document.getElementById(data.category.id).style.display === 'none' ? 'initial' : 'none'}>{data.category.name}</button>
                <div id={data.category.id} className="category-channel-container">
                    { data.channels }
                </div>
            </div>
        )); 
        
        let MemberList = this.guild.members.map(member => { 
            return (<Member key={member.userID} member={member} />)
        });

        return (
            <div className="container">
                <div className="Menu">  
                    <Link className="MenuButton" to={`/guilds`}>
                        <img className="MenuButtonImage" alt="RETURN BUTTON" src="https://image.flaticon.com/icons/svg/2223/2223675.svg" width="64px" height="64px" />
                    </Link>
                    <Link className="MenuButton" to={`/guilds/${this.guild.id}/channels`}>
                        <img className="MenuButtonImage" alt="CHANNELS BUTTON" src="https://image.flaticon.com/icons/svg/1936/1936899.svg" width="64px" height="64px" />
                    </Link>
                    <Link className="MenuButton" to={`/guilds/${this.guild.id}/members`}>
                        <img className="MenuButtonImage" alt="MEMBERS BUTTON" src="https://image.flaticon.com/icons/svg/2622/2622686.svg" width="64px" height="64px" />
                    </Link>
                    <button className="MenuButton" onClick={ () => { axios.post('http://localhost:5000/api/client/channel/send/677478216285421589', { message: Math.floor(Math.random() * 10023) }) } }>
                        <img className="MenuButtonImage" alt="MESSAGE BUTTON" src="https://image.flaticon.com/icons/svg/726/726580.svg" width="64px" height="64px" />
                    </button>
                    <div className="FullGuild">
                        <p className="FullGuild_name"> {this.guild.name} </p>
                        <img alt="" className="FullGuild_icon" src={ this.guild.iconURL || 'https://cdn.discordapp.com/icons/657586144791363594/5f8627ef6dc69b914ed90c3e029a9fbc.webp?size=128' } />
                        <div className="guild-menu-container">
                            <Switch>
                                <Route path="/guilds/:id/channels">
                                    { JSXChannels }
                                </Route>
                                <Route path="/guilds/:id/members">
                                    <h1>{ this.guild.name}'s Members</h1>
                                    <div style={{ overflowY: "scroll", height: "1500px" }}>
                                        { MemberList }
                                    </div>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
