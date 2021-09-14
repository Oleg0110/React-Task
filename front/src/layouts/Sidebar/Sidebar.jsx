import styles from "./Sidebar.module.scss"
import { useHistory } from "react-router";
import { Button } from "../../components"
import { ROUTES } from "../../utils/constants";

const buttons = [
   { id: "0", name: "Backlog", link: ROUTES.backlog, icon: "backlogIcon", alt: "Backlog Icon", style: "sidebarButtonStyle" },
   { id: "1", name: "Reports", link: ROUTES.reports, icon: "reportsIcon", alt: "Reports Icon", style: "sidebarButtonStyle" },
   { id: "2", name: "Components", link: ROUTES.components, icon: "componentsIcon", alt: "Components Icon", style: "sidebarButtonStyle" },
   { id: "3", name: "Releases", link: ROUTES.releases, icon: "releaseIcon", alt: "Releases Icon", style: "sidebarButtonStyle" },
   { id: "5", name: "Add-item", link: ROUTES.addItem, icon: "addItemIcon", alt: "Add-item Icon", style: "sidebarButtonStyle" }
];


const Sidebar = ({ isOpened, children, onClick }) => {

   const history = useHistory()

   return (
      <div className={`${styles.sidebar} ${isOpened && styles.opened}`}>
         <div onClick={onClick}>
            {children}
            {buttons.map(data =>
               <Button key={data.id} onClick={() => history.push(data.link)} buttonStyle={data.style}>
                  <div className={`${styles.icon} ${styles[data.icon]}`} alt={data.alt} />
                  {data.name}
               </Button>
            )}
         </div>
      </div>
   );
}

export default Sidebar