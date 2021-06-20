import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ComicContext } from "../providers/ComicProvider";
import Header from "./Header"

export default function ApplicationViews() {
    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Header />
                </Route>
            </Switch>
        </main>
    );
};