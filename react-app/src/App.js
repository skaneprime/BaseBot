/* eslint-disable */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import getData from './Functions/GetData';
import Client from './Client/index';
import Guilds from './Guilds/index';
import FullGuild from './Guilds/Guild/FullGuild';
import Navigator from './Navigator/index';
import Footer from './Footer/index';
import MainPage from './MainPage/index';
import ErrorBoundary from './ErrorBoundary/index';
import User from './User/index';
import LoadingPage from './LoadingPage/index';
import Header from './Header/index';
import Docs from './Docs/index';
import axios from 'axios';
import DiscordOAuth2 from 'discord-oauth2';
import Cookies from 'js-cookie';
import './App.css';

function App() {
  const [loading, setLoading] = useState({ v: true, jsxv: `Loading`, l: "first", state: { i: -1, hex: "#A4D792" }});
  // const [MemberListLoading, setMemberListLoading] = useState(true)
  const [guilds, setGuilds] = useState([]);
  const [MemberPage, setMemberPage] = useState(0);
  const [AuthoredUser, setAuthoredUser] = useState(null);
  const observer = useRef();
  const oauth = new DiscordOAuth2();
  // const LastMemberElementRef = useCallback(node => {
  //  // if(node == null) return console.log(`НОДЕЕЕЕЕ ТУТ: ${node}`)
  //   // setTimeout(() => {
  //       if(MemberListLoading)
  //         return;
  //       if(observer.current)
  //         observer.current.disconnect();
  //       observer.current = new IntersectionObserver(entries => {
  //         if(entries[0].isIntersecting) {
  //           console.log(`VISIBLE`);
  //           setMemberPage(p => p+10);
  //         }
  //       });
  //       if(node) 
  //         observer.current.observe(node)
  //   // }, 1000)
  // }, [MemberListLoading]);

  const ShowGuild = (props, guilds) => {
    const { match } = props;
    let { id } = match.params;
    let BaseGuild = guilds.filter(g => g.id === id)[0];
    if(BaseGuild) {
      BaseGuild.members = BaseGuild.members.slice(0, 50);
      return (<FullGuild guild={BaseGuild} from={MemberPage} />)
    }
    else
      return (<Guilds  />);
  };

  useEffect(() => {
    setLoading({ v: true, jsxv: `Maintance`, l: "loading", state: { i: 2, hex: "#bd8700" } });
    new Promise(async (resolve, reject) => {
      try {
        let guilds = await getData('client/guilds/cache');
        setGuilds(guilds);
        if(Cookies.get('accessToken') !== 'null') {
          oauth.getUser(Cookies.get('accessToken'))
          .then(data => {
            // console.log("data", data);
            setAuthoredUser(data)
            // setLoading({ v: false, jsxv: `Maintance`, l: "loading", state: { i: 2, hex: "#bd8700" } });
            resolve({ v: false, jsxv: ``, l: "Ready", state: { i: 2, hex: "#4aff53" } });
          });
        } else resolve({ v: false, jsxv: ``, l: "Ready", state: { i: 2, hex: "#4aff53" } });
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
        <Header AuthoredUser={AuthoredUser} />
        <Navigator />
        <br/>
        <Switch>
          <Route path="/client">
            <Client getData={getData} LoadingPage={LoadingPage} />
          </Route>
          <Route path="/guilds/:id" component={(props) => ShowGuild(props, guilds)}>
          </Route>
          <Route path="/guilds">
            <Guilds />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/docs">
            <Docs />
          </Route>
          <Route>
            <User AuthoredUser={AuthoredUser} />
            <MainPage />
          </Route>
        </Switch>
        <br/>
        <Footer />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
