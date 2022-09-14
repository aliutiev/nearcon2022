import React from "react";

import {
    Route,
    Routes,
    NavLink
} from 'react-router-dom';

import HomePage from "../pages/homePage";
import logo from "./../assets/img/etlogo2.png";

function Header() {
    return (
        <div>
            <div className="cheader">
                <img className="clogo" src={logo} />
         
                <ul className='ul-style'>
                    <li className='li-style'>
                        <NavLink
                            className="App-link"
                            to=""
                        >
                            Home
                        </NavLink></li>
                    <li className='li-style'>
                        <NavLink
                            className="App-link"
                            to="About Us"
                        >
                            About Us
                        </NavLink></li>

                </ul>
            </div>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                />
                <Route
                    path="/aboutus"
                    element={null}

                />
                <Route
                    path="/withdraw"
                    element={null}

                />
            </Routes>

        </div>
    )
}

export default Header;