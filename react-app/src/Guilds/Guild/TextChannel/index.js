import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './index.css';

export default class index extends Component {
    constructor({ channel }) {
        super();

        this.channel = channel;

        this.state = {};
    }

    render() {
        // console.log(this.channel);
        return (
            <>
                <Link className="channel" to={`/guilds/${this.channel.guild}/channels/${this.channel.id}`}>
                    { this.channel.name }
                </Link>
                <Route keypath={`/guilds/${this.channel.guild}/channels/${this.channel.id}`}>
                    { console.log({ MSG: this.channel.messages}) }
                </Route>
            </>
        )
    }
}