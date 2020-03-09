/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import GetData from '../Functions/GetData';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

export default class index extends Component {
    constructor({ AuthoredUser }) {
        super();

        this.state = {
            isBarOpen: false,
            user: { ...AuthoredUser }
        };
    }
    toggleBar(e, state) {
        this.setState(prevState => ({
            ...prevState,
            isBarOpen: !prevState.isBarOpen
        }));
    };

    LoadData = () => {
        return new Promise(async (resolve, reject) => {
            try {
                // console.log(this.state.user)
                let user = await GetData('client/users/rbi/'+this.state.user.id);
                resolve(user)
            } catch (err) {
                reject(err)
            };
        });
    };

    componentWillMount() {
        this.setState(state => ({ ...state, loading: true }));
        this.LoadData()
        .then(data => {
            this.setState(state => ({ ...state, user: { ...state.user, ...data }, loading: false }));
        });
    }

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

                        <Link className="btn" onClick={(e) => {
                            Cookies.set('accessToken', null);
                            window.location.reload(false);
                        }} to="/">
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
                    <span>{this.state.user.tag}</span>
                    <div className="user-menu">
                        <a onClick={(e) => this.toggleBar(e, this.state)} ><img className="logo" src={this.state.user.avatarURL} /></a>
                        { bar }
                    </div>
                </div>
            </header>
        )
    }
}

