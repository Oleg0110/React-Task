import styles from "./Sidebar.module.scss"
import { useRef } from "react";
import { useHistory } from "react-router";
import { Button } from "../../components"
import { useClickOutside } from "../../hooks";


const Sidebar = ({ isOpened, children, onClickOutside, onClick }) => {

   const ref = useRef(null)
   useClickOutside(ref, onClickOutside)
   const history = useHistory()

   return (
      <div className={`${styles.sidebar} ${isOpened && styles.opened}`} ref={ref}>
         <div onClick={onClick}>
            {children}
            <Button onClick={() => history.push("/backlog")} buttonStyle="sidebarButtonStyle"><div className={`${styles.icon} ${styles["backlog-icon"]}`} alt="Back Log Icon" />Backlog</Button>
            <Button onClick={() => history.push("/reports")} buttonStyle="sidebarButtonStyle"><div className={`${styles.icon} ${styles["reports-icon"]}`} alt="Reports Icon" />Reports</Button>
            <Button onClick={() => history.push("/components")} buttonStyle="sidebarButtonStyle"><div className={`${styles.icon} ${styles["components-icon"]}`} alt="Components Icon" />Components</Button>
            <Button onClick={() => history.push("/releases")} buttonStyle="sidebarButtonStyle"><div className={`${styles.icon} ${styles["release-icon"]}`} alt="Release Icon" />Releases</Button>
            <Button onClick={() => history.push("/add-item")} buttonStyle="sidebarButtonStyle"><div className={`${styles.icon} ${styles["add-item-icon"]}`} alt="Add Item Icon" />Add item</Button>
         </div>
      </div>
   );
}

export default Sidebar