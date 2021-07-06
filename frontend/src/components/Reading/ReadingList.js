import React, { useContext, useEffect, useState } from "react";
// import { UserAccountContext } from "../../providers/UserAccountProvider";
import { ReadingContext } from "../../providers/ReadingProvider";
import { Section, Notification, Heading, Tile, Container } from "react-bulma-components";
import ReadingCard from "./ReadingCard";

const ReadingList = () => {
    
    const { allReading, getUsersReadingList } = useContext(ReadingContext);
    const userAccount = JSON.parse(sessionStorage.getItem("userAccount"));
    const userId = parseInt(userAccount?.id);

    useEffect(() => {
        getUsersReadingList(userId);   
    }, [])

    return (
        <>
            <Section>
                <h2 className="title is-2">Reading List</h2>
                <Container fluid='true'>
                    <Tile kind={"ancestor"}>
                        <Tile size={6} vertical>
                            <Tile kind={"parent"} vertical>
                                <Tile kind="child" renderAs={Notification} color={"info"} colorVariant={"dark"}>
                                    <Heading textAlign={"center"} >Unread</Heading>
                                    {allReading?.length > 0 ?
                                        <Heading textAlign={"center"} subtitle>Count: {allReading.length}</Heading>
                                        :
                                        <Heading textAlign={"center"} subtitle>No unread comics</Heading>
                                    }
                                </Tile>
                                {allReading?.length > 0 ?
                                    allReading?.map((comic) => {
                                        debugger
                                        if (comic.pbApiKey) {
                                            debugger
                                            return <ReadingCard key={comic.pbApiKey} savedComic={comic} />
                                        } else {
                                            debugger
                                            return <ReadingCard key={comic.cvApiKey} savedComic={comic} />
                                        }
                                            
                                    })
                                    :
                                    <></>
                                }
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