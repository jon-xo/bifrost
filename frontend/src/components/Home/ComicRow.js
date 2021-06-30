import React, { useContext, useEffect } from "react";
import { Table, Image } from "react-bulma-components";
import stringArray from "../StrMethods";
import marvelLogo from "../../assets/images/logos/Marvel-Comics_Logo.png";
import idwLogo from "../../assets/images/logos/IDW_Publishing_logo.png";
import imageLogo from "../../assets/images/logos/Image-Comics_Logo.png";
import boomLogo from "../../assets/images/logos/Boom-Studios_Logo.png";
import darkHorseLogo from "../../assets/images/logos/Dark-Horse-Comics_Logo.png";
import dcComicsLogo from "../../assets/images/logos/DC-Comics_Logo.png";

const ComicRow = ({comic}) => {
    const publisherImage = (publisher) => {
        switch (publisher) {
            case 'MARVEL COMICS':
                // frontend/src/assets/images/logos/Marvel-Comics_Logo.png
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
                return publisher;
        }
    };
    
    return (
        <>
            {comic.featured !== undefined ?
            <tr className="is-selected">
                <th>{comic.listIndex}</th>
                <td>{comic.title}</td>
                <td>{comic.creators}</td>
                <td>{publisherImage(comic.publisher)}</td>
            </tr>
            :
            <tr>
                <th>{comic.listIndex}</th>
                <td>{comic.title}</td>
                <td>{comic.creators}</td>
                <td>{publisherImage(comic.publisher)}</td>
            </tr>

            }
        </>
    );
};

export default ComicRow;