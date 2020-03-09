/* eslint-disable */
import React, { Component } from 'react'
import './index.css';

export default class index extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            commands: []
        }
    }

    componentDidMount() {

    }

    render() {
        let CSSGray = { color: "gray" };
        let CSSRed = { color: "red" };
        let CSSBlue = { color: "blue" };
        let CSSYellow = { color: "yellow" };
        let CSSPurple = { color: "#a142f5" };

        let comment = (str) => (<a style={CSSGray}>// {str}</a>);
        let bool = (str) => (<a style={{ color: "#bf5108" }}>{str}</a>);
        let array = (array) => (
            <>
                <a style={CSSPurple}>[</a>
                {array.map(e => (
                    <>
                        <a style={{ color: "#878787" }}>"</a><a style={{ color: "#66a840" }}>{e}</a><a style={{ color: "#878787" }}>"</a>
                    </>
                ))}
                <a style={CSSPurple}>]</a>
            </>
        );
        let str = (str) => (
            <>
                <a style={{ color: "#878787"}}>"</a><a style={{ color: "#66a840" }}>{str}</a><a style={{ color: "#878787"}}>"</a>
            </>
        );
        return (
            <div className="main" style={{ fontWeight: "normal" }}>
                <h1>Bot Documentation</h1>
                <hr />
                <br />
                <h2> Create you own command </h2>
                <h3 style={CSSYellow}>BaseCommand</h3>
                <h4>To create a command you should create a file {"{commandname}.js"} <br />which should have following code<br /> Do not forget to require BaseCommand file in classes folder</h4>
                <h3 className="embed" style={{ borderLeftColor: "blue", fontWeight: "normal" }}>
                    <h4><span style={CSSGray}>module<span style={CSSBlue}>.</span>exports</span> <span style={CSSPurple}>= class extends</span> <span style={CSSYellow}>BaseCommand</span> {"{"}</h4>
                    <h4 style={{ marginLeft: "20px"}}><a style={CSSPurple}>constructor()</a> {"{"}</h4>
                    <h4 style={{ marginLeft: "40px"}}><a style={CSSRed}>super</a><a style={CSSYellow}>(</a>{"{"}</h4>
                    <h4 style={{ marginLeft: "60px"}}>
                        <h5>name<span style={CSSBlue}>:</span> {str("Command name")}, {comment("Name of command")} </h5>
                        <h5>aliases<span style={CSSBlue}>:</span> {array(["aliases"])}, {comment("Aliases of command. Each of them is Array element")}</h5>
                        <h5>category<span style={CSSBlue}>:</span> {str("category name")}, {comment("Category of command")} </h5>
                        <h5>usage<span style={CSSBlue}>:</span> {str("usage")}, {comment("Usage of command")} </h5>
                        <h5>description<span style={CSSBlue}>:</span> {str("description")}, {comment("Description of command")}</h5>
                        <h5>guildOnly<span style={CSSBlue}>:</span> {bool("true")}, {comment("Check can user use command only in guild or dm also.")}</h5>
                        <h5>allowed_guilds<span style={CSSBlue}>:</span> {array([])}, {comment("Allowed guild array. Each element is id of guild. Empty Array to disable this.")}</h5>
                        <h5>cooldown<span style={CSSBlue}>:</span> {bool("0")}, {comment("cooldown of command")}</h5>
                        <h5>invisible<span style={CSSBlue}>:</span> {bool("false")} {comment("makes command invisible")}</h5>
                    </h4>
                    <h4 style={{ marginLeft: "40px"}}>{"}"}<span style={CSSYellow}>)</span>;</h4>
                    <br />
                    <h4 style={{ marginLeft: "40px"}}><span style={CSSRed}>this</span><span style={CSSGray}>.</span><span style={{ color: "#517ba6" }}>execute</span> <span style={CSSPurple}>=</span> <span style={CSSYellow}>(</span><span style={CSSRed}>client</span>, <span style={CSSRed}>message</span>, <span style={CSSRed}>args</span>, <span style={CSSGray}>...</span><span style={CSSRed}>params</span><span style={CSSYellow}>)</span> <span style={CSSPurple}>=></span> {"{"}</h4>
                    <h4 style={{ marginLeft: "60px"}}>{comment("Code..")}</h4>
                    <h4 style={{ marginLeft: "40px"}}>{"}"};</h4>
                    <h4 style={{ marginLeft: "20px"}}>{"}"};</h4>
                    <h4>{"}"};</h4> 
                </h3>
                <br />
                <hr />
                <br />
                <h2>What does that file/folder?</h2> 
                <h3 style={{ marginLeft: "20px", color: "yellow" }}> SysLoader.js</h3>
                <h4 style={{ marginLeft: "30px"}}> Loads all files in <span style={CSSBlue}>system</span> folder (and all files in subdirectories) <br /> Before initialization of client</h4>
                <h4 className="embed" style={{ fontWeight: "normal", marginLeft: "30px", borderLeftColor: "#ff2233" }}>
                    <span style={CSSBlue}>system</span><span style={CSSYellow}>/</span>ConfigManager: <br />
                    - Loads all configuration on start; <br />
                    - Creates config with friendly interface on init if config folder does not exist. <br />
                    <br />
                    <span style={CSSBlue}>system</span><span style={CSSYellow}>/</span>DataBaseManager - connects client to MongoDataBase Server<br />
                </h4>
                <br />
                <h3 style={{ marginLeft: "20px", color: "yellow" }}> ModLoader.js</h3>
                <h4 style={{ marginLeft: "30px"}}> Loads all files in <a style={CSSBlue}>modules</a> folder (and all files in subdirectories) <br /> After initialization of client</h4>
                <h4 className="embed" style={{ fontWeight: "normal", marginLeft: "30px", borderLeftColor: "#ff0055"}}>
                    <span style={CSSBlue}>modules</span><span style={CSSYellow}>/</span>EventHandler - handles event if exist file with name of that event in events folder. 
                    <br />For example: folder: client, file: ready.js event name: ready. <br />
                    <br /><span style={CSSBlue}>modules</span><span style={CSSYellow}>/</span>CommandHandler - loads all files in commands folder (also loads folders in command folder as categories). <br />
                    <br /><span style={CSSBlue}>modules</span><span style={CSSYellow}>/</span>webLoader - Launches WebServer (Express.js) (Website) and API. <br />
                </h4>
                <br />
                <h3 style={{ marginLeft: "20px", color: "yellow" }}> react-app (folder)</h3>
                <h4 className="embed" style={{ fontWeight: "normal", marginLeft: "30px", borderLeftColor: "#ff0055" }}> Source Files of React app which is builded at  <a style={CSSBlue}>server/build</a></h4>
                <br />
                <h3 style={{ marginLeft: "20px", color: "yellow" }}> server (folder)</h3>
                <span style={{ color: "#ff3333", marginLeft: "30px", fontSize: "35px" }}>server/build</span>
                <h4 className="embed" style={{ fontWeight: "normal", marginLeft: "30px", borderLeftColor: "#ff0055" }}>Build of <span style={{ color: "#ff4444"}}>react-app</span></h4>
                <span style={{ color: "#ff3333", marginLeft: "30px", fontSize: "35px" }}>server/routes/api</span>
                <h4 className="embed" style={{ fontWeight: "normal", marginLeft: "30px", borderLeftColor: "#ff0055" }}>
                    API of Client for <span style={{ color: "#ff4444"}}>react-app</span> <br />
                </h4>
                <h4 className="embed" style={{ marginLeft: "40px", color: "#fff222"}}>
                    methods/channel
                    <br/>
                    <br/>
                    <h4 className="embed" style={{ marginLeft: "0px", color: "#f33666"}}>
                        Here's Api methods for Client's channels. 
                    </h4>
                    <br />
                    <div style={{ color: "gray" }}>
                        <br /><h3>{"{APILINK}/client/channel/create/:GuildID/"}</h3>
                        <h4>
                            {"JSON: {"}
                            <br />
                            name: "example",<br />
                            type: "text, voice, category",<br />
                            topic: "hello world!",<br />
                            nsfw: "true, false",<br />
                            parent: "id",<br />
                            position: "number",<br />
                            {"}"}
                        </h4>
                        <br /><h3>{"{APILINK}/client/channel/delete/:ChannelID"}</h3>
                        <h4>Nothing needed to add in post request</h4>
                        <br /><h3>{"{APILINK}/client/channel/edit/:ChannelID"}</h3>
                        <h4>
                            Same as create method
                        </h4>
                        <br /><h3>{"{APILINK}/client/channel/editmsg/:ChannelID/:MessageID"}</h3>
                        <h4>
                            Same as send method
                        </h4>
                        <br /><h3>{"{APILINK}/client/channel/join/:ChannelID"}</h3>
                        <h4>
                            {"JSON: {"}
                            <br />
                                "url": "Link to audio"
                            <br />
                            {"}"}
                        </h4>
                        <br /><h3>{"{APILINK}/client/channel/send/:ChannelID"}</h3>
                        <h4>
                            {"JSON: {"}
                            <br />
                                "message": "raw message sting",<br/>
                                "embed": Embed Object in JSON
                            <br />
                            {"}"}
                        </h4>
                        <br /><h3>{"{APILINK}/client/channel/usend/:UserID"}</h3>
                        <h4>Same as send method</h4>
                    </div>
                </h4>
                <br />
                <hr />
            </div>
        )
    }
}
