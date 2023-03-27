import React from 'react'
import styles from "./MainNav.module.scss";

export namespace MainNav {
    export type Props = {}
}

function MainNav(props: MainNav.Props) {
    return (
        <div className={styles.mainNav}>MainNav</div>
    )
}

export default MainNav;