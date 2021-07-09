import React, { useState, useEffect, createContext } from "react";
import { Progress } from "react-bulma-components";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserAccountContext = createContext();

export const UserAccountProvider = (props) => {
    // --- GitHub Issue Ticket # 1 ---
    // [Authentication [Ticket #1]](https://github.com/jon-xo/bifrost/issues/2)
    // 
    // - apiUrl variable is declared for API url
    // - UserAccount Provider methods
    //    - login accepts email and password paramaters and envokes
    //    the signInWithEmailAndPassword firebase method which returns
    //    the related user's UUID in the async call and passed as a parameter
    //    to the getUserAccount method. The returned user account is stored
    //    in sessionStorage. Once sessionStorage is updated, IsLoggedIn is toggled
    //    and WarningProps receives hidden/true key/value pair
    //    - logout access the firebase signOut method and clears the user from 
    //    sessionStorage. Once sessionStorage is updated, IsLoggedIn is toggled
    //    and WarningProps receives hidden/true key/value pair
    //    - getUserAccount retrives firebase token and performs GET fetch method
    //    if user is found, database returns user object in JSON
    //    - saveUser retrives firebase token and adds the passed user object
    //    and sends object to database
    // 

    
    const apiUrl = "https://localhost:5001/api/useraccount";

    const userAccount = sessionStorage.getItem("userAccount");
    const [ isLoggedIn, setIsLoggedIn ] = useState(userAccount != null);
    const [ warningProps, setWarningProps ] = useState({});
    const [ currentUserFollows, setCurrentUserFollows ] = useState([]);
    const [ usersFollowers, setUserFollowers ] = useState([]);
    const [ disableFollowButtons, setDisableFollowButtons ] = useState(false);

    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    useEffect(() => {
      firebase.auth().onAuthStateChanged((u) => {
        setIsFirebaseReady(true);
      });
    }, []);
  

    const login = (email, pw) => {
        // debugger
        return firebase.auth().signInWithEmailAndPassword(email, pw)
        .then((signInResponse) => getUserAccount(signInResponse.user.uid))
        .then((userAccount) => {
            sessionStorage.setItem("userAccount", JSON.stringify(userAccount))
            setWarningProps({hidden: true});
            setIsLoggedIn(true);
        });
    };

    const logout = () => {
        return firebase.auth().signOut()
        .then(() => {
            sessionStorage.clear();
            setIsLoggedIn(false);
            setWarningProps({hidden: true});
        })
    };

    const register = (userAccount, password) => {
        return firebase.auth().createUserWithEmailAndPassword(userAccount.email, password)
        // .then((r) => {
        //     r.user.updateProfile({
        //         DisplayName: userAccount.displayName
        //     })
        // })
        .then((createResponse) => saveUser({...userAccount, firebaseUserId: createResponse.user.uid}))
        .then((savedUserAccount) => {
            sessionStorage.setItem("userAccount", JSON.stringify(savedUserAccount))
            setIsLoggedIn(true);
            setWarningProps({hidden: true});
        })
    };

    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getUserAccount = (firebaseUserId) => {
        return getToken().then((token) =>         
        fetch(`https://localhost:5001/api/useraccount/${firebaseUserId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
        }).then(r => r.json()));
    };

    const saveUser = (userAccount) => {
        return getToken().then((token) => 
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(userAccount)
        }).then(resp => resp.json()));  
    };
    
    const AddUserFollow = (leadUser, followUser) => {
        // debugger
        return getToken().then((token) => 
        fetch(`${apiUrl}/fw?uId=${leadUser}&fId=${followUser}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }));  
    };
    
    const GetFollows = (leadUser, followBack) => {
        if(followBack){
            // debugger
            return getToken().then((token) => 
            fetch(`${apiUrl}/fw?uId=${leadUser}&fb=${followBack}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            .then((r) => r.json()))
            .then(setCurrentUserFollows)
        } else {
            // debugger
            return getToken().then((token) => 
            fetch(`${apiUrl}/fw?uId=${leadUser}&fb=${followBack}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            .then((r) => r.json()))
            .then(setUserFollowers)
        }
    };

    return (
        <UserAccountContext.Provider 
            value={{ 
                login, 
                logout, 
                isLoggedIn, 
                register, 
                getToken, 
                warningProps, 
                setWarningProps,
                AddUserFollow,
                GetFollows,
                usersFollowers,
                currentUserFollows,
                disableFollowButtons,
                setDisableFollowButtons
            }}>
            {isFirebaseReady ?
            props.children
            : <Progress
                color="grey"  
                colorVariant="light"
                max={75}
                size="large"
                value={null}
              />
            }
        </UserAccountContext.Provider>
    );
};