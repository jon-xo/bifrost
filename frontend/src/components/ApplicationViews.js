import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import CurrentComicsList from "./CurrentComicsList";
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
            </Switch>
        </main>
        </>
    );
};