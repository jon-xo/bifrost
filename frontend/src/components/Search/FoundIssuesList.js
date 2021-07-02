import React, { useContext, useState, useEffect } from "react";
import { Section, Container } from "react-bulma-components";
import { SearchComicContext } from "../../providers/SearchComicProvider";
import { FindPublisher } from "../UtilityMethods";
import SearchComic from "./SearchComic";

const FoundIssuesList = () => {
    const { foundComics, searchDetails, foundDetails} = useContext(SearchComicContext)
    const [ detailReady, setDetailReady ] = useState(false);
    
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
            {foundComics.results?.map((comic) => {
                // Experimental UseEffect, Method, and Fetch call to retreive 
                // comic publisher from alternate endpoint.
                
                // if(detailReady){
                //     if(comic.name === undefined){
                //         searchDetails(comic.name)
                //         .then(() => {
                //             if(foundDetails?.search !== undefined)
                //             {
                //                 debugger
                //                 FindPublisher(foundDetails.search)
                //             }
                //         })
                //     } else {
                //         searchDetails(comic.volume.name)
                //         .then(() => {
                //             if(foundDetails?.search !== undefined)
                //             {
                //                 debugger
                //                 FindPublisher(foundDetails.search)
                //             }
                //         })       
                //     }
                // }           
                return <SearchComic key={comic.id} comic={comic} />
            })}
            </Container>
        </Section>
    );
};

export default FoundIssuesList;