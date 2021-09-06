import styles from "./Header.module.scss"
import { Button } from "../../components"
import { useRef, useState } from "react"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE } from "../../utils/constants"
import { useClickOutside, useMedia } from "../../hooks"
import { useHistory } from "react-router"


const Header = ({ onClick, openUserForm, children }) => {

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);
   const history = useHistory()

   const [searchOpened, setSearchOpened] = useState(false)

   const searchHeaderInput = () => {
      return `${styles[`searchHeaderInput${responsive}`]} ${searchOpened && styles.searchHeaderInputOpen}`
   }

   const ref = useRef(null)
   useClickOutside(ref, () => setSearchOpened(false))

   return (
      <header className={`${styles.mainHeaderStyle} ${styles[`mainHeaderStyle${responsive}`]}`}>
         <div className={styles.logoField}>
            <Button onClick={onClick}><div className={`${styles["open-sidebar-icon"]}`} alt="Open Sidebar Icon" />
            </Button>
            <div className={styles.logoPosition}>
               <Button onClick={() => history.push("/home")}><span className={styles.logo}>DILA</span></Button>
            </div>
         </div>
         <div className={`${styles.linkHeaderButton} ${styles[`linkHeaderButton${responsive}`]}`}>
            {children}
         </div >
         <div className={styles.searchHeader}>
            <div className={`${styles.searchHeaderInput} ${searchHeaderInput()} `} ref={ref}>
               <input type="text" placeholder="Search" className={`${styles.searchInput} ${styles[`searchInput${responsive}`]}`} />
               <div className={styles.searchIcon} alt="Search Icon" />
            </div>
            <div className={styles.headerOptions}>
               <Button onClick={() => setSearchOpened(!searchOpened)}><div className={`${styles.searchIconArea} 
               ${styles[`searchIconArea${responsive}`]}`} alt="Search Icon" /></Button>
               <Button><div className={`${styles.icon} ${styles["bell-icon"]}`} alt="Bell Icon" /></Button>
               <Button><div className={`${styles.icon} ${styles["setting-icon"]}`} alt="Setting Icon" /></Button>
               <Button onClick={openUserForm}><div className={styles.userPhoto} alt="User" /></Button>
            </div>
         </div>
      </header >
   )
}


export default Header