import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { oneProject } from "../data";

function ProjectPage() {
  // State
  const [projectData, setProjectData] = useState();

  // Hooks
  const { id } = useParams();

  // Actions and Helpers
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectData(data);
      });
  }, []);

  // Loading State
if (!projectData) {
    return <h3>Loading project...</h3>;
}

  return (
    <div>
      <h2>{projectData.title}</h2>
      <h1>This is the project page.</h1>
      <h3>Created at: {projectData.date_created}</h3>
      <h3>{`Status: ${projectData.is_open}`}</h3>
      <h3>Pledges:</h3>
      <ul>
        {projectData.pledges.map((pledgeData, key) => {
          return (
            <li>
              {pledgeData.amount} from {pledgeData.supporter}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProjectPage;
