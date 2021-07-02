import React, { useContext } from "react";
// import { useHistory } from "react-router-dom"
import { SearchComicContext } from "../../providers/SearchComicProvider";
import { Section, Container } from "react-bulma-components";
import SearchComic from "./SearchComic";

const FoundIssuesList = () => {
    const { foundComics } = useContext(SearchComicContext)

    // useEffect(() => {
    //     searchIssues('Ultimate Spider-Man')
    // }, [])

    return (
        <Section>
        <h2 className="title is-2">Issues Found</h2>
            <Container fluid='true' className='comic-container'>
            {foundComics.results?.map((comic) => (                
                <SearchComic key={comic.id} comic={comic} />
            ))}
            </Container>
        </Section>
    );
};

export default FoundIssuesList;