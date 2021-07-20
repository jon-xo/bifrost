import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Notification, Icon, Form, Modal, Container } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser, faLock, faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { UserAccountContext } from "../../providers/UserAccountProvider";
import WarnUser from "../WarnUser";


const LoginModal = () => {
    const history = useHistory();
    const location = useLocation();

    const { login, warningProps, setWarningProps } = useContext(UserAccountContext);

    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();

    const [ openModal, setModalOpen ] = useState(false);
    
    const handleLogin = (e) => {
        e.preventDefault();
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
            // outlined
            // isStatic={inReading}
            // disabled={inReading}
            // loading={buttonLoading}
            onClick={() => {
                setModalOpen(true);
            }}
        >
            <Icon align="left">
                <FontAwesomeIcon icon={faKey} />
            </Icon>
            <span>Login</span>
        </Button>

        <Modal
            show={openModal}
            showClose={false}
            openClose={() => {
                setModalOpen(!openModal);
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
                            {/* <Notification
                                color={"dark"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"flex-end"}
                            >
                                <Heading 
                                    size={5}
                                    subtitle
                                    textAlign={"center"} 
                                >
                                    Login
                                </Heading>

                            </Notification> */}
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
                                // status="hover"
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
                                // status="hover"
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
                    {/* <Form.Field kind="group">
                        <Form.Control>
                            <Button color="link" onClick={(e) => {handleLogin(e)}}>Login</Button>
                        </Form.Control>
                        <Form.Control>
                            <Button color="link" colorVariant="light">
                                Cancel
                            </Button>
                        </Form.Control>
                    </Form.Field> */}
                </Modal.Card.Body>
                <Modal.Card.Footer 
                    renderAs={Button.Group} 
                    align={"right"} 
                >
                    <Button 
                        color={"grey"}
                        onClick={() => {
                            setModalOpen(!openModal);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color={"info"}
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