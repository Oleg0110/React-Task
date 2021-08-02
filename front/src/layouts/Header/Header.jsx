import Button from "../../components/Button/Button"
import styles from "./Header.module.scss"
import userPhoto from "../../assets/img/me.png"
import headereMenuicon from "../../assets/icon/headerMenuIcon.svg"
import bell from "../../assets/icon/bell.svg"
import question from "../../assets/icon/questionIcon.svg"
import settings from "../../assets/icon/settings.svg"
import searchIcon from "../../assets/icon/searchIcon.svg"

const Header = ({ onClick }) => {
   return (<div className={styles.mainHeaderStyle}>
      <div className={styles.buttonOpenSidebar}>
         <Button onClick={onClick}><img className={styles.sidebarIcon} src={headereMenuicon} alt="Menu Icon"></img> </Button>
      </div>
      <div className={styles.linkHeaderButton}>
         <Button buttonStyle="mainButtonStyle">Projects</Button>
         <Button buttonStyle="mainButtonStyle">Dashboards</Button>
         <Button buttonStyle="mainButtonStyle">People</Button>
         <Button><span className={styles.buttonCreate}>Create</span></Button>
      </div>
      <div className={styles.searchHeader}>
         <div className={styles.searchHeaderArea}>
            <input type="text" placeholder="Search" className={styles.searchArea} />
            <img src={searchIcon} className={styles.searchIcon} alt="Search Icon"></img>
         </div>
         <Button><img src={bell} alt="Bell Icon"></img></Button>
         <Button><img src={question} alt="Question Icon"></img></Button>
         <Button><img src={settings} alt="Setting Icon"></img></Button>
         <Button><img className={styles.userPhoto} src={userPhoto} alt="User Photo"></img></Button>
      </div>
   </div >
   );

}


export default Header