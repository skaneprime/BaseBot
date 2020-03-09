import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getData from './../Functions/GetData';
import LoadingPage from '../LoadingPage/index';
import ShortGuild from './Guild/ShortGuild.js';
import './index.css';

export default class index extends Component {
    constructor() {
        super();
        
        this.state = { 
            guilds: [],
            loading: true
        };
    }

    LoadData() {
        return new Promise(async (resolve, reject) => {
            try {
                let guilds = await getData('client/guilds/cache');
                resolve(guilds);
            } catch (err) {
                reject(err)
            }
        });
    }

    componentWillMount() {
        this.setState(state => ({ ...state, loading: true }));
        this.LoadData()
        .then(data => {
            this.setState(state => ({ ...state, guilds: data, loading: false }));
        });
    }

    render() {
        if(this.state.loading)
            return <LoadingPage content="Loading" state={{ i: 2, hex: "#A4D792" }}/>

        let GuildList = this.state.guilds.map(guild => {
            return (
                <Link style={{ textDecoration: "none" }} key={guild.id} to={`/guilds/${guild.id}`}>
                    <ShortGuild guild={guild} />
                </Link>
            );
        });

        if(this.state.guilds.length < 1)
            GuildList = (
                <a style={{ color: "#fff", textDecoration: "none" }} href="https://discordapp.com/api/oauth2/authorize?client_id=679279721145565195&permissions=8&scope=bot">Add Bot You Server!</a>
            )
        return (
            <div className="container">
                { GuildList }
            </div>
        )
    }
}

