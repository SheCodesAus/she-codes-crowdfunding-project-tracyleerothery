import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const [credentials, setCredentials] = useState({
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        password2: "",
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [id]: value,
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password && credentials.password2) {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}users/register/`,
                    {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(credentials),
                    }
                );
                const data = await response.json();
                window.localStorage.setItem("token", data.token);
                window.localStorage.setItem("username", credentials.username);
                navigate("/");
            } catch (err) {
                console.log(err);
            }
        }
    };


    return (
        <form>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter Username"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    placeholder="Enter your First Name"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    placeholder="Enter your Last Name"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password2">Repeat Password:</label>
                <input
                    type="password"
                    id="password2"
                    placeholder="Repeat Password"
                    onChange={handleChange}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Create Pets Account
            </button>
        </form>
    );
}

export default RegisterForm;