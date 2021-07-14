import React, { useContext, useEffect } from "react";
import { UserAccountContext } from "../../providers/UserAccountProvider";
import { ReadingContext } from "../../providers/ReadingProvider";
import ActivityList from "../Activity/ActivityList";
import { Columns, Section, Notification, Heading, Container, Table } from "react-bulma-components";
import { getUserDetail } from "../UtilityMethods";
import FollowRow from "./FollowRow";

const FollowList = () => {
    const { GetFollows, usersFollowers } = useContext(UserAccountContext);
    const { selectedUsersContent  } = useContext(ReadingContext);

    let userId = getUserDetail();

    useEffect(() => {
        // debugger
        GetFollows(userId, false, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => {
        GetFollows(userId, false, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedUsersContent])

    const displayUserName = (userArray) => {
        let primeUsername = "username";
        if(userArray.length > 0 )
        {
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
                <Columns breakpoint="desktop" display={"flex"} justifyContent={"center"}>
                    <Columns.Column 
                        desktop={{
                            size: 10,
                            offset: 0,
                            narrow: true
                        }}
                        widescreen={{
                            size: 6,
                            offset: 0,
                            narrow: false
                        }}
                        fullhd={{
                            narrow: false,
                            offset: 0,
                            size: 6
                        }}
                    >
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
                                            // debugger
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
                    <Columns.Column 
                        desktop={{
                            size: 10,
                            offset: 0,
                            narrow: true
                        }}
                        widescreen={{
                            size: 6,
                            offset: 0,
                            narrow: false
                        }}
                        fullhd={{
                            narrow: false,
                            offset: 0,
                            size: 6
                        }}
                    >
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
                    </Columns.Column>
                </Columns>
            </Container>
        </Section>
         </>
    );
    
};

export default FollowList;