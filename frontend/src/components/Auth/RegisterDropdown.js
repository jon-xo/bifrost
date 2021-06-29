import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Dropdown, Icon, Form } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import { UserAccountContext } from "../../providers/UserAccountProvider";
import WarnUser from "../WarnUser";
import "../../index.css"

const RegisterDropdown = () => {
    // -- GitHub Issue Ticket # 1 ---
    // [Authentication [Ticket #1]](https://github.com/jon-xo/bifrost/issues/2)
    // 
    // - RegistrationDropdown imports register method and warningProps/setWarningProps
    // from UserAccountProvider
    // - Unique state is declared for name, email, password, password confirmation,
    // and display name -- state is updated onChange for each related form field
    // - handleRegister is envoked onClick and prevents default function,
    // condition adds a new object to warningProps state depending on error condition,
    // once warningProps state is modified with key/value hidden/false,
    // the WarnUser method is envoked. 
    // On succesful user form submission, register method is called and user is logged in. 
    // 

    
    const history = useHistory();
    const { register, warningProps, setWarningProps } = useContext(UserAccountContext);

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
                hidden: 'false',  
                message: `${name}: ${"\n"} ${"\n"}your passwords do not match, try again.`
            });
        } else {
            const userAccount = { name, email, displayName}
            register(userAccount, password)
            .then(() => history.push("/"))
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
    }
    
    return (
        <Dropdown
            closeOnSelect={false}
            color="primary"
            colorVariant="light"
            right="true"
            icon={<Icon><FontAwesomeIcon className='.logo-icon' icon={faHatWizard} /></Icon>}
            label="Register"
        >
            <Dropdown.Item
                 renderAs="field"
                 value="form"
            >
                <WarnUser {...warningProps} />
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
                    </Form.Control>
                </Form.Field>
                <Form.Field kind="group">
                    <Form.Control>
                        <Button color="primary" onClick={(e) => {handleRegister(e)}}>Register</Button>
                    </Form.Control>
                    <Form.Control>
                        <Button color="link" colorVariant="light">
                            Cancel
                        </Button>
                    </Form.Control>
                </Form.Field>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
            renderAs="a"
            value="divider"
            >
                Placeholder
            </Dropdown.Item>
        </Dropdown>
    );
};

export default RegisterDropdown;