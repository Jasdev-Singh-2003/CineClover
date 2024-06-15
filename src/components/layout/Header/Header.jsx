import React, { useState, useEffect, useRef } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import "./Header.css";
import logo from "../../../assets/Clover_symbol.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animeName, setAnimeName] = useState("");
  const inpRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    const name = inpRef.current.value;
    setAnimeName(name);
    navigateToSearch(name);
  };

  const navigateToSearch = (name) => {
    // Perform your navigation logic here, for example:
    window.location.href = `/search/${name}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="lg:min-h-24 md:min-h-14 sm:min-h-14 bg-white border-b border-borderColor sticky top-0 flex items-center justify-center px-12">
        <div className="flex items-center justify-between h-full w-full">
          <Link to="/">
            <div className="logo flex justify-center items-center cursor-pointer">
              <img src={logo} className="lg:w-8 md:w-8 w-5" alt="Logo" />
              <span className="lg:text-[32px] text-primary font-normal pl-1 lg:block md:text-[32px] text-[24px]">
                CineClover
              </span>
            </div>
          </Link>
          <div className="flex justify-end items-center">
            <input
              type="search"
              placeholder="Search"
              ref={inpRef}
              id=""
              className="px-2 py-1 border border-primary1 rounded outline-0 mr-2"
              onKeyPress={handleKeyPress} // Call handleKeyPress on key press
            />
            <Button
              className="px-6 py-6 mr-2 flex items-center justify-center"
              onClick={handleSearch}
            >
              Search
            </Button>
            <div className="signIn flex justify-center items-center">
              {isLoading ? (
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary1 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                ></div>
              ) : (
                <SignedOut>
                  <SignInButton
                    mode="modal"
                    className="bg-secondary1 px-6 py-1 border rounded border-primary1 text-[16px] text-primary1 font-medium cursor-pointer btn_signin"
                  >
                    <span>Sign In</span>
                  </SignInButton>
                </SignedOut>
              )}
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
