import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Dropdown, Icon, Form } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { UserAccountContext } from "../../providers/UserAccountProvider";
import WarnUser from "../WarnUser";

const LoginDropdown = () => {
    // -- GitHub Issue Ticket # 1 ---
    // [Authentication [Ticket #1]](https://github.com/jon-xo/bifrost/issues/2)
    // 
    // - LoginDropdown imports register method and warningProps/setWarningProps
    // from UserAccountProvider
    // - Unique state is declared for email, password -- state is updated with 
    // onChange event listner for each related form field
    // - handleLogin is envoked onClick and prevents default function,
    // catch method adds a new object to warningProps state depending on error condition,
    // once warningProps state is modified with key/value hidden/false,
    // the WarnUser method is envoked. 
    // On succesful user form submission, login method is called and user is logged in. 
    // 

    
    const history = useHistory();
    const { login, warningProps, setWarningProps } = useContext(UserAccountContext);

    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();

    const handleLogin = (e) => {
        e.preventDefault();
        login(email, password)
        .then(() => history.push("/"))
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
        <Dropdown
            closeOnSelect={false}
            color="link"
            // right="false"
            icon={<Icon><FontAwesomeIcon icon={faKey} /></Icon>}
            label="Login"
        >
            <Dropdown.Item
                 renderAs="form"
                 value="form"
            >
                <WarnUser {...warningProps} />
                <Form.Field>
                    <Form.Control>
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Input
                            color="info"
                            placeholder="e.g. user@example.com"
                            size="medium"
                            status="hover"
                            type="text"
                            id="email"
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Input
                            color="info"
                            placeholder="password"
                            size="medium"
                            status="hover"
                            type="password"
                            id="password"
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field kind="group">
                    <Form.Control>
                        <Button color="link" onClick={(e) => {handleLogin(e)}}>Login</Button>
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

export default LoginDropdown;