
import styles from "./Board.module.scss"
import Button from "../../components/Button/Button"
import TaskBoard from "../../components/TaskBoard/TaskBoard"
import TaskCard from "../../components/TaskCard/TaskCard"
import threeDots from "../../assets/icon/threeDots.svg"
import arrow from "../../assets/icon/arrow.svg"
import searchIcon from "../../assets/icon/searchIcon.svg"


const Board = ({ }) => {
   return (<div className={styles.mainBoardStyle}>
      <div className={styles.boardStyle}>
         <h2>Board</h2>
         <div className={styles.release}>
            <Button buttonStyle="thirdButtonStyle">Release</Button>
            <Button><img src={threeDots} alt="Dots"></img></Button>
         </div>
      </div>
      <div className={styles.searchQuick}>
         <div className={styles.searchBoardArea}>
            <input type="text" className={styles.searchBoard} />
            <img src={searchIcon} className={styles.searchIcon} alt="Search Icon"></img>
         </div>
         <Button ><span className={styles.filtersButton}>Quick Filters<img src={arrow} alt="Arrow"></img></span></Button>
      </div>
      <div className={styles.taskBoard}>
         <TaskBoard title="TO DO 5">

         </TaskBoard>
         <TaskBoard title="IN PROGRESS" ></TaskBoard>
         <TaskBoard title="CODE REVIEW"></TaskBoard>
         <TaskBoard title="DONE"></TaskBoard>
      </div>
   </div >
   );
}

export default Board