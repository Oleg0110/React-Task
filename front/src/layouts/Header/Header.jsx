import styles from "./Header.module.scss"
import { Button } from "../../components"
import { useState } from "react"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE, ROUTES } from "../../utils/constants"
import { useAuth, useMedia } from "../../hooks"
import { useHistory } from "react-router"
import { useTranslation } from "react-i18next";
import "../../utils/i18next"


const Header = ({ onClick, children, userField }) => {

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);
   const history = useHistory()

   const [searchOpened, setSearchOpened] = useState(false)

   const searchHeaderInput = () => {
      return `${styles[`searchHeaderInput${responsive}`]} ${searchOpened && styles.searchHeaderInputOpen}`
   }

   const { t, i18n } = useTranslation();

   const changeLanguage = (event) => {
      i18n.changeLanguage(event.target.value);
   };

   const { token } = useAuth()
   const isAuthenticated = !!token

   const userPhoto = () => {
      return !isAuthenticated ? styles.empty : styles.userPhoto
   }


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
            <div className={`${styles.searchHeaderInput} ${searchHeaderInput()} `} >
               <input type="text" placeholder={t("header.searchPlaceholder")} className={`${styles.searchInput} ${styles[`searchInput${responsive}`]}`} />
               <div className={styles.searchIcon} alt="Search Icon" />
            </div>
            <div className={styles.headerOptions}>
               <Button onClick={() => setSearchOpened(!searchOpened)}><div className={`${styles.searchIconArea} 
               ${styles[`searchIconArea${responsive}`]}`} alt="Search Icon" /></Button>
               <Button><div className={`${styles.icon} ${styles["bell-icon"]}`} alt="Bell Icon" /></Button>
               <Button onClick={() => history.push(ROUTES.settings)}><div className={`${styles.icon} ${styles["setting-icon"]}`} alt="Setting Icon" /></Button>
               <Button onClick={userField}><div className={userPhoto()} alt="User" /></Button>
               <select className={styles.language} onChange={changeLanguage}>
                  <option className={styles.option} value="en" >EN</option>
                  <option className={styles.option} value="ua" >UA</option>
                  <option className={styles.option} value="ru" >RU</option>
               </select>
            </div>
         </div>
      </header >
   )
}


export default Header