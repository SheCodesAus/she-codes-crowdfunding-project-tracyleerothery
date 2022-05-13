import React, { useState } from "react";

// Imports
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import '../../pages/forms.css';
import '../../pages/styles.css';

function PledgeForm(pledgeData) {
  // State
  const [pledge, postPledge] = useState(
    pledgeData.map
  );

  // // Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  // Actions and Helpers
  const handleChange = (event) => {
    const { id, value } = event.target;
    postPledge((PledgeData) => ({
      ...PledgeData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = window.localStorage.getItem("token")
    console.log("handleSubmit", pledge, token)
    
    // Is user logged in and have they put something in all fields?
    if (token && pledge.amount && pledge.comment) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}pledges/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({
              amount: parseInt(pledge.amount), 
              comment: pledge.comment, 
              anonymous: true, 
              project_id: parseInt(id)
            }),
          }
        );
        const data = await response.json();
        console.log(data)
        // THIS IS HOW YOU NAVIGATE AUTOMATICALLY
        navigate(`/projects/${id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

    return (
        <div className="form">
        <form className="login-form">
          <div className="form-item">
            <label htmlFor="amount">Amount:</label>
            <input className="form"
              type="text"
              id="amount"
              placeholder="$  "
              onChange={handleChange}
            />
          </div>

          <div className="form-item">
            <label htmlFor="comment">Comment:</label>
            <input
              type="text"
              id="comment"
              placeholder="Leave a Message to the Pet"
              onChange={handleChange}
            />
          </div>

          <div className="form-item">
          <button type="submit" onClick={handleSubmit}>
            Donate
          </button>
          </div>

        </form>
        </div>
      );
}

export default PledgeForm;