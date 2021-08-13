import { Button } from "../../components"
import styles from "./Header.module.scss"
import userPhoto from "../../assets/img/me.png"


const Header = ({ onClick, openUserForm }) => {
   return (<header className={styles.mainHeaderStyle}>
      <Button onClick={onClick}><div className={`${styles["open-sidebar-icon"]}`} alt="Open Sidebar Icon" />
      </Button>
      <div className={styles.linkHeaderButton}>
         <a href="/"><Button buttonStyle="mainButtonStyle">Home</Button></a>
         <a href="/projects"><Button buttonStyle="mainButtonStyle" >Projects</Button></a>
         <a href="/dashboards"><Button buttonStyle="mainButtonStyle">Dashboards</Button></a>
         <a href="/people"><Button buttonStyle="mainButtonStyle" >People</Button></a>
         <a href="/settings"><Button buttonStyle="mainButtonStyle" >Settings</Button></a>
         <a href="/create"><Button buttonStyle="fifthButtonStyle">Create</Button></a>
      </div>
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

   </header>
   );

}


export default Header