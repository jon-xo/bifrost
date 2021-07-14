import React, { useContext, useState } from "react";
import { UserAccountContext } from "../../providers/UserAccountProvider";
import { Button, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { getUserDetail } from "../UtilityMethods";
import ActivityDetail from "../Activity/ActivityDetail";

const FollowUserButton = ( { ...props } ) => {
    const { AddUserFollow, disableFollowButtons, setDisableFollowButtons } = useContext(UserAccountContext);
    const [ buttonLoading, setButtonLoading ] = useState(false);
    // const [ displayHoverCard, setDisplayHoverCard ] = useState(false);

    const handleAddFollow = (e, targetUserId ) => {
        e.preventDefault();
        setButtonLoading(true);
        setDisableFollowButtons(true);
        const activeUser = getUserDetail();
        
        AddUserFollow(activeUser, targetUserId)
        .then(() => {
            setButtonLoading(false);
            setDisableFollowButtons(false);
        })
    
    };

    const btnMarginRight = props?.mr;
    const btnMarginTop = props?.mt;
    const btnSize = props?.size;
    const padding = props?.paddingless;
    const fStatus = props?.fStatus;
    
    if(fStatus){
        return (
            <>
                <ActivityDetail 
                    props={props} 
                />                
            </>
        );
    } else {
        return (
            <>
                <Button                    
                    color={"warning"}
                    // outlined
                    className={"activity-follow--btn"}
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
                    <Icon>
                        <FontAwesomeIcon icon={faPlusSquare} />
                    </Icon>
                    <span>Follow</span>         
                </Button>
            </>
        );

    }
    
};

export default FollowUserButton;