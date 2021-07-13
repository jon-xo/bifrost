import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Container, Notification, Heading, Tile, Columns, Image } from "react-bulma-components";
import { TimelineDate, ReleaseComicImage, getAvatarImage, currentDate } from "../UtilityMethods";
import { UserAccountContext } from "../../providers/UserAccountProvider";
import FollowUserButton from "../Follows/FollowUserButton";
import clsx from 'clsx';

const ActivityCard = ({ activity }) => {
    const { usersFollowers } = useContext(UserAccountContext);
    const activityUID = activity?.userId;
    const location = useLocation();
    const route = location.pathname;
    const activityUser = activity?.userAccount;

    const checkFollower = (currentId) => {
        if(usersFollowers?.find(u => u.id === currentId)){
            return true
        } else {
            return false
        }
    };

    const activeFollow = checkFollower(activityUID)

    // debugger
    
    if(route.includes("follows")){
            if(activity === null){
                return (
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
                                                src={getAvatarImage(activity?.userAccount.imageLocation)}                                        
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
                                                <p>@<i>username</i></p>
                                            </Heading>
                                            
                                            <Heading
                                                subtitle
                                                size={5}
                                                weight="normal"
                                            >
                                               <i>Activity</i>
                                            </Heading>
                                            <p><i>Timestamp</i> @ <b>{TimelineDate(currentDate)}</b></p>                                            
                                        </Columns.Column>
                                        <Columns.Column size={"2"}>
                                            <Image
                                                src={activity?.comicImage}
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
                );
            } else if(activity?.activeUser) {
            debugger
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
                                            src={getAvatarImage(activity.userAccount.imageLocation)}                                        
                                            size={64}
                                            mt={1}
                                            mr={4}
                                        />                                    
                                    </Columns.Column>
                                {activity !== null ?
                                    <>
                                    <Columns.Column>
                                        <Heading
                                            size={4}
                                            weight="semibold"
                                        >
                                            {activity.userAccount.displayName ?
                                                <p><b>@{activity.userAccount.displayName}</b></p>
                                                :
                                                <p>@username</p>
                                            }
                                        </Heading>
                                        {!activity.read ?
                                            <Heading
                                            size={5}
                                            weight="semibold"
                                            subtitle
                                        >
                                            {activity.comicType === "issue" ? 
                                                <>New Issue <b>Added</b></>
                                            :
                                                <>New Volume <b>Added</b></>
                                            }
                                            </Heading>
                                        :
                                            <Heading
                                                size={5}
                                                weight="semibold"
                                                subtitle
                                            >
                                                {activity.comicType === "issue" ?
                                                    <>New Issue <b><i>Read</i></b></>
                                                :
                                                    <>New Volume <b><i>Read</i></b></>
                                                }
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
                                            activity.comicType === "issue" ?
                                            <p>Issue added to reading list on <b>{TimelineDate(activity.lastUpdated)}</b></p>
                                            :
                                            <p>Volume added to reading list on <b>{TimelineDate(activity.lastUpdated)}</b></p>
                                        :
                                            activity.comicType === "issue" ?
                                            <p>Issue marked as read on <b>{TimelineDate(activity.lastUpdated)}</b></p>
                                            :
                                            <p>Volume marked as read on <b>{TimelineDate(activity.lastUpdated)}</b></p>
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
                                    </>
                                :
                                    <>
                                    <Columns.Column>
                                        <Heading
                                            size={4}
                                            weight="semibold"
                                        >
                                            <p>@TEST USER ACCOUNT</p>
                                        </Heading>
                                        {!activity.read ?
                                            <Heading
                                            size={5}
                                            weight="semibold"
                                            subtitle
                                        >
                                            {activity.comicType === "issue" ? 
                                                <>New Issue <b>Added</b></>
                                            :
                                                <>New Volume <b>Added</b></>
                                            }
                                            </Heading>
                                        :
                                            <Heading
                                                size={5}
                                                weight="semibold"
                                                subtitle
                                            >
                                                {activity.comicType === "issue" ?
                                                    <>New Issue <b><i>Read</i></b></>
                                                :
                                                    <>New Volume <b><i>Read</i></b></>
                                                }
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
                                            activity.comicType === "issue" ?
                                            <p>Issue added to reading list on <b>{TimelineDate(activity.lastUpdated)}</b></p>
                                            :
                                            <p>Volume added to reading list on <b>{TimelineDate(activity.lastUpdated)}</b></p>
                                        :
                                            activity.comicType === "issue" ?
                                            <p>Issue marked as read on <b>{TimelineDate(activity.lastUpdated)}</b></p>
                                            :
                                            <p>Volume marked as read on <b>{TimelineDate(activity.lastUpdated)}</b></p>
                                        }
                                    </Columns.Column>
                                    <Columns.Column size={"2"}>
                                        <Image
                                            src={activity?.comicImage}
                                            fallback={ReleaseComicImage("fallback")}
                                            size={96}
                                            mt={5}
                                            className={"activty-cover--img"}
                                        />
                                    </Columns.Column>
                                    </>
                                }
                                </Columns>
                            </Container>
                        </Notification>
                    </div>
                </>
            )
        }
    }
    if (activity?.activeUser) {
            return (
                <>
                    <div className={"activity-tile-self--div"}>
                        <Tile className={"activity-tile--div"} kind={"child"} renderAs={Notification} color={"dark"} colorVariant={"light"}>
                            <Container p={5}>
                                <Columns breakpoint={"fluid"}>
                                    <Columns.Column mr={6} size={2}>
                                        {/* <Container
                                            // pull={"left"}
                                            paddingless={true}
                                            display={"flex"}
                                            // justifyContent={"center"}
                                            justifyItems={"center"}
                                        > */}

                                        <Image
                                            src={getAvatarImage(activity?.userAccount.imageLocation)}                                        
                                            size={96}
                                            mt={1}
                                            mr={3}
                                            />                                    
                                        {/* </Container> */}
                                    </Columns.Column>
                                    <Columns.Column>
                                        <Heading
                                            size={4}
                                            weight="semibold"
                                        >
                                            <p><b>@{activity?.userAccount.displayName}</b></p>
                                        </Heading>
                                {!activity?.read ?
                                    <Heading
                                        size={5}
                                        weight="semibold"
                                        subtitle
                                    >
                                        
                                        {activity?.comicType === "issue" ? 
                                            <>New Issue <b>Added</b></>
                                            :
                                            <>New Volume <b>Added</b></>
                                        }
                                    </Heading>
                                    :
                                    <Heading
                                        size={5}
                                        weight="semibold"
                                        subtitle
                                    >
                                            
                                        {activity?.comicType === "issue" ? 
                                        <>New Issue <b><i>Read</i></b></>
                                        :
                                        <>New Volume <b><i>Read</i></b></>
                                        }
                                    </Heading>
                                }
                                        <Heading
                                            subtitle
                                            size={5}
                                            weight="normal"
                                        >
                                            {activity?.title}
                                        </Heading>
                                        {!activity?.read ?
                                            activity?.comicType === "issue" ?
                                            <p>Issue added to reading list on <b>{TimelineDate(activity?.lastUpdated)}</b></p>
                                            :
                                            <p>Volume added to reading list on <b>{TimelineDate(activity?.lastUpdated)}</b></p>
                                            
                                        :
                                            activity?.comicType === "issue" ?
                                            <p>Issue marked as read on <b>{TimelineDate(activity?.lastUpdated)}</b></p>
                                            :
                                            <p>Volume marked as read on <b>{TimelineDate(activity?.lastUpdated)}</b></p>
                                        }
                                    </Columns.Column>
                                    <Columns.Column size={"2"}>
                                        <Image
                                            src={activity?.comicImage}
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

        } else {
        // debugger
        return (
            <>
                <Tile className={"activty-tile-follower--div"} kind={"child"} renderAs={Notification} color={"info"} colorVariant={"dark"}>
                    <Container p={5}>
                        <Columns breakpoint={"fluid"}>
                            <Columns.Column mr={6} size={2}>
                                <Container 
                                    // pull={"left"}
                                    paddingless={true}
                                    display={"flex"}
                                    // justifyContent={"center"}
                                    justifyItems={"center"}
                                    >
                                    <div>
                                        <Image
                                            src={getAvatarImage(activity?.userAccount.imageLocation)}
                                            // fallback={ReleaseComicImage("fallback")}
                                            size={64}
                                            className={"follower-avatar--img"}
                                            paddingless={true}
                                            mt={1}
                                            ml={2}
                                        />
                                        <FollowUserButton
                                            uId={activityUID}
                                            // mr={3}
                                            mt={2}
                                            size={"small"}
                                            fStatus={activeFollow}
                                            paddingless={false}
                                            userObject={activityUser}
                                        />
                                    </div>
                                </Container>             
                            </Columns.Column>
                            <Columns.Column>
                                <Heading
                                    size={4}
                                    weight="semibold"
                                >
                                    <p><b>@{activity?.userAccount.displayName}</b></p>
                                </Heading>
                                {!activity?.read ?
                                <Heading
                                    size={5}
                                    weight="semibold"
                                    subtitle
                                >
                                    
                                    {activity?.comicType === "issue" ? 
                                        <>New Issue <b>Added</b></>
                                        :
                                        <>New Volume <b>Added</b></>
                                    }
                                </Heading>
                                :
                                <Heading
                                    size={5}
                                    weight="semibold"
                                    subtitle
                                >
                                        
                                    {activity?.comicType === "issue" ? 
                                    <>New Issue <b><i>Read</i></b></>
                                    :
                                    <>New Volume <b><i>Read</i></b></>
                                    }
                                </Heading>
                                }
                                <Heading
                                    subtitle
                                    size={5}
                                    weight="normal"
                                >
                                    {activity?.title}
                                </Heading>
                                {!activity?.read ?
                                    activity?.comicType === "issue" ? 
                                    <p>Issue added to reading list on <b>{TimelineDate(activity?.lastUpdated)}</b></p>
                                    :
                                    <p>Volume added to reading list on <b>{TimelineDate(activity?.lastUpdated)}</b></p>
                                :
                                    activity?.comicType === "issue" ?
                                    <p>Issue marked as read on <b>{TimelineDate(activity?.lastUpdated)}</b></p>
                                    :
                                    <p>Volume marked as read on <b>{TimelineDate(activity?.lastUpdated)}</b></p>
                                }                           
                            </Columns.Column>
                            <Columns.Column size={"2"}>
                                <Image
                                    src={activity?.comicImage}
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
    };
};

export default ActivityCard;