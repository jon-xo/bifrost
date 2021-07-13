import React, { useContext, useState } from "react";
import { ReadingContext } from "../../providers/ReadingProvider";
import { Button, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye } from '@fortawesome/free-solid-svg-icons'

const ViewFollowsButton = ( {...props }) => {
    // const { followDetailReady, setFollowDetailReady } = useContext(UserAccountContext);
    const { getUsersReadingList } = useContext(ReadingContext);
    const [ buttonLoading, setButtonLoading ] = useState(false);

    const selectedUser = props?.sUser;
    const btnMarginRight = props?.mr;
    const btnMarginTop = props?.mt;
    const btnSize = props?.size;
    const padding = props?.paddingless;

    const handleViewActivity = (e, targetUserId ) => {
        e.preventDefault();
        setButtonLoading(true);
        
        // debugger
        getUsersReadingList(targetUserId, true)
        .then(() => {            
            setButtonLoading(false);
        })
    
    };

    return (
        <>
            <Button
                color={"link"}
                // outlined
                // inverted={true}
                size={btnSize}
                loading={buttonLoading}
                mr={btnMarginRight}
                mt={btnMarginTop}
                paddingless={padding}
                // isStatic={fStatus}
                // status={"hover"}
                rounded={true}
                onClick={(e) => {
                    handleViewActivity(e, selectedUser)
                }}
            >

                <Icon>
                    <FontAwesomeIcon icon={faBullseye} />
                </Icon>
                <span>Show Activity</span>
            </Button>
        </>
    );
}

export default ViewFollowsButton;