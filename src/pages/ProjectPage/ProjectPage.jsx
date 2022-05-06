import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Styles
import "./ProjectPage.css";

// Imports
import { Link } from "react-router-dom";

// Components
import ProjectOwner from "../../components/ProjectPageComponents/ProjectOwner/ProjectOwner";

function ProjectPage() {
    // State
    const [projectData, setProjectData] = useState();
    const [projectPledgeAmount, setProjectPledgeAmount] = useState();
    const [projectGoalPercentage, setGoalPercentage] = useState();
    const [isError, setIsError] = useState(false);

    // Hooks
    const { id } = useParams();
    
    // Actions & Helpers
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            console.log(data)

            if (data.detail === 'Not found.') {
                setIsError(true)
            } else {
                setProjectData(data);
            
                const totalPledges = data.pledges
                    // eslint-disable-next-line eqeqeq
                    .filter (pledge => pledge.project_id == id)
                    // reducing your list to an output value
                    .reduce ((sum, pledge) => sum + pledge.amount, 0)
                setProjectPledgeAmount(totalPledges);
                
                const goalPercentage = ((totalPledges / data.goal) * 100).toFixed(2)
                setGoalPercentage(goalPercentage);
            }
        })
    }, [id]);

    // Loading State
    // "Skeleton" Loading
    if (!projectData) {
        return <h3>Loading project...</h3>;
    }

    if (isError) {
        return <h3>Project Doesn't Exist...</h3>;
    }

    // Normal State
    return (
    <div className="project-wrapper">
        <div id="project-title-and-owner">
            <h2>{projectData.title}</h2> 
            <h3>Created by: <ProjectOwner owner={projectData.owner} /> on {projectData.date_created}</h3>
        </div>
        
        <div className="project-details">
                <img className="project-img" src={projectData.image} alt="project img"/>
                <ul>
                    <li>{projectData.description}</li>
                    <li>Category: {projectData.category}</li>
                    <li>Donation Goal: ${projectData.goal}</li>
                    <li>Closing Date: {projectData.closing_date}</li>
                </ul>
        </div>
>

        <div>
            <button><Link to={`/pledges/${id}`}>Help a pet here!</Link></button>
        </div>

        
    </div>
    );
}

export default ProjectPage;

// NOTES:

//  CHECK IF THAT ITEM IS IN LOCAL STORAGE
//  IF IT IS - THEN LET THEM PLEDGE
//  IF IT'S NOT IN THE LOCAL STORAGE, THEN LINK TO GO BACK TO THE LOGIN/SIGN UP