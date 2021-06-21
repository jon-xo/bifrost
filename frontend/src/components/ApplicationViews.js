import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import CurrentComicsList from "./CurrentComicsList";
import UpcomingComicsList from "./UpcomingComicsList";
import Header from "./Header"

export default function ApplicationViews() {
    return (
        <>
        <main>
            <Switch>
                <Route exact path="/">
                    <Header />
                </Route>
                <Route exact path="/current-comics">
                    <Header />
                    <CurrentComicsList />
                </Route>
                <Route exact path="/upcoming-comics">
                    <Header />
                    <UpcomingComicsList />                 
                </Route>
                <Route exact path="/past-comics">
                    <Header />
                </Route>
            </Switch>
        </main>
        </>
    );
};