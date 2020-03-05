import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import getData from './../../Functions/GetData';
import MemberList from './MemberList/index';
import MemberWrapper from './MemberList/MemberWrapper';
import LoadingPage from './../../LoadingPage/index';
import TextChannel from './TextChannel/index';
import VoiceChannel from './VoiceChannel/index';
import Member from './Member/index';
import './FullGuild.css';

function timeout(callback, ms) {
    return new Promise(resolve => setTimeout(async () => resolve(await callback()), ms));
};

export default class FullGuild extends Component {
    constructor({ guild }) {
        super();

        this.state = {
            loading: true,
            guild: guild,

            hasNextPage: true,
            isNextPageLoading: false,
            items: []
        }
    }

    componentDidMount() {
        console.log("%cMOUNTING", "color: red")
        new Promise(async (resolve, reject) => {
            try {
                let FullGuildData = await getData(`client/guilds/rbi/${this.state.guild.id}`);
                FullGuildData.membersChunk = [];
                FullGuildData.members = await getData(`client/guilds/rbi/${this.state.guild.id}/members/cache`);
                // FullGuildData.members = await FullGuildData.members.map(m => (
                //     <Member key={m.userID} member={m} />
                // ));
                let chunk = 50;
                for(let i = 0, j = FullGuildData.members.length; i < j ; i+=chunk) {
                    FullGuildData.membersChunk.push(
                        FullGuildData.members.slice(i, i+chunk)
                    );
                    console.log(`CHUNK: ${i}/${j}`);
                    if(j-i < 50) {
                        console.log(`Finished CHUNK: ${i}/${j}`)
                        FullGuildData.channels = await getData(`client/guilds/rbi/${this.state.guild.id}/channels/cache`);
                        FullGuildData.roles = await getData(`client/guilds/rbi/${this.state.guild.id}/roles/cache`);
                        resolve(FullGuildData);
                    }
                }
            } catch (err) {
                reject(err)
            };
        }).then(FetchedGuildData => {
            this.setState(prevState => ({ 
                ...prevState,
                guild: FetchedGuildData,
                loading: false
            }));
        });
    }

    _loadNextPage = (...args) => {
        console.log("loadNextPage", ...args);
        this.setState({ isNextPageLoading: true }, () => {
            setTimeout(() => {
                this.setState(state => ({
                    hasNextPage: state.items.length < 100,
                    isNextPageLoading: false,
                    items: [...state.items].concat(
                        new Array(10).fill(true).map((empty, i) => ({ ...this.state.guild.members[state.items.length+i] }))
                    )
                }));
            }, 2500);
        });
    };

