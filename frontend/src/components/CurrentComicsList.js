import React, { useContext, useEffect } from "react";
// import { useHistory } from "react-router-dom"
import { ComicContext } from "../providers/ComicProvider";
import { Section, Title, Container } from "react-bulma-components";
import Comic from "./Comic"


const CurrentComicsList = () => {
    const { currentComics, getCurrentComics } = useContext(ComicContext);

    useEffect(() => {
        getCurrentComics();
    }, [])

    return (
            // <Section>
            //     <Title>Current Comics</Title>
            //     <Container fluid>
            <div>
                {currentComics.map((comic) => {
                    <Comic key={comic.diamond_id} comic={comic} />
                })}
            </div>
            //     </Container>
            // </Section>
    ); 
};

export default CurrentComicsList;