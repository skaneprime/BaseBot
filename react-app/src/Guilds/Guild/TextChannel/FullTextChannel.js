import React, { Component } from 'react';
import axios from 'axios';
import TextAreaAutoSize from 'react-textarea-autosize';

export default class FullTextChannel extends Component {
    constructor({ channel }) {
        super();

        this.channel = channel;

        this.embed = {
            title: null,
            description: null,
            url: null,
            color: "#ffffff",
            timestamp: null,
            footer: {
                icon_url: null,
                text: null
            },
            thumbnail: {
                url: null
            },
            image: {
                url: null
            },
            author: {
                name: null,
                url: null,
                icon_url: null
            }
        }

        this.state = {
            isEmbed: true
        }
    }

    componentDidCatch(err) {
        console.log(err)
    }

    handleText(e) {
        // alert('The value is: ' + this.input);
        // console.log(e, this)
        if(this.state.isEmbed) {
            let newEmbed = {
                title: null,
                description: null,
                url: null,
                color: "#ffffff",
                timestamp: null,
                footer: {
                    icon_url: null,
                    text: null
                },
                thumbnail: {
                    url: null
                },
                image: {
                    url: null
                },
                author: {
                    name: null,
                    url: null,
                    icon_url: null
                }
            };
            // console.log(this.embed);
            try {
                Object.keys(this.embed).forEach((key, i) => {
                    if(!this.embed[key])
                        return;
                    if(this.embed[key].value) { 
                        // console.log(`${key} has a value of ${this.embed[key].value}`)
                        newEmbed[key] = this.embed[key].value;
                    } else if (this.embed[key] && !this.embed[key].value ) {
                        // console.log(`${key} is an object and have value of ${this.embed[key]}`)
                        Object.keys(this.embed[key]).forEach((subKey, i) => {
                            // console.log(this.embed[key])
                            
                            if(this.embed[key][subKey].value)
                                newEmbed[key][subKey] = this.embed[key][subKey].value
                        });
                    }
    
                    if(i === Object.keys(this.embed).length-1) {
                        console.log(newEmbed)
                        axios.post(`http://localhost:5000/api/client/channel/send/${this.channel.id}`, { 
                            embed: newEmbed 
                        }) 
                    }
                });
            } catch(err) {
                console.log(err)
            }
        }
        else
            axios.post(`http://localhost:5000/api/client/channel/send/${this.channel.id}`, { 
                message: this.input.value
            }) 
        e.preventDefault();
    }

    toggleEmbedMode(e) {
        this.setState(prevState => ({
            ...prevState,
            isEmbed: !prevState.isEmbed
        }));

        console.log('IS EMBED: ', this.state.isEmbed);
    }

    handleOnChange(event, ParamName, SubParam) {
        event.persist();
        if(!SubParam)
            this.embed[ParamName] = { value: event.target.value };
        else 
            this.embed[ParamName][SubParam] = { value: event.target.value };
    }

    render() {

        let MessageBox;

        if(this.state.isEmbed) {
            MessageBox = (
                <div>
                    <hr />
                    <h6 className="channel_message_param">Title: </h6>
                    <TextAreaAutoSize onHeightChange={(height) => { console.log(height) } } maxLength="256" className="channel_message_param_input" type="text" placeholder="Title of embed" onChange={(event) => this.handleOnChange(event, 'title')} />
                    <hr />
                    <h6 className="channel_message_param">Description: </h6>
                    <TextAreaAutoSize maxLength="256" className="channel_message_param_input" type="text" placeholder="Description of embed" onChange={(event) => this.handleOnChange(event, 'description')} />
                    <hr />
                    <h6 className="channel_message_param">url: </h6>
                    <input className="channel_message_param_input" type="text" placeholder="url of embed" ref={(input) => this.embed.url = input} />
                    <hr />
                    <h6 className="channel_message_param">HEX color: </h6>
                    <input className="channel_message_param_input" type="color" placeholder="#ffffff" ref={(input) => this.embed.color = input} />

                    {/* <h6>Timestamp: </h6>
                    <input type="checkbox" ref={(input) => this.embed.timestamp = (input ? (input.checked || input.value ? new Date().timestamp : null) : null )} /> */}
                    <hr />
                    <h6 className="channel_message_param">Footer: </h6>
                    <TextAreaAutoSize maxLength="256" className="channel_message_param_input" type="text" placeholder="Title of embed" onChange={(event) => this.handleOnChange(event, 'footer', "text")} />
                    <br />
                    <input className="channel_message_param_input" type="text" placeholder="Footer Image URL of embed" ref={(input) => this.embed.footer.icon_url = input} />
                    <hr />
                    <h6 className="channel_message_param">Thumbnail: </h6>
                    <input className="channel_message_param_input" type="text" placeholder="Image Url for Thumbnail" ref={(input) => this.embed.thumbnail.url = input} />
                    <hr />
                    <h6 className="channel_message_param">Image: </h6>
                    <input className="channel_message_param_input" type="text" placeholder="Image Url for Image" ref={(input) => this.embed.image.url = input} />
                    <hr />
                    <h6 className="channel_message_param">Author: </h6>
                    <input maxLength="256" className="channel_message_param_input" type="text" placeholder="Author name of embed" ref={(input) => this.embed.author.name = input} />
                    <br />
                    <input className="channel_message_param_input" type="text" placeholder="Author url of embed" ref={(input) => this.embed.author.url = input} />
                    <br />
                    <input className="channel_message_param_input" type="text" placeholder="Author Image URL of embed" ref={(input) => this.embed.author.icon_url = input} />
                </div>
            )
        } else {
            MessageBox = (
                <div>
                    <hr />
                    <h6 className="channel_message_param">Message: </h6>
                    <input maxLength="256" className="channel_message_param_input" type="text" ref={(input) => this.input = input} />
                    <hr />
                    <h6 className="channel_message_param">Attachment: </h6>
                    <input className="channel_message_param_input" type="file" ref={(input) => this.input = input} />
                </div>
            )
        }

        return (
            <div id="channel" className="channel" style={{ padding: "20px", height: "700px"}}>        
                <form onSubmit={(e) => this.handleText(e, this)}>
                    <label> 
                        <a onClick={this.toggleEmbedMode.bind(this)} style={{ background: "rgb(47, 46, 73)", padding: "5px" }}>EMBED MODE: {this.state.isEmbed ? "ON" : "OFF"}</a>
                        <div style={{ marginTop: "10px" }}>
                            {MessageBox}
                        </div>
                    </label>
                    <button type="submit" className="MenuButton SendButton" style={{ marginRight: "5%" }}>
                        <img className="MenuButtonImage" alt="MESSAGE BUTTON" src="https://image.flaticon.com/icons/svg/726/726580.svg" width="32px" height="32px" />
                    </button> 
                </form>
            </div>
        )
    }
}
