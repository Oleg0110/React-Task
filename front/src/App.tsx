import React, { useState } from 'react';
// import UserAccount from './layouts/UserAccount/UserAccount';
import { Header, Sidebar } from "./layouts"
import { Button, UserField } from './components';
import { useHistory } from "react-router-dom"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE, ROUTES } from './utils/constants';
import { useMedia } from './hooks';
import { toast, ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react';
import useRoutes from './utils/routes';
import { useTranslation } from 'react-i18next';
import { UserStore } from './stores';
import styles from './App.module.scss';
import 'react-toastify/dist/ReactToastify.css';

interface IButtonProps {
  id: string,
  name: string,
  link: string,
  icon: string,
  style: string
}

const buttons: Array<IButtonProps> = [
  { id: "0", name: "header.home", link: ROUTES.home, icon: "homeIcon", style: "mainButtonStyle" },
  { id: "1", name: "header.projects", link: ROUTES.projects, icon: "projectsIcon", style: "mainButtonStyle" },
  { id: "2", name: "header.dashboards", link: ROUTES.dashboard, icon: "dashboardsIcon", style: "mainButtonStyle" },
  { id: "3", name: "header.people", link: ROUTES.people, icon: "peopleIcon", style: "fifthButtonStyle" },
];


const App: React.FC = () => {


  const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);

  const history = useHistory()

  const [isSidebarOpened, setSidebarOpened] = useState(false)
  const [isUserFieldOpened, setUserFieldOpened] = useState(false)

  const routes = useRoutes()

  const isAuth = !!UserStore.userToken

  const { t } = useTranslation();

  const onButtonClick = (links: string) => {
    isAuth ? history.push(links) : toast.error("please sign up or log in")
  }

  const buttonsMap = buttons.map((button) => {
    return <Button onClick={() => onButtonClick(button.link)}
      buttonStyle={(responsive === "SD" || responsive === "MD") ? "sidebarButtonStyle" : button.style}
      key={button.id} >
      <div className={`${styles.icon} ${styles[`icon${responsive}`] && styles[button.icon]}`} />
      <p >{t(button.name)} </p>
    </Button >
  })

  const buttonsInSidebar = (responsive === "SD" || responsive === "MD") ? buttonsMap : ""

  const buttonsInHeader = (responsive === "LD" || responsive === "Another") ? buttonsMap : ""


  return (
    <div className={styles.App} >
      <Header
        onClick={() => {
          setUserFieldOpened(false)
          setSidebarOpened(!isSidebarOpened)
        }}
        userField={() => {
          setSidebarOpened(false)
          setUserFieldOpened(!isUserFieldOpened)
        }}>
        {buttonsInHeader}
      </Header>
      < Sidebar
        onClick={() => setSidebarOpened(false)}
        isOpened={isSidebarOpened}>
        {buttonsInSidebar}
      </Sidebar>
      < UserField isOpened={isUserFieldOpened} onModalClose={() => setUserFieldOpened(false)} />
      {routes}
      {/* <UserAccount></UserAccount> */}
      <ToastContainer />
    </div >
  );
}

export default observer(App);