import React, { useContext, useEffect } from "react";

import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CategoryList from "./CategoryList";


const Feed = ({ setProgress }) => {
  const { loading, searchResults } = useContext(Context);

  useEffect(() => {
    setProgress(30);
    setProgress(40);
    setProgress(50);
    setProgress(60);
    setProgress(70);
    setProgress(80);
    setProgress(87);
    setProgress(95);
    document.getElementById("root").classList.remove("custom-h");
    setProgress(100);
  }, []);

  return (
    
     <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="flex flex-row h-[calc(100%-56px)]">
        <LeftNav setProgress={setProgress} />
        <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
            {loading
              ? // Render skeleton loading for the entire grid area
                Array.from({ length: 38 }).map((_, index) => (
                  <div key={index}>
                    <div>
                      <div>
                        <Skeleton height={160} />
                      </div>
                     
                        <Skeleton height={35} width={35} circle={true} />
                        <Skeleton width={310}  style={{ top: -30, right: -40 }}/>
                        <Skeleton  width={240} style={{top: -20 , right: -40}}/>
                        
                      
                    </div>
                  </div>
                ))
              : // Render actual video cards when data is loaded
                searchResults.map((item) => {
                  if (item.type !== "video") return null;
                  return (
                    <VideoCard key={item?.video?.videoId} video={item?.video} />
                  );
                })}
          </div>
        </div>
      </div>
    </SkeletonTheme>
    
    
  );
};

export default Feed;
