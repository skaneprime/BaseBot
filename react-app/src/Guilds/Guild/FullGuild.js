import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import './FullGuild.css';

export default class FullGuild extends Component {
    constructor({ guild }) {
        super();

        this.guild = guild;

        this.state = {};
    }
    render() {
        let ChannelList = this.guild.channels.map((channel, i) => (
            <p className="channel" key={channel.id} >{i+1} {channel.name}</p>
        ));
        return (
            <div className="container">
                <div className="Menu">
                    <Link className="MenuButton" to={`/guilds`}>
                        <img className="MenuButtonImage" alt="RETURN BUTTON" src="https://image.flaticon.com/icons/svg/2223/2223675.svg" width="64px" height="64px" />
                    </Link>
                    <Link className="MenuButton" to={`/guilds/${this.guild.id}/channels`}>
                        <img className="MenuButtonImage" alt="CHANNELS BUTTON" src="https://image.flaticon.com/icons/svg/1936/1936899.svg" width="64px" height="64px" />
                    </Link>
                    <div className="FullGuild">
                        <p className="FullGuild_name"> {this.guild.name} </p>
                        <img alt="" className="FullGuild_icon" src={ this.guild.iconURL || 'https://cdn.discordapp.com/icons/657586144791363594/5f8627ef6dc69b914ed90c3e029a9fbc.webp?size=128' } />
                        <div className="guild-menu-container">
                            <Switch>
                                <Route path="/guilds/:id/channels">
                                    {ChannelList}
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
