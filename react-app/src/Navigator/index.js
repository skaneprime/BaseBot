
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class index extends Component {
    render() {
        return (
            <div>
                <nav className="NavBar">
                    <ul>
                        <Link className="NavChild" to="/client">
                            <img alt='' style={{ marginTop: "1em" }} src="https://i.imgur.com/2rxzMeV.png" width="45px" height="45px" />
                        </Link>
                        <Link className="NavChild" to="/guilds">
                            <img alt='' style={{ marginTop: "1em" }} src="https://i.imgur.com/mGUSbgL.png" width="45px" height="45px" />
                        </Link>
                    </ul>
                </nav>
            </div>
        )
    }
}
