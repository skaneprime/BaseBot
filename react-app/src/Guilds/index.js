import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ShortGuild from './Guild/ShortGuild.js';
import FullGuild from './Guild/FullGuild.js';
import './index.css';

export default class index extends Component {
    constructor({ guilds }) {
        super();
        
        this.guilds = guilds;
    }

    render() {
        let GuildList = this.guilds.map(guild => {
            return (
                <Link style={{ textDecoration: "none" }} to={`/guilds/${guild.id}`}>
                    <ShortGuild guild={guild} />
                </Link>
            );
        });
        return (
            <div className="container">
                { GuildList }
            </div>
        )
    }
}

