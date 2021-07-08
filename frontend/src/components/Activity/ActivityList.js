import React, { useContext, useEffect } from "react";
import { ReadingContext } from "../../providers/ReadingProvider";
import { Box, Section, Notification, Heading, Tile, Container } from "react-bulma-components";
import ActivityCard from "./ActivityCard";
import { getUserDetail } from "../UtilityMethods";


const ActivityList = () => {
    const { getAllPublicContent, allPublicContent } = useContext(ReadingContext);
    
    let userId = getUserDetail();
    
    useEffect(() => {
        userId = getUserDetail();
        getAllPublicContent();
    }, [])
    
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
};

export default ActivityList;