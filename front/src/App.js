import './App.scss';
// import UserAccount from './layouts/UserAccount/UserAccount';
import { Header } from "./layouts"
import { Sidebar } from "./layouts"
import { Home } from "./layouts"
import { Projects } from "./layouts"
import { Dashboards } from "./layouts"
import { EmptyPage } from './layouts';
import { useState } from 'react';
import { CreateListModalWindow } from './components';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"

function App() {

   const [isOpened, setIsOpened] = useState(false)
   const [isListModalOpened, setIsListModalOpened] = useState(false)


   return (
      <div className="App">
         <Header onClick={() => setIsOpened(!isOpened)}></Header>
         <Sidebar isOpened={isOpened}></Sidebar>
         <BrowserRouter>
            <Switch>
               <Route exact path="/" component={Home} />
               <Route exact path="/projects" component={Projects} />
               <Route exact path="/dashboards" component={Dashboards}>
                  <Dashboards onClick={() => setIsListModalOpened(!isListModalOpened)}></Dashboards>
                  <CreateListModalWindow isModalOpened={isListModalOpened} onModalClose={() => setIsListModalOpened(false)} />
               </Route>
               <Route exact path="/people" component={EmptyPage} />
               <Route exact path="/settings" component={EmptyPage} />
               <Route exact path="/create" component={EmptyPage} />
               <Redirect to="/" />
            </Switch>
         </BrowserRouter>
         {/* <UserAccount></UserAccount> */}
      </div >
   );
}

export default App;
