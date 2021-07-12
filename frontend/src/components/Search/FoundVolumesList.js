import React, { useContext, useEffect } from "react";
import { SearchComicContext } from "../../providers/SearchComicProvider";
import { ReadingContext } from "../../providers/ReadingProvider";
import { Section, Container } from "react-bulma-components";
import { getUserDetail } from "../UtilityMethods";
import SearchComic from "./SearchComic";

const FoundVolumesList = () => {
    const { foundVolumes } = useContext(SearchComicContext);
    const { getUsersReadingList, allReading } = useContext(ReadingContext);
    let userId = getUserDetail();
    
    const checkVolumesArray = () => {
        if(foundVolumes?.results !== undefined){
            return foundVolumes.results
        }
        return undefined;
    };
    
    useEffect(() => {
        getUsersReadingList(userId);
    }, [allReading])
    
    const volumesArray = checkVolumesArray();
    
    return (
        <>
            <Section>
                <h2 className="title is-2">Volumes Found</h2>
                <Container fluid='true' className='comic-container'>
                {volumesArray?.length > 0 ?
                    volumesArray?.map((comic) => {
                        if(allReading?.find((r) => r.cvApiKey === comic.id)){
                            return <SearchComic key={comic.id} comic={comic} inReading={true}/>
                        } else {
                            return <SearchComic key={comic.id} comic={comic} inReading={false}/>
                        }
                    })
                    :
                    <></>
                }
                </Container>
            </Section>
        </>
    );
};

export default FoundVolumesList;