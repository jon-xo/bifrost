import React, { useContext } from "react"
import { Button, Icon, Notification, Block } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRadiation } from "@fortawesome/free-solid-svg-icons";
import { UserAccountContext } from "../providers/UserAccountProvider";
import "../index.css"

const WarnUser = (props) => {
    // if(props?.message !== undefined){
    //     debugger
    //     console.log(props.message);
    // }

    const { warningProps, setWarningProps } = useContext(UserAccountContext);
    
    return (
        <>
            {props?.hidden === false ?
             <Block>
             <Notification 
                color={props?.color ? props.color : 'warning'}
                textSize={props?.textSize ? props.textSize : '4'}
                >
                <Icon
                   size='medium'
                >
                   <FontAwesomeIcon icon={faRadiation} />
                </Icon>
                 {props?.message ? props.message : 'Alert!'}
                 <Button 
                    remove
                    onClick={(e) => {
                        e.preventDefault();
                        setWarningProps(!warningProps.hidden);
                    }}
                 />
             </Notification>
            </Block> : 
            <Block></Block>
            }
        </>
    )
};

export default WarnUser;