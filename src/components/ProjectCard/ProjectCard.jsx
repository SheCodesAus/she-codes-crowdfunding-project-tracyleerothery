import React from "react";
import { Link } from "react-router-dom";

//styles
import "./ProjectCard.css";

function ProjectCard(props) {const { projectData } = props;
    return (
    <div className="project-card">
        <Link to={'/project/${projectData.is}'}>
            <img src={projectData.image}/>
            <h3>{projectData.title}</h3>
        </Link>
    </div>
);
}

export default ProjectCard;