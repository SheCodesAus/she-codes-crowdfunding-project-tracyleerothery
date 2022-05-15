import React, { useState, useEffect } from "react";

function PledgeUser({amount, supporter, comment}) {
    // State
    const [supporterData, setSupporterData] = useState();

    // Actions & Helpers
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}users/${supporter}`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            setSupporterData(data);
        });
    }, [supporter]);

 if (!supporterData) {
     return null
 }

    // Normal State
    return (
            <p id="pledges-and-comments">
                ${amount} Support from {supporterData.username} <br></br>
                <br></br> Message to Pal from {supporterData.username}: "{comment}"
            </p>
                
    );
}

export default PledgeUser;