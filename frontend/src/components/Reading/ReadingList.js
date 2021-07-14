import React, { useContext, useEffect } from "react";
import { ReadingContext } from "../../providers/ReadingProvider";
import { Section, Notification, Heading, Tile, Container } from "react-bulma-components";
import { getUserDetail } from "../UtilityMethods";
import ReadingCard from "./ReadingCard";


const ReadingList = () => {
    
    const { allReading, getUsersReadingList, getUsersReadStatusContent, allUnread, allRead, refreshState, setRefreshState, toggleState, setToggleState } = useContext(ReadingContext);
    // const [ unreadList, setUnreadList ] = useState([]);
    // const [ readList, setReadList ] = useState([]);

    // let userId = getUserDetail();

    useEffect(() => {
        const activeUser = getUserDetail();
        getUsersReadingList(activeUser, false)
        .then(() => {
            getUsersReadStatusContent(activeUser, true, true);
            getUsersReadStatusContent(activeUser, false, true);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const activeUser = getUserDetail();
        if(refreshState){
            debugger
            getUsersReadStatusContent(activeUser, true, false)
            .then(() => {
                getUsersReadStatusContent(activeUser, false, false);
                setRefreshState(false);
            })
        }
        setRefreshState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshState])

    useEffect(() => {
        const activeUser = getUserDetail();
        if(toggleState){
            getUsersReadStatusContent(activeUser, true, true);
            getUsersReadStatusContent(activeUser, false, true)
            .then(() => {
                setToggleState(false);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleState])

    
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
                                allReading?.filter((c) => c.read === false).map((comic, index) => {
                                        comic.final = false;
                                        let readingListIndex = index + 1;
                                        readingListIndex++
                                        // debugger
                                        if(readingListIndex === allReading.length)
                                        {
                                            // debugger
                                            comic.final = true;
                                            if (comic.pbApiKey) {
                                                return <ReadingCard key={comic.pbApiKey} savedComic={comic} />
                                            } else {
                                                return <ReadingCard key={comic.cvApiKey} savedComic={comic} />
                                            }                                            
                                        } else {
                                            // debugger
                                            if (comic.pbApiKey) {
                                                return <ReadingCard key={comic.pbApiKey} savedComic={comic} />
                                            } else {
                                                return <ReadingCard key={comic.cvApiKey} savedComic={comic} />
                                            }                                            
                                        }
                                    })
                                    :
                                    <></>
                                }
                                {allReading?.length > 0 ?
                                allReading?.filter((c) => c.read === false) < allReading?.filter((c) => c.read === true) ?
                                    <Tile 
                                        className={"reading-card-end--div"} 
                                        kind={"child"} 
                                        renderAs={Notification} 
                                        color={"info"} 
                                        colorVariant={"light"}
                                    >
                                    </Tile>
                                    :
                                    <></>
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
                                {allReading?.length > 0 ?
                                    allReading?.filter((c) => c.read === false) > allReading?.filter((c) => c.read === true) ?
                                        <Tile 
                                            className={"reading-card-end--div"} 
                                            kind={"child"} 
                                            renderAs={Notification} 
                                            color={"success"} 
                                            colorVariant={"light"}
                                        >
                                        </Tile>
                                        :
                                        <></>
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