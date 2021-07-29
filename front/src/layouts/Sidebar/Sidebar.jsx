import Button from "../../components/Button/Button"
import styles from "./Sidebar.module.scss"
import MapIcon from '@material-ui/icons/Map';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import PostAddIcon from '@material-ui/icons/PostAdd';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SettingsIcon from '@material-ui/icons/Settings';


const Sidebar = ({ sidebarStyle }) => {
   return <div className={styles[sidebarStyle]}>
      <Button buttonStyle="sidebarButton"><MapIcon />Roadmap</Button>
      <Button buttonStyle="sidebarButton"><ExitToAppIcon />Backlog</Button>
      <Button buttonStyle="sidebarButton"><LocalActivityIcon />Active sprints</Button>
      <Button buttonStyle="sidebarButton"><AssessmentIcon />Reports</Button>
      <Button buttonStyle="sidebarButton"><AddToQueueIcon />Issues</Button>
      <Button buttonStyle="sidebarButton"><ViewCompactIcon />Components</Button>
      <Button buttonStyle="sidebarButton"><NewReleasesIcon />Reieases</Button>
      <Button buttonStyle="sidebarButton"><FileCopyIcon />Project pages</Button>
      <Button buttonStyle="sidebarButton"><PostAddIcon />Add item</Button>
      <Button buttonStyle="sidebarButton"><SettingsIcon />Project settings</Button>
   </div>
}

export default Sidebar