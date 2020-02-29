import React, { Component } from 'react';
import './ShortGuild.css';

export default class index extends Component {
    constructor({ guild }) {
        super();

        this.state = {};

        this.guild = guild;
    }

    openGuild() {
        
    }

    render() {
        return (
            <div className="ShortGuild" onClick={() => console.log('CLICKED') }>
                <img alt="" className="ShortGuild_icon" src={ this.guild.iconURL || 'https://cdn.discordapp.com/icons/657586144791363594/5f8627ef6dc69b914ed90c3e029a9fbc.webp?size=128' }></img>
                <p className="ShortGuild_name"> {this.guild.name} </p>
            </div>
        )
    }
}
