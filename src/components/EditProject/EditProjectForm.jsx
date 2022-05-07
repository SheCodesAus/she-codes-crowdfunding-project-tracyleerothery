import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

function ProjectForm() {

    //State
    const [project, setProject] = useState({
        title: "",
        description: "",
        goal: "",
        image:"",
        is_open: "",
        date_created:"",
        category:"",
        deadline:"",
    });
    const navigate = useNavigate();

    //Actions and Helpers 
    //saves and updates the state
    const handleChange = (event) => {
        const { id, value } = event.target;
        setProject((prevProject) => ({
            ...prevProject,
            [id]: value,
        }));
    };
    
    //check data exist and save to the backend
    const handleSubmit = async(event) => {
        event.preventDefault();
        const token = window.localStorage.getItem("token");
        if (!token)return;
        

        if (project.title && project.description && project.goal && project.image && project.category && project.date_created && project.deadline) {
            try {
                const res = await 
                fetch(`${process.env.REACT_APP_API_URL}projects/`, {
                    method:"post",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify({
                        title: project.title,
                        description: project.description,
                        goal: parseInt(project.goal),
                        image: project.image,
                        is_open: project.is_open === "on",
                        date_created: new Date(project.date_created).toISOString(),
                        deadline: new Date(project.deadline).toISOString(),
                        associaton: window.localStorage.getItem("username"),
                        category: project.category,
                    }),
                });
                const data = await res.json()
                console.log(data);

                navigate(`/project/${data.id}`);               
            }catch(err) {
                console.log(err);
            }
        }
        else {
            //user has not filled all fields
        }
    }

        //State
        const [categoryData, setCategoryData] = useState();
        const [formFields, setFormFields] = useState([]);

        //Actions and Helpers
        useEffect(() => {
            fetch(`${process.env.REACT_APP_API_URL}category/`)
                .then((results) => {
                    return results.json();
                })
                .then((data) => {
                    setCategoryData(data);

                    const fields = [
                        {
                            id: "title",
                            label: "Title",
                            placeholder: "Enter title",
                            type: "text",
                            options: [],
                        },
                        {
                            id: "description",
                            label: "Description",
                            placeholder: "Enter description",
                            type: "text",
                            options: [],
                        },
                        {
                            id: "goal",
                            label: "Goal",
                            placeholder: "Enter goal",
                            type: "text",
                            options: [],
                        },
                        {
                            id: "image",
                            label: "Image",
                            placeholder: "Enter image",
                            type: "url",
                            options: [],
                        },
                            {
                            id: "is_open",
                            label: "Is open",
                            placeholder: "Enter if project open",
                            type: "checkbox",
                            options: [],
                        },
                        {
                            id: "date_created",
                            label: "Date created",
                            placeholder: "Enter date",
                            type: "date",
                            options: [],
                        },
                        {
                            id: "category",
                            label: "Category",
                            placeholder: "Enter category",
                            type: "select",
                            options: data
                        },
                        {
                            id: "deadline",
                            label: "deadline",
                            placeholder: "Enter closing date",
                            type: "date",
                            options: [],
                        },
                    ]
                setFormFields(fields)
                });
        }, []);
    if (!window.localStorage.getItem("token")) {
        return(
            <Link to="/login"> Please login</Link>
        );
    }

    


    return ( 
        <form>
            {formFields.map((field, key) => {
                return (
                <div key={`${key}-${field.id}`}>
                    <label htmlFor={field.id}>
                        {field.label}
                    </label>
                    {field.type === "select" 
                        ? <select name={field.id} id={field.id} onChange={handleChange}>
                            {field.options.map((selectOption, key) =>  {
                                return(
                                <option key={`${key}-${selectOption.id}`} value={selectOption.slug}>{selectOption.name}</option>
                                )
                            })}
                        </select>
                        : <input
                            type={field.type}
                            id={field.id}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                            value={field.value}
                        />
                    }
                </div>
                )
            })}
            <button type="submit" onClick={handleSubmit}>
                Post Project
            </button>
        </form>
    )
}

export default ProjectForm;