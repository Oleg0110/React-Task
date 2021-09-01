import { Button } from "../../components"
import styles from "./Header.module.scss"
import userPhoto from "../../assets/img/me.png"
import { useState } from "react"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE } from "../../utils/constants"
import { useMedia } from "../../hooks"


const Header = ({ onClick, openUserForm, children }) => {

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);

   const [searchOpened, setSearchOpened] = useState(false)

   const searchHeaderInput = () => {
      return `${styles[`searchHeaderInput${responsive}`]} ${searchOpened && styles.searchHeaderInputOpen}`
   }

   return (
      <header className={`${styles.mainHeaderStyle} ${styles[`mainHeaderStyle${responsive}`]}`}>
         <Button onClick={onClick}><div className={`${styles["open-sidebar-icon"]}`} alt="Open Sidebar Icon" />
         </Button>
         <div className={`${styles.linkHeaderButton} ${styles[`linkHeaderButton${responsive}`]}`}>
            {children}
         </div >
         <div className={styles.searchHeader}>
            <div className={`${styles.searchHeaderInput} ${searchHeaderInput()} `}>
               <input type="text" placeholder="Search" className={styles.searchInput} />
               <div className={styles.searchIcon} alt="Search Icon" />
            </div>
            <div className={styles.headerOptions}>
               <Button onClick={() => setSearchOpened(!searchOpened)}><div className={`${styles.searchIconArea} 
               ${styles[`searchIconArea${responsive}`]}`} alt="Search Icon" /></Button>
               <Button><div className={`${styles.icon} ${styles["bell-icon"]}`} alt="Bell Icon" /></Button>
               <Button><div className={`${styles.icon} ${styles["question-icon"]}`} alt="Question Icon" /></Button>
               <Button><div className={`${styles.icon} ${styles["setting-icon"]}`} alt="Setting Icon" /></Button>
               <Button onClick={openUserForm}><img src={userPhoto} className={styles.userPhoto} alt="User" /></Button>
            </div>
         </div>
      </header >
   );

}


export default Header