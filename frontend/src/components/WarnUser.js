import React from "react"
import { Button, Icon, Notification, Block } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRadiation } from "@fortawesome/free-solid-svg-icons";
import "../index.css"

const WarnUser = (props) => {
    // if(props?.message !== undefined){
    //     debugger
    //     console.log(props.message);
    // }
    return (
        <>
            {props?.hidden === 'false' ?
             <Block>
             <Notification 
                color={props?.color ? props.color : 'warning'}
                textSize={props?.textSize ? props.textSize : '4'}
                // display='flex'
                // clearfix='true'
                // overlay='true'
                // widescreen={props}
                >
                <Icon
                   size='medium'
                >
                   <FontAwesomeIcon icon={faRadiation} />
                </Icon>
                 {props?.message ? props.message : 'Alert!'}
                 <Button remove />
             </Notification>
            </Block> : 
            <Block></Block>
            }
        </>
    )
};

export default WarnUser;