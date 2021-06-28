import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button, Dropdown, Icon, Form } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import "../../index.css"

const RegisterDropdown = () => {
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
                <Form.Field>
                    <Form.Control>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Input
                            color="primary"
                            placeholder="e.g. Adam the Great"
                            size="medium"
                            status="hover"
                            type="text"
                        />
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Input
                            color="primary"
                            placeholder="e.g. user@example.com"
                            size="medium"
                            status="hover"
                            type="text"
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
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field kind="group">
                    <Form.Control>
                        <Button color="primary">Register</Button>
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