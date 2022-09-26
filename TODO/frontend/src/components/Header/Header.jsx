import React from "react";
import {menu} from "./menu.js";

import styles from "./Header.module.scss"

const Header = () => {
    return <div className={styles.header}>
        <div className={styles.wrapper}>
            <ul className={styles.menu}>
                {menu.map((item, idx) => (
                    <li key={`menu item ${idx}`}>
                        <a href={item.link}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    </div>
}

export default Header