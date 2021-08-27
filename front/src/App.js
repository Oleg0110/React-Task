import './App.scss';
// import UserAccount from './layouts/UserAccount/UserAccount';
import { Dashboards, EmptyPage, Header, Home, Projects, Sidebar, } from "./layouts"
import { Button, CreateUserAccount } from './components';
import { useState } from 'react';
import { Redirect, Route, Switch, useHistory } from "react-router-dom"
import { MEDIUM_DEVISCES } from './utils/constants';
import { useMediaQuery } from './hooks';

function App() {

   const history = useHistory()

   const [isOpened, setIsOpened] = useState(false)
   const [isSingUpFormOpened, setisSingUpFormOpened] = useState(false)

   const mediumDevices = useMediaQuery(MEDIUM_DEVISCES)

   const buttons = [{ id: 0, name: "Home", link: "/", icon: "homeIcon", style: "mainButtonStyle" },
   { id: 1, name: "Projects", link: "/projects", icon: "projectsIcon", style: "mainButtonStyle" },
   { id: 2, name: "Dashboards", link: "/dashboards", icon: "dashboardsIcon", style: "mainButtonStyle" },
   { id: 3, name: "People", link: "/people", icon: "peopleIcon", style: "mainButtonStyle" },
   { id: 5, name: "Create", link: "/create", icon: "createIcon", style: "fifthButtonStyle" }];

   const buttonsMap = buttons.map((button) =>
      <Button onClick={() => {
         setIsOpened(false)
         history.push(button.link)
      }}
         buttonStyle={mediumDevices ? "secondButtonStyle" : button.style} key={button.id}>
         <div className={mediumDevices ? button.icon : ""} />
         <h4>{button.name}</h4>
      </Button >)

   return (
      <div className="App">
         <Header onClick={() => setIsOpened(!isOpened)} openUserForm={() => setisSingUpFormOpened(!isSingUpFormOpened)}>{
            !mediumDevices ? buttonsMap : ""
         }</Header>
         <Sidebar isOpened={isOpened} close={() => setIsOpened(false)} >{
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
