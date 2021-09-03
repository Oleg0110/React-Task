import styles from './App.module.scss';
// import UserAccount from './layouts/UserAccount/UserAccount';
import { Dashboards, EmptyPage, Header, Home, Projects, Sidebar, } from "./layouts"
import { Button, CreateUserAccount } from './components';
import { useState } from 'react';
import { Redirect, Route, Switch, useHistory } from "react-router-dom"
import { MEDIUM_DEVICES, RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE } from './utils/constants';
import { useMedia, useMediaQuery } from './hooks';


function App() {

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);
   console.log(responsive);

   const history = useHistory()

   const [isOpened, setIsOpened] = useState(false)
   const [isSingUpFormOpened, setisSingUpFormOpened] = useState(false)

   const mediumDevices = useMediaQuery(MEDIUM_DEVICES)

   const buttons = [{ id: "0", name: "Home", link: "/", icon: "homeIcon", style: "mainButtonStyle" },
   { id: "1", name: "Projects", link: "/projects", icon: "projectsIcon", style: "mainButtonStyle" },
   { id: "2", name: "Dashboards", link: "/dashboards", icon: "dashboardsIcon", style: "mainButtonStyle" },
   { id: "3", name: "People", link: "/people", icon: "peopleIcon", style: "mainButtonStyle" },
   { id: "5", name: "Create", link: "/create", icon: "createIcon", style: "fifthButtonStyle" }];


   const buttonsMap = buttons.map((button) =>
      <Button onClick={() => {
         history.push(button.link)
      }}
         buttonStyle={`${mediumDevices ? "sidebarButtonStyle" : button.style}`}
         key={button.id}>
         <div className={`${styles.icon} ${styles[`icon${responsive}`] && styles[button.icon]}`} />
         <h4>{button.name}</h4>
      </Button >)

   return (
      <div className={styles.App}>
         <Header onClick={() => setIsOpened(!isOpened)} openUserForm={() => setisSingUpFormOpened(!isSingUpFormOpened)}>{
            (responsive === "LD" || responsive === "Another") && buttonsMap
         }</Header>
         <Sidebar isOpened={isOpened} onClickOutside={() => setIsOpened(false)}>{
            mediumDevices ? buttonsMap : ""
         }</Sidebar>
         <CreateUserAccount isOpened={isSingUpFormOpened} onModalClose={() => setisSingUpFormOpened(false)} />
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
      </div >
   );
}

export default App;
