import {useLocation} from "react-router-dom";
import React from "react";

const NotFount404 = () => {

    let {pathname} = useLocation()
    return (
        <div>
            <h1>Страница по адресу "{pathname}" не найдена</h1>
        </div>
    )
}

export default NotFount404;

