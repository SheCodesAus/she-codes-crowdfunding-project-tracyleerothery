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
import Palslogo from "../../pages/HomePage/images/logo.png"

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
    
        <div className="homepage-wrapper"><div>
        <Link to="/"><img className="Palslogo-image" src={Palslogo}/></Link>
    </div>
    
    <div className="project-wrapper">
        <div id="project-title-and-owner">
            <h3>{projectData.title}</h3> 
            <h6>Created by: <br></br>
            <ProjectOwner owner={projectData.owner} /> 
            <br></br> Date Created:<br></br>
             {projectData.date_created} </h6>
            
        </div>
        
        <div className="project-details">
                <img className="project-img" src={projectData.image} alt="project img"/>
                <p className="projectinfo">Every animal on this site is waiting to be someone’s Pal and every Pal deserves a home. All of our Pals are waiting at rescues and shelters, where they just need a little extra help from you before they can be placed up for adoption. </p>
                <ul>
                    <div className="yellowtext">
                    <p>{projectData.description}</p></div>
                    <p>Type of Pal: {projectData.category}</p>
                    <p>Donation Goal: ${projectData.goal}</p>
                </ul>
        </div>
        
        <div className="pledges-amounts-comments">
            <p className="donate">Donations:</p>
            <p className="plain-text">Below is the money received so far to get this pal ready to be put up for adoption. </p>
            
            <ul className="bulletpoint-text">
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