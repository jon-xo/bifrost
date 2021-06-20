import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ComicContext } from "../providers/ComicProvider";

export default function ApplicationViews() {
    return (
        <main>
            <Switch>
                <Route exact path="/">
                </Route>
            </Switch>
        </main>
    );
};