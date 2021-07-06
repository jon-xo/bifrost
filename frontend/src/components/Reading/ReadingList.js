import React, { useContext, useEffect, useState } from "react";
// import { UserAccountContext } from "../../providers/UserAccountProvider";
import { ReadingContext } from "../../providers/ReadingProvider";
import { Section, Notification, Heading, Tile, Container } from "react-bulma-components";
import ReadingCard from "./ReadingCard";


const ReadingList = () => {
    
    const { allReading, getUsersReadingList, getUsersReadStatusContent, allUnread, allRead } = useContext(ReadingContext);
    const [ unreadList, setUnreadList ] = useState([]);
    const [ readList, setReadList ] = useState([]);
    const userAccount = JSON.parse(sessionStorage.getItem("userAccount"));
    const userId = parseInt(userAccount?.id);


    useEffect(() => {
        getUsersReadingList(userId)
    }, [])

    useEffect(() => {
        getUsersReadStatusContent(userId, true)
        .then(() => {
            getUsersReadStatusContent(userId, false);
    })
    }, [allReading])

    
    return (
        <>
            <Section>
                <h2 className="title is-2">Reading List</h2>
                {allReading?.length > 0 ?
                    allReading.length === 1 && allUnread.length !== 2 ?
                    <h4 className="subtitle is-5">{allReading.length} comic added</h4>
                    :
                    <h4 className="subtitle is-5">{allReading.length} comics added</h4>                    
                :
                <h4 className="subtitle is-5">No Comics Added</h4>
                }
                <Container fluid='true'>
                    <Tile kind={"ancestor"}>
                        <Tile size={6} vertical>
                            <Tile kind={"parent"} vertical>
                                <Tile className={"reading-header--div"} kind="child" renderAs={Notification} color={"info"} colorVariant={"dark"}>
                                    <Heading textAlign={"center"} >Unread</Heading>
                                    {allUnread?.length > 0 ?
                                        <Heading textAlign={"center"} subtitle>Count: <b>{allUnread.length}</b></Heading>
                                        :
                                        <Heading textAlign={"center"} subtitle>No unread comics</Heading>
                                    }
                                </Tile>
                                {allReading?.length > 0 ?
                                    allReading?.filter((c) => c.read === false).map((comic) => {
                                        if (comic.pbApiKey) {
                                            return <ReadingCard key={comic.pbApiKey} savedComic={comic} />
                                        } else {
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
                                <Tile className={"reading-header--div"} kind="child" renderAs={Notification} color={"success"} colorVariant={"dark"}>
                                    <Heading textAlign={"center"} >Read</Heading>
                                    {allRead?.length > 0 ?
                                        <Heading textAlign={"center"} subtitle>Count: <b>{allRead.length}</b></Heading>
                                        :
                                        <Heading textAlign={"center"} subtitle>No read comics</Heading>
                                    }
                                </Tile>
                                {allReading?.length > 0 ?
                                    allReading?.filter((c) => c.read === true).map((comic) => {
                                        // debugger
                                        if (comic.pbApiKey) {
                                            // debugger
                                            return <ReadingCard key={comic.pbApiKey} savedComic={comic} />
                                        } else {
                                            // debugger
                                            return <ReadingCard key={comic.cvApiKey} savedComic={comic} />
                                        }
                                            
                                    })
                                    :
                                    <></>
                                }
                            </Tile>
                        </Tile>
                    </Tile>
                </Container>
            </Section>
        </>
    )
    
};

export default ReadingList;