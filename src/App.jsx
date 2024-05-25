import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";
import { AppContext } from "./context/contextApi";
import LoadingBar from "react-top-loading-bar";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <AppContext>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <BrowserRouter>
        <div className="flex flex-col h-full">
          <Header />
          <LoadingBar color="#f11946" height= "3.5px" progress={progress} onLoaderFinished={() => setProgress(0)} />
           
          <Routes>
            <Route path="/" exact element={<Feed setProgress= {setProgress} />} />
            <Route
              path="/searchResult/:searchQuery"
              element={<SearchResult setProgress={setProgress} />}
            />
            <Route
              path="/video/:id"
              element={<VideoDetails setProgress={setProgress} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      </SkeletonTheme>
    </AppContext>
  );
};

export default App;