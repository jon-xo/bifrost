import React, { useContext, useEffect, useState } from "react";
import { Content, Notification, Heading, Tile, Columns, Image, Tag } from "react-bulma-components";
import { ComicCardDate, ReleaseComicImage, PublisherImage } from "../UtilityMethods";

const ReadingCard = ({ savedComic }) => {
    if (savedComic.comicType === "issue" && savedComic.pbApiKey){
        debugger
        return (
            <>
                <Tile className={"reading-card--div"} kind={"child"} renderAs={Notification} color={"info"} colorVariant={"light"}>
                    <Columns>
                        <Columns.Column size={3}>
                            <Image 
                                size={128} 
                                src={savedComic.comicImage}
                                fallback={ReleaseComicImage("fallback")} 
                            />
                        </Columns.Column>
                        <Columns.Column size={9}>
                            <Heading textAlign={"center"} size={4}>{savedComic.title}</Heading>
                            <Heading textAlign={"center"} subtitle size={6}>Release Date: {ComicCardDate(savedComic.publishDate)}</Heading>
                            <Content pull={"right"}>
                                <Tag className={'tag--container'} size="medium">{PublisherImage(savedComic.publisher)}</Tag>
                            </Content>
                    </Columns.Column>
                    </Columns>
                </Tile>
            </>
        );
    } else if (savedComic.comicType === "issue" && savedComic.cvApiKey) {
        debugger
        return (
            <>
                <Tile className={"reading-card--div"} kind={"child"} renderAs={Notification} color={"info"} colorVariant={"light"}>
                    <Columns>
                        <Columns.Column size={3}>
                            <Image 
                                size={128} 
                                src={savedComic.comicImage}
                                fallback={ReleaseComicImage("fallback")} 
                            />
                        </Columns.Column>
                        <Columns.Column size={9}>
                            <Heading textAlign={"center"} size={4}>{savedComic.title}</Heading>
                            <Heading textAlign={"center"} subtitle size={6}>{ComicCardDate(savedComic.publishDate)}</Heading>
                            <Content>
                                <Tag className={'tag--container'} size="medium">{PublisherImage(savedComic.publisher)}</Tag>
                            </Content>
                        </Columns.Column>
                    </Columns>
                </Tile>
            </>
        );
    } else if (savedComic.ComicType === "volume"){
        debugger
        return (
            <>
                <Tile className={"reading-card--div"} kind={"child"} renderAs={Notification} color={"info"} colorVariant={"light"}>
                    <Heading textAlign={"center"} size={4}>Sample</Heading>
                    <Heading textAlign={"center"}  subtitle>Sample Info</Heading>
                </Tile>
            </>
        );
    } else {
        return null;
    }
    
};

export default ReadingCard;