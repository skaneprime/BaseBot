import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class index extends Component {
    render() {
        return (
            <div>
                <nav className="NavBar">
                    <ul>
                        <Link className="NavChild" to="/">
                            <img alt='' src="https://image.flaticon.com/icons/svg/937/937475.svg" width="64px" height="64px" />
                        </Link>
                        <Link className="NavChild" to="/client">
                            <img alt='' src="https://image.flaticon.com/icons/svg/2593/2593177.svg" width="64px" height="64px" />
                        </Link>
                        <Link className="NavChild" to="/guilds">
                            <img alt='' src="https://image.flaticon.com/icons/svg/1665/1665754.svg" width="64px" height="64px" />
                        </Link>
                    </ul>
                </nav>
            </div>
        )
    }
}
