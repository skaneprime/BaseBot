import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Client from './Client/index';
import Guilds from './Guilds/index';
import FullGuild from './Guilds/Guild/FullGuild';
import Navigator from './Navigator/index';
import Footer from './Footer/index';
import MainPage from './MainPage/index';
import ErrorBoundary from './ErrorBoundary/index';
import User from './User/index';
import LoadingPage from './LoadingPage/index';
import axios from 'axios';
import DiscordOAuth2 from 'discord-oauth2';
import Cookies from 'js-cookie';
import './App.css';

function App() {
  const [loading, setLoading] = useState({ v: true, jsxv: `Loading`, l: "first", state: { i: -1, hex: "#A4D792" }});
  const [client, setClient] = useState({});
  const [guilds, setGuilds] = useState([]);
  const [user, setUser] = useState({});
  /* Привет, как дела? Номально сделал заrембуные шутки воис??? дыа */
  const ShowGuild = (props, guilds) => {
    const { match } = props;
    let {id} = match.params;
    let Guild = guilds.filter(g => g.id === id)[0];
    if(Guild)
      return (<FullGuild guild={Guild}/>);
    else 
      return (<Guilds guilds={guilds}/>)
  };
  
  async function getData(link) {
    let proxyUrl = `http://localhost:5000/api/`;
    return new Promise((resolve, reject) => {
      try {
        axios.get(`${proxyUrl}${link}`)
          .then(({data}) => resolve(data))
          .catch(reject);
      } catch (err) {
        reject(err);
      }
    });
  }

  function timeout(callback, ms) {
    return new Promise(resolve => setTimeout(async () => resolve(await callback()), ms));
  };

  function FetchGuilds() {
    console.log(`[GUILDS PROMISE AWAITING]`)
    return new Promise((resolve, reject) => {
      try {
        getData('client/guilds/cache').then(async (data) => {
          while (data.length < 1 || Object.keys(data).length < 1) {
            console.log('[GETDATA] Retrying to get \'client/guilds/cache\'...')
            data = await timeout(async () => {
              return await getData('client/guilds/cache');
            }, 2000);
          }
          let FullDataGuilds = [];

          await data.map(async (guild, i) => {
            let Members = [];
            let MembersData = await getData(`client/guilds/rbi/${guild.id}/members/cache`);
            let Channels = await getData(`client/guilds/rbi/${guild.id}/channels/cache`);
            let Roles = await getData(`client/guilds/rbi/${guild.id}/roles/cache`);
            let Emojis = await getData(`client/guilds/rbi/${guild.id}/emojis/cache`);
            let User = await getData('client/users/cache');
            
            MembersData.map(async (member, j) => {
              let hexColor = await getData(`client/guilds/rbi/${member.guildID}/members/rbi/${member.userID}/displayHexColor`);
              let presence = await getData(`client/guilds/rbi/${member.guildID}/members/rbi/${member.userID}/presence`);
              let voice = await getData(`client/guilds/rbi/${member.guildID}/members/rbi/${member.userID}/voice`);
              let permissions = await getData(`client/guilds/rbi/${member.guildID}/members/rbi/${member.userID}/permissions`);
              let roles = await getData(`client/guilds/rbi/${member.guildID}/members/rbi/${member.userID}/roles`);
              Members.push({ 
                  user: User.filter(u => u.id === member.userID)[0],
                  voice: voice,
                  presence: presence,
                  roles: roles,
                  permissions: permissions,
                  displayHexColor: hexColor,
                  ...member 
              });
              if(j === MembersData.length-1) {
                console.log(`[GETDATA] [${guild.id}] Fetched all members`);
                // console.log(Members);
                FullDataGuilds.push({
                  ...guild,
                  members: Members,
                  channels: Channels,
                  roles: Roles,
                  emojis: Emojis
                });
                
                if(i === data.length-1) {
                  setGuilds(FullDataGuilds);
                  resolve();
                };
              }
            });
          });
        }).catch(reject);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };

  function FetchClient() {
    return new Promise((resolve, reject) => {
      try {
        getData('client').then(async ({ data }) => {
          try {
            let User = await getData('client/user');
            let Users = await getData('client/users/cache');
            let Channels = await getData('client/channels/cache');  
            let Commands = await getData('client/commands');
            let AppInfo = await getData('client/appInfo');
            [User, Users, Channels, Commands, AppInfo] = await Promise.all([
                { Obj: User, link: 'client/user'},
                { Obj: Users, link: 'client/users/cache'}, 
                { Obj: Channels, link: 'client/channels/cache'}, 
                { Obj: Commands, link: 'client/commands'}, 
                { Obj: AppInfo, link: 'client/appInfo'}
              ].map(data => {
                if (!data.Obj || data.Obj.length < 1 || Object.keys(data.Obj).length < 1) {
                  console.log(`[GETDATA] Retrying to get '${data.link}'...`);
                  return timeout(() => {
                    return getData(data.link);
                  }, 2000);
                } else  
                  return data.Obj;
              })
            );

            let oauth2 = new DiscordOAuth2();
            let AuthoredUser = {};
            if(Cookies.get('accessToken'))
                AuthoredUser = await oauth2.getUser(`${Cookies.get('accessToken')}`)//.catch(err => ({ id: undefined }));

            setUser({ 
              ...Users.filter(u=>u.id===AuthoredUser.id)[0], 
              ...AuthoredUser 
            });
            setClient({ 
              ...data,
              user: User,
              users: Users,
              channels: Channels,
              commands: Commands,
              appInfo: AppInfo
            });
            resolve();
          } catch (err) {
            reject(err)
          };
        }).catch(reject);
      } catch (err) {
        reject(err);
      }
    });
  };

  useEffect(() => {
    setLoading({ v: true, jsxv: `Loading`, l: "loading", state: { i: 0, hex: "#A4D792" } });
    new Promise((resolve, reject) => {
      try {
        // throw new Error('test')
        console.log('[GETDATA]','Awaiting Promise...')
        FetchClient()
        .then(() => {
          console.log('[GETDATA]','Client is fetched! ');
          setLoading({ v: true, jsxv: `Loading`, l: "client fetched", state: { i: 2, hex: "#A4D792" } });
          FetchGuilds()
          .then(() => { 
            console.log('[GETDATA]', 'Guilds are fetched! resolving..');
            resolve({ v: false, jsxv: null, l: "guilds fetched", state: { i: 2, hex: "#A4D792" } })
          })
        })
        .catch(err => reject({ v: true, jsxv: `ERROR ${err.stack}`, l: "error", state: { i: 2, hex: "#D10000" }}));
      } catch (err) {
        console.log(err)
        reject({ v: true, jsxv: `ERROR ${err.stack}`, l: "error", state: { i: 2, hex: "#D10000" }});
      }
    })
    .then(setLoading)
    .catch(setLoading);
  }, []);

  if(loading.v) 
    return (<LoadingPage content={ loading.jsxv } state={ loading.state } />);

  return (
    <Router>
      <ErrorBoundary>
        <Navigator />
        <br/>
        <Switch>
          <Route path="/client">
            <Client client={client} />
          </Route>
          <Route path="/guilds/:id" component={(props) => ShowGuild(props, guilds)}>
          </Route>
          <Route path="/guilds">
            <Guilds guilds={guilds} />
          </Route>
          <Route path="/user">
            <User client={client} user={user} />
          </Route>
          <Route>
            <User client={client} user={user} />
            <MainPage />
          </Route>
        </Switch>
        <br/>
        <Footer guilds={guilds} />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
