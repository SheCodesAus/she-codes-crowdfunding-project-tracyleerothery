import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../pages/HomePage/HomePage.css"

// Imports
import { Link } from "react-router-dom";

// Components


function UserPage() {
    // State
    const [userData, setUserData] = useState();

    // Hooks
    const { id } = useParams();

    // Actions & Helpers
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}users/${id}`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            setUserData(data);
        })
    }, [id]);


    // Loading State
    if (!userData) {
        return <h3 className="pleaselogin">Loading profile...</h3>;

    }

    // Normal State
    return (
        <div className="user-profile-container">
            <div className="profile-header">
                <h1 id="prof-header-text">Welcome to <span>{userData.username}'s</span> User Page!</h1>
            </div>

            <div className="user-profile-info">
                <ul className="user-input">
                    <li><img className="avatar" src={userData.avatar} alt="profile avatar"/></li>
                    <li id="email"><i class="fa fa-envelope"></i> {userData.email}</li>
                    <li id="website">Follow Me:<br></br>
                        <a href={userData.website} target="" rel="">
                            <i class=""></i>
                        </a>                
                    </li>
                </ul>

                <div className="bio-section">
                    <h4 id="about-title">About: </h4>
                    <p id="bio-section">{userData.bio}</p>
                </div>
            </div>

            
           

            <div className="edit-button-div">
                <button className="edit-profile-button"><Link to="edit-profile">Edit Profile</Link></button>
            </div>
  

        </div>
    );
}

export default UserPage;