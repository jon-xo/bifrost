import React, { useContext, useState, useEffect } from "react";
// import { useHistory, useLocation } from "react-router-dom";
import { Button, Notification, Icon, Form, Modal, Container, Columns, Block } from "react-bulma-components";
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getUserDetail } from "../UtilityMethods";
import { UserAccountContext } from "../../providers/UserAccountProvider";
// import WarnUser from "../WarnUser";

const SettingsModal = () => {
    // const history = useHistory();
    // const location = useLocation();
    let currentUser = getUserDetail();

    const [ userObject, setUserObject ] = useState({});
    const [ displayModal, setDisplayModal ] = useState(false);

    const { getUserById, updateUser } = useContext(UserAccountContext);

    useEffect(() => {
        getUserById(currentUser, false)
        .then(setUserObject)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleUserInputChange = (event) => {
        const userUpdate = { ...userObject };
        userUpdate[event.target.name] = event.target.value;
        setUserObject(userUpdate);
    };

    const handleSaveCategory = (event) => {
        event.preventDefault();
        updateUser(userObject)
        .then(getUserById(currentUser, true))
        .then(() => {
            setDisplayModal(false)
        })
    };
    
    return (
        <>
            <Button 
                color='info' 
                colorVariant='light'
                onClick={() => {
                    setDisplayModal(true);
                }}
            >
                <Icon align="left" className='logo-icon'>
                    <FontAwesomeIcon icon={faCog} />
                </Icon>
                Settings
            </Button>
            
            <Modal
                show={displayModal}
                showClose={false}
                onClose={() => {
                    setDisplayModal(!displayModal);
                }}            
            >
                <Modal.Card
                    className={"auth-form--container"}
                >
                    <Modal.Card.Body>
                        <Container>
                            <Notification
                                color={"info"}
                                colorVariant={"light"}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Icon align={"left"} className='logo-icon'>
                                    <FontAwesomeIcon icon={faCog} size="lg" />
                                </Icon>
                                <p className='logo-header-2-sansSerif'>Settings</p>
                            </Notification>
                        </Container>
                        <Container
                            mt={2}
                        >
                            <form>
                                <Columns>
                                    <Columns.Column size={12}>
                                        <Form.Field>
                                            <Form.Control>
                                                <Form.Label>
                                                    Display Name
                                                </Form.Label>
                                                <Form.Input
                                                    color="info"
                                                    defaultValue={userObject?.displayName}
                                                    required
                                                    id="displayName"
                                                    name="displayName"                                        
                                                    onChange={handleUserInputChange}
                                                    />                                                        
                                            </Form.Control>
                                        </Form.Field>
                                    </Columns.Column>
                                    <Columns.Column size={12}>
                                        <Form.Field>
                                            <Form.Control>
                                                <Form.Label>
                                                    User summary
                                                </Form.Label>
                                                <Form.Textarea
                                                    color="info"
                                                    defaultValue={userObject?.userSummary}
                                                    id="userSummary"
                                                    name="userSummary"                                        
                                                    onChange={handleUserInputChange}
                                                    />                                                        
                                            </Form.Control>
                                        </Form.Field>
                                    </Columns.Column>
                                    <Columns.Column size={6}>
                                        <Notification
                                            color={"text"}
                                            colorVariant={"light"}
                                            className={"settings-notification--div"}
                                        >
                                            <Block renderAs={"fieldset"} disabled>
                                                <Form.Field>
                                                    <Form.Label textColor={"grey"}>
                                                        User Avatar (beta)
                                                    </Form.Label>
                                                    <Form.Control>
                                                        <Form.InputFile
                                                            color="text"
                                                            label="Select image..."
                                                            // defaultValue={userObject?.userSummary}
                                                            // filename=""
                                                            name="imageLocation"                            
                                                            // onChange={handleUserInputChange}
                                                            disabled
                                                        />                                                        
                                                    </Form.Control>
                                                </Form.Field>
                                            </Block>
                                        </Notification>
                                    </Columns.Column>
                                    <Columns.Column size={6}>
                                        <Notification
                                            color={"warning"}
                                            colorVariant={"light"}
                                            className={"settings-notification--div"}
                                        >
                                            <Form.Field>
                                                <Form.Control>
                                                    <Form.Label>
                                                        Account status
                                                    </Form.Label>
                                                    <Form.Checkbox
                                                        defaultValue={userObject?.private}
                                                        id="private"
                                                        name="private"
                                                        onChange={handleUserInputChange}
                                                    >
                                                        Private Account
                                                    </Form.Checkbox>
                                                </Form.Control>
                                            </Form.Field>
                                        </Notification>
                                    </Columns.Column>
                                </Columns>
                            </form>
                        </Container>
                    </Modal.Card.Body>
                    <Modal.Card.Footer 
                        renderAs={Button.Group} 
                        align={"right"} 
                    >
                        <Button 
                            color={"grey"}
                            // disabled={authButtonLoad}
                            onClick={() => {
                                setDisplayModal(!displayModal);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            color={"success"}
                            // disabled={authButtonLoad}
                            // loading={authButtonLoad}
                            onClick={(e) => {
                                handleSaveCategory(e)
                            }}
                        >
                            Update
                        </Button>
                    </Modal.Card.Footer>
                </Modal.Card>
            </Modal>

        </>
    );
    
};

export default SettingsModal;