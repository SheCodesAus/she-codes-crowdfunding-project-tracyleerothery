import React, { useState } from "react";

// Imports
import { useNavigate, Link } from "react-router-dom";

function EditProfileForm({user}) {
  // State
    const [editUserInfo, setEditUserInfo] = useState({
    "username": "",
	"email": "",
	"bio": "",
	"image": "",
	"social": "",
    });

  // // Hooks
    const navigate = useNavigate();

  // Actions and Helpers
    const handleChange = (event) => {
        const { id, value } = event.target;
        setEditUserInfo((prevEditUserInfo) => ({
        ...prevEditUserInfo,
        [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = window.localStorage.getItem("token");
        if (!token)return;

    
    // Is user logged in and have they put something in all fields?
    if (editUserInfo.username && editUserInfo.email && editUserInfo.bio && editUserInfo.image && editUserInfo.social) {
        try {
            const response = await fetch(
            `${process.env.REACT_APP_API_URL}users/${user}`,
            {
                method: "put",
                headers: {
                "Content-Type": "application/json",
                'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({
                username: editUserInfo.username, 
                email: editUserInfo.email,
                bio: editUserInfo.bio,
                image: editUserInfo.image,
                social: editUserInfo.social,
                }),
            }
            );
            const data = await response.json();
            console.log(data)
            // THIS IS HOW YOU NAVIGATE AUTOMATICALLY
            navigate(`/`);
        } catch (err) {
            console.log(err);
        }
        }
    };

    const formFields = [
        {
            id: "username",
            label: "Username",
            placeholder: "Update your Username",
            type: "text",
        },
    {
        id: "email",
        label: "Email",
        placeholder: "Update your Email",
        type: "email",
    },
    {
        id: "bio",
        label: "Bio",
        placeholder: "Update your bio",
        type: "text",
    },
    {
        id: "image",
        label: "Profile Picture",
        placeholder: "Update the URL of your profile picture",
        type: "url",
    },
    {
        id: "social",
        label: "Social Media",
        placeholder: "Update the best URL to get in touch with you",
        type: "url",
    },    
]
if (!window.localStorage.getItem("token")) {
    return(
        <Link to="/login"> Please login</Link>
    );
}

    return ( 
        <form>
            {formFields.map((field, key) => {
                return (
                <div key={`${key}-${field.id}`}>
                    <label htmlFor={field.id}>
                        {field.label}
                    </label>
                    <input
                        type={field.type}
                        id={field.id}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                    />
                </div>
                )
            })}
            <button type="submit" onClick={handleSubmit}>
                Update Now
            </button>
        </form>
    )
}

export default EditProfileForm;