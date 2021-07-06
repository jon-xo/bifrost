import React from "react";
import { DateTime } from "luxon";
import { Image } from "react-bulma-components";
import marvelLogo from "../assets/images/logos/Marvel-Comics_Logo.png";
import idwLogo from "../assets/images/logos/IDW_Publishing_logo.png";
import imageLogo from "../assets/images/logos/Image-Comics_Logo.png";
import boomLogo from "../assets/images/logos/Boom-Studios_Logo.png";
import darkHorseLogo from "../assets/images/logos/Dark-Horse-Comics_Logo.png";
import dcComicsLogo from "../assets/images/logos/DC-Comics_Logo.png";


export const ReleaseComicImage = (diamond_id) => {
    if (diamond_id === "fallback"){
        return "https://www.tfaw.com/media/catalog/product/placeholder/default/missingimage600.png"
    }

    return `https://www.tfaw.com/media/catalog/product/${StringArray(diamond_id, 1)}/${StringArray(diamond_id, 2)}/${diamond_id}.jpg`
};

export const currentDate = DateTime.now().toISO();

export const ReadingComicDate = (comicDate) => {
    if(comicDate){
        // const originalDate = comicObject.release_date;
        if(comicDate.includes('.'))
        {
            const newTarget = comicDate.split('.');
            try {
                const modifiedDate = DateTime.fromISO(newTarget[0]);
                return modifiedDate.toISO(); 
            } catch (e) {
                console.error(e);
                return null;
            }
        }
    }
    try {
        return DateTime.fromISO(comicDate).toISO();
    } catch (e) {
        console.error(e);
        return null;
    }
};

// **ReleaseDate** method accepts an object returned by the ComicProvider endpoints,
// if comics array in the object parameter is not undefined, the release_date key
// of the comic object in index position 0 is returned. 
// Additionally, if the provider's date includes a '.', 
// the string is split at the character and the first array index is returned
// 

export const ReleaseDate = (objectArray) => {
    let targetObject = undefined;
    if(objectArray?.comics !== undefined){
        targetObject = objectArray.comics[0].release_date
        if(targetObject.includes('.'))
        {
            const newTarget = targetObject.split('.');
            targetObject = newTarget[0];           
            return targetObject; 
        }
    }
    return targetObject;
};

// **ComicCardDate** method accepts a date string,
// if the date string includes a '.', 
// the string is split at that character and the first array index is returned,
// regardless of the conditional, the date variable is formatted with toLocaleString
// method and returned
// 

export const ComicCardDate = (dateString) => {
    let targetDate = undefined;
    // debugger
    if(dateString.includes('.')){
        const newDate = dateString.split('.');
        let dateEdit = newDate[0];
        targetDate = DateTime.fromISO(dateEdit);
        // debugger
        return targetDate.toLocaleString();
    } else {
        targetDate = DateTime.fromISO(dateString);
        // debugger
        return targetDate.toLocaleString();
    }

};

// **WeekStart** method accepts a date string and string to represent
// week position. If the week position string is 'mid' the string is parsed with
// fromISO format and returned as a concatenated string composed of name of weekday
// and date string, else the startOf method is called and the Monday of the newComicDay
// week is returned using a concatenated string
// 

export const WeekStart = (newComicDay, weekPosition) => {

    if (weekPosition === "mid"){
        const comicDay = DateTime.fromISO(newComicDay)

        return comicDay.weekdayLong + ", " + comicDay.toLocaleString(); 
    } else {
        const comicDay = DateTime.fromISO(newComicDay)
        const weekStart = comicDay.startOf('week')
    
        return weekStart.weekdayLong + ", " + weekStart.toLocaleString();
    }
}

export const FindPublisher = (detailArray) => {
    const matchedDetail = detailArray.filter(d => d.snippet.includes("published by"))[0];
    console.log(matchedDetail);
};

export const StringArray = (comicId, letterCount) => {
    const titleArray = comicId.split("");
    if (letterCount === 1){
        return titleArray[0]
    } else if (letterCount === 2) {
        return titleArray[1]
    }
    return titleArray
};

export const PublisherImage = (publisher) => {
    switch (publisher) {
        case 'MARVEL COMICS':                
            return (<Image 
                        src={marvelLogo}
                        size={64}
                        alt={publisher}
                    />)
        case 'Marvel':                
            return (<Image 
                        src={marvelLogo}
                        size={64}
                        alt={publisher}
                    />)
        case 'IDW PUBLISHING':
            return (<Image 
                        src={idwLogo}
                        size={64}
                        alt={publisher}
                    />)
        case 'IMAGE COMICS':
            return (<Image 
                        src={imageLogo}
                        size={32}
                        alt={publisher}
                    />)
        case 'Image':
            return (<Image 
                        src={imageLogo}
                        size={32}
                        alt={publisher}
                    />)
        case 'BOOM! STUDIOS':
            return (<Image 
                        src={boomLogo}
                        size={64}
                        alt={publisher}
                    />)
        case 'Boom! Studios':
            return (<Image 
                        src={boomLogo}
                        size={64}
                        alt={publisher}
                    />)
        case 'DARK HORSE COMICS':
            return (<Image 
                        src={darkHorseLogo}
                        size={48}
                        alt={publisher}
                    />)
        case 'Dark Horse Comics':
            return (<Image 
                        src={darkHorseLogo}
                        size={48}
                        alt={publisher}
                    />)
        case 'DC COMICS':
            return (<Image 
                        src={dcComicsLogo}
                        size={48}
                        alt={publisher}
                    />)
        case 'DC Comics':
            return (<Image 
                        src={dcComicsLogo}
                        size={48}
                        alt={publisher}
                    />)
        default:
            return <strong>{`${publisher}`}</strong>;
    }
};

// export default stringArray;