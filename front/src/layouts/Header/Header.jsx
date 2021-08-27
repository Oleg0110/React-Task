import { Button } from "../../components"
import styles from "./Header.module.scss"
import userPhoto from "../../assets/img/me.png"
import { useState } from "react"
import { MEDIUM_DEVISCES, SMALL_DEVISCES } from "../../utils/constants"
import { useMediaQuery } from "../../hooks"


const Header = ({ onClick, openUserForm, children }) => {

   const smallDevices = useMediaQuery(SMALL_DEVISCES)
   const mediumDevices = useMediaQuery(MEDIUM_DEVISCES)

   const [searchOpened, setSearchOpened] = useState(false)

   return (<header className={`${styles.mainHeaderStyle} ${!mediumDevices && styles.headerUseMD}`}>
      <Button onClick={onClick}><div className={`${styles["open-sidebar-icon"]}`} alt="Open Sidebar Icon" />
      </Button>
      <div className={`${styles.linkHeaderButton} ${mediumDevices && styles.linkHeaderMD}`}>
         {children}
      </div >
      <div className={styles.searchHeader}>
         <div className={`${styles.searchHeaderInput} ${smallDevices && styles.searchHeaderInputClose} 
         ${searchOpened && styles.searchHeaderInputOpen}`}>
            <input type="text" placeholder="Search" className={styles.searchInput} />
            <div className={styles.searchIcon} alt="Search Icon" />
         </div>
         <div className={styles.headerOptions}>
            <Button onClick={() => setSearchOpened(!searchOpened)}><div className={`${styles.searchIconArea} 
            ${!smallDevices && styles.searchIconSD}`} alt="Search Icon" /></Button>
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