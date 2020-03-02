import React, { Component } from 'react';
import './index.css';

export default class index extends Component {
    constructor({ client, user }) {
        super();

        this.client = client;

        this.user = user;
    }
    render() {
        console.log(this.user)
        let Page;
        if(!this.user.tag)
            Page = <a id="login" href="https://discordapp.com/api/oauth2/authorize?client_id=676444288258801674&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Flogin%2Fcallback&response_type=code&scope=identify%20guilds%20connections%20email">Identify Yourself</a>;
        else {
            Page = (
                <div className="profile">
                    <img alt="YOUR AVATAR" className="avatar" src={this.user.avatarURL} />
                    <h6 className="user-nick">USER: { this.user.username }#{this.user.discriminator}</h6>
                    <h1 style={{ marginTop: "60%" }}>HERE SOMETHING FOR USER</h1>
                </div>
            );
        }
        return (
            <div className="main">
                { Page }
            </div>
        )
    }
}
