import Button from "../../components/Button/Button"
import styles from "./Sidebar.module.scss"
import backLog from "../../assets/icon/backLog.svg"
import reports from "../../assets/icon/reports.svg"
import components from "../../assets/icon/components.svg"
import releases from "../../assets/icon/releases.svg"
import addItem from "../../assets/icon/addItem.svg"
import settings from "../../assets/icon/settings.svg"



const Sidebar = ({ isOpened }) => {

   return (<div className={`${styles.sidebar} ${isOpened && styles.opened} `}>
      <Button buttonStyle="secondButtonStyle"><img src={backLog} alt="Back Log Icon"></img>Backlog</Button>
      <Button buttonStyle="secondButtonStyle"><img src={reports} alt="Reports Icon"></img>Reports</Button>
      <Button buttonStyle="secondButtonStyle"><img src={components} alt="Components Icon"></img>Components</Button>
      <Button buttonStyle="secondButtonStyle"><img src={releases} alt="Release Icon"></img>Releases</Button>
      <Button buttonStyle="secondButtonStyle"><img src={addItem} alt="Add Item Icon"></img>Add item</Button>
      <Button buttonStyle="secondButtonStyle"><img src={settings} alt="Setting Icon"></img>Project settings</Button>
   </div>
   );
}

export default Sidebar