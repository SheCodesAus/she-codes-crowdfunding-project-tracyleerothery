import React, { useState, useEffect } from "react";

// Components
import ProjectCard from "../../components/ProjectCard/ProjectCard";

// Styles
import './HomePage.css';

// Imports
import { Link } from "react-router-dom";


//images
import Palslogo from "../../pages/HomePage/images/logo.png"

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
        
        <div className="homepage-wrapper"><div>
        <Link to="/"><img className="Palslogo-image" src={Palslogo}/></Link>
    </div>
          


        <div id="welcome-text">    
          
    <div className="hero-image">
    <div className="hero-text">
      <h1>All Pals</h1>
                    <p>
                    <button><Link to="/projects/create/">SUPPORT A PAL</Link></button>
                    </p>
                    
      <p>Helping every Pal get ready for a new home.</p> 
      
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