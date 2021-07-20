import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserAccountContext } from "../providers/UserAccountProvider";
// import { SearchComicContext } from "../providers/SearchComicProvider";
import { Navbar, Icon,  Button, Container } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faArrowCircleRight, faSnowflake } from '@fortawesome/free-solid-svg-icons'
// import LoginDropdown from "./Auth/LoginDropdown";
// import RegisterDropdown from "./Auth/RegisterDropdown";
import LoginModal from "./Auth/LoginModal";
import RegisterModal from "./Auth/RegisterModal";
import SearchBar from "./Search/SearchBar";
import clsx from 'clsx';
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

    const location = useLocation();
    // console.log(location);
    // const history = useHistory();
    const currentRoute = location.pathname;
    
    let activeRoute = [
        {
            route: '/',
            bool: false 
        },
        {
            route: '/previous-comics',
            bool: false
        },
        {
            route: '/current-comics',
            bool: false
        },
        {
            route: '/upcoming-comics',
            bool: false
        },
        {
            route: '/reading',
            bool: false
        },
        {
            route: '/activity',
            bool: false
        },
        {
            route: '/follows',
            bool: false
        },
        {
            route: '/releases',
            bool: false
        }
    ];
    

    const checkActiveRoute = (route, objectArray) => {
        const routeMatch = objectArray.findIndex((o) => o.route === route);
        // console.log(objectArray[routeMatch].route);
        // console.log(objectArray[routeMatch].bool);


        objectArray.forEach((e, indx) => {
            if(indx === routeMatch){
                // debugger
                e.bool = true;
            } else {
                // debugger
                e.bool = false;
            }
        });
        
        const rDropdown = objectArray.findIndex((o) => o.route.includes('releases'));

        if(routeMatch === 1 ||routeMatch === 2 || routeMatch === 3 ){
            objectArray[rDropdown].bool = true;
        } else {
            objectArray[rDropdown].bool = false;
        }
    };
    
    checkActiveRoute(currentRoute, activeRoute);

    // const history = useHistory();

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
            // transparent
            fixed='top' 
            active={showBurger}>            
            <Navbar.Brand>
                <Navbar.Item>
                    <Icon className='logo-icon'>
                        <FontAwesomeIcon icon={faSnowflake} />
                    </Icon>
                    <p className='logo-text-sansSerif'>bifröst</p>
                </Navbar.Item>
                <Navbar.Burger onClick={burgerToggle}/>            
            </Navbar.Brand>            
            <Navbar.Menu>
                <Navbar.Container position='start' tabs='true'>
                    <Navbar.Item
                        active={activeRoute[0].bool}
                    >
                        <Navbar.Link 
                            // className={"nav-links"} 
                            renderAs={NavLink} 
                            to={'/'} 
                            arrowless='true' 
                            onClick={() => {
                                checkActiveRoute(currentRoute, activeRoute);
                            }}
                        >
                           Home
                        </Navbar.Link>
                    </Navbar.Item>
                    <Navbar.Item 
                        href="#"
                        hoverable={true}
                    >
                        <Navbar.Link 
                        >
                            Releases
                        </Navbar.Link>
                        <Navbar.Dropdown 
                            boxed={true}                            
                            >
                        {/* <Navbar.Link > */}
                            <Navbar.Item 
                                renderAs={NavLink} 
                                to={'/previous-comics'} 
                                arrowless='true' 
                                active={activeRoute[1].bool}
                                onClick={(e) => {
                                    checkActiveRoute(currentRoute, activeRoute);
                                    e.target.blur();
                                }}
                            >
                                Previous Comics
                            </Navbar.Item>
                        {/* </Navbar.Link> */}
                        {/* <Navbar.Link> */}
                            <Navbar.Item 
                                renderAs={NavLink} 
                                to={'/current-comics'} 
                                arrowless='true' 
                                active={activeRoute[2].bool}
                                onClick={(e) => {
                                    checkActiveRoute(currentRoute, activeRoute);
                                    e.target.blur();
                                }}
                            >
                                Current Comics
                            </Navbar.Item>
                        {/* </Navbar.Link> */}
                        {/* <Navbar.Link> */}
                            <Navbar.Item 
                                renderAs={NavLink} 
                                to={'/upcoming-comics'} 
                                arrowless='true' 
                                active={activeRoute[3].bool}
                                onClick={(e) => {
                                    checkActiveRoute(currentRoute, activeRoute);
                                    e.target.blur();
                                }}
                            >
                                Upcoming Comics
                            </Navbar.Item>
                        {/* </Navbar.Link> */}
                        </Navbar.Dropdown>
                    </Navbar.Item>
                    {isLoggedIn ?
                        <Navbar.Item
                            active={activeRoute[4].bool}
                        >
                            <Navbar.Link 
                                // className={"nav-links"} 
                                renderAs={NavLink} 
                                to={'/reading'} 
                                arrowless={true}
                                onClick={() => {
                                    checkActiveRoute(currentRoute, activeRoute);
                                }}
                            >
                                Reading List
                            </Navbar.Link>
                        </Navbar.Item>
                        :
                        <></>
                    }
                    {isLoggedIn ?
                        <Navbar.Item
                            active={activeRoute[5].bool}
                        >
                            <Navbar.Link 
                                // className={"nav-links"} 
                                renderAs={NavLink} 
                                to={'/activity'} 
                                arrowless={true}
                                onClick={() => {
                                    checkActiveRoute(currentRoute, activeRoute);
                                }}
                            >
                                Activity
                            </Navbar.Link>
                         </Navbar.Item>
                        :
                        <></>
                    }
                    {isLoggedIn ?
                        <Navbar.Item
                            active={activeRoute[6].bool}
                        >
                            <Navbar.Link 
                                // className={"nav-links"} 
                                renderAs={NavLink} 
                                to={'/follows'} 
                                arrowless={true}
                                onClick={() => {
                                    checkActiveRoute(currentRoute, activeRoute);
                                }}
                            >
                                Follows
                            </Navbar.Link>
                         </Navbar.Item>
                        :
                        <></>
                    }
                </Navbar.Container>

                <Navbar.Container 
                    align='right' 
                    className='nav-controls'
                    p={2}
                >
                    {/* <Navbar.Item 
                        active={false}
                        hoverable={false}
                    > */}
                        <SearchBar />
                    {/* </Navbar.Item> */}
                </Navbar.Container>  
                <Navbar.Container
                    align='right'
                    p={2}
                >
                    {/* <Navbar.Item 
                        active={false}
                        hoverable={false}
                    > */}
                            {isLoggedIn ?
                            <>
                                <Container 
                                    className={clsx('container-base', 'nav-controls')}
                                    display={"flex"}
                                    justifyContent={"center"}
                                    >
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
                                <Container 
                                    className='container-base'
                                    display={"flex"}
                                    justifyContent={"center"}
                                >
                                    <LoginModal />
                                    <RegisterModal />
                                </Container>
                            </>
                            }
                    {/* </Navbar.Item> */}
                </Navbar.Container>
                </Navbar.Menu>
        </Navbar>
        </>
    );
};

export default Header;