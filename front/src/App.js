import './App.scss';
// import UserAccount from './layouts/UserAccount/UserAccount';
import Header from "./layouts/Header/Header"
import Board from "./layouts/Board/Board"
import Sidebar from "./layouts/Sidebar/Sidebar"
import { useState } from 'react';

function App() {

   const [isOpened, setIsOpened] = useState(false)
   return (
      <div className="App">
         <Header onClick={() => setIsOpened(!isOpened)}></Header>
         <Sidebar isOpened={isOpened}></Sidebar>
         <Board></Board>
         {/* <UserAccount></UserAccount> */}
      </div >
   );
}

export default App;
