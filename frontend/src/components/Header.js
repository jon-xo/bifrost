import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Navbar, Icon, Form, Button } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import "../index.css"


const Header = () => {
    return (
        <>
        <Navbar aria-label="main navigation" color='dark'>            
            <Navbar.Brand>
                <Navbar.Item>
                <Icon className='logo-icon'>
                    <FontAwesomeIcon className='.logo-icon' icon={faBookOpen} />
                </Icon>
                <p className='logo-text-sansSerif'>Hello</p><p className='logo-text-serif'>Story</p>
                </Navbar.Item>
            </Navbar.Brand>
            <Navbar.Container position='start' tabs='true'>
                <Navbar.Link arrowless='true'>
                    <NavLink to="/">Home</NavLink>
                </Navbar.Link>
                <Navbar.Link arrowless='true'>
                    <NavLink to="/previous-comics">Previous Comics</NavLink>                        
                </Navbar.Link>
                <Navbar.Link arrowless='true'>
                    <NavLink to="/current-comics">Current Comics</NavLink>                        
                </Navbar.Link>
                <Navbar.Link arrowless='true'>
                    <NavLink to="/upcoming-comics">Upcoming Comics</NavLink>                        
                </Navbar.Link>
            </Navbar.Container>
            <Navbar.Container align='end'>
                <Navbar.Item active={true} hoverable={false}>
                    <form>
                        <Form.Field kind="addons">
                            <Form.Control>
                                <Form.Input placeholder="Find a post" />
                            </Form.Control>
                            <Form.Control>
                                <Button color='info'>
                                    Search
                                </Button>
                            </Form.Control>
                        </Form.Field>
                    </form>
                </Navbar.Item>
            </Navbar.Container>  
        </Navbar>
        </>
    );
};

export default Header;