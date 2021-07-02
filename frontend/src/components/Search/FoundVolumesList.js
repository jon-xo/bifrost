import React, { useContext } from "react";
// import { useHistory } from "react-router-dom"
import { SearchComicContext } from "../../providers/SearchComicProvider";
import { Section, Container } from "react-bulma-components";
import SearchComic from "./SearchComic";

const FoundVolumesList = () => {
    const { foundVolumes } = useContext(SearchComicContext)

    const checkVolumesArray = () => {
        if(foundVolumes?.results !== undefined){
            return foundVolumes.results
        }
    };

    const volumesArray = checkVolumesArray();
    
    // const createSearchObject = (comicObject) => {
    //     let searchComicObject = {};
    //     if (comicObject !== null || comicObject === undefined) {
    //        searchComicObject = {
    //             aliases: comicObject.aliases,
    //             api_detail_url: comicObject.api_detail_url,
    //             count_of_issues: comicObject.count_of_issues,
    //             description: comicObject.description,
    //             first_issue_name: comicObject.first_issue.name,
    //             first_issue_id: comicObject.first_issue.id,
    //             first_issue_number: comicObject.first_issue.issue_number,
    //             id: comicObject.id,
    //             last_issue_name: comicObject.last_issue.name,
    //             last_issue_id: comicObject.last_issue.id,
    //             last_issue_number: comicObject.first_issue.issue_number,
    //             name: comicObject.name,
    //             publisher: comicObject.publisher.name,
    //             start_date: comicObject.start_year,
    //             image: comicObject.image
    //        };

    //        return searchComicObject;
    //     }
    // };

    return (
        <>
            <Section>
                <h2 className="title is-2">Volumes Found</h2>
                <Container fluid='true' className='comic-container'>
                {volumesArray?.map((comic) => {
                    // const foundComic = createSearchObject(comic);
                    return <SearchComic key={comic.id} comic={comic} />
                }
                )}
                </Container>
            </Section>
        </>
    );
};

export default FoundVolumesList;