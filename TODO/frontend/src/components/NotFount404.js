import {useLocation} from "react-router-dom";
import React from "react";

const NotFount404 = () => {

    let {pathname} = useLocation()
    return (
        <div>
            <h1>Page not found {pathname}</h1>
        </div>
    )
}

export default NotFount404;

