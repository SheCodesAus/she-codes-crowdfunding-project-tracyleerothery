import React from "react";

import { Link } from "react-router-dom";

function Nav() {
    return (<nav><Link to="/">HomePage</Link>
    <Link to="/projects/">ProjectPage</Link>
    <Link to="/login">Login</Link>
    </nav>);}

export default Nav;