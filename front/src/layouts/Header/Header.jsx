import { Button } from "../../components"
import styles from "./Header.module.scss"
import userPhoto from "../../assets/img/me.png"
import { Link, useHistory } from "react-router-dom"



const Header = ({ onClick, openUserForm }) => {

   const history = useHistory()

   return (<header className={styles.mainHeaderStyle}>
      <Button onClick={onClick}><div className={`${styles["open-sidebar-icon"]}`} alt="Open Sidebar Icon" />
      </Button>
      <div className={styles.linkHeaderButton}>
         <Button onClick={() => history.push("/")} buttonStyle="mainButtonStyle">Home</Button>
         <Button onClick={() => history.push("/projects")} buttonStyle="mainButtonStyle" >Projects</Button>
         <Button onClick={() => history.push("/dashboards")} buttonStyle="mainButtonStyle">Dashboards</Button >
         <Button onClick={() => history.push("/people")} buttonStyle="mainButtonStyle" >People</Button>
         <Button onClick={() => history.push("/settings")} buttonStyle="mainButtonStyle" >Settings</Button>
         <Button onClick={() => history.push("create")} buttonStyle="fifthButtonStyle">Create</Button>

      </div >
      <div className={styles.searchHeader}>
         <div className={styles.searchHeaderInput}>
            <input type="text" placeholder="Search" className={styles.searchInput} />
            <div className={styles.searchIcon} alt="Search Icon" />
         </div>
         <Button><div className={`${styles.icon} ${styles["bell-icon"]}`} alt="Bell Icon" /></Button>
         <Button><div className={`${styles.icon} ${styles["question-icon"]}`} alt="Question Icon" /></Button>
         <Button><div className={`${styles.icon} ${styles["setting-icon"]}`} alt="Setting Icon" /></Button>
         <Button onClick={openUserForm}><img src={userPhoto} className={styles.userPhoto} alt="User Photo" /></Button>
      </div>

   </header >
   );

}


export default Header