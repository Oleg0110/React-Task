import Button from "../../components/Button/Button"
import styles from "./Header.module.scss"
import userPhoto from "../../assets/img/me.png"


const Header = ({ onClick }) => {
   return (<header className={styles.mainHeaderStyle}>
      <Button onClick={onClick}><div className={`${styles["open-sidebar-icon"]}`} alt="Open Sidebar Icon" />
      </Button>
      <div className={styles.linkHeaderButton}>
         <Button buttonStyle="mainButtonStyle">Projects</Button>
         <Button buttonStyle="mainButtonStyle">Dashboards</Button>
         <Button buttonStyle="mainButtonStyle">People</Button>
         <Button><span className={styles.buttonCreate}>Create</span></Button>
      </div>
      <div className={styles.searchHeader}>
         <div className={styles.searchHeaderArea}>
            <input type="text" placeholder="Search" className={styles.searchArea} />
            <div className={styles.searchIcon} alt="Search Icon" />
         </div>
         <Button><div className={`${styles.icon} ${styles["bell-icon"]}`} alt="Bell Icon" /></Button>
         <Button><div className={`${styles.icon} ${styles["question-icon"]}`} alt="Question Icon" /></Button>
         <Button><div className={`${styles.icon} ${styles["setting-icon"]}`} alt="Setting Icon" /></Button>
         <Button><img src={userPhoto} className={styles.userPhoto} alt="User Photo" /></Button>
      </div>
   </header>
   );

}


export default Header