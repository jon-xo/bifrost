import React, { useContext, useEffect, useState } from "react";
import { UserAccountContext } from "../../providers/UserAccountProvider";
// import { ReadingContext } from "../../providers/ReadingProvider";
import { Section, Notification, Heading, Tile, Container, Table } from "react-bulma-components";
import { userId } from "../UtilityMethods";
// import ReadingCard from "./ReadingCard";

const FollowList = () => {
    const { AddUserFollow, GetFollows, usersFollowers, currentUserFollows } = useContext(UserAccountContext);
    
    return (
        <Section>
        <h2 className="title is-2">Follows</h2>
            <Container breakpoint={"fluid"} >
                <Tile kind={"ancestor"} display={"flex"} justifyContent={"center"}>
                    <Tile size={4} vertical>
                        <Tile kind="parent">
                            <Tile 
                                className={"follow-container--div"} 
                                kind="child" 
                                renderAs={Notification} 
                                color={"info"} 
                                colorVariant={"light"}
                                display={"flex"} 
                                justifyContent={"center"}
                            >
                                <Table
                                    hoverable
                                    selected
                                    size="default"
                                    striped
                                    className='follow-container--table'
                                    textAlign='center'
                                    display={"flex"} 
                                    justifyContent={"center"}
                                >
                                    <thead>
                                        <tr>
                                            <th>
                                                <abbr title="Follow List Number">
                                                Follow #
                                                </abbr>
                                            </th>
                                            <th>
                                                @username
                                            </th>
                                            <th>
                                                Name
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                            
                                    </tbody>
                                </Table>
                            </Tile>
                        </Tile>
                    </Tile>
                    <Tile size={6} vertical>
                        <Tile kind="parent">
                            <Tile 
                                className={"follow-container--div"} 
                                kind="child" 
                                renderAs={Notification} 
                                color={"link"} 
                                colorVariant={"light"}
                                display={"flex"} 
                                justifyContent={"center"}
                                alignContent={"center"}
                            >
                            <Heading 
                                size={4}
                                // display={"flex"}
                                // justifyContent={"center"}
                                // alignContent={"center"}
                            >
                                Activity
                            </Heading>
                                {/* <Table
                                    hoverable
                                    selected
                                    size="default"
                                    striped
                                    // className='newstand-table'
                                    textAlign='center'
                                >
                                    <thead>
                                        <tr>
                                            <th>
                                                <abbr title="Number">
                                                #
                                                </abbr>
                                            </th>
                                            <th>
                                                @username
                                            </th>
                                            <th>
                                                Name
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                            
                                    </tbody>
                                </Table> */}
                            </Tile>
                        </Tile>
                    </Tile>
                </Tile>
            </Container>
        </Section>
    );
    
};

export default FollowList;