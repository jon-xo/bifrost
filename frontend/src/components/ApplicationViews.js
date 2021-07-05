import React from "react";
import { Switch, Route } from "react-router-dom";
import { Columns, Container } from "react-bulma-components";
// import { UserAccountContext } from "../providers/UserAccountProvider";
import CurrentComicsList from "./Releases/CurrentComicsList";
import UpcomingComicsList from "./Releases/UpcomingComicsList";
import PastComicsList from "./Releases/PastComicList";
import FoundIssuesList from "./Search/FoundIssuesList";
import FoundVolumesList from "./Search/FoundVolumesList";
import ReadingList from "./Reading/ReadingList";
import Home from "./Home/Home";
import Header from "./Header"

export default function ApplicationViews() {
    return (
        <>
        <main>
            <Switch>
                <Route exact path="/">
                    <Header />
                    <Columns className={"view-column--container"}>
                        <Home />
                    </Columns>
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
                <Route exact path="/reading">
                    <Header />
                    <ReadingList />
                </Route>
                <Route exact path="/follows">
                    <Header />
                </Route>
                <Route exact path="/search/issues">
                    <Header />
                    <FoundIssuesList />
                </Route>
                <Route exact path="/search/volumes">
                    <Header />
                    <FoundVolumesList />
                </Route>
            </Switch>
        </main>
        </>
    );
};