import React, { useContext, useEffect } from "react";
// import { useHistory } from "react-router-dom"
import { Section, Container } from "react-bulma-components";
import { ComicContext } from "../../providers/ComicProvider";
import { ReadingContext } from "../../providers/ReadingProvider";
import { DotLoader, ReleaseDate, WeekStart, getUserDetail } from "../UtilityMethods";
import Comic from "./Comic"


const CurrentComicsList = () => {
    // 
    // -- GitHub Issue Ticket # 4 ---
    // [Releases [Ticket #4]](https://github.com/jon-xo/bifrost/issues/5)
    // 
    //  - currentComics and getCurrentComics are accessed via ComicContext in the provider
    // - Array returned by API is stored in newComics
    // - ReleaseDate & WeekStart are imported from local UtilityMethods,
    //   newComicDay stores a single date as string, if newComicDay
    //   does not equal undefined, release date is returned by WeekStart
    //   by passing "mid" parameter to the method
    //   - Returned JSX maps the newComics array and returns indvidual
    //   comic cards.
    //   
    
    const { currentComics, getCurrentComics } = useContext(ComicContext);
    const { getUsersReadingList, allReading, refreshState, setRefreshState } = useContext(ReadingContext);

    let userId = getUserDetail();
    const newComicDay = ReleaseDate(currentComics);

    useEffect(() => {
        getCurrentComics();
    }, [])

    useEffect(() => {
        if(userId){
            getUsersReadingList(userId);
        }
    }, [])

    useEffect(() => {
        if(refreshState){
            getUsersReadingList(userId)
            .then(() => {
                setRefreshState(false);
            })
        }
    }, [refreshState])

    return (
            <Section>
                <h2 className="title is-2">Current Comics</h2>
            {newComicDay === undefined ? 
                <DotLoader />
                :
                <h4 className="subtitle is-5"><strong>Release Date</strong>: {WeekStart(newComicDay, "mid")}</h4>
            }
                <Container fluid='true' className='comic-container'>

                {currentComics?.comics?.map((comic) => {
                    if(allReading?.find((r) => r.pbApiKey === comic.diamond_id)){
                        return <Comic key={comic.diamond_id} comic={comic} inReading={true}/>
                    } else {
                        return <Comic key={comic.diamond_id} comic={comic} inReading={false}/>
                    }
                })}
                </Container>
            </Section>
    ); 
};

export default CurrentComicsList;