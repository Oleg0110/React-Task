import './App.scss';
// import UserAccount from './layouts/UserAccount/UserAccount';
import { Dashboards, EmptyPage, Header, Home, Projects, Sidebar, } from "./layouts"
import { CreateUserAccount, CreateListModalWindow } from './components';
import { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"

function App() {

   const [isOpened, setIsOpened] = useState(false)
   const [isSingUpFormOpened, setisSingUpFormOpened] = useState(false)
   const [isListModalOpened, setIsListModalOpened] = useState(false)


   return (
      <div className="App">
         <Header onClick={() => setIsOpened(!isOpened)} openUserForm={() => setisSingUpFormOpened(!isSingUpFormOpened)}></Header>
         <Sidebar isOpened={isOpened}></Sidebar>
         <CreateUserAccount isOpened={isSingUpFormOpened} onModalClose={() => setisSingUpFormOpened(false)} />
         <BrowserRouter>
            <Switch>
               <Route exact path="/" component={Home} />
               <Route exact path="/projects" component={Projects} />
               <Route exact path="/dashboards" component={Dashboards}>
                  <Dashboards onClick={() => setIsListModalOpened(!isListModalOpened)} />
                  <CreateListModalWindow isListModalOpened={isListModalOpened} onModalClose={() => setIsListModalOpened(false)} />
               </Route>
               <Route exact path="/people" component={EmptyPage} />
               <Route exact path="/settings" component={EmptyPage} />
               <Route exact path="/create" component={EmptyPage} />
               <Route exact path="/backlog" component={EmptyPage} />
               <Route exact path="/reports" component={EmptyPage} />
               <Route exact path="/components" component={EmptyPage} />
               <Route exact path="/release" component={EmptyPage} />
               <Route exact path="/add-item" component={EmptyPage} />
               <Redirect to="/" />
            </Switch>
         </BrowserRouter>
         {/* <UserAccount></UserAccount> */}
      </div >
   );
}

export default App;
