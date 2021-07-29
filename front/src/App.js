import './App.scss';
import Header from "./layouts/Header/Header"
import Board from "./layouts/Board/Board"
import UserAccount from './layouts/UserAccount/UserAccount';

function App() {
   return (
      <div className="App">
         <Header headerStyle="mainHeaderStyle"></Header>
         <Board boardStyle="mainBoardStyle" ></Board>
         <UserAccount UserAccountStyle="mainUserAccountStyle"></UserAccount>
      </div >
   );
}

export default App;
