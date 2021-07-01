import React, { useContext, useEffect } from "react";
// import { useHistory } from "react-router-dom"
import { Section, Container } from "react-bulma-components";
import { ComicContext } from "../providers/ComicProvider";
import { ReleaseDate, WeekStart } from "./UtilityMethods";
import Comic from "./Comic"


const CurrentComicsList = () => {
    const { currentComics, getCurrentComics } = useContext(ComicContext);

    useEffect(() => {
        getCurrentComics();
    }, [currentComics, getCurrentComics])

    const newComicDay = ReleaseDate(currentComics);

    return (
            <Section>
                <h2 className="title is-2">Current Comics</h2>
            {newComicDay === undefined ? 
                <h4 className="subtitle is-4">Released on ...</h4>
                :
                <h4 className="subtitle is-5">Released on {WeekStart(newComicDay, "mid")}</h4>
            }
                <Container fluid='true' className='comic-container'>

                {currentComics.comics?.map((comic) => (
                    <Comic key={comic.diamond_id} comic={comic} />
                ))}
                </Container>
            </Section>
    ); 
};

export default CurrentComicsList;