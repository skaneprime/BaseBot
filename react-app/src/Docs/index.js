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
            <div className="main">
                <h1>Bot Documentation</h1>
                <hr />
                <br />
                <h2> Title 2</h2>
                <h3>BaseCommand</h3>
                <h3 className="embed" style={{ borderLeftColor: "blue" }}>
                    <h4><a style={CSSGray}>module<a style={CSSBlue}>.</a>exports</a> <a style={CSSPurple}>= class extends</a> <a style={CSSYellow}>BaseCommand</a> {"{"}</h4>
                    <h4 style={{ marginLeft: "20px"}}><a style={CSSPurple}>constructor()</a> {"{"}</h4>
                    <h4 style={{ marginLeft: "40px"}}><a style={CSSRed}>super</a><a style={CSSYellow}>(</a>{"{"}</h4>
                    <h4 style={{ marginLeft: "60px"}}>
                        <h5>name<a style={CSSBlue}>:</a> {str("Command name")}, {comment("Name of command")} </h5>
                        <h5>aliases<a style={CSSBlue}>:</a> {array(["aliases"])}, {comment("Aliases of command. Each of them is Array element")}</h5>
                        <h5>category<a style={CSSBlue}>:</a> {str("category name")}, {comment("Category of command")} </h5>
                        <h5>usage<a style={CSSBlue}>:</a> {str("usage")}, {comment("Usage of command")} </h5>
                        <h5>description<a style={CSSBlue}>:</a> {str("description")}, {comment("Description of command")}</h5>
                        <h5>guildOnly<a style={CSSBlue}>:</a> {bool("true")}, {comment("Check can user use command only in guild or dm also.")}</h5>
                        <h5>allowed_guilds<a style={CSSBlue}>:</a> {array([])}, {comment("Allowed guild array. Each element is id of guild. Empty Array to disable this.")}</h5>
                        <h5>cooldown<a style={CSSBlue}>:</a> {bool("0")}, {comment("cooldown of command")}</h5>
                        <h5>invisible<a style={CSSBlue}>:</a> {bool("false")} {comment("makes command invisible")}</h5>
                    </h4>
                    <h4 style={{ marginLeft: "40px"}}>{"}"}<a style={CSSYellow}>)</a>;</h4>
                    <br />
                    <h4 style={{ marginLeft: "40px"}}><a style={CSSRed}>this</a><a style={CSSGray}>.</a><a style={{ color: "#517ba6" }}>execute</a> <a style={CSSPurple}>=</a> <a style={CSSYellow}>(</a><a style={CSSRed}>client</a>, <a style={CSSRed}>message</a>, <a style={CSSRed}>args</a>, <a style={CSSGray}>...</a><a style={CSSRed}>params</a><a style={CSSYellow}>)</a> <a style={CSSPurple}>=></a> {"{"}</h4>
                    <h4 style={{ marginLeft: "60px"}}>//Code..</h4>
                    <h4 style={{ marginLeft: "40px"}}>{"}"};</h4>
                    <h4 style={{ marginLeft: "20px"}}>{"}"};</h4>
                    <h4>{"}"};</h4> 
                </h3>
                <br />
                <hr />
            </div>
        )
    }
}
