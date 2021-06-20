import React, { useState, useContext } from "react";
import { NavLink as RRNavLink } from "react-router-dom";


const Header = () => {
    return (
        <>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div id="nav-home" className="navbar-menu">
                <div className="navbar-start">
                    <a className="navbar-item" tag={RRNavLink} to="/">
                        Home
                    </a>

                    <a className="navbar-item"  tag={RRNavLink} to="/past-comics">
                        Past Comics
                    </a>

                    <a className="navbar-item"  tag={RRNavLink} to="/current-comics">
                        Current Comics
                    </a>

                    <a href="" className="navbar-item" tag={RRNavLink} to="/future-comics">
                        Future Comics
                    </a>
                </div>
            </div>
        </nav>

        </>
    );
};

export default Header;