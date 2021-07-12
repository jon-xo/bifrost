import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Columns, Container } from "react-bulma-components";
import { ComicContext } from "../providers/ComicProvider.js";
import CurrentComicsList from "./Releases/CurrentComicsList";
import UpcomingComicsList from "./Releases/UpcomingComicsList";
import PastComicsList from "./Releases/PastComicList";
import FoundIssuesList from "./Search/FoundIssuesList";
import FoundVolumesList from "./Search/FoundVolumesList";
import ReadingList from "./Reading/ReadingList";
import ActivityList from "./Activity/ActivityList";
import Home from "./Home/Home";
import Header from "./Header"
import { UserAccountContext } from "../providers/UserAccountProvider.js";
import FollowList from "./Follows/FollowList.js";

export default function ApplicationViews() {

    const { isLoading } = useContext(ComicContext);
    const { isLoggedIn } = useContext(UserAccountContext);
    
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
                    {isLoggedIn ? 
                        <>
                        <Header />
                        <ReadingList />
                        </>
                    :
                        <Redirect to="/" />
                    }
                </Route>
                <Route exact path="/activity">
                    {isLoggedIn ? 
                    <>
                        <Header />
                        <ActivityList />
                    </>
                    :
                        <Redirect to="/" />
                    }
                </Route>
                <Route exact path="/follows">
                    {isLoggedIn ? 
                    <>
                        <Header />
                        <FollowList />
                    </>
                    :
                        <Redirect to="/" />
                    }
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