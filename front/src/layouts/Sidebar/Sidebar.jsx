import styles from "./Sidebar.module.scss"
import { useHistory } from "react-router";
import { Button } from "../../components"

const buttons = [
   { id: "0", name: "Backlog", link: "/backlog", icon: "backlogIcon", alt: "Backlog Icon", style: "sidebarButtonStyle" },
   { id: "1", name: "Reports", link: "/reports", icon: "reportsIcon", alt: "Reports Icon", style: "sidebarButtonStyle" },
   { id: "2", name: "Components", link: "/components", icon: "componentsIcon", alt: "Components Icon", style: "sidebarButtonStyle" },
   { id: "3", name: "Releases", link: "/releases", icon: "releaseIcon", alt: "Releases Icon", style: "sidebarButtonStyle" },
   { id: "5", name: "Add-item", link: "/add-item", icon: "addItemIcon", alt: "Add-item Icon", style: "sidebarButtonStyle" }
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