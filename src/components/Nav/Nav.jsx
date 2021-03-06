// Imports
import React, { useState } from "react";
import { Button } from "./Button/Button";
import { Link, useNavigate } from "react-router-dom";

// Styles
import "./Nav.css";
import "../../components/Nav/Button/Button.css";

function Nav() {

    // Hamburger State
    const [isMenuExpanded, setMenuExpanded] = useState(false);

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/login/")
    }

    const handleSignOut = () => {
        // It is assumed that a token belongs to a user who is logged in
        // so to sign a user out we will remove these from local storage
        window.localStorage.removeItem("token");

        // Make sure we navigate back to login page
        navigateToLogin()
    }

    //check if user has token and change nav
    const checkUser = () => {
        // Get the user token. The !! ensure that the token "string" or undefined becomes true or false
        const isUserLoggedIn = !!window.localStorage.getItem("token");
        // console.log("isuserloggedin", isUserLoggedIn)

        const className = "navbar";

        const loginButton = <Button className={className} onClick={navigateToLogin}>Login</Button>;
        const signOutButton = <Button className={className} onClick={handleSignOut}>Sign Out</Button>

        // This is a ternary operation
        //      Conditon ? True : false
        // Example: we check is the user logged in (yes => show sign out) (no => show login)
        return isUserLoggedIn 
            ? signOutButton
            : loginButton
    }

    // Hamburger Handlers
    const handleClick = () => {
        setMenuExpanded(!isMenuExpanded)
    };

    return(
        <nav className="navbar1">
            
            <div className="navbar1" onClick={handleClick}>
            </div>

            <ul className={
                isMenuExpanded 
                ? 'nav-menu active' 
                : 'nav-menu'}>
                    <Link className="navbar" variantcolor="#fff" to="/">Home </Link>
                    <Link className="navbar" to="/projects/create">Support A Pal </Link>
                    <Link className="navbar" to="/register/">Register </Link>
                   
                    {checkUser()}
            </ul>
            
        
        </nav>
    )
};

export default Nav;