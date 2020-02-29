import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import Client from './Client/index';
import Guilds from './Guilds/index';
import FullGuild from './Guilds/Guild/FullGuild';
import Navigator from './Navigator/index';
import Footer from './Footer/index';
import MainPage from './MainPage/index';
import ErrorBoundary from './ErrorBoundary/index';
import axios from 'axios';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState({});
  const [guilds, setGuilds] = useState([]);
  // const [SelectedCommandName, setSelectedCommandName] = useState(null);
  
  const ShowGuild = (props, guilds) => {
    const { match } = props;
    let {id} = match.params;
    let Guild = guilds.filter(g => g.id === id)[0];
    if(Guild)
      return (<FullGuild guild={Guild}/>);
    else 
      return (<Guilds guilds={guilds}/>)
  };
  
  function FetchGuilds() {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:5000/api/client/guilds/cache').then(async ({ data }) => {
        let FullDataGuilds = [];
        await data.map(async (guild, i) => {
          let MembersRes = await axios.get(`http://localhost:5000/api/client/guilds/cache/gbi/${guild.id}/members/cache`);
          let ChannelsRes = await axios.get(`http://localhost:5000/api/client/guilds/cache/gbi/${guild.id}/channels/cache`);
          let RolesRes = await axios.get(`http://localhost:5000/api/client/guilds/cache/gbi/${guild.id}/roles/cache`);
          let EmojisRes = await axios.get(`http://localhost:5000/api/client/guilds/cache/gbi/${guild.id}/emojis/cache`);
          FullDataGuilds.push({
            ...guild,
            members: MembersRes.data,
            channels: ChannelsRes.data,
            roles: RolesRes.data,
            emojis: EmojisRes.data
          });
          if(i === data.length-1) {
            setGuilds(FullDataGuilds);
            resolve();
          }
        });
      });
    });
  };

  function FetchClient() {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:5000/api/client').then(async ({ data }) => {
        let UserRes = await axios.get('http://localhost:5000/api/client/user');
        let UsersRes = await axios.get('http://localhost:5000/api/client/users/cache');
        let ChannelsRes = await axios.get('http://localhost:5000/api/client/channels/cache');
        let CommandsRes = await axios.get('http://localhost:5000/api/client/commands');
        let AppInfoRes = await axios.get('http://localhost:5000/api/client/appInfo');
        setClient({ 
          ...data,
          user: UserRes.data,
          users: UsersRes.data,
          channels: ChannelsRes.data,
          commands: CommandsRes.data,
          appInfo: AppInfoRes.data
        });
        resolve();
      });
    });
  };

  useEffect(() => {
    setLoading(true);
    new Promise((resolve, reject) => {
      try {
        FetchClient().then(() => 
        FetchGuilds().then(() => 
          resolve(false)
        ));
      } catch (err) {
        reject(err);
      }
    }).then(setLoading);
  }, []);

  if(loading) return (<h1>LOADING</h1>);

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
          <Route>
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
