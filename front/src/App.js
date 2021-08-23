import './App.scss';
// import UserAccount from './layouts/UserAccount/UserAccount';
import { Dashboards, EmptyPage, Header, Home, Projects, Sidebar, } from "./layouts"
import { Button, CreateUserAccount } from './components';
import { useState } from 'react';
import { Redirect, Route, Switch, useHistory } from "react-router-dom"
import useMediaQuery from './hooks/useMedia';

function App() {

   const history = useHistory()

   const [isOpened, setIsOpened] = useState(false)
   const [isSingUpFormOpened, setisSingUpFormOpened] = useState(false)

   const mediumDevices = useMediaQuery("(min-width: 768px)")
   console.log(mediumDevices);

   const buttons = [{ name: "Home", link: "/" }, { name: "Projects", link: "/projects" }, { name: "Dashboards", link: "/dashboards" },
   { name: "People", link: "/people" }, { name: "Settings", link: "/settings" }, { name: "Create", link: "/create" }]

   const buttonsMap = buttons.map((button) =>
      <Button onClick={() => history.push(button.link)} buttonStyle="mainButtonStyle">{button.name}</Button >)

   return (
      <div className="App">
         <Header onClick={() => setIsOpened(!isOpened)} openUserForm={() => setisSingUpFormOpened(!isSingUpFormOpened)}>{
            mediumDevices ? buttonsMap : ""
         }</Header>
         <Sidebar isOpened={isOpened}>{
            !mediumDevices ? buttonsMap : ""
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
