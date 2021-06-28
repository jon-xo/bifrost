import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button, Dropdown, Icon, Form } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { UserAccountContext } from "../../providers/UserAccountProvider";
import "../../index.css"

const LoginDropdown = () => {
    const history = useHistory();
    const { login } = useContext(UserAccountContext);

    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();

    const handleLogin = (e) => {
        e.preventDefault();
        login(email, password)
        .then(() => history.push("/"))
        .catch(() => alert("Invalid email or password"));
    }

    
    // const handleSearch = (event) => {
    //     event.preventDefault();
    //     const encodedQuery = encodeURIComponent(queryString)
    //     searchIssues(encodedQuery)
    //     .then(() => {
    //         history.push("/search/issues")
    //     })
    // };
    
    return (
        <Dropdown
            closeOnSelect={false}
            color="link"
            icon={<Icon><FontAwesomeIcon className='.logo-icon' icon={faKey} /></Icon>}
            label="Login"
        >
            <Dropdown.Item
                 renderAs="field"
                 value="form"
            >
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