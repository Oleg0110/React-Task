import { Button } from "../../components"
import styles from "./Sidebar.module.scss"



const Sidebar = ({ isOpened }) => {

   return (<div className={`${styles.sidebar} ${isOpened && styles.opened} `}>
      <a href="/backlog"><Button buttonStyle="secondButtonStyle"><div className={`${styles.icon} ${styles["backlog-icon"]}`} alt="Back Log Icon" />Backlog</Button></a>
      <a href="/reports"><Button buttonStyle="secondButtonStyle"><div className={`${styles.icon} ${styles["reports-icon"]}`} alt="Reports Icon" />Reports</Button></a>
      <a href="/components"><Button buttonStyle="secondButtonStyle"><div className={`${styles.icon} ${styles["components-icon"]}`} alt="Components Icon" />Components</Button></a>
      <a href="/release"><Button buttonStyle="secondButtonStyle"><div className={`${styles.icon} ${styles["release-icon"]}`} alt="Release Icon" />Releases</Button></a>
      <a href="/add-item"><Button buttonStyle="secondButtonStyle"><div className={`${styles.icon} ${styles["add-item-icon"]}`} alt="Add Item Icon" />Add item</Button></a>
   </div>
   );
}

export default Sidebar