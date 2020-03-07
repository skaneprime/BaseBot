import React, { Component } from 'react';
// import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import './index.css';
import FullTextChannel from './FullTextChannel';

export default class index extends Component {
    constructor({ channel }) {
        super();

        this.channel = channel;

        this.state = {};
    }

    render() {
        return (
            <>
                <Link className="channel" to={`/guilds/${this.channel.guild}/channels/${this.channel.id}`}>
                    { this.channel.name }
                </Link>
                <Route path={`/guilds/${this.channel.guild}/channels/${this.channel.id}`}>
                    {/* { console.log(this.channel) } */}
                    <FullTextChannel channel={this.channel} />
                </Route>
            </>
        )
    }
}