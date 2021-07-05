import React, { useContext, useEffect, useState } from "react";
import { UserAccountContext } from "../../providers/UserAccountProvider";
import { ReadingContext } from "../../providers/ReadingProvider";
import { Section, Notification, Heading, Tile, Container } from "react-bulma-components";

const ReadingList = () => {
    
    const { allReading, getUsersReadingList } = useContext(ReadingContext);

    // useEffect(() => {

    // }, [allReading])

    return (
        <>
            <Section>
                <h2 className="title is-2">Reading List</h2>
                <Container fluid='true'>
                    <Tile kind={"ancestor"}>
                        <Tile size={6} vertical>
                            <Tile kind={"parent"} vertical>
                                <Tile kind="child" renderAs={Notification} color={"info"} colorVariant={"light"}>
                                    <Heading textAlign={"center"} >Unread</Heading>
                                    <Heading textAlign={"center"}  subtitle>Count:</Heading>
                                </Tile>
                                <Tile kind="child" renderAs={Notification} color={"info"} colorVariant={"light"}>
                                    <Heading textAlign={"center"} size={4}>Sample</Heading>
                                    <Heading textAlign={"center"}  subtitle>Sample Info</Heading>
                                </Tile>
                                <Tile kind="child" renderAs={Notification} color={"info"} colorVariant={"light"}>
                                    <Heading textAlign={"center"} size={4}>Sample</Heading>
                                    <Heading textAlign={"center"}  subtitle>Sample Info</Heading>
                                </Tile>
                            </Tile>
                        </Tile>
                        <Tile size={6} vertical>
                            <Tile kind={"parent"} vertical>
                                <Tile kind="child" renderAs={Notification} color={"success"} colorVariant={"light"}>
                                    <Heading textAlign={"center"} >Read</Heading>
                                    <Heading textAlign={"center"}  subtitle>Count:</Heading>
                                </Tile>
                            </Tile>
                        </Tile>
                    </Tile>
                </Container>
            </Section>
        </>
    )
    
};

export default ReadingList;