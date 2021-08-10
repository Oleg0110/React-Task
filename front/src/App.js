import './App.scss';
// import UserAccount from './layouts/UserAccount/UserAccount';
import { Header } from "./layouts"
import { Sidebar } from "./layouts"
import { Home } from "./layouts"
import { Projects } from "./layouts"
import { Dashboards } from "./layouts"
import { People } from "./layouts"
import { Settings } from "./layouts"
import { Create } from "./layouts"
import { useState } from 'react';
import { CreateListModalWindow } from './components';
import { BrowserRouter, Route } from "react-router-dom"

function App() {

   const [isOpened, setIsOpened] = useState(false)
   const [isListModalOpened, setIsListModalOpened] = useState(false)


   return (
      <div className="App">
         <Header onClick={() => setIsOpened(!isOpened)}></Header>
         <Sidebar isOpened={isOpened}></Sidebar>
         <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/dashboards" component={Dashboards}>
               <Dashboards onClick={() => setIsListModalOpened(!isListModalOpened)}></Dashboards>
               <CreateListModalWindow isModalOpened={isListModalOpened} onModalClose={() => setIsListModalOpened(false)} />
            </Route>
            <Route exact path="/people" component={People} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/create" component={Create} />
         </BrowserRouter>
         {/* <UserAccount></UserAccount> */}
      </div >
   );
}

export default App;
