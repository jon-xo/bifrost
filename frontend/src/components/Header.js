import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserAccountContext } from "../providers/UserAccountProvider";
import { SearchComicContext } from "../providers/SearchComicProvider";
import { Navbar, Icon, Form, Button, Container } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faCog, faArrowCircleRight, faSearch } from '@fortawesome/free-solid-svg-icons'
// import { faArrowAltCircleRight,  } from "@fortawesome/free-regular-svg-icons";
import LoginDropdown from "./Auth/LoginDropdown";
import RegisterDropdown from "./Auth/RegisterDropdown";
import "../index.css"


const Header = () => {
    // -- GitHub Issue Ticket # 1 ---
    // [Authentication [Ticket #1]](https://github.com/jon-xo/bifrost/issues/2)
    // 
    // - Added isLoggedIn state and logout method from UserAccountProvider to check
    // Firebase Status
    // - Created dedicated methods for Login and Registration Dropdowns
    // - Added ternary to display logout/settings button comboniation,
    // when succesful login/registration has occured.
    // 


    const history = useHistory();

    const { isLoggedIn, logout } = useContext(UserAccountContext);
    
    const [ queryString, setQueryString ] = useState("");
    const { searchIssues } = useContext(SearchComicContext);
    const [ showBurger, setShowBurger ] = useState(false);

    const handleSearch = (event) => {
        event.preventDefault();
        const encodedQuery = encodeURIComponent(queryString)
        searchIssues(encodedQuery)
        .then(() => {
            history.push("/search/issues")
        })
    };

    const burgerToggle = () => {
        // debugger
        setShowBurger(!showBurger);
    }; 

    return (
        <>
        <Navbar aria-label="main navigation" color='dark' transparent='true' fixed='top' active={showBurger}>            
            <Navbar.Brand>
                <Navbar.Item>
                <Icon className='logo-icon'>
                    <FontAwesomeIcon className='.logo-icon' icon={faBookOpen} />
                </Icon>
                <p className='logo-text-sansSerif'>Hello</p><p className='logo-text-serif'>Story</p>
                </Navbar.Item>
                <Navbar.Burger onClick={burgerToggle}/>            
            </Navbar.Brand>            
            <Navbar.Menu>
                <Navbar.Container position='start' tabs='true'>
                    <Navbar.Link arrowless='true'>
                        <NavLink to="/">Home</NavLink>
                    </Navbar.Link>
                    <Navbar.Item
                        // active="false"
                        hoverable="false"
                        href="#"
                    >
                        <Navbar.Link arrowless='true'>
                            Releases
                        </Navbar.Link>
                        <Navbar.Dropdown>
                            <Navbar.Link arrowless='true'>
                                <NavLink to="/previous-comics">Previous Comics</NavLink>
                            </Navbar.Link>
                            <Navbar.Link arrowless='true'>
                                <NavLink to="/current-comics">Current Comics</NavLink>
                            </Navbar.Link>
                            <Navbar.Link arrowless='true'>
                                <NavLink to="/upcoming-comics">Upcoming Comics</NavLink>
                            </Navbar.Link>
                        </Navbar.Dropdown>
                    </Navbar.Item>
                    {isLoggedIn ?
                         <Navbar.Link arrowless='true'>
                             <NavLink to="/">Reading List</NavLink>
                         </Navbar.Link>
                        :
                        <></>
                    }
                    {isLoggedIn ?
                         <Navbar.Link arrowless='true'>
                             <NavLink to="/">Follows</NavLink>
                         </Navbar.Link>
                        :
                        <></>
                    }
                </Navbar.Container>

                <Navbar.Container align='right' transparent='true' className='nav-controls'>
                    <Navbar.Item active={'true'}>
                        <form>
                            <Form.Field kind="addons">
                                <Form.Control>
                                    <Form.Input placeholder="Find a post" onChange={(e) => {setQueryString(e.target.value)}}/>
                                </Form.Control>
                                <Form.Control>
                                    <Button color='info' onClick={(e) => {handleSearch(e)}}>
                                        <Icon className='logo-icon'>
                                            <FontAwesomeIcon icon={faSearch} />
                                        </Icon>
                                        Search
                                    </Button>
                                </Form.Control>
                            </Form.Field>
                        </form>
                    </Navbar.Item>
                </Navbar.Container>  
                <Navbar.Container align='right' className='nav-controls'>
                    <Navbar.Item active={'true'}>
                        <Container className='container-base'>
                            {isLoggedIn ?
                            <>
                                <Button color='info' colorVariant='light'>
                                    <Icon className='logo-icon'>
                                        <FontAwesomeIcon icon={faCog} />
                                    </Icon>
                                    Settings
                                </Button>
                                <Button color='danger' colorVariant='light' onClick={logout}>
                                    <Icon className='logo-icon'>
                                        <FontAwesomeIcon icon={faArrowCircleRight} />
                                    </Icon>
                                    Log Out
                                </Button>
                            </>
                            :
                            <>
                                <LoginDropdown />
                                <RegisterDropdown />
                            </>
                            }
                        </Container>
                    </Navbar.Item>
                </Navbar.Container>
                </Navbar.Menu>
        </Navbar>
        </>
    );
};

export default Header;