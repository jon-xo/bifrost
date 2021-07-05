import React, { useState, createContext, useContext } from "react";
import { UserAccountContext } from "./UserAccountProvider";
// import * as firebase from "firebase/app";
// import "firebase/auth";

export const ReadingContext = createContext();

export const ReadingProvider = (props) => {
    const [ allReading, setAllReading ] = useState([]);
    const { getToken } = useContext(UserAccountContext);

    // const getToken = () => firebase.auth().currentUser.getIdToken();
    // const userAccount = sessionStorage.getItem("userAccount");
    
    const apiUrl = 'https://localhost:5001/api/savedcontent'

    const getUsersReadingList = (userId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((r) => r.json())
            .then(setAllReading)
        )
    };

    // const addContentToReadingList = (contentObject) => {
    //     return fetch(apiUrl, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(contentObject)
    //     })
    // };

    // const addContentToReadingList = (contentObject) => {
    //     const postObject = (syncToken) => {
    //         const newPost = { 
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${syncToken}`,
    //         },
    //         body: JSON.stringify(contentObject)
    //         }
    //         console.log(newPost);
    //         return newPost
    //     }
    //     debugger
    //     return getToken().then((token) =>
    //         fetch(apiUrl, postObject(token))
    //         .then(r => {
    //             console.log(r);
    //             if (r.ok) {
    //                 return r.json();
    //             }
    //             throw new Error(r.status === 401 ? "401: Unauthorized" : r.status + " " + r. statusText);
    //         })
    //     );
    // };

    const addContentToReadingList = (contentObject) => {
        // debugger
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(contentObject)
            })
            .then(r => {
                console.log(r);
                if (r.ok) {
                    return r.json();
                }
                throw new Error(r.status === 401 ? "401: Unauthorized" : r.status + " " + r. statusText);
            })
        );
    };

    return (
        <ReadingContext.Provider value={{ 
            allReading, 
            setAllReading, 
            getUsersReadingList, 
            addContentToReadingList 
        }}>
            {props.children}
        </ReadingContext.Provider>
    );
};