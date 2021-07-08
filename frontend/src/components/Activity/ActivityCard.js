import React, { useState } from "react";
import { Container, Content, Notification, Heading, Tile, Columns, Image, Tag, Button } from "react-bulma-components";
import { TimelineDate, ReleaseComicImage } from "../UtilityMethods";
import clsx from 'clsx';

const ActivityCard = ({ activity }) => {
    if(activity.activeUser) {
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
    } else {
        
    return (
        <>
            <Tile className={"activity-tile--div"} kind={"child"} renderAs={Notification} color={"info"} colorVariant={"dark"}>
                <Container p={5}>
                    <Columns breakpoint={"fluid"}>
                        <Columns.Column mr={6} size={1}>
                            <Image
                                src={activity.userAccount.imageLocation}
                                fallback={ReleaseComicImage("fallback")}
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
        </>
    );
    }
};

export default ActivityCard;