import React, { useContext, useEffect } from "react";
// import { useHistory } from "react-router-dom"
import { ComicContext } from "../../providers/ComicProvider";
import { Section, Container } from "react-bulma-components";
import { ReleaseDate, WeekStart } from "../UtilityMethods";
import Comic from "./Comic"
// import "../index.css"


const UpcomingComicsList = () => {
    // 
    // -- GitHub Issue Ticket # 4 ---
    // [Releases [Ticket #4]](https://github.com/jon-xo/bifrost/issues/5)
    // 
    //  - newComics and getComics are accessed via ComicContext in the provider
    // - Array returned by API is stored in newComics
    // - ReleaseDate & WeekStart are imported from local UtilityMethods,
    //   newComicDay stores a single date as string, if newComicDay
    //   does not equal undefined, release date is returned by WeekStart
    //   by passing "mid" parameter to the method
    //   - Returned JSX maps the newComics array and returns indvidual
    //   comic cards.
    //   
    
    const { newComics, getNewComics } = useContext(ComicContext);

    useEffect(() => {
        getNewComics();
    }, [getNewComics])

    const newComicDay = ReleaseDate(newComics);

    return (
            <Section>
                <h2 className="title is-2">Upcoming Comics</h2>
            {newComicDay === undefined ? 
                <h4 className="subtitle is-5">Release Date: ...</h4>
                :
                <h4 className="subtitle is-5"><strong>Release Date</strong>: {WeekStart(newComicDay, "mid")}</h4>
            }
                <Container fluid='true' className='comic-container'>
                {newComics.comics?.map((comic) => (                
                    <Comic key={comic.diamond_id} comic={comic} />
                ))}
                </Container>
            </Section>
    ); 
};

export default UpcomingComicsList;