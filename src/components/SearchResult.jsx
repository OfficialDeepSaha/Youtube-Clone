import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = ({ setProgress }) => {
  const [result, setResult] = useState();
  const { searchQuery } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
    setProgress(70);
    setProgress(100);
  }, [searchQuery]);

  const fetchSearchResults = () => {
    setLoading(true);
    setProgress(30);
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      console.log(res);
      setResult(res?.contents);
      setProgress(100);

      setLoading(false);
      setProgress(false);
    });
  };

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="flex flex-row h-[calc(100%-56px)]">
        <LeftNav />
        <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
          <div className="grid grid-cols-1 gap-3 p-5">
            {result
              ? result?.map((item) => {
                  if (item?.type !== "video") return false;
                  let video = item.video;
                  return (
                    <SearchResultVideoCard key={video.videoId} video={video} />
                  );
                })
              : Array.from({ length: 38 }).map((_, index) => (
                  <div key={index} >
                    <div>
                      <div>
                        <Skeleton height={160} width={340} />
                      </div>
                      <Skeleton
                        width={710}
                        height={30}
                        style={{ top: -145, right: -400 }}
                      />

                      <Skeleton height={20}
                        width={380}
                       
                        style={{ top: -135, right: -400 }} />

                      <Skeleton
                        height={35}
                        width={35}
                        circle={true}
                        style={{ top: -130, right: -400 }}
                      />

                      <Skeleton width={240} height={18} style={{ top: -162, right: -450 }} />
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SearchResult;
