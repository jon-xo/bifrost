import React, { useContext, useEffect } from "react";
import { Section, Container } from "react-bulma-components";
import { SearchComicContext } from "../../providers/SearchComicProvider";
import { ReadingContext } from "../../providers/ReadingProvider";
import { FindPublisher, getUserDetail } from "../UtilityMethods";
import SearchComic from "./SearchComic";

const FoundIssuesList = () => {
    const { foundComics } = useContext(SearchComicContext)
    const { getUsersReadingList, allReading } = useContext(ReadingContext);
    // const [ detailReady, setDetailReady ] = useState(false);

    let userId = getUserDetail();
    
    useEffect(() => {
        getUsersReadingList(userId);
    }, [allReading])
    
    // Experimental UseEffect, Method, and Fetch call to retreive 
    // comic publisher from alternate endpoint.
    
    // useEffect(() => {
    //     if(foundComics.results !== undefined){
    //         setDetailReady(true)       
    //     }
    // }, [])
    
    // const getComicDetail = (string) => {
    //     if( string !== undefined && string !== "" ){
    //         searchDetails(string)
    //     }
    // };

    return (
        <Section>
        <h2 className="title is-2">Issues Found</h2>
            <Container fluid='true' className='comic-container'>
            {foundComics?.results?.map((comic) => {                
                if(allReading?.find((r) => r.cvApiKey === comic.id)){
                    return <SearchComic key={comic.id} comic={comic} inReading={true}/>
                } else {
                    return <SearchComic key={comic.id} comic={comic} inReading={false}/>
                }
            })}
            </Container>
        </Section>
    );
};

export default FoundIssuesList;