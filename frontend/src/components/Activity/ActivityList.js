import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ReadingContext } from "../../providers/ReadingProvider";
import { Box, Section, Notification, Tile, Container } from "react-bulma-components";
import ActivityCard from "./ActivityCard";
import { getUserDetail } from "../UtilityMethods";
import { UserAccountContext } from "../../providers/UserAccountProvider";


const ActivityList = () => {
    const { getAllPublicContent, allPublicContent, selectedUsersContent } = useContext(ReadingContext);
    const { GetFollows, refreshState, setRefreshState } = useContext(UserAccountContext);
    const location = useLocation();
    const route = location.pathname;
    
    let userId = getUserDetail();
    
    useEffect(() => {
        getAllPublicContent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const updatedUserId = getUserDetail();
        GetFollows(updatedUserId, false, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(refreshState){
            const updatedUserId = getUserDetail();
            GetFollows(updatedUserId, false, false)
            .then(() => {
                setRefreshState(false);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshState])


    if(route.includes("follows")){
        // debugger
        return (
            <>
                <Container 
                    breakpoint={"fluid"}
                >
                    <Box backgroundColor={"grey-light"} className={"follow-activity--div"}>
                        <Notification
                            color={"grey"}
                            colorVariant={"dark"}
                            className={"follow-activity-container--div"}
                        >
                            {selectedUsersContent.length > 0 ?
                            selectedUsersContent?.map((activity) => {
                                activity.activeUser = true;
                                return <ActivityCard key={activity.id} activity={activity} />
                            })
                            :
                                <ActivityCard activity={null} />                             
                            }                                        
                        </Notification>                                    
                    </Box>
                </Container>
            </>
        );
    } else {
        // debugger
        return (
            <>
                <Section>
                    <h2 className="title is-2">Activity</h2>
                    <Container display={"flex"} justifyContent={"center"} breakpoint={"fluid"}>
                        <Box backgroundColor={"grey-light"} className={"activity-box--div"}>
                            <Tile kind={"ancestor"}>
                                <Tile 
                                    size={12}
                                >
                                    <Tile>
                                        <Tile 
                                            kind={"parent"}
                                            vertical
                                        >
                                            {allPublicContent?.map((activity) => {
                                                if(activity.userId === userId)
                                                {
                                                    activity.activeUser = true;
                                                    return <ActivityCard key={activity.id} activity={activity} />
                                                } else {
                                                    activity.activeUser = false;
                                                    return <ActivityCard key={activity.id} activity={activity} />
                                                }
                                            })}                                        
                                        </Tile>                                    
                                    </Tile>
                                </Tile>
                            </Tile>
                        </Box>
                    </Container>
                </Section>
            </>
        );

    }
    
};

export default ActivityList;