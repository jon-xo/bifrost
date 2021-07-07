import React, { useState, createContext, useContext } from "react";
import { UserAccountContext } from "./UserAccountProvider";
// import * as firebase from "firebase/app";
// import "firebase/auth";

export const ReadingContext = createContext();

export const ReadingProvider = (props) => {

    const [ allPublicContent, setAllPublicContent ] = useState([]);
    const [ allReading, setAllReading ] = useState([]);
    const [ allUnread, setAllUnread ] = useState([]);
    const [ allRead, setAllRead ] = useState([]);
    const [ disableReadingButtons, setDisableReadingButton ] = useState(false);
    const { getToken } = useContext(UserAccountContext);
    
    const apiUrl = 'https://localhost:5001/api/savedcontent'

    const getAllPublicContent = () => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((r) => r.json()))
            .then(setAllReading)    
    };


    const getUsersReadingList = (userId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((r) => r.json()))
            .then(setAllReading)        
    };

    const getUsersReadStatusContent = (userId, readBool) => {
        if(readBool){
            return getToken().then((token) => 
                fetch(`${apiUrl}/r?uId=${userId}&read=${readBool}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((r) => r.json()))
                .then(setAllRead)
            } else {
            return getToken().then((token) => 
                fetch(`${apiUrl}/r?uId=${userId}&read=${readBool}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((r) => r.json()))
                .then(setAllUnread)
        }
    }

    const addContentToReadingList = (contentObject) => {
        debugger
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
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

    const toggleReadStatus = (id, readBool) => {
        if (readBool) {
            return getToken().then((token) =>
                fetch(`${apiUrl}/update/rs?id=${id}&status=true`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }))
            } else {
            return getToken().then((token) =>
                fetch(`${apiUrl}/update/rs?id=${id}&status=false`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }))
        }
    };

    const deleteComicReadingList = (id) => {
        return getToken().then((token) => 
          fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }))
      };

    return (
        <ReadingContext.Provider value={{ 
            allReading, 
            setAllReading, 
            allUnread,
            setAllUnread,
            allRead,
            setAllRead,
            getUsersReadingList, 
            addContentToReadingList,
            getUsersReadStatusContent,
            toggleReadStatus,
            deleteComicReadingList,
            disableReadingButtons, 
            setDisableReadingButton,            
            getAllPublicContent,
            allPublicContent, 
            setAllPublicContent
        }}>
            {props.children}
        </ReadingContext.Provider>
    );
};