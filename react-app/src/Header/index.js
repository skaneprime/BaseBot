/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class index extends Component {
    constructor() {
        super();

        this.state = {
            isBarOpen: false
        };
    }
    toggleBar(e, state) {
        this.setState(prevState => ({
            ...prevState,
            isBarOpen: !prevState.isBarOpen
        }));
    };

    render() {
        let bar;
        if(this.state.isBarOpen) 
            bar = (
                <div className="user-menu-bar">
                    <ul className="btns">
                        <Link className="btn" to="/client">
                            <img alt='Logo for usr-bar' src="https://i.imgur.com/2rxzMeV.png" width="45px" height="45px" />
                        </Link>
                        <Link className="btn" to="/guilds">
                            <img alt='Logo for usr-bar' src="https://i.imgur.com/mGUSbgL.png" width="45px" height="45px" />
                        </Link>

                        <Link className="btn" to="/guilds">
                            <img alt='Logo for usr-bar' style={{ marginLeft: "10px" }} src="https://i.imgur.com/T2tYO8U.png" width="45px" height="45px" />
                        </Link>
                    </ul>
                </div>
            )
        else 
            bar = null;
        return (
            <header id="header">
                <div className="header-links">
                    <a href="/">Home</a>
                    <a href="/docs">Docs</a>
                    <a href="https://discord.gg/6hagHQ2">Discord</a>
                </div>
            
                <div className="right-content">
                    <span>Client#3333</span>
                    <div className="user-menu">
                        <a onClick={(e) => this.toggleBar(e, this.state)} ><img className="logo" src="https://cdn.discordapp.com/avatars/603250566092816388/a_669e7f912da49b8e102ef0808c9c6c54.gif?size=128" /></a>
                        { bar }
                    </div>
                </div>
            </header>
        )
    }
}

