import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Imports
import { Link } from "react-router-dom";

// Styles
import "./ProfilePage.css";

function ProfilePage() {

    // State
    const [userData, setUserData] = useState();

    // Actions & Helpers
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}users/${id}`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            setUserData(data);
        })
    }, []);

    // Loading State
    if (!userData) {
        return <h3>Loading profile...</h3>;
    }

    return (
        <div className="profile-wrapper">
            <div className="photo-and-info">
                <h1>Welcome to {userData.username} Page!</h1>
                <img className="avatar" src={userData.avatar} alt="profile avatar"/>
                <ul>
                    <li>{userData.bio}</li>
                    <li>{userData.email}</li>
                    <li>{userData.website}</li>
                </ul>
            </div>


            <button><Link to="edit-profile">Edit Profile</Link></button>

        </div>
    );
}

export default ProfilePage;