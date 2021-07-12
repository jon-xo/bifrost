import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserAccountContext } from "../providers/UserAccountProvider";
import { SearchComicContext } from "../providers/SearchComicProvider";
import { Navbar, Icon, Form, Button, Container } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faCog, faArrowCircleRight, faSnowflake } from '@fortawesome/free-solid-svg-icons'
import LoginDropdown from "./Auth/LoginDropdown";
import RegisterDropdown from "./Auth/RegisterDropdown";
import SearchBar from "./Search/SearchBar";
import "../index.css"

const Header = () => {
    // 
    // ---- GitHub Issue Ticket # 1 ----
    // [Authentication [Ticket #1]](https://github.com/jon-xo/bifrost/issues/2)
    // 
    // - Added isLoggedIn state and logout method from UserAccountProvider to check
    // Firebase Status
    // - Created dedicated methods for Login and Registration Dropdowns
    // - Added ternary to display logout/settings button comboniation,
    // when succesful login/registration has occured.
    // 


    const { isLoggedIn, logout } = useContext(UserAccountContext);
    const [ showBurger, setShowBurger ] = useState(false);

    const history = useHistory();

    // -- GitHub Issue Ticket # 2 ---
    // [Navbar [Ticket #2]](https://github.com/jon-xo/bifrost/issues/3)
    // 
    // - Added burgerToggle to toggle nav visibilty when burger button
    //   is displayed
    // - Added dynamic Reading List and Follows nav items when user is logged in
    // - Updated CSS classes for spacing and icons


    const burgerToggle = () => {
        // debugger
        setShowBurger(!showBurger);
    }; 

    return (
        <>
        <Navbar 
            aria-label="main navigation" 
            color='dark' 
            transparent
            fixed='top' 
            active={showBurger}>            
            <Navbar.Brand>
                <Navbar.Item>
                    <Icon className='logo-icon'>
                        <FontAwesomeIcon className='.logo-icon' icon={faSnowflake} />
                    </Icon>
                    <p className='logo-text-sansSerif'>bifröst</p>
                </Navbar.Item>
                <Navbar.Burger onClick={burgerToggle}/>            
            </Navbar.Brand>            
            <Navbar.Menu>
                <Navbar.Container position='start' tabs='true'>
                    <Navbar.Item>
                        <Navbar.Link className={"nav-links"} renderAs={NavLink} to={'/'} arrowless='true'>
                           Home
                        </Navbar.Link>
                    </Navbar.Item>
                    <Navbar.Item 
                        hoverable="false"
                        href="#"
                    >
                        <Navbar.Item  className={"nav-links"} arrowless='true'>
                            Releases
                        </Navbar.Item>
                        <Navbar.Dropdown>
                        <Navbar.Link >
                            <Navbar.Item renderAs={NavLink} to={'/previous-comics'} arrowless='true'>
                                Previous Comics
                                {/* <NavLink to="/previous-comics">Previous Comics</NavLink> */}
                            </Navbar.Item>
                        </Navbar.Link>
                        <Navbar.Link>
                            <Navbar.Item renderAs={NavLink} to={'/current-comics'} arrowless='true'>
                                Current Comics
                                {/* <NavLink to="/current-comics">Current Comics</NavLink> */}
                            </Navbar.Item>
                        </Navbar.Link>
                        <Navbar.Link>
                            <Navbar.Item renderAs={NavLink} to={'/upcoming-comics'} arrowless='true'>
                                Upcoming Comics
                                {/* <NavLink to="/upcoming-comics">Upcoming Comics</NavLink> */}
                            </Navbar.Item>
                        </Navbar.Link>
                        </Navbar.Dropdown>
                    </Navbar.Item>
                    {isLoggedIn ?
                        <Navbar.Link arrowless='true'>
                            <Navbar.Item className={"nav-links"} renderAs={NavLink} to={'/reading'} >
                                Reading List
                            </Navbar.Item>
                        </Navbar.Link>
                        :
                        <></>
                    }
                    {isLoggedIn ?
                        <Navbar.Link arrowless='true'>
                            <Navbar.Item className={"nav-links"} renderAs={NavLink} to={'/activity'}>
                                Activity
                            </Navbar.Item>
                         </Navbar.Link>
                        :
                        <></>
                    }
                    {isLoggedIn ?
                        <Navbar.Link arrowless='true'>
                            <Navbar.Item className={"nav-links"} renderAs={NavLink} to={'/follows'}>
                                Follows
                            </Navbar.Item>
                         </Navbar.Link>
                        :
                        <></>
                    }
                </Navbar.Container>

                <Navbar.Container align='right' transparent='true' className='nav-controls'>
                    <Navbar.Item active={'true'}>
                        <SearchBar />
                    </Navbar.Item>
                </Navbar.Container>  
                <Navbar.Container align='right'>
                    <Navbar.Item active={'true'}>
                            {isLoggedIn ?
                            <>
                                <Container className='container-base'>
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
                                </Container>
                            </>
                            :
                            <>
                                <Container className='container-base'>
                                    <LoginDropdown />
                                    <RegisterDropdown />
                                </Container>
                            </>
                            }
                    </Navbar.Item>
                </Navbar.Container>
                </Navbar.Menu>
        </Navbar>
        </>
    );
};

export default Header;