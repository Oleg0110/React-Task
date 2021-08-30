import { useRef } from "react";
import { useHistory } from "react-router";
import { Button } from "../../components"
// import { useClickOutside } from "../../hooks";
import styles from "./Sidebar.module.scss"



const Sidebar = ({ isOpened, children, onClickOutside }) => {

   const ref = useRef(null)
   // useClickOutside(ref, onClickOutside)
   const history = useHistory()

   return (<div className={`${styles.sidebar} ${isOpened && styles.opened}`} ref={ref}>
      {children}
      <Button onClick={() => history.push("/backlog")} buttonStyle="secondButtonStyle"><div className={`${styles.icon} ${styles["backlog-icon"]}`} alt="Back Log Icon" />Backlog</Button>
      <Button onClick={() => history.push("/reports")} buttonStyle="secondButtonStyle"><div className={`${styles.icon} ${styles["reports-icon"]}`} alt="Reports Icon" />Reports</Button>
      <Button onClick={() => history.push("/components")} buttonStyle="secondButtonStyle"><div className={`${styles.icon} ${styles["components-icon"]}`} alt="Components Icon" />Components</Button>
      <Button onClick={() => history.push("/releases")} buttonStyle="secondButtonStyle"><div className={`${styles.icon} ${styles["release-icon"]}`} alt="Release Icon" />Releases</Button>
      <Button onClick={() => history.push("/add-item")} buttonStyle="secondButtonStyle"><div className={`${styles.icon} ${styles["add-item-icon"]}`} alt="Add Item Icon" />Add item</Button>
   </div>
   );
}

export default Sidebar