import React, { useContext, useState } from "react";
import { currentDate } from "../UtilityMethods";
import { ReleaseComicImage } from "../UtilityMethods";
// import { UserAccountContext } from "../../providers/UserAccountProvider";
// import { ReadingContext } from "../../providers/ReadingProvider";

export const addReadingContent = ( comicObject, loginState, addMethod ) => {

    const userAccount = JSON.parse(sessionStorage.getItem("userAccount"));
    // debugger
    const savedContent = {
        UserId: userAccount?.id,
        CVApiKey: undefined,
        PBApiKey: undefined,
        Title: undefined,
        ComicImage: undefined,
        Publisher: undefined,
        Description: comicObject.description,
        PublishDate: undefined,
        Read: false,
        LastUpdated: currentDate,
        SeriesId: undefined,
        Rating: undefined
    };

    if (comicObject.diamond_id){
        savedContent.PBApiKey = comicObject.diamond_id;
        savedContent.Title = comicObject.title;
        savedContent.ComicImage = ReleaseComicImage(comicObject.diamond_id);
        savedContent.Publisher = comicObject.publisher;
        savedContent.PublishDate = comicObject.release_date;
        savedContent.Description += `
        Created by: ${comicObject.creators}
        `;
    } else if (comicObject.resource_type === "issue") {
        savedContent.CVApiKey = comicObject.id;
        if (comicObject.name !== null || comicObject.name !== undefined){
            savedContent.Title = comicObject.name;
        } else {
            savedContent.Title = comicObject.volume.name;
        }
        savedContent.PublishDate = comicObject?.cover_date;
        savedContent.SeriesId = comicObject?.volume?.id;
        savedContent.ComicImage = comicObject?.image?.super_url;
    } else if (comicObject.resource_type === "volume") {
        savedContent.CVApiKey = comicObject.id;
        savedContent.Title = comicObject.name;
        savedContent.Publisher = comicObject?.publisher?.name;
        savedContent.PublishDate = comicObject?.start_year;
        savedContent.ComicImage = comicObject?.image?.super_url;
        savedContent.SeriesId = comicObject?.first_issue.id
    } 

    if(loginState) {
        // debugger
        addMethod(savedContent);
    }
};