import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserAccountContext } from "../providers/UserAccountProvider";
import { SearchComicContext } from "../providers/SearchComicProvider";
import { Navbar, Icon, Form, Button, Container } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import LoginDropdown from "./Auth/LoginDropdown";
import RegisterDropdown from "./Auth/RegisterDropdown";
import "../index.css"


const Header = () => {

    const history = useHistory();
    
    const [ queryString, setQueryString ] = useState("");
    const { searchIssues } = useContext(SearchComicContext)

    const handleSearch = (event) => {
        event.preventDefault();
        const encodedQuery = encodeURIComponent(queryString)
        searchIssues(encodedQuery)
        .then(() => {
            history.push("/search/issues")
        })
    };

    return (
        <>
        <Navbar aria-label="main navigation" color='dark' transparent='true' fixed='top'>            
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
            <Navbar.Container align='end' transparent='true'>
                <Navbar.Item active={'true'} hoverable={'true'}>
                    <form>
                        <Form.Field kind="addons">
                            <Form.Control>
                                <Form.Input placeholder="Find a post" onChange={(e) => {setQueryString(e.target.value)}}/>
                            </Form.Control>
                            <Form.Control>
                                <Button color='info' onClick={(e) => {handleSearch(e)}}>
                                    Search
                                </Button>
                            </Form.Control>
                        </Form.Field>
                    </form>
                </Navbar.Item>
                </Navbar.Container>  
                <Navbar.Container align='end'>
                    <Navbar.Item active={'true'}>
                        <Container>
                            <LoginDropdown />
                            <RegisterDropdown />
                        </Container>
                    </Navbar.Item>
                </Navbar.Container>
        </Navbar>
        </>
    );
};

export default Header;