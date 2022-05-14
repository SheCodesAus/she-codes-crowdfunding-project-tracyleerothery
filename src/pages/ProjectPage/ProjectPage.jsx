import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Styles
import "./ProjectPage.css";

// Imports
import { Link } from "react-router-dom";

// Components
import ProjectOwner from "../../components/ProjectOwner/ProjectOwner";
import PledgeUser from "../../components/Pledge/PledgeUser"

// const handleSubmit = async (event) => {"/project/:id/edit"}

function ProjectPage() {
    // State
    const [projectData, setProjectData] = useState();
    const [isError] = useState(false);

    // Hooks
    const { id } = useParams();
    
    // Actions & Helpers
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
          .then((results) => {
            return results.json();
          })
          .then((data) => {
            setProjectData(data);
          });
      }, [id]);


    // Loading State
    // "Skeleton" Loading
    if (!projectData) {
        return <h3>Loading project Page...</h3>;
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
                </ul>
        </div>
        <div className="pledges-amounts-comments">
            <h3>Donations:</h3>
            <ul>
            {projectData.pledges.map((pledgeData, key) => {
                return (
                    <PledgeUser 
                        key={`pledge-${pledgeData.id}`} 
                        amount={pledgeData.amount} 
                        supporter={pledgeData.supporter} 
                        comment={pledgeData.comment} 
                    />
                );
            })}
            </ul>
        </div>

        {/* <div  className="pledge-list">
                    {projectData.pledges.map((pledgeData, key) => 
                    {return (
                    <h4 className="pledges" key={`pledge-${pledgeData.id}`} >
                        ${pledgeData.amount} 
                    </h4>
                    );
                })
                }
                </div> */}

        <div>
            <Link to={`/pledges/${id}`} className="navbar" >Help a pet here!</Link>
            <Link to={`/project/${projectData.id}/edit/`} className="navbar"> Edit Project</Link>
        
        </div>
    </div>
    
    );
}

export default ProjectPage;