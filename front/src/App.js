import styles from './App.module.scss';
// import UserAccount from './layouts/UserAccount/UserAccount';
import { Dashboards, EmptyPage, Header, Home, Projects, Sidebar, LogInField, SignUpField } from "./layouts"
import { Button, UserField } from './components';
import { useState } from 'react';
import { Redirect, Route, Switch, useHistory } from "react-router-dom"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE } from './utils/constants';
import { useMedia } from './hooks';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const buttons = [
   { id: "0", name: "Home", link: "/", icon: "homeIcon", alt: "Home Icon", style: "mainButtonStyle" },
   { id: "1", name: "Projects", link: "/projects", icon: "projectsIcon", alt: "Projects Icon", style: "mainButtonStyle" },
   { id: "2", name: "Dashboards", link: "/dashboards", icon: "dashboardsIcon", alt: "Dashboard Icon", style: "mainButtonStyle" },
   { id: "3", name: "People", link: "/people", icon: "peopleIcon", alt: "People Icon", style: "mainButtonStyle" },
   { id: "5", name: "Create", link: "/create", icon: "createIcon", alt: "Create Icon", style: "fifthButtonStyle" }
];

function App() {

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);
   console.log(responsive);

   const history = useHistory()

   const [isSidebarOpened, setSidebarOpened] = useState(false)
   const [isUserFieldOpened, setUserFieldOpened] = useState(false)


   const buttonsMap = buttons.map((button) =>
      <Button onClick={() => history.push(button.link)}
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
            <Route exact path="/" component={Home} />
            <Route path="/projects" component={Projects} />
            <Route path="/dashboards" component={Dashboards} />
            <Route path="/people" component={EmptyPage} />
            <Route path="/create" component={EmptyPage} />
            <Route path="/backlog" component={EmptyPage} />
            <Route path="/reports" component={EmptyPage} />
            <Route path="/components" component={EmptyPage} />
            <Route path="/releases" component={EmptyPage} />
            <Route path="/add-item" component={EmptyPage} />
            <Route path="/settings" component={EmptyPage} />
            <Route path="/log-in" component={LogInField} />
            <Route path="/sing-up" component={SignUpField} />
            <Redirect to="/" />
         </Switch>
         {/* <UserAccount></UserAccount> */}
         <ToastContainer />
      </div >
   );
}

export default App;
