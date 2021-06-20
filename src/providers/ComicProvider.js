import React, { useState, createContext  } from "react"

export const ComicContext = React.createContext();

export const ComicProvider = (props) => {
    const [ previousComics, setPreviousComics ] = useState([]);
    const [ newComics, setNewComics ] = useState([]);
    const CV_API_KEY = process.env.REACT_APP_COMIC_API_KEY;
    const SB_API = 'https://api.shortboxed.com/comics/v1'

    const getNewComics = () => {
        return fetch(`${SB_API}/future`, {
            method: "GET"
        })
        .then((r) => r.json())
        .then(setNewComics)
    }; 
    
    const getPreviousComics = () => {
        return fetch(`${SB_API}/previous`, {
            method: "GET"
        })
        .then((r) => r.json())
        .then(setPreviousComics)
    };

    return (
        <ComicContext.Provider value={{ 
            previousComics, 
            newComics,
            setPreviousComics, 
            setNewComics 
        }}>
            {props.children}
        </ComicContext.Provider>
    )
};