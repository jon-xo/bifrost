import React from "react";
import { Switch, Route } from "react-router-dom";
// import { UserAccountContext } from "../providers/UserAccountProvider";
import CurrentComicsList from "./CurrentComicsList";
import UpcomingComicsList from "./UpcomingComicsList";
import PastComicsList from "./PastComicList";
import FoundIssuesList from "./Search/FoundIssuesList";
import Home from "./Home/Home";
import Header from "./Header"

export default function ApplicationViews() {
    return (
        <>
        <main>
            <Switch>
                <Route exact path="/">
                    <Header />
                    <Home />
                </Route>
                <Route exact path="/current-comics">
                    <Header />
                    <CurrentComicsList />
                </Route>
                <Route exact path="/upcoming-comics">
                    <Header />
                    <UpcomingComicsList />                 
                </Route>
                <Route exact path="/previous-comics">
                    <Header />
                    <PastComicsList />
                </Route>
                <Route exact path="/search/issues">
                    <Header />
                    <FoundIssuesList />
                </Route>
            </Switch>
        </main>
        </>
    );
};