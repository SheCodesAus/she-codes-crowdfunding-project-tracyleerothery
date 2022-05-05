import React, { useState, useEffect } from "react";

// Components
import ProjectCard from "../../components/ProjectCard/ProjectCard";

// Styles
import './HomePage.css';

// Imports
import { Link } from "react-router-dom";

function HomePage() {

    // States
    const [projectList, setProjectList] = useState([]);

    // Action & Helpers
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects`)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                setProjectList(data);
            });
    }, []);

    return (
        <div className="homepage-wrapper">
          


        <div id="welcome-text">    
          
    <div className="hero-image">
    <div className="hero-text">
      <h1>All Pets</h1><p>
                    <button><Link to="/projects/create/">POST NEW PROJECT</Link></button>
                </p>
      <p>Helping every good boy and girl find a new home. Like Neopets but you get to help real animlas.</p>
    </div>
</div> 
                

            </div>
            

            <div id="project-list">
                {projectList.map((projectData, key) => {
                    return <ProjectCard 
                        key={`project-${projectData.id}`} 
                        projectData={projectData}
                    />;
                })}
            </div>
                
                <br></br>
            <div>
                More to come...
            </div>

        </div>
    );
}

export default HomePage;