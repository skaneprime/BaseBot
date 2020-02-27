import React, { useState, useEffect } from 'react';
import Client from './Client/index';
import Guilds from './Guilds/index';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState({});
  const [guilds, setGuilds] = useState([]);

  const [SelectedCommandName, setSelectedCommandName] = useState(null);

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

  if(loading) return "Loading...";

  return (
    <>
      <Client client={client} SelectedCommandName={SelectedCommandName} setSelectedCommandName={setSelectedCommandName} />
      <Guilds guilds={guilds} />
    </>
  );
}

export default App;
