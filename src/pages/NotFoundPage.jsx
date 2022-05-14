import React from "react";
import { Link } from "react-router-dom";

//styles
import "./styles.css"

//images
import ErrorImage from "../../src/images/error_404.png"


function NotFoundPage(){

    return (
        <div className="error-section">
            <Link to="/"><img className="error-image" src={ErrorImage}/></Link>
        </div>

    );
}

export default NotFoundPage;
