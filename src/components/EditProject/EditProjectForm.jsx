import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import "../../pages/HomePage/HomePage.css"

// function ProjectPage() {
//     const [projectData, setProjectData] = useState();
//     const { id } = useParams();

//     useEffect(() => {
//         fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
//         .then((results) => {
//         return results.json();
//         })
//         .then((data) => {
//             setProjectData(data);
//         });
//     }, [id]);


function EditProjectForm() {
    const [project, setProject] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
    .then((results) => {
        console.log("results",results);    
    return results.json();
    })
    
    .then((data) => {
        setProject(data);
        console.log("id-project",id.project);
        console.log("data",data);
    });
    console.log("prjonly", project);
    // console.log("prjid2", project.id);
  
    }, [id]);

    
    if (!project) {
        return <h3>Loading..</h3>;
    }
        


  // State
  const token = window.localStorage.getItem("token");


  const handleChange = (event) => {
    const { id, value } = event.target;
    setProject((prevProject) => ({
      ...prevProject,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}projects/${project.id}/`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          title: project.title,
          blurb: project.blurb,
          description: project.description,
          category_id: project.category_id,
          goal: project.goal,
          goal_date: project.goal_date,
          image: project.image,
          is_open: true,
          is_archived: false,
          pledge_type_id: project.pledge_type_id,


        }),
      });
      const data = await res.json();
      console.log(data);
      console.log(project);
      navigate(`/projects/${project.id}`);
    
    } catch (err) {
      console.log(err);
    }
  };

  if (!token || token===null || token===undefined || token==="undefined"){
    return (
      <div className="pleaselogin">
      <Link to="/login"><strong>Please login to edit to this project</strong></Link>
      </div>
    );
  }

  return ( 
    <form>
      <div>
        <label htmlFor="title">Project Title:</label>
        <input
          type="text"
          id="title"
          value={project.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={project.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="goal">Goal Amount:</label>
        <input
          type="text"
          id="goal"
          value={project.goal}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="url"
          id="image"
          value={project.image}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="is_open">Is Open:</label>
        <input
          type="checkbox"
          id="is_open"
          value={project.is_open}
          onChange={handleChange}
        />
      </div>
      {/* <div>
        <label htmlFor="date_created">Date Created:</label>
        <input
          type="date"
          id="date_created"
          value={project.date_created}
          onChange={handleChange}
        />
      </div> */}
      <div>
                <label htmlFor="category">Update Category:</label>
                <input
                    type="select"
                    id="category"
                    value={project.category}
                    onChange={handleChange}
                />
            </div>


      {/* <div>
        <label htmlFor="category">Category:</label>
        <select id="category" onChange={handleChange} value={project.category}>
            <option value="">--Please choose an option</option>
            <option value={1}>Miscellaneous</option>
            <option value={2}>Small Dogs</option>
            <option value={3}>Large Dogs</option>
            <option value={4}>Kittens</option>
            <option value={5}>Cats</option>
        </select>
      </div> */}
      
     
   
      
     
     
      <button type="submit" onClick={handleSubmit}>
        Update Project
      </button>
    </form>
  );
}

export default EditProjectForm;

   