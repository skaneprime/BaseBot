import React, { Component } from 'react';
import './index.css';
import GetData from '../Functions/GetData';
import LoadingPage from '../LoadingPage/index';

export default class index extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            user: { tag: null }
        }
    }

    LoadData = () => {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await GetData('client/user');
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
            this.setState(state => ({ ...state, user: data, loading: false }));
        });
    }

    render() {
        if(this.state.loading)
            return <LoadingPage content="Loading" state={{ i: 1, hex: "#A4D792" }}/>

        console.log(this.state.user)
        let Page;
        if(!this.state.user.tag)
            Page = <a id="login" href="https://discordapp.com/api/oauth2/authorize?client_id=676444288258801674&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Flogin%2Fcallback&response_type=code&scope=identify%20guilds%20connections%20email">Identify Yourself</a>;
        else {
            Page = (
                <>
                    {/* <div className="profile">
                        <img alt="YOUR AVATAR" className="avatar" src={this.state.user.avatarURL} />
                        <h6 className="user-nick">USER: { this.state.user.username }#{this.state.user.discriminator}</h6>
                        <h1 style={{ marginTop: "60%" }}>HERE SOMETHING FOR USER</h1>
                    </div> */}

                    <div className="main-page">
                        <div className="box">
                            <img src={this.state.user.avatarURL} alt="logo-bot" />
                            <div className="nm-btn">
                                <h1 className = "name" >{ this.state.user.username }</h1>
                                <a href="https://discordapp.com/api/oauth2/authorize?client_id=679279721145565195&permissions=8&scope=bot" >
                                    <button className="btn">Add Bot!</button>
                                </a>
                            </div>
                        </div>
                        
                        <div className="box-info">
                            <h1 className="title">Description</h1>
                            <hr />
                            <p className="description">It description it bot :3 What are you doing? :3</p>
                        </div>
                    </div>
                </>
            );
        }
        return (
            <div className="main">
                { Page }
            </div>
        )
    }
}
