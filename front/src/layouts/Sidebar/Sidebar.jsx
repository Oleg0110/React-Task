import Button from "../../components/Button/Button"
import styles from "./Sidebar.module.scss"



const Sidebar = ({ isOpened }) => {

   return (<div className={`${styles.sidebar} ${isOpened && styles.opened} `}>
      <Button buttonStyle="secondButtonStyle"><div className={`${styles.icon} ${styles["backlog-icon"]}`} alt="Back Log Icon" />Backlog</Button>
      <Button buttonStyle="secondButtonStyle"><div className={`${styles.icon} ${styles["reports-icon"]}`} alt="Reports Icon" />Reports</Button>
      <Button buttonStyle="secondButtonStyle"><div className={`${styles.icon} ${styles["components-icon"]}`} alt="Components Icon" />Components</Button>
      <Button buttonStyle="secondButtonStyle"><div className={`${styles.icon} ${styles["release-icon"]}`} alt="Release Icon" />Releases</Button>
      <Button buttonStyle="secondButtonStyle"><div className={`${styles.icon} ${styles["add-item-icon"]}`} alt="Add Item Icon" />Add item</Button>
      <Button buttonStyle="secondButtonStyle"><div className={`${styles.icon} ${styles["setting-icon"]}`} alt="Setting Icon" />Project settings</Button>
   </div>
   );
}

export default Sidebar