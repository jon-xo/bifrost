import React, { useState, useEffect, createContext } from "react";
import * as firebase from "firebase/app";
import { Progress } from "react-bulma-components";
import "firebase/auth";

export const UserAccountContext = createContext();

export const UserAccountProvider = (props) => {
    const apiUrl = "/api/useraccount";

    const userAccount = sessionStorage.getItem("userAccount");
    const [ isLoggedIn, setIsLoggedIn ] = useState(userProfile != null);

    const [ isFirebaseReady, setIsFirebaseReady ] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {
            setIsFirebaseReady(true);
        })
    }, []);

    const login = (email, pw) => {
        return firebase.auth().signInWithEmailAndPassword(email, pw)
        .then((signInResponse) => {getUserProfile(signInResponse.user.uid)})
        .then((userAccount) => {
            sessionStorage.setItem("userAccount", JSON.stringify(userAccount))
            setIsLoggedIn(true);
        })
    };

    const logout = () => {
        return firebase.auth().signOut()
        .then(() => {
            sessionStorage.clear();
            setIsLoggedIn(false);
        })
    };

    const register = (userAccoun, password) => {
        return firebase.auth().createUserWIthEmailAndPassword(userAccoun.email, password)
        .then((createResponse) => saveUser({...userAccount, firebaseUserId: createResponse.user.uid}))
        .then((savedUserAccount) => {
            sessionStorage.setItem("userAccount", JSON.stringify(savedUserAccount))
            setIsLoggedIn(true);
        })
    };

    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getUserAccount = (firebaseUserId) => {
        return getToken().then((token) => 
        fetch(`${apiUrl}/${firebaseUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
    };

    const saveUser = (userAccount) => {
        return getToken().then((token) => 
        fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userAccount)
        }).then(resp => resp.json()));  
    };

    return (
        <UserAccountContext.Provider value={{ isLoggedIn, login, logout, register, getToken }}>
            {isFirebaseReady ?
            props.children
            : <Progress
                color="link"  
                max={75}
                size="large"
                value={null}
              />
            }
        </UserAccountContext.Provider>
    )
};