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
        
        <div id="welcome-text">    
          
    <div className="hero-image">
    <div className="hero-text">
      <h1>All Pals</h1>
                    <p>
                    <button className="cta"><Link  to="/projects/create/">SUPPORT A PAL</Link></button>
                    </p>
                    
      <h4>Helping every Pal get ready for a new home.</h4> 
      
    </div>

    
</div> 
<div className="homepage-wrapper"><div>
        <Link to="/"><img className="Palslogo-image" src={Palslogo}/></Link>
    </div>

    <div className="aboutus">
    <p>Every animal on this site is waiting to be someone’s Pal and every Pal deserves a home. </p>
    <p>Founded by Tracy Rothery in 2022, All Pals hopes to prepare loving animals for their future fur families.</p>
        All of our pals are currently waiting to be adopted at rescue centres and shelters in Perth, Western Australia. We understand that these animals need a little extra care to transition smoothly into their new lives.<p/>
    <p>They need a little help from you to give them the best chance at adoption.</p>
    <p>Support a pal today and register now.</p>
    </div>
            
            
          
            <div id="project-list">
                {projectList.map((projectData, key) => {
                    return <ProjectCard 
                        key={`project-${projectData.id}`} 
                        projectData={projectData}
                    />;
                })}
            </div>
        
                
   
            <div>
                More to come...
            </div>

        </div>
        </div>
    );
}

export default HomePage;