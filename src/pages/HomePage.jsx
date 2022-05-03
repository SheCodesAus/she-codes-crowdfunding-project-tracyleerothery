import React, { useEffect, useState } from "react";

// Components
import ProjectCard from "../components/ProjectCard/ProjectCard";

function HomePage() {
  // State
  const [projectList, setProjectList] = useState();

  // Actions
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectList(data);
      });
  }, []);

  if (!projectList) return <p>Loading projects...</p>;

  return (
    <div id="project-list">
      {projectList.map((projectData) => {
        return <ProjectCard key={projectData.id} {...{ projectData }} />;
      })}
    </div>
  );
}
export default HomePage;