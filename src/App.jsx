import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  SignOutButton,
} from "@clerk/clerk-react";

import TMDB from "./components/test/TMDB";
import Books from "./components/test/Books";
import Movies from "./components/test/Movies";
import Header from "./components/layout/Header/Header";
import Functionality from "./components/test/Functionality";
import { Button } from "./components/ui/button";
import TopAiring from "./components/layout/Top-Airing/TopAiring";
// import Player from "./components/layout/Player/Player";
import Episodes from "./components/layout/Episodes/Episodes";
import Player from "./components/layout/Player/Player";
import SearchResult from "./components/layout/SearchResult/SearchResult";

const App = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className="text-3xl">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TopAiring />
            </>
          }
        />
        {/* <Route path="/header" element={<Header />} /> */}
        <Route path="/func" element={<Functionality />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/meta" element={<TMDB />}></Route>
        <Route path="/search/:animeName" element={<SearchResult />} />
        <Route path="/anime/:animeId" element={<Episodes />} />
        <Route path="/anime/:animeId/:episodeId" element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
