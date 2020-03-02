import React, { Component } from 'react';
import './index.css';

export default class index extends Component {
    constructor({ member }) {
        super();

        this.member = member;

        this.state = {};
    }
    render() {
        return (
            <div>
                <p className="member-card" style={{ color: `${this.member.displayHexColor}`}} key={ this.member.user.id }>
                    <img alt = "" style={{ borderRadius: "20px" }} src={this.member.user.avatarURL || this.member.user.defaultAvatarURL} width="32px" height="32px"/> 
                    <p className="member-card-text">{ this.member.user.tag }</p>
                    {this.member.user.bot ? <img alt = "" style={{ background: "#ff0099", borderRadius: "5px", marginLeft: "5px" }} src="https://image.flaticon.com/icons/svg/531/531270.svg" width="32px" height="32px"/> : ''}
                </p>
            </div>
        )
    }
}
