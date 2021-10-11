import React from "react";
import { useHistory } from "react-router";
import { Button } from "../../components"
import { ROUTES } from "../../utils/constants";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { UserStore } from "../../stores";
import styles from "./Sidebar.module.scss"

interface ISidebar {
   isOpened: boolean,
   onClick: () => void
}

interface IButton {
   id: string,
   name: string,
   link: string,
   icon: string,
   alt: string,
   style: string
}

const buttons: Array<IButton> = [
   { id: "0", name: "sidebar.backlog", link: ROUTES.backlog, icon: "backlogIcon", alt: "Backlog Icon", style: "sidebarButtonStyle" },
   { id: "1", name: "sidebar.reports", link: ROUTES.reports, icon: "reportsIcon", alt: "Reports Icon", style: "sidebarButtonStyle" },
   { id: "2", name: "sidebar.components", link: ROUTES.components, icon: "componentsIcon", alt: "Components Icon", style: "sidebarButtonStyle" },
   { id: "3", name: "sidebar.releases", link: ROUTES.releases, icon: "releaseIcon", alt: "Releases Icon", style: "sidebarButtonStyle" },
   { id: "5", name: "sidebar.addItem", link: ROUTES.addItem, icon: "addItemIcon", alt: "Add-item Icon", style: "sidebarButtonStyle" }
];


const Sidebar: React.FC<ISidebar> = ({ isOpened, children, onClick }) => {

   const isAuth: boolean = !!UserStore.userToken

   const history = useHistory()

   const { t } = useTranslation();

   const onButtonClick = (links: string) => isAuth ? history.push(links) : toast.error("please sign up or log in")

   // !!! ToDo ALT

   return (
      <div className={`${styles.sidebar} ${isOpened && styles.opened}`}>
         <div onClick={onClick}>
            {children}
            {buttons.map(data => {
               <Button key={data.id} onClick={() => { onButtonClick(data.link) }} buttonStyle={data.style}>
                  <div className={`${styles.icon} ${styles[data.icon]}`}
                  // alt={data.alt} 
                  />
                  {t(data.name)}
               </Button>
            }
            )}
         </div>
      </div>
   );
}

export default Sidebar