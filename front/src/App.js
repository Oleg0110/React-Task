import styles from './App.module.scss';
// import UserAccount from './layouts/UserAccount/UserAccount';
import { Dashboards, EmptyPage, Header, Home, Projects, Sidebar, LogInField, SignUpField } from "./layouts"
import { Button, UserField } from './components';
import { useState } from 'react';
import { Redirect, Route, Switch, useHistory } from "react-router-dom"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE, ROUTS } from './utils/constants';
import { useMedia } from './hooks';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { UserStore } from './stores';

const buttons = [
   { id: "0", name: "Home", link: ROUTS.home, icon: "homeIcon", alt: "Home Icon", style: "mainButtonStyle" },
   { id: "1", name: "Projects", link: ROUTS.projects, icon: "projectsIcon", alt: "Projects Icon", style: "mainButtonStyle" },
   { id: "2", name: "Dashboards", link: ROUTS.dashboard, icon: "dashboardsIcon", alt: "Dashboard Icon", style: "mainButtonStyle" },
   { id: "3", name: "People", link: ROUTS.people, icon: "peopleIcon", alt: "People Icon", style: "fifthButtonStyle" },
];

function App() {

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);
   const history = useHistory()

   const [isSidebarOpened, setSidebarOpened] = useState(false)
   const [isUserFieldOpened, setUserFieldOpened] = useState(false)

   const { user } = UserStore

   // const onButtonClick = (links) => {
   //    !user.length ? toast.error("please register") : history.push(links)
   // }

   const buttonsMap = buttons.map((button) =>
      <Button onClick={() => {
         history.push(button.link)
         // onButtonClick(button.link)
      }}
         buttonStyle={(responsive === "SD" || responsive === "MD") ? "sidebarButtonStyle" : button.style}
         key={button.id}>
         <div className={`${styles.icon} ${styles[`icon${responsive}`] && styles[button.icon]}`} alt={button.alt} />
         <h4>{button.name}</h4>
      </Button >)


   let buttonsInSidebar = (responsive === "SD" || responsive === "MD") ? buttonsMap : ""

   let buttonsInHeader = (responsive === "LD" || responsive === "Another") ? buttonsMap : ""


   return (
      <div className={styles.App}>
         <Header onClick={() => {
            setUserFieldOpened(false)
            setSidebarOpened(!isSidebarOpened)
         }}
            userField={() => {
               setSidebarOpened(false)
               setUserFieldOpened(!isUserFieldOpened)
            }}>{buttonsInHeader}</Header>
         <Sidebar onClick={() => setSidebarOpened(false)} isOpened={isSidebarOpened}
            onClickOutside={() => setSidebarOpened(false)}>{buttonsInSidebar}</Sidebar>
         <UserField isOpened={isUserFieldOpened} onModalClose={() => setUserFieldOpened(false)} />
         <Switch>
            <Route exact path={ROUTS.home} component={Home} />
            <Route path={ROUTS.projects} component={Projects} />
            <Route path={ROUTS.dashboard} component={Dashboards} />
            <Route path={ROUTS.people} component={EmptyPage} />
            <Route path={ROUTS.backlog} component={EmptyPage} />
            <Route path={ROUTS.reports} component={EmptyPage} />
            <Route path={ROUTS.components} component={EmptyPage} />
            <Route path={ROUTS.releases} component={EmptyPage} />
            <Route path={ROUTS.addItem} component={EmptyPage} />
            <Route path={ROUTS.settings} component={EmptyPage} />
            <Route path="/user/log-in" component={LogInField} />
            <Route path="/user/sign-up" component={SignUpField} />
            <Redirect to="/" />
         </Switch>
         {/* <UserAccount></UserAccount> */}
         <ToastContainer />
      </div >
   );
}

export default App;
