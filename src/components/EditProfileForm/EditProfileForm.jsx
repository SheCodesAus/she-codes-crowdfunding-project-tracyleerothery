import React, { useState } from "react";

// Imports
import { useNavigate } from "react-router-dom";

function EditProfileForm({user}) {
  // State
  const [editUserData, setEditUserData] = useState({
  "username": "",
	"email": "",
	"avatar": "",
	"bio": "",
	"website": "",
  });

  // // Hooks
  const navigate = useNavigate();

  // Actions and Helpers
  const handleChange = (event) => {
    const { id, value } = event.target;
    setEditUserData((prevEditUserData) => ({
      ...prevEditUserData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = window.localStorage.getItem("token")
    console.log("handleSubmit", editUserData, token)
    
    // Is user logged in and have they put something in all fields.
    if (token && editUserData.username && editUserData.email && editUserData.avatar && editUserData.bio && editUserData.website) {
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
              username: editUserData.username, 
              email: editUserData.email,
              avatar: editUserData.avatar,
              bio: editUserData.bio,
              website: editUserData.website
            }),
          }
        );
        const data = await response.json();
        console.log(data)
        // navigate automatically
        navigate(`/users/${user}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const formFields = [
    {
        id: "username",
        label: "Username",
        placeholder: "Update Your Username",
        type: "text",
     },
    {
        id: "email",
        label: "Email",
        placeholder: "Update Your Email",
        type: "email",
    },
    {
        id: "avatar",
        label: "Avatar",
        placeholder: "Copy & Paste Image URL from Google Images",
        type: "url",
    },
    {
        id: "bio",
        label: "Bio",
        placeholder: "Why you want to help a Pal!?",
        type: "text",
    },
    {
        id: "website",
        label: "Website",
        placeholder: "Enter Social Media",
        type: "url",
    },
]

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
                Save Updates
            </button>
        </form>
    )
}

export default EditProfileForm;