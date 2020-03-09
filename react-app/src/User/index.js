import React, { Component } from 'react';
import './index.css';
import GetData from '../Functions/GetData';
import LoadingPage from '../LoadingPage/index';

export default class index extends Component {
    constructor({ AuthoredUser }) {
        super();

        this.state = {
            loading: true,
            client:  {},
            user: { ...AuthoredUser }
        }
    }

    LoadData = () => {
        return new Promise(async (resolve, reject) => {
            try {
                // console.log(this.state.user)
                let user = await GetData('client/users/rbi/'+this.state.user.id);
                let client = await GetData('client/user');
                resolve({ u: user, c: client })
            } catch (err) {
                reject(err)
            };
        });
    };

    componentWillMount() {
        this.setState(state => ({ ...state, loading: true }));
        this.LoadData()
        .then(data => {
            this.setState(state => ({ ...state, user: { ...state.user, ...data.u }, client: data.c, loading: false }));
        });
    }

    render() {
        if(this.state.loading)
            return <LoadingPage content="Loading" state={{ i: 1, hex: "#A4D792" }}/>

        console.log(this.state.user)
        let Page;
        if(!this.state.user.tag)
            Page = <a id="login" style={{ padding: "20px", background: "#ff3333", textDecoration: "none", color: "white"}} href="https://discordapp.com/api/oauth2/authorize?client_id=644900662890463243&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Flogin%2Fcallback&response_type=code&scope=identify%20guilds%20email%20connections">Identify Yourself</a>;
        else {
            Page = (
                <>
                    <div className="main-page">
                        <div className="box">
                            <img src={this.state.client.avatarURL} alt="logo-bot" />
                            <div className="nm-btn">
                                <h1 className = "name" >{ this.state.client.username }</h1>
                                <a href={`https://discordapp.com/api/oauth2/authorize?client_id=${this.state.client.id}&permissions=8&scope=bot`} >
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
