import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Container, Notification, Heading, Tile, Columns, Image } from "react-bulma-components";
import { TimelineDate, ReleaseComicImage } from "../UtilityMethods";
import { UserAccountContext } from "../../providers/UserAccountProvider";
import FollowUserButton from "../Follows/FollowUserButton";
import clsx from 'clsx';

const ActivityCard = ({ activity }) => {
    const { usersFollowers } = useContext(UserAccountContext);
    const activityUID = activity.userId;
    const location = useLocation();
    const route = location.pathname;

    const checkFollower = (currentId) => {
        if(usersFollowers?.find(u => u.id === currentId)){
            return true
        } else {
            return false
        }
    };

    const activeFollow = checkFollower(activityUID)
    
    if(activity.activeUser) {
        // debugger
        if(route.includes("follows")){
            return (
                <>
                    <div className={"follow-activity-parent--div"}>
                        <Notification className={"follow-activity-tile--div"} 
                            kind={"child"} 
                            // renderAs={Notification}
                            color={"link"} 
                            colorVariant={"dark"}
                        >
                            <Container p={5}>
                                <Columns breakpoint={"fluid"}>
                                    <Columns.Column mr={6} size={1}>
                                        <Image
                                            src={activity.userAccount.imageLocation}                                        
                                            size={64}
                                            mt={1}
                                            mr={4}
                                        />                                    
                                    </Columns.Column>
                                    <Columns.Column>
                                        <Heading
                                            size={4}
                                            weight="semibold"
                                        >
                                            <p><b>@{activity.userAccount.displayName}</b></p>
                                        </Heading>
                                        {!activity.read ?
                                            <Heading
                                            size={5}
                                            weight="semibold"
                                            subtitle
                                        >
                                            
                                            New Issue <b>Added</b>
                                            </Heading>
                                        :
                                            <Heading
                                                size={5}
                                                weight="semibold"
                                                subtitle
                                            >
                                                
                                            New Issue <b><i>Read</i></b>
                                            </Heading>
                                        }
                                        <Heading
                                            subtitle
                                            size={5}
                                            weight="normal"
                                        >
                                            {activity.title}
                                        </Heading>
                                        {!activity.read ?
                                        <p>Issue added to reading list on <b>{TimelineDate(activity.lastUpdated)}</b></p>
                                        :
                                        <p>Issue marked as read on <b>{TimelineDate(activity.lastUpdated)}</b></p>
                                        }
                                    </Columns.Column>
                                    <Columns.Column size={"2"}>
                                        <Image
                                            src={activity.comicImage}
                                            fallback={ReleaseComicImage("fallback")}
                                            size={96}
                                            mt={5}
                                            className={"activty-cover--img"}
                                        />
                                    </Columns.Column>
                                </Columns>
                            </Container>
                        </Notification>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className={"activity-tile-self--div"}>
                        <Tile className={"activity-tile--div"} kind={"child"} renderAs={Notification} color={"dark"} colorVariant={"light"}>
                            <Container p={5}>
                                <Columns breakpoint={"fluid"}>
                                    <Columns.Column mr={6} size={1}>
                                        <Image
                                            src={activity.userAccount.imageLocation}                                        
                                            size={64}
                                            mt={1}
                                            mr={4}
                                        />                                    
                                    </Columns.Column>
                                    <Columns.Column>
                                        <Heading
                                            size={4}
                                            weight="semibold"
                                        >
                                            <p><b>@{activity.userAccount.displayName}</b></p>
                                        </Heading>
                                        {!activity.read ?
                                            <Heading
                                            size={5}
                                            weight="semibold"
                                            subtitle
                                        >
                                            
                                            New Issue <b>Added</b>
                                            </Heading>
                                        :
                                            <Heading
                                                size={5}
                                                weight="semibold"
                                                subtitle
                                            >
                                                
                                            New Issue <b><i>Read</i></b>
                                            </Heading>
                                        }
                                        <Heading
                                            subtitle
                                            size={5}
                                            weight="normal"
                                        >
                                            {activity.title}
                                        </Heading>
                                        {!activity.read ?
                                        <p>Issue added to reading list on <b>{TimelineDate(activity.lastUpdated)}</b></p>
                                        :
                                        <p>Issue marked as read on <b>{TimelineDate(activity.lastUpdated)}</b></p>
                                        }
                                    </Columns.Column>
                                    <Columns.Column size={"2"}>
                                        <Image
                                            src={activity.comicImage}
                                            fallback={ReleaseComicImage("fallback")}
                                            size={64}
                                            mt={5}
                                            className={"activty-cover--img"}
                                        />
                                    </Columns.Column>
                                </Columns>
                            </Container>
                        </Tile>
                    </div>
                </>
            )

        }
        
    } else {
        // debugger
    return (
        <>
            <Tile className={"activty-tile-follower--div"} kind={"child"} renderAs={Notification} color={"info"} colorVariant={"dark"}>
                <Container p={5}>
                    <Columns breakpoint={"fluid"}>
                        <Columns.Column mr={6} size={2}>
                            <Container 
                                pull={"left"}
                                paddingless={true}
                                >
                                <Image
                                    src={activity.userAccount.imageLocation}
                                    // fallback={ReleaseComicImage("fallback")}
                                    size={"96"}
                                    className={"follower-avatar--img"}
                                    paddingless={true}
                                    mt={1}
                                />
                                <FollowUserButton 
                                    uId={activityUID}
                                    mr={3} 
                                    mt={2} 
                                    size={"small"} 
                                    fStatus={activeFollow}
                                    paddingless={false}
                                />
                            </Container>             
                        </Columns.Column>
                        <Columns.Column>
                            <Heading
                                size={4}
                                weight="semibold"
                            >
                                <p><b>@{activity.userAccount.displayName}</b></p>
                            </Heading>
                            {!activity.read ?
                            <Heading
                                size={5}
                                weight="semibold"
                                subtitle
                            >
                                
                                New Issue <b>Added</b>
                            </Heading>
                            :
                            <Heading
                                size={5}
                                weight="semibold"
                                subtitle
                            >
                                    
                                New Issue <b><i>Read</i></b>
                            </Heading>
                            }
                            <Heading
                                subtitle
                                size={5}
                                weight="normal"
                            >
                                {activity.title}
                            </Heading>
                            {!activity.read ?
                            <p>Issue added to reading list on <b>{TimelineDate(activity.lastUpdated)}</b></p>
                            :
                            <p>Issue marked as read on <b>{TimelineDate(activity.lastUpdated)}</b></p>
                            }                           
                        </Columns.Column>
                        <Columns.Column size={"2"}>
                            <Image
                                src={activity.comicImage}
                                fallback={ReleaseComicImage("fallback")}
                                size={64}
                                mt={5}
                                className={"activty-cover--img"}
                            />
                        </Columns.Column>
                    </Columns>
                </Container>
            </Tile>
        </>
    );
    }
};

export default ActivityCard;