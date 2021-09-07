import styles from './App.module.scss';
// import UserAccount from './layouts/UserAccount/UserAccount';
import { Dashboards, EmptyPage, Header, Home, Projects, Sidebar, } from "./layouts"
import { Button, LogInField, SignUpField, UserField } from './components';
import { useState } from 'react';
import { Redirect, Route, Switch, useHistory } from "react-router-dom"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE } from './utils/constants';
import { useMedia } from './hooks';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);
   console.log(responsive);

   const history = useHistory()

   const [isSidebarOpened, setSidebarOpened] = useState(false)
   const [isSingUpFormOpened, setisSingUpFormOpened] = useState(false)
   const [isLogInFormOpened, setisLogInFormOpened] = useState(false)

   const buttons = [{ id: "0", name: "Home", link: "/", icon: "homeIcon", style: "mainButtonStyle" },
   { id: "1", name: "Projects", link: "/projects", icon: "projectsIcon", style: "mainButtonStyle" },
   { id: "2", name: "Dashboards", link: "/dashboards", icon: "dashboardsIcon", style: "mainButtonStyle" },
   { id: "3", name: "People", link: "/people", icon: "peopleIcon", style: "mainButtonStyle" },
   { id: "5", name: "Create", link: "/create", icon: "createIcon", style: "fifthButtonStyle" }];


   const buttonsMap = buttons.map((button) =>
      <Button onClick={() => {
         history.push(button.link)
      }}
         buttonStyle={(responsive === "SD" || responsive === "MD") ? "sidebarButtonStyle" : button.style}
         key={button.id}>
         <div className={`${styles.icon} ${styles[`icon${responsive}`] && styles[button.icon]}`} />
         <h4>{button.name}</h4>
      </Button >)


   let buttonsInSidebar = (responsive === "SD" || responsive === "MD") ? buttonsMap : ""

   let buttonsInHeader = (responsive === "LD" || responsive === "Another") ? buttonsMap : ""


   return (
      <div className={styles.App}>
         <Header onClick={() => {
            setSidebarOpened(!isSidebarOpened)
            setisLogInFormOpened(false)
            setisSingUpFormOpened(false)
         }} openUserForm={() => {
            setisSingUpFormOpened(!isSingUpFormOpened)
            setisLogInFormOpened(false)
            setSidebarOpened(false)
         }}>{
               buttonsInHeader
            }</Header>
         <Sidebar onClick={() => setSidebarOpened(false)} isOpened={isSidebarOpened} onClickOutside={() => setSidebarOpened(false)}>{buttonsInSidebar}</Sidebar>
         <SignUpField isOpened={isSingUpFormOpened} onClick={() => {
            setisLogInFormOpened(!isLogInFormOpened)
            setisSingUpFormOpened(false)
         }}
            onClickOutside={() => setisSingUpFormOpened(false)}
            onModalClose={() => setisSingUpFormOpened(false)} />
         <LogInField isOpened={isLogInFormOpened} onClick={() => {
            setisSingUpFormOpened(!isSingUpFormOpened)
            setisLogInFormOpened(false)
         }}
            onClickOutside={() => setisLogInFormOpened(false)}
            onModalClose={() => setisLogInFormOpened(false)} />
         <UserField />
         <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/projects" component={Projects} />
            <Route path="/dashboards" component={Dashboards} />
            <Route path="/people" component={EmptyPage} />
            <Route path="/settings" component={EmptyPage} />
            <Route path="/create" component={EmptyPage} />
            <Route path="/backlog" component={EmptyPage} />
            <Route path="/reports" component={EmptyPage} />
            <Route path="/components" component={EmptyPage} />
            <Route path="/releases" component={EmptyPage} />
            <Route path="/add-item" component={EmptyPage} />
            <Redirect to="/" />
         </Switch>
         {/* <UserAccount></UserAccount> */}
         <ToastContainer />
      </div >
   );
}

export default App;
