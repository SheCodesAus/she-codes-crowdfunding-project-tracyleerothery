import React, { useState, useEffect } from "react";


// Compnents 
import {allProjects} from "../data";

// Data
import ProjectCard from "../components/ProjectCard/ProjectCard";



function HomePage() {
    // States
    const [projectList, setProjectList] = useState([]);

    //Actions & Helpers

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
        <div id="project-list">
            {projectList.map((projectData => {
                return<ProjectCard
                key={'project-$[projectData.id}'}
                projectData={projectData}
            />}))}
    </div>
    );
}

export default HomePage;

