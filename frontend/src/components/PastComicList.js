import React, { useContext, useEffect } from "react";
// import { useHistory } from "react-router-dom"
import { ComicContext } from "../providers/ComicProvider";
import { Section, Container } from "react-bulma-components";
import Comic from "./Comic"
import "../index.css"


const PastComicsList = () => {
    const { previousComics, getPreviousComics } = useContext(ComicContext);

    useEffect(() => {
        getPreviousComics();
    }, [getPreviousComics])

    return (
            <Section>
            <h2 className="title is-2">Previous Comics</h2>
                <Container fluid='true' className='comic-container'>
                {previousComics.comics?.map((comic) => (                
                    <Comic key={comic.diamond_id} comic={comic} />
                ))}
                </Container>
            </Section>
    ); 
};

export default PastComicsList;