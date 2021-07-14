import React, { useState, createContext, useContext } from "react";
import { UserAccountContext } from "./UserAccountProvider";

export const ReadingContext = createContext();

export const ReadingProvider = (props) => {

    const [ allPublicContent, setAllPublicContent ] = useState([]);
    const [ selectedUsersContent, setSelectedUsersContent ] = useState([]);
    const [ allReading, setAllReading ] = useState([]);
    const [ allUnread, setAllUnread ] = useState([]);
    const [ allRead, setAllRead ] = useState([]);
    const [ refreshState, setRefreshState ] = useState(false);
    const [ disableReadingButtons, setDisableReadingButton ] = useState(false);
    const [ toggleState, setToggleState ] = useState(false);
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
            .then(setAllPublicContent)
    };


    const getUsersReadingList = (userId, fBool) => {
        // setRefreshState(false);
        if(fBool){
            debugger
            return getToken().then((token) =>
                fetch(`${apiUrl}/${userId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((r) => r.json()))
                .then(setSelectedUsersContent)
                // .then(() => {
                //     setRefreshState(true);                    
                // })
        } else {
            debugger
            return getToken().then((token) =>
                fetch(`${apiUrl}/${userId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((r) => r.json()))
                .then(setAllReading)
                .then(getAllPublicContent)
                // .then(() => {
                //     setRefreshState(true);
                // })      
        }
    };

    const getUsersReadStatusContent = (userId, readBool, pageLoad) => {
        if(readBool){
            debugger
                return getToken().then((token) => 
                    fetch(`${apiUrl}/r?uId=${userId}&read=${readBool}`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then((r) => r.json()))
                    .then(setAllRead)
                    .then(getAllPublicContent)
                    .then(() => {
                        if(!pageLoad){
                            debugger
                            setRefreshState(true);
                        }
                    })
            } else {
                debugger
                return getToken().then((token) => 
                    fetch(`${apiUrl}/r?uId=${userId}&read=${readBool}`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then((r) => r.json()))
                    .then(setAllUnread)
                    .then(getAllPublicContent)
                    .then(() => {
                        if(!pageLoad){
                            debugger
                            setRefreshState(true);
                        }
                    })
        }
    }

    const addContentToReadingList = (contentObject) => {        
        // debugger
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
                // console.log(r);
                if (r.ok) {
                    return r.json()
                    .then(getAllPublicContent)
                    .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
                    .then(() => {
                        setRefreshState(true);
                    }) 
                }
                throw new Error(r.status === 401 ? "401: Unauthorized" : r.status + " " + r.statusText);
            })
        );
    };

    const toggleReadStatus = (id, contentObject) => {
        // debugger
        return getToken().then((token) =>
            fetch(`${apiUrl}/update/rs?id=${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contentObject)
            })
            .then(() => {
                setToggleState(true);
            }))
    };

    // const toggleReadStatus = (id, readBool) => {
    //     if (readBool) {
    //         return getToken().then((token) =>
    //             fetch(`${apiUrl}/update/rs?id=${id}&status=true`, {
    //                 method: "PUT",
    //                 headers: {
    //                     "Authorization": `Bearer ${token}`,
    //                     "Content-Type": "application/json"
    //                 }
    //             }))
    //         } else {
    //         return getToken().then((token) =>
    //             fetch(`${apiUrl}/update/rs?id=${id}&status=false`, {
    //                 method: "PUT",
    //                 headers: {
    //                     "Authorization": `Bearer ${token}`,
    //                     "Content-Type": "application/json"
    //                 }
    //             }))
    //     }
    // };

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
            setAllPublicContent,
            selectedUsersContent,
            refreshState,
            setRefreshState,
            toggleState,
            setToggleState
        }}>
            {props.children}
        </ReadingContext.Provider>
    );
};