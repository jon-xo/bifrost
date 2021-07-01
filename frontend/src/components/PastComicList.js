import React, { useContext, useEffect } from "react";
// import { useHistory } from "react-router-dom"
import { ComicContext } from "../providers/ComicProvider";
import { Section, Container } from "react-bulma-components";
import Comic from "./Comic"
import { ReleaseDate, WeekStart } from "./UtilityMethods";
import "../index.css"


const PastComicsList = () => {
    const { previousComics, getPreviousComics } = useContext(ComicContext);

    useEffect(() => {
        getPreviousComics();
    }, [getPreviousComics])

    const newComicDay = ReleaseDate(previousComics);

    return (
            <Section>
                <h2 className="title is-2">Previous Comics</h2>
        {newComicDay === undefined ? 
                <h4 className="subtitle is-4">Released on ...</h4>
                :
                <h4 className="subtitle is-5">Released on {WeekStart(newComicDay, "mid")}</h4>
        }
                <Container fluid='true' className='comic-container'>
                {previousComics.comics?.map((comic) => (                
                    <Comic key={comic.diamond_id} comic={comic} />
                ))}
                </Container>
            </Section>
    ); 
};

export default PastComicsList;