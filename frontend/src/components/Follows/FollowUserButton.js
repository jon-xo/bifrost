import React, { useContext, useEffect, useState } from "react";
import { UserAccountContext } from "../../providers/UserAccountProvider";
import { Button, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { getUserDetail } from "../UtilityMethods";

const FollowUserButton = ( { ...props } ) => {
    const { AddUserFollow, GetFollows, disableFollowButtons, setDisableFollowButtons } = useContext(UserAccountContext);
    const [ buttonLoading, setButtonLoading ] = useState(false);

    const handleAddFollow = (e, targetUserId ) => {
        e.preventDefault();
        setButtonLoading(true);
        setDisableFollowButtons(true);
        const activeUser = getUserDetail();
        
        // debugger
        AddUserFollow(activeUser, targetUserId)
        .then(() => {
            // GetFollows(activeUser, false);
            setButtonLoading(false);
            setDisableFollowButtons(false);
        })
    
    };

    const btnMarginRight = props?.mr;
    const btnMarginTop = props?.mt;
    const btnSize = props?.size;
    const padding = props?.paddingless;
    const fStatus = props?.fStatus;
    
    // debugger
    
    return (
        <>
            <Button
                color={"warning"}
                // outlined
                inverted={true}
                size={btnSize}
                loading={buttonLoading}
                mr={btnMarginRight}
                mt={btnMarginTop}
                paddingless={padding}
                isStatic={fStatus}
                status={"hover"}
                rounded={true}
                disabled={disableFollowButtons}
                onClick={(e) => {
                    handleAddFollow(e, props.uId)
                }}
            >
                {fStatus ? 
                <>
                <Icon>
                    <FontAwesomeIcon icon={faCheckSquare} />
                </Icon>
                <span>Followed</span>
                </>
                :
                <>
                <Icon>
                    <FontAwesomeIcon icon={faPlusSquare} />
                </Icon>
                <span>Follow</span>
                </>
                }
            </Button>
        </>
    );
};

export default FollowUserButton;