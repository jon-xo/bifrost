import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ReadingContext } from "../../providers/ReadingProvider";
import { Box, Section, Notification, Tile, Container } from "react-bulma-components";
import ActivityCard from "./ActivityCard";
import { getUserDetail } from "../UtilityMethods";
import { UserAccountContext } from "../../providers/UserAccountProvider";


// ---- ActivityList ----
// ActivityList is a component used to render comic activity 
// using the ActivtyCard component. Render includes a conditional
// with useLocation react-router-dom hook to render a seperate list
// varient if the list is rendered in the Follows or the Activity view.

const ActivityList = () => {
    const { getAllPublicContent, allPublicContent, selectedUsersContent } = useContext(ReadingContext);
    const { GetFollows, refreshState, setRefreshState } = useContext(UserAccountContext);
    const location = useLocation();
    const route = location.pathname;
    
    let userId = getUserDetail();

    // useEffect(#1) calls all content created by public users
    
    useEffect(() => {
        getAllPublicContent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(#2) envokes GetFollows with the listed parameters:
    // - userId
    // - followBack parameter false writes returned results to usersFollowers
    // - onPageLoad parameter receives true to ensure that refreshState 
    // is not modified as hook is envoked on page load.
    
    
    useEffect(() => {
        const updatedUserId = getUserDetail();
        GetFollows(updatedUserId, false, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    // useEffect(#4) envokes GetFollows, if refreshState evaluates to true
    //  with the listed parameters:
    // - active userId
    // - followBack parameter receives false boolean, 
    // writing returned results to usersFollowers state
    // - onPageLoad parameter receives false which causes method
    // to write refreshState value as true, this change triggers related useEffect states.

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

    // useEffect(#5) watches refreshState value and if refreshState evaluates to true,
    // executes getAllPublicContent method.
    
    useEffect(() => {
        if(refreshState){
            getAllPublicContent();
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