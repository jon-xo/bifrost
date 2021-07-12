import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserAccountContext } from "../../providers/UserAccountProvider";
import { ReadingContext } from "../../providers/ReadingProvider";
import { ComicContext } from "../../providers/ComicProvider";
import { Button, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { addReadingContent } from "./ReadingMethods";
import { SearchComicContext } from "../../providers/SearchComicProvider"
import { userId } from "../UtilityMethods";;


const HandleBuildContent = ( {...props} ) => {

    const comicId = props.comicId;
    const inReading = props.inReading;

    const colorVariant = (readingBool) => {
        if(readingBool){
            return "success"
        } else {
            return "info"
        }
    }; 

    const { isLoggedIn } = useContext(UserAccountContext);
    const [ buttonLoading, setButtonLoading ] = useState(false);
    const { addContentToReadingList } = useContext(ReadingContext);
    const { previousComics, currentComics, newComics } = useContext(ComicContext);
    const { foundComics, foundVolumes } = useContext(SearchComicContext);
    const location = useLocation();
    const route = location.pathname;

    
    const handleAddContent = ( event, comicId ) => {
        event.preventDefault();
        setButtonLoading(true);
        let selectedComic = null;
        if(route.includes("-comics") || route === "/" ){
            if (route === "/" || route.includes("current-comics") && currentComics !== undefined){
                selectedComic = currentComics?.comics.find(c => c.diamond_id === comicId);
            } else if(route.includes("upcoming-comics") && newComics !== undefined){
                selectedComic = newComics?.comics.find(c => c.diamond_id === comicId);
            } else if (route.includes("previous-comics") && previousComics !== undefined){
                selectedComic = previousComics?.comics.find(c => c.diamond_id === comicId);
            } 
            // else if (route === "/" || route.includes("current-comics") && currentComics !== undefined){
            //     debugger
            //     selectedComic = currentComics?.comics.find(c => c.diamond_id === comicId);
            // }
        } else if (route.includes("search")) {
            if(route.includes("search/issues")){
                selectedComic = foundComics?.results.find(c => c.id === comicId);
            } else if (route.includes("search/volumes")){
                selectedComic = foundVolumes?.results.find(c => c.id === comicId);
            }
        }

        addReadingContent(selectedComic, isLoggedIn, addContentToReadingList, setButtonLoading)
    };

    if(route.includes("-comics") || route.includes("search/issues")){
        // debugger
        return (
            <>
                <Button
                    color="info"
                    colorVariant={colorVariant(inReading)}
                    outlined
                    isStatic={inReading}
                    disabled={inReading}
                    loading={buttonLoading}
                    onClick={(e) => {
                        handleAddContent(e, comicId);
                    }}
                >
                    {inReading ?
                        <>
                            <Icon align="left">
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </Icon>
                            <span>Issue Added</span>
                        </>
                        :
                        <>
                            <Icon align="left">
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </Icon>
                            <span>Add Issue</span>
                        </>
                    }
                </Button>
            </>
        );
    } else if (route.includes("search/volumes")) {
        return (
            <>
                <Button
                    color="info"
                    colorVariant="light"
                    outlined
                    onClick={(e) => {
                        handleAddContent(e, comicId);
                    }}
                >
                    <Icon align="left">
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </Icon>
                    <span>Add Volume</span>
                </Button>
            </>
        );

    } else {
        return (
            <>
                <Button
                    color="info"
                    colorVariant="light"
                    outlined
                    size="small"
                    onClick={(e) => {
                        handleAddContent(e, comicId);
                    }}
                >
                    <Icon>
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </Icon>
                    <span>Add to Reading List</span>
                </Button>
            </>
        );
    }
    
    
};

export default HandleBuildContent;