import React, { Component } from 'react';
import './index.css';
import GetData from '../../../Functions/GetData';
import LoadingPage from '../../../LoadingPage/index';

export default class index extends Component {
    constructor({ member }) {
        super();

        this.state = { member: member };
    }

    LoadData() {
        return new Promise(async (resolve, reject) => {
            try {
                let ProxyUrl = `client/guilds/rbi/${this.state.member.guildID}/members/rbi/${this.state.member.userID}`;
                GetData(ProxyUrl).then(async FullMember => {
                    FullMember.user = await GetData(`${ProxyUrl}/user`);
                    FullMember.displayHexColor = await GetData(`${ProxyUrl}/displayHexColor`);
                    resolve(FullMember);
                }).catch(err => ({
                    ...this.state.member,
                    user: {
                        id: (Math.floor(Math.random() * 100000)),
                        bot: false,
                        tag: "Couldn't Fetch",
                        avatarURL: "https://image.flaticon.com/icons/svg/595/595067.svg"
                    },
                    displayHexColor: "#ffffff"
                })) 
            } catch (err) {
                reject(err)
            }
        });
    }

    componentWillMount() {
        this.setState(state => ({ ...state, loading: true }));
        this.LoadData()
        .then(data => {
            this.setState(state => ({ ...state, member: data, loading: false }));
        });
    }

    render() {
        if(this.state.loading)
            return <LoadingPage content="Loading" state={{ i: 2, hex: "#A4D792" }}/>
        // console.log(this.state.member)
        return (
            <div>
                <a className="member-card" style={{ color: `${this.state.member.displayHexColor}`}} key={ this.state.member.user.id }>
                    <img alt = "" style={{ borderRadius: "20px" }} src={this.state.member.user.avatarURL || this.state.member.user.defaultAvatarURL} width="32px" height="32px"/> 
                    <a className="member-card-text">{ this.state.member.user.tag }</a>
                    {this.state.member.user.bot ? <img alt = "" style={{ background: "#ff0099", borderRadius: "5px", marginLeft: "5px" }} src="https://image.flaticon.com/icons/svg/531/531270.svg" width="32px" height="32px"/> : ''}
                </a>
            </div>
        )
    }
}
