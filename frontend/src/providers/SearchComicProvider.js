import React, { useState, createContext } from "react"

export const SearchComicContext = createContext();

export const SearchComicProvider = (props) => {
    const [ foundComics, setFoundComics ] = useState({});
    const [ foundVolumes, setfoundVolumes ] = useState({});
    // const CV_API_KEY = process.env.REACT_APP_COMIC_API_KEY;
    // const API_ISSUES = 'http://www.comicvine.com/api/issues'
    const API_PROXY = 'https://bifrost-proxy.herokuapp.com/api/search'

    const searchIssues = (query) => {
        if(query){
            return fetch(`${API_PROXY}/issues/${query}`, {
                method: "GET"
            })
            .then((r) => r.json())
            .then(setFoundComics)
        }
    };

    const searchVolumes = (query) => {
        if(query){
            return fetch(`${API_PROXY}/volumes/${query}`, {
                method: "GET"
            })
            .then((r) => r.json())
            .then(setfoundVolumes)
            // .then(console.log(foundComics))
        }
    };

    return (
        <SearchComicContext.Provider value={{
            foundComics,
            setFoundComics,
            searchIssues,
            searchVolumes,
            foundVolumes
        }}>
            {props.children}
        </SearchComicContext.Provider>
    )
};