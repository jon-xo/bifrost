import React from "react";
import { DateTime } from "luxon";
import { Image } from "react-bulma-components";
import marvelLogo from "../assets/images/logos/Marvel-Comics_Logo.png";
import idwLogo from "../assets/images/logos/IDW_Publishing_logo.png";
import imageLogo from "../assets/images/logos/Image-Comics_Logo.png";
import boomLogo from "../assets/images/logos/Boom-Studios_Logo.png";
import darkHorseLogo from "../assets/images/logos/Dark-Horse-Comics_Logo.png";
import dcComicsLogo from "../assets/images/logos/DC-Comics_Logo.png";

export const ReleaseDate = (objectArray) => {
    let targetObject = undefined;
    if(objectArray?.comics !== undefined){
        targetObject = objectArray.comics[0].release_date
    }
    return targetObject;
};

export const WeekStart = (newComicDay) => {
    const comicDay = DateTime.fromISO(newComicDay)
    const weekStart = comicDay.startOf('week')

    return weekStart.weekdayLong + ", " + weekStart.toLocaleString();
}

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
        case 'BOOM! STUDIOS':
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
        case 'DC COMICS':
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