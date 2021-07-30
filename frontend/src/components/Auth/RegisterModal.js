import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Notification, Icon, Form, Modal, Container } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHatWizard, faUser, faLock, faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { UserAccountContext } from "../../providers/UserAccountProvider";
import WarnUser from "../WarnUser";


const RegisterModal = () => {
    const history = useHistory();
    const location = useLocation();

    const { openRegisterModal, setOpenRegisterModal, authModalToggle, authButtonLoad, setAuthButtonLoad, register, warningProps, setWarningProps } = useContext(UserAccountContext);

    const [ name, setName] = useState();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ confirmPassword, setConfirmPassword ] = useState();
    const [ displayName, setDisplayName ] = useState();
    
    const handleRegister = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setWarningProps({ 
                textSize: 5,
                color: 'warning', 
                hidden: false,  
                message: `${name}: ${"\n"} ${"\n"}your passwords do not match, try again.`
            });
        } else {
            setAuthButtonLoad(true);
            const userAccount = { 
                name: name, 
                email: email,
                displayName: displayName,
                imageLocation: "./avatar_default1.png"
            }
            register(userAccount, password)
            .then(() => history.push(location.pathname))
            .catch((c) => {
                if(c.code === "auth/email-already-in-use"){
                    setWarningProps({ 
                        textSize: 5,
                        color: 'warning', 
                        hidden: 'false',  
                        message: `The email ${email} is already in use.`
                    })
                }
            });
        }
    };

    return (
        <>
        <Button
            color="primary"
            // colorVariant={"primary"}
            // outlined
            // isStatic={inReading}
            // disabled={inReading}
            // loading={buttonLoading}
            onClick={() => {
                setOpenRegisterModal(true);
            }}
        >
            <Icon align="left">
                <FontAwesomeIcon icon={faHatWizard} />
            </Icon>
            <span>Register</span>
        </Button>

        <Modal
            show={openRegisterModal}
            showClose={false}
            onClose={() => {
                setOpenRegisterModal(!openRegisterModal);
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
                                Name
                            </Form.Label>
                            <Form.Input
                                color="primary"
                                placeholder="Steve Rogers"
                                size="medium"
                                status="hover"
                                type="text"
                                onChange={(e) => {setName(e.target.value)}}
                                />
                        </Form.Control>
                        <Form.Control>
                            <Form.Label>
                                Username
                            </Form.Label>
                            <Form.Input
                                color="primary"
                                placeholder="Cap1776"
                                size="medium"
                                status="hover"
                                type="text"
                                onChange={(e) => {setDisplayName(e.target.value)}}
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
                                Email
                            </Form.Label>
                            <Form.Input
                                color="primary"
                                placeholder="user@example.com"
                                size="medium"
                                status="hover"
                                type="text"
                                onChange={(e) => {setEmail(e.target.value)}}
                                />
                        </Form.Control>
                        <Form.Control>
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Input
                                color="primary"
                                placeholder="password"
                                size="medium"
                                status="hover"
                                type="password"
                                onChange={(e) => {setPassword(e.target.value)}}
                                />
                            <Icon 
                                align={"left"} 
                                className={"auth-form--icon"}
                            >
                                <FontAwesomeIcon icon={faLock} />
                            </Icon>
                        </Form.Control>
                        <Form.Control>
                            <Form.Label>
                                Confirm Password
                            </Form.Label>
                            <Form.Input
                                color="primary"
                                placeholder="password"
                                size="medium"
                                status="hover"
                                type="password"
                                onChange={(e) => {setConfirmPassword(e.target.value)}}
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
                        color={"info"}
                        onClick={() => {
                            authModalToggle();
                        }}
                    >
                        Login
                    </Button>

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
                        disabled={authButtonLoad}
                        onClick={() => {
                            setOpenRegisterModal(!openRegisterModal);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color={"primary"}
                        disabled={authButtonLoad}
                        loading={authButtonLoad}
                        onClick={(e) => {
                            handleRegister(e)
                        }}
                    >
                        Register
                    </Button>
                </Modal.Card.Footer>
            </Modal.Card>
        </Modal>
        </>
        );

};

export default RegisterModal;