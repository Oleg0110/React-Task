import Button from "../../components/Button/Button"
import styles from "./Header.module.scss"
import Sidebar from "../Sidebar/Sidebar"
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsIcon from '@material-ui/icons/Notifications';
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { ReactComponent as UserPhoto } from "../../assets/img/me.png"



const Header = ({ headerStyle }) => {
   return <div className={styles[headerStyle]}>
      <Button buttonStyle="sidebarIcon" > <AppsIcon /> </Button>
      <Sidebar sidebarStyle="sidebar"></Sidebar>
      <div className={styles.navHeaderButton}>
         <Button buttonStyle="navHeaderButton">Your Work</Button>
         <Button buttonStyle="navHeaderButton">Projects<ExpandMoreIcon /></Button>
         <Button buttonStyle="navHeaderButton">Filters<ExpandMoreIcon /></Button>
         <Button buttonStyle="navHeaderButton">Dashboards<ExpandMoreIcon /></Button>
         <Button buttonStyle="navHeaderButton">People<ExpandMoreIcon /></Button>
         <Button buttonStyle="navHeaderButton">Plans<ExpandMoreIcon /></Button>
         <Button buttonStyle="navHeaderButton">Apps<ExpandMoreIcon /></Button>
         <Button buttonStyle="navHeaderButtonCreate">Create</Button>
      </div>
      <div className={styles.searchHeader}>

         <input type="text" placeholder="Search" className={styles.searchHeaderStyle} />
         <Button><NotificationsIcon /></Button>
         <Button><HelpIcon /></Button>
         <Button><SettingsIcon /></Button>
         <Button>user</Button>
      </div>
   </div >

}


export default Header