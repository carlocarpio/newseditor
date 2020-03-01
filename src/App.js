import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// component
import NewsList from "./screens/NewsList"
import NewsEditorUpdate from "./screens/NewsEditorUpdate"
import NewsEditorCreate from "./screens/NewsEditorCreate"
import NewsFroala from "./screens/NewsFroala"

export default function App () {
  return (
    <Router>
        <Switch>
        <Route exact path="/" component={() => <NewsList />} />
        <Route exact path="/news-editor/:url" component={() => <NewsEditorUpdate />} />
        <Route exact path="/news-editor" component={() => <NewsEditorCreate />} />
        <Route exact path="/test" component={() => <NewsFroala />} />
        </Switch>
    </Router>
  );
}
