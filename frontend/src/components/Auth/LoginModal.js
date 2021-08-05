import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Notification, Icon, Form, Modal, Container } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser, faLock, faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { UserAccountContext } from "../../providers/UserAccountProvider";
import WarnUser from "../WarnUser";

// -- LoginModal --
// A refactor of LoginDropdown, component uses multiple methods 
// from UserAccountProvider to render custom Bulma Notification,
// using warningProps object in state.
// Component state is used to store email and password, when user 
// clicks login button, handleLogin function takes the following action:
// - prevents eventListner default
// - toggles authButtonLoad state to true, providing UI feedback to user
// - utilizes useHistory and useLocation to ensure user's current app page
// is continually displayed
// - catch method redirects Firebase error to build warningProps object 
// rendering WarnUser component.

const LoginModal = () => {
    const history = useHistory();
    const location = useLocation();

    const { openLoginModal, setOpenLoginModal, authModalToggle, authButtonLoad, setAuthButtonLoad, login, warningProps, setWarningProps } = useContext(UserAccountContext);

    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    
    const handleLogin = (e) => {
        e.preventDefault();
        setAuthButtonLoad(true);
        login(email, password)
        .then(() => history.push(location.pathname))
        .catch(() => {
            setWarningProps({ 
                textSize: 5,
                color: 'warning', 
                hidden: false,  
                message: 'Invalid email or password'
            });
        });
    }

    return (
        <>
        <Button
            color="info"
            colorVariant={"dark"}
            onClick={() => {
                setOpenLoginModal(true);
            }}
        >
            <Icon align="left">
                <FontAwesomeIcon icon={faKey} />
            </Icon>
            <span>Login</span>
        </Button>

        <Modal
            show={openLoginModal}
            showClose={false}
            onClose={() => {
                setOpenLoginModal(!openLoginModal);
            }}            
        >
            <Modal.Card
                className={"auth-form--container"}
            >
                <Modal.Card.Body>
                    <Container>
                        <WarnUser {...warningProps} />
                        <Notification
                            color={"dark"}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Icon align={"left"} className='logo-icon'>
                                <FontAwesomeIcon icon={faSnowflake} size="lg" />
                            </Icon>
                            <p className='logo-header-2-sansSerif'>bifröst</p>
                        </Notification>
                    </Container>
                    <Form.Field>
                        <Form.Control>
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Input
                                color="info"
                                placeholder="user@example.com"
                                size="medium"
                                type="text"
                                id="email"
                                onChange={(e) => {setEmail(e.target.value)}}
                            />
                            <Icon 
                                align={"left"} 
                                className={"auth-form--icon"}
                            >
                                <FontAwesomeIcon icon={faUser} />

                            </Icon>
                        </Form.Control>
                        <Form.Control>
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Input
                                color="info"
                                placeholder="password"
                                size="medium"
                                type="password"
                                id="password"
                                onChange={(e) => {setPassword(e.target.value)}}
                            />
                            <Icon 
                                    align={"left"} 
                                    className={"auth-form--icon"}
                                >
                                    <FontAwesomeIcon icon={faLock} />

                            </Icon>
                        </Form.Control>
                    </Form.Field>
                    <div class="divider">or</div>
                    <Button
                        fullwidth={true}
                        color={"primary"}
                        onClick={() => {
                            authModalToggle();
                        }}
                    >
                        Register
                    </Button>
                </Modal.Card.Body>
                <Modal.Card.Footer 
                    renderAs={Button.Group} 
                    align={"right"} 
                >
                    <Button 
                        color={"grey"}
                        disabled={authButtonLoad}
                        onClick={() => {
                            setOpenLoginModal(!openLoginModal);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color={"info"}
                        disabled={authButtonLoad}
                        loading={authButtonLoad}
                        onClick={(e) => {
                            handleLogin(e)
                        }}
                    >
                        Login
                    </Button>
                </Modal.Card.Footer>
            </Modal.Card>
        </Modal>
        </>
    );
};

export default LoginModal;