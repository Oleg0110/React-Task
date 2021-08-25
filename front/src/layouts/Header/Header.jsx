import { Button } from "../../components"
import styles from "./Header.module.scss"
import userPhoto from "../../assets/img/me.png"
import useMediaQuery from "../../hooks/useMedia"
import { useState } from "react"


const Header = ({ onClick, openUserForm, children }) => {

   const smallDevices = useMediaQuery("(max-width: 576px)")
   const mediumDevices = useMediaQuery("(max-width: 768px)")

   const [searchOpened, setSearchOpened] = useState(false)

   return (<header className={`${styles.mainHeaderStyle} ${!mediumDevices && styles.headerUseMedia}`}>
      <Button onClick={onClick}><div className={`${styles["open-sidebar-icon"]}`} alt="Open Sidebar Icon" />
      </Button>
      <div className={`${styles.linkHeaderButton} ${mediumDevices && styles.linkHeaderUseMedia}`}>
         {children}
         {/* <Button onClick={() => history.push("/projects")} buttonStyle="mainButtonStyle" >Projects</Button>
         <Button onClick={() => history.push("/")} buttonStyle="mainButtonStyle">Home</Button>
         <Button onClick={() => history.push("/dashboards")} buttonStyle="mainButtonStyle">Dashboards</Button >
         <Button onClick={() => history.push("/people")} buttonStyle="mainButtonStyle" >People</Button>
         <Button onClick={() => history.push("/settings")} buttonStyle="mainButtonStyle" >Settings</Button>
         <Button onClick={() => history.push("create")} buttonStyle="fifthButtonStyle">Create</Button> */}

      </div >
      <div className={styles.searchHeader}>
         <div className={`${styles.searchHeaderInput} ${smallDevices && styles.searchHeaderInputClose} 
         ${searchOpened && styles.searchHeaderInputOpen}`}>
            <input type="text" placeholder="Search" className={styles.searchInput} />
            <div className={styles.searchIcon} alt="Search Icon" />
         </div>
         <div className={styles.headerOptions}>
            <Button onClick={() => setSearchOpened(!searchOpened)}><div className={`${styles.searchIconArea} 
            ${!smallDevices && styles.searchIconMedia}`} alt="Search Icon" /></Button>
            <Button><div className={`${styles.icon} ${styles["bell-icon"]}`} alt="Bell Icon" /></Button>
            <Button><div className={`${styles.icon} ${styles["question-icon"]}`} alt="Question Icon" /></Button>
            <Button><div className={`${styles.icon} ${styles["setting-icon"]}`} alt="Setting Icon" /></Button>
            <Button onClick={openUserForm}><img src={userPhoto} className={styles.userPhoto} alt="User Photo" /></Button>
         </div>
      </div>
   </header >
   );

}


export default Header