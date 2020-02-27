/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './index.css';

export default function index({ guilds }) {
    console.log(guilds);
    return (
        <div className="container">
            { guilds.map(guild => (
                <div className="guild">
                    <img className="guild_icon" src={ guild.iconURL || 'https://cdn.discordapp.com/icons/657586144791363594/5f8627ef6dc69b914ed90c3e029a9fbc.webp?size=128' }></img>
                    <p className="guild_name"> {guild.name} </p>
                </div>
            ))}
        </div>
    )
}
