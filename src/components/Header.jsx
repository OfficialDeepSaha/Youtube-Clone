import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import profileImage from "../images/profile.jpg";
import { MdKeyboardVoice } from "react-icons/md";
import { Context } from "../context/contextApi";
import Loader from "../shared/loader";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { loading, mobileMenu, setMobileMenu } = useContext(Context);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

  const searchQueryHandler = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setShowSuggestions(true);

    try {
      const res = await axios.get(
        "https://youtube138.p.rapidapi.com/auto-complete/",
        {
          params: {
            q: query,
            hl: "en",
            gl: "US",
          },
          headers: {
            "X-RapidAPI-Key":
              "c1abec98a7msha3e8c04fad53919p146addjsn1c70735966b8",
            "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
          },
        }
      );
      setSearchResults(res.data);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      setSearchResults({});
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/searchResult/${suggestion}`);
  };

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black">
      {/* {loading && <Loader />} */}

      <div className="flex h-5 items-center">
        {pageName !== "video" && (
          <div
            className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
            onClick={mobileMenuToggle}
          >
            {mobileMenu ? (
              <CgClose className="text-white text-xl" />
            ) : (
              <SlMenu className="text-white text-xl" />
            )}
          </div>
        )}
        <Link to="/" className="flex h-5 items-center">
          <img
            className="h-full hidden dark:md:block"
            src={ytLogo}
            alt="Youtube"
          />
          <img className="h-full md:hidden" src={ytLogoMobile} alt="Youtube" />
        </Link>
      </div>
      <div className="group flex items-center relative">
        <div
          className={`flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl ${
            showSuggestions
              ? "group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0"
              : ""
          }`}
        >
          <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
            <IoIosSearch className="text-white text-xl" />
          </div>
          <input
            type="text"
            className={`bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px] ${
              showSuggestions ? "md:w-[500px] lg:w-[700px]" : ""
            }`}
            onChange={searchQueryHandler}
            placeholder="Search"
            value={searchQuery}
          />
        </div>
{showSuggestions && searchResults.results && (
  <ul
    className="absolute top-full left-5 bg-white border border-gray-200 dark:border-gray-700 rounded-b-lg rounded shadow-lg mt-1"
    style={{ width: "743px", backgroundColor: "#0f0f0f" }}
  >
    {searchResults.results.slice(0, 10).map((result, id) => (
      <li
        key={id}
        className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => handleSuggestionClick(result)}
        style={{ color: "white", fontWeight: "600",  }}
      >
        <div className="flex items-center">
          <IoIosSearch className="text-white text-lg mr-2" />
          {result}
        </div>
        {/* Add any other content here if needed */}
      </li>
    ))}
  </ul>
)}
        <div className="flex gap-4">
          <button
            className=" w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
            onClick={() => handleSuggestionClick(searchQuery)}
          >
            <IoIosSearch className="text-white text-xl" size={25} />
          </button>
          <button className="flex items-center justify-center border  border-[#303030] rounded-full bg-white/[0.1] w-[40px] md:w-[40px] h-8 md:h-10">
            <MdKeyboardVoice className="text-white text-xl" size={24} />
          </button>{" "}
        </div>
      </div>
      <div className="flex items-center">
        <div className="hidden md:flex">
          <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <RiVideoAddLine className="text-white text-xl cursor-pointer" />
          </div>
          <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <FiBell className="text-white text-xl cursor-pointer" />
            <div
              className="absolute top-2 bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              style={{ right: "68px" }}
            >
              7+
            </div>
          </div>
        </div>
        <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
          <img src={profileImage} alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default Header;
