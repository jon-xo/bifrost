import React, { useContext, useState, useEffect } from "react";
import { Button, Notification, Icon, Form, Modal, Container, Columns, Block } from "react-bulma-components";
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getUserDetail } from "../UtilityMethods";
import { UserAccountContext } from "../../providers/UserAccountProvider";
// import WarnUser from "../WarnUser";

//  --- SettingsModal ---
//  Constructed from the Register/LoginModal.js template, SettingsModal 
//  uses getUserById, updateUser, & setRefreshState methods from UserAccountProvider 
//  to allow edit/update of multiple user settings rendered in a custom Bulma Notification.
//  Users can update the follow values*:
// 
//  - displayName 
//  - userSummary
//  - Private [boolean]
// 
//  The handleUserInputChange function spreads the userObject in component state
//  into a variable locally scoped to the function and updates the related form element
//  with the related value. Function is envoked via an onChange event.
//  
//  On save the handleSaveCategory function is envoked and performs the following steps:
// 
//  - Prevents eventListner default
//  - Sets the modalLoading state to true, providing UI feedback during the async call
//  - Creates API call to update user details
//  - Once the async call is complete, function then takes multiple steps:
//      + updates the userObject in state with the current selected user private boolean
//      + Sets loading state to false to disable UI feedback
//      + Sets showModal to false to hide LoginModal
//      + Updates the setRefreshState boolean provided via Context which triggers
//        useEffect to update the ActivityList to hide/show the user based on private status.
// 
// * While the userAvatar field is displayed, it is marked as beta and disabled to the user.

const SettingsModal = () => {
    let currentUser = getUserDetail();
    const { getUserById, updateUser, setRefreshState } = useContext(UserAccountContext);

    const [ userObject, setUserObject ] = useState({});
    const [ displayModal, setDisplayModal ] = useState(false);
    const [ modalLoading, setModalLoading ] = useState(false);
    const [ userSettingsPrivate, setUserSettingsPrivate ] = useState(userObject?.private);


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
        setModalLoading(true);
        userObject.private = userSettingsPrivate;
        // debugger
        updateUser(userObject)
        .then(getUserById(currentUser, true))
        .then(() => {
            setDisplayModal(false);
            setModalLoading(false);
            setRefreshState(true);
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
                                                    disabled={modalLoading}
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
                                                    disabled={modalLoading}
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
                                            <Block 
                                                renderAs={"fieldset"} 
                                                disabled
                                                // unselectable={true}
                                            >
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
                                                        defaultChecked={userObject?.private}
                                                        id="private"
                                                        name="private"
                                                        onClick={() => {
                                                            // debugger
                                                            setUserSettingsPrivate(!userSettingsPrivate);
                                                        }}
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
                            disabled={modalLoading}
                            onClick={() => {
                                setDisplayModal(!displayModal);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            color={"success"}
                            disabled={modalLoading}
                            loading={modalLoading}
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