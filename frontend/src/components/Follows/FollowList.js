import React, { useContext, useEffect, useState } from "react";
import { UserAccountContext } from "../../providers/UserAccountProvider";
import { ReadingContext } from "../../providers/ReadingProvider";
import ActivityList from "../Activity/ActivityList";
import { Columns, Section, Notification, Heading, Tile, Container, Table } from "react-bulma-components";
import FollowRow from "./FollowRow";
import { userId } from "../UtilityMethods";

const FollowList = () => {
    const { AddUserFollow, GetFollows, usersFollowers, currentUserFollows } = useContext(UserAccountContext);
    const { selectedUsersContent  } = useContext(ReadingContext);

    useEffect(() => {
        GetFollows(userId, false);
    }, [selectedUsersContent])

    const displayUserName = (userArray) => {
        debugger
        let primeUsername = "username";
        if(userArray.length > 0 )
        {
            debugger
            const primeUserName = userArray[0].userAccount.displayName
            return primeUserName
        }
        return primeUsername;
    };
    
    return (
        <>
        <Section>
        <h2 className="title is-2">Follows</h2>
            <Container breakpoint={"fluid"} >
                <Columns display={"flex"} justifyContent={"center"}>
                    <Columns.Column size={4} >
                        <Notification 
                            className={"follow-container--div"} 
                            // renderAs={Notification} 
                            color={"info"} 
                            colorVariant={"light"}
                            display={"flex"} 
                            justifyContent={"center"}
                        >
                            <div>
                                <Table
                                    hoverable
                                    selected
                                    size="default"
                                    striped
                                    className='follow-container--table'
                                    textAlign='center'
                                >
                                    <thead>
                                        <tr>
                                            <th>
                                                <abbr title="Follow List Number">
                                                Follow #
                                                </abbr>
                                            </th>
                                            <th>
                                                @Username
                                            </th>
                                            <th>
                                                Name
                                            </th>
                                            <th>
                                                Summary
                                            </th>
                                            <th>
                                                Options
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usersFollowers.length > 0 ?
                                        usersFollowers?.map((user, index) => {
                                            user.listIndex = index + 1;
                                            return <FollowRow key={user.id} follower={user} />
                                        })
                                        :
                                        <></>
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </Notification>
                    </Columns.Column>
                    <Columns.Column size={5}>
                        {/* <Tile kind={"ancestor"}>
                                <Tile size={6} vertical>
                                    <Tile kind="parent"> */}
                                        <Notification 
                                            className={"follow-container--div"} 
                                            // renderAs={Notification} 
                                            color={"link"} 
                                            colorVariant={"light"}
                                            display={"flex"} 
                                            justifyContent={"center"}
                                            alignContent={"center"}
                                        >
                                            <div>
                                                <Heading
                                                    size={3}
                                                    weight={"bold"}
                                                    display={"flex"}
                                                    justifyContent={"center"}
                                                    alignContent={"center"}
                                                >
                                                    Timeline
                                                </Heading>
                                                {usersFollowers.length > 0 ?
                                                <Heading
                                                    size={5}
                                                    subtitle
                                                    weight={"semibold"}
                                                    display={"flex"}
                                                    justifyContent={"center"}
                                                    alignContent={"center"}
                                                >
                                                    @{displayUserName(selectedUsersContent)}
                                                </Heading>
                                                :
                                                <Heading
                                                    size={5}
                                                    subtitle
                                                    weight={"semibold"}
                                                    display={"flex"}
                                                    justifyContent={"center"}
                                                    alignContent={"center"}
                                                >
                                                    @{displayUserName(selectedUsersContent)}
                                                </Heading>
                                                }
                                                <ActivityList />
                                            </div>
                                        </Notification>
                                    {/* </Tile>
                                </Tile>
                        </Tile> */}
                    </Columns.Column>
                </Columns>
            </Container>
        </Section>
         </>
    );
    
};

export default FollowList;