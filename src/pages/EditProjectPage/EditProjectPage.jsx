import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//components
import EditProjectForm from "../../components/EditProject/EditProjectForm";

function EditProjectPage(){
    // State
    const [projectInfo, setProjectInfo] = useState();

    //Hooks
    const { id } = useParams();

    console.log("loading edit page")

    
    // network in use effect
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
        setProjectInfo(data);
        });
    }, []);

    if (!projectInfo) {
        return <h1>Loading...</h1>
    }


    return <EditProjectForm project={projectInfo} />;
}

export default EditProjectPage;