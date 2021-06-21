import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "react-bulma-components";
// import { NavbarSection, NavbarLink } from "react-bulma-components/src/components/navbar"


const Header = () => {
    return (
        <>
        <Navbar aria-label="main navigation" color='black'>            
                <Navbar.Container position='start' tabs='true'>
                    <Navbar.Link>
                        <NavLink to="/">Home</NavLink>
                    </Navbar.Link>

                    <Navbar.Link>
                        <NavLink to="/previous-comics">Previous Comics</NavLink>                        
                    </Navbar.Link>

                    <Navbar.Link>
                        <NavLink to="/current-comics">Current Comics</NavLink>                        
                    </Navbar.Link>

                    <Navbar.Link>
                        <NavLink to="/upcoming-comics">Upcoming Comics</NavLink>                        
                    </Navbar.Link>
                </Navbar.Container>            
        </Navbar>

        </>
    );
};

export default Header;