    render() {
        if(this.state.loading)
            return <LoadingPage content="Loading" state={{ i: "infinite", hex: "yellow" }} />

        const { hasNextPage, isNextPageLoading, items } = this.state;
        let ChannelList = [];
        this.state.guild.channels.map((channel) => {
            if(channel.type === 'category')
                ChannelList.push({ category: channel, channels: [] });    
            else {
                for (let i = 0; i < ChannelList.length; i++) {  
                    if(ChannelList[i].category.id === channel.parentID && channel.type === 'text')
                        ChannelList[i].channels.push(<TextChannel channel={channel} key={channel.id} />);
                    else if(ChannelList[i].category.id === channel.parentID && channel.type === 'voice')
                        ChannelList[i].channels.push(<VoiceChannel channel={channel} key={channel.id} />);
                }
            }
            return channel; 
        }); 

        let JSXChannels = ChannelList.map(data => (
            <div key={Math.floor(Math.random() * 500000)} style={{ display: "block" }}>
                <button className="category" onClick={() => document.getElementById(data.category.id).style.display = document.getElementById(data.category.id).style.display === 'none' ? 'initial' : 'none'}>{data.category.name}</button>
                <div id={data.category.id} className="category-channel-container">
                    { data.channels }
                </div>
            </div>
        ));

        // console.log(this.state);
        return (
            <div className="container">
                <div className="Menu">  
                    <Link className="MenuButton" to={`/guilds`}>
                        <img className="MenuButtonImage" alt="RETURN BUTTON" src="https://image.flaticon.com/icons/svg/2223/2223675.svg" width="64px" height="64px" />
                    </Link>
                    <Link className="MenuButton" to={`/guilds/${this.state.guild.id}/channels`}>
                        <img className="MenuButtonImage" alt="CHANNELS BUTTON" src="https://image.flaticon.com/icons/svg/1936/1936899.svg" width="64px" height="64px" />
                    </Link>
                    <Link className="MenuButton" to={`/guilds/${this.state.guild.id}/members`}>
                        <img className="MenuButtonImage" alt="MEMBERS BUTTON" src="https://image.flaticon.com/icons/svg/2622/2622686.svg" width="64px" height="64px" />
                    </Link>
                    <div className="FullGuild">
                        <p className="FullGuild_name"> {this.state.guild.name} </p>
                        <img alt="" className="FullGuild_icon" src={ this.state.guild.iconURL || 'https://cdn.discordapp.com/icons/657586144791363594/5f8627ef6dc69b914ed90c3e029a9fbc.webp?size=128' } />
                        <div className="guild-menu-container">
                            <Switch>
                                <Route path="/guilds/:id/channels">
                                    <div style={{ overflowY: "scroll", height: "1500px" }}>
                                        { JSXChannels }
                                    </div>
                                </Route>
                                <Route path="/guilds/:id/members">
                                    <h1>{ this.state.guild.name}'s Members</h1>
                                    <MemberWrapper
                                        hasNextPage={hasNextPage}
                                        isNextPageLoading={isNextPageLoading}
                                        items={items}
                                        loadNextPage={this._loadNextPage}
                                    />
                                    {/* <MemberList membersChunk={this.state.guild.membersChunk} /> */}
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

















// export default class FullGuild extends Component {
//     constructor({ guild, from }) {
//         super();

//         this.from = from;
//         this.state = {
//             error: false,
//             hasMore: true,
//             loading: true, 
//             guild: guild
//         };
//     }

    

//     LoadData(BaseGuild) {
//         if(!BaseGuild)
//             BaseGuild = this.state.guild;
//         console.log('Loading data', BaseGuild);
//         return new Promise(async (resolve, reject) => {
//             try {
//                 let ProxyUrl = `client/guilds/rbi/${BaseGuild.id}`;
//                 let guild = await getData(ProxyUrl);
//                 guild.members = await getData(`${ProxyUrl}/members/cache`, { from: BaseGuild.members.length, maxSize: 150+BaseGuild.members.length });
//                 guild.channels = await getData(`${ProxyUrl}/channels/cache`);
//                 guild.roles = await getData(`${ProxyUrl}/roles/cache`);

//                 console.log('Finaling data', guild);
//                 resolve(guild);
//             } catch (err) {
//                 reject(err)
//             }
//         });
//     }

//     componentWillMount() {
//         this.setState(state => ({ ...state, loading: true }));
//         this.LoadData()
//         .then(data => {
//             console.log(data)
//             this.setState(state => ({ 
//                 ...state, 
//                 guild: data,
//                 loading: false,
//                 hasMore: (data.memberCount > data.members.length)
//             }));
//         })
//         .catch((err) => {
//             console.log('Error Has Occured', err.message)
//             this.setState({
//                 error: err.message,
//                 loading: false,
//             });
//         });
//     }

//     // componentWillUpdate() {
//     //     console.log('UPDATE')
//     //     this.setState(state => ({ ...state, loading: true }));
//     //     this.LoadData()
//     //     .then(data => {
//     //         console.log(data)
//     //         this.setState(state => ({ 
//     //             ...state, 
//     //             guild: data,
//     //             loading: false,
//     //             hasMore: (data.memberCount > data.members.length)
//     //         }));
//     //     })
//     //     .catch((err) => {
//     //         console.log('Error Has Occured', err.message)
//     //         this.setState({
//     //             error: err.message,
//     //             loading: false,
//     //         });
//     //     });
//     // }

//     render() {
//         if(this.state.loading)
//             return <LoadingPage content="Loading" state={{ i: 1, hex: "#A4D792" }}/>
//         let MemberList = this.state.guild.members.map(member => {
//             return (
//                 <Member key={member.id} member={member} />
//             )
//         });

//         return (
//             <div className="container">
//                 <div className="Menu">  
//                     <Link className="MenuButton" to={`/guilds`}>
//                         <img className="MenuButtonImage" alt="RETURN BUTTON" src="https://image.flaticon.com/icons/svg/2223/2223675.svg" width="64px" height="64px" />
//                     </Link>
//                     <Link className="MenuButton" to={`/guilds/${this.state.guild.id}/channels`}>
//                         <img className="MenuButtonImage" alt="CHANNELS BUTTON" src="https://image.flaticon.com/icons/svg/1936/1936899.svg" width="64px" height="64px" />
//                     </Link>
//                     <Link className="MenuButton" to={`/guilds/${this.state.guild.id}/members`}>
//                         <img className="MenuButtonImage" alt="MEMBERS BUTTON" src="https://image.flaticon.com/icons/svg/2622/2622686.svg" width="64px" height="64px" />
//                     </Link>
//                     <button className="MenuButton" onClick={ () => { axios.post('http://localhost:5000/api/client/channel/send/677478216285421589', { message: Math.floor(Math.random() * 10023) }) } }>
//                         <img className="MenuButtonImage" alt="MESSAGE BUTTON" src="https://image.flaticon.com/icons/svg/726/726580.svg" width="64px" height="64px" />
//                     </button>
//                     <div className="FullGuild">
//                         <p className="FullGuild_name"> {this.state.guild.name} </p>
//                         <img alt="" className="FullGuild_icon" src={ this.state.guild.iconURL || 'https://cdn.discordapp.com/icons/657586144791363594/5f8627ef6dc69b914ed90c3e029a9fbc.webp?size=128' } />
//                         <div className="guild-menu-container">
//                             <Switch>
//                                 <Route path="/guilds/:id/channels">
//                                     { JSXChannels }
//                                 </Route>
//                                 <Route path="/guilds/:id/members">
//                                     <h1>{ this.state.guild.name}'s Members</h1>
//                                     <div style={{ overflowY: "scroll", height: "1500px" }}>
//                                         <InfiniteScroll>
//                                             { MemberList }
//                                         </InfiniteScroll>
//                                     </div>
//                                 </Route>
//                             </Switch>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }