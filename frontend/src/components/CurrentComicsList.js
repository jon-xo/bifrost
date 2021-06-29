import React, { useContext, useEffect } from "react";
// import { useHistory } from "react-router-dom"
import { ComicContext } from "../providers/ComicProvider";
import { Section, Container } from "react-bulma-components";
import Comic from "./Comic"


const CurrentComicsList = () => {
    const { currentComics, getCurrentComics } = useContext(ComicContext);

    useEffect(() => {
        getCurrentComics();
    }, [currentComics, getCurrentComics])

    return (
            <Section>
                <h2 className="title is-2">Current Comics</h2>
                <Container fluid='true' className='comic-container'>

                {currentComics.comics?.map((comic) => (
                    <Comic key={comic.diamond_id} comic={comic} />
                ))}
                </Container>
            </Section>
    ); 
};

export default CurrentComicsList;