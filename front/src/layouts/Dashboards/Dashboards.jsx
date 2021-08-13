
import styles from "./Dashboards.module.scss"
import { Button } from "../../components"
import { TaskBoard } from "../../components"
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"


const Board = ({ children, onClick }) => {

   const { lists } = BoardStore


   return (<div className={styles.mainBoardStyle}>
      <div className={styles.boardStyle}>
         <h2 className={styles.mainTitle}>Board</h2>
         <div className={styles.release}>
            <Button buttonStyle="thirdButtonStyle">Release</Button>
            <Button><div className={styles["three-dots"]} alt="Dots" /></Button>
         </div>
      </div>
      <div className={styles.create}>
         <Button onClick={onClick} buttonStyle="thirdButtonStyle"><div className={styles.plus} alt="Plus Icon" />Create List</Button>
         <div className={styles.searchQuick}>
            <div className={styles.searchBoardArea}>
               <input type="text" className={styles.searchBoard} />
               <div className={styles.searchIcon} alt="Search Icon" />
            </div>
            <Button ><span className={styles.filtersButton}>Quick Filters<div className={styles.chevronIcon} alt="Arrow" /></span></Button>
         </div>
      </div>
      <div className={styles.boardLists}>
         {lists.map((data, index) => <TaskBoard title={data.title} cardsData={data.tasks} key={index} />)}
         {/* <TaskBoard title="TO DO">
            <TaskCard priority="medium" taskState="done" label="SPACE TRAVEL PARTNERS"
               labelStyle="firstLabelStyle" userPhoto="first" alt="User Photo">Engage Jupiter Express out solar system travel</TaskCard>
            <TaskCard priority="low" taskState="arrow-up" label="LOCAL MARS OFFICE"
               labelStyle="thirdLabelStyle" userPhoto="second" alt="User Photo">Create 90 day plans for all departments in the Mars Office</TaskCard>
            <TaskCard priority="medium" taskState="arrow-up" label="SPACE TRAVEL PARTNERS"
               labelStyle="firstLabelStyle" userPhoto="third" alt="User Photo">Engage Saturn’s Rings Resort as a preferred provider</TaskCard>
            <TaskCard priority="medium" taskState="mark" label="SEESPACEEZ PLUS"
               labelStyle="secondLabelStyle" userPhoto="fourth" alt="User Photo">Enable speedy SpaceCraft as the preferred</TaskCard>
            <TaskCard priority="hight" taskState="done" label="SPACE TRAVEL PARTNERS"
               labelStyle="firstLabelStyle" userPhoto="fifth" alt="User Photo">Establish a catering vendor to provide meal service</TaskCard>
         </TaskBoard>
         <TaskBoard title="IN PROGRESS">
            <TaskCard priority="medium" taskState="mark" label="SEESPACEEZ PLUS"
               labelStyle="secondLabelStyle" userPhoto="fifth" alt="User Photo">Requesting available flights is nów taking</TaskCard>
            <TaskCard priority="medium" taskState="done" label="SPACE TRAVEL PARTNERS"
               labelStyle="firstLabelStyle" userPhoto="second" alt="User Photo">Engage Saturn Shuttle Lines for group tours</TaskCard>
            <TaskCard priority="medium" taskState="tool" label="LOCAL MARS OFFICE"
               labelStyle="thirdLabelStyle" userPhoto="fourth" alt="User Photo">Establish a catering vendor to provide meal service</TaskCard>
         </TaskBoard>
         <TaskBoard title="CODE REVIEW">
            <TaskCard priority="medium" taskState="mark" label="LOCAL MARS OFFICE"
               labelStyle="thirdLabelStyle" userPhoto="third" alt="User Photo">Register with the Mars Ministry of Revenue</TaskCard>
            <TaskCard priority="medium" taskState="done" label="LOCAL MARS OFFICE"
               labelStyle="thirdLabelStyle" userPhoto="first" alt="User Photo">Draft network plan for Mars Office</TaskCard>
         </TaskBoard>
         <TaskBoard title="CODE REVIEW 2">
            <TaskCard priority="medium" taskState="mark" label="LOCAL MARS OFFICE"
               labelStyle="thirdLabelStyle" userPhoto="third" alt="User Photo">Register with the Mars Ministry of Revenue</TaskCard>
            <TaskCard priority="medium" taskState="done" label="LOCAL MARS OFFICE"
               labelStyle="thirdLabelStyle" userPhoto="first" alt="User Photo">Draft network plan for Mars Office</TaskCard>
         </TaskBoard>
         <TaskBoard title="DONE">
            <TaskCard priority="medium" taskState="arrow-up" label="LARGE TEAM SUPPORT"
               labelStyle="fourthLabelStyle" userPhoto="fourth" alt="User Photo">Homepage filter uses an inline style-should use a class</TaskCard>
            <TaskCard priority="medium" taskState="tool" label="SPACE TRAVEL PARTNERS"
               labelStyle="firstLabelStyle" userPhoto="fifth" alt="User Photo">Engage Saturn Shuttle Lines for group tours</TaskCard>
            <TaskCard priority="low" taskState="arrow-up" label="LOCAL MARS OFFICE"
               labelStyle="thirdLabelStyle" userPhoto="second" alt="User Photo">Create 90 day plans for all departments in the Mars Office</TaskCard>
            <TaskCard priority="hight" taskState="done" label="SPACE TRAVEL PARTNERS"
               labelStyle="firstLabelStyle" userPhoto="third" alt="User Photo">Establish a catering vendor to provide meal service</TaskCard>
            <TaskCard priority="medium" taskState="done" label="SPACE TRAVEL PARTNERS"
               labelStyle="firstLabelStyle" userPhoto="first" alt="User Photo">Engage Jupiter Express out solar system travel</TaskCard>
            <TaskCard priority="low" taskState="arrow-up" label="LOCAL MARS OFFICE"
               labelStyle="thirdLabelStyle" userPhoto="second" alt="User Photo">Create 90 day plans for all departments in the Mars Office</TaskCard>
            <TaskCard priority="medium" taskState="arrow-up" label="SPACE TRAVEL PARTNERS"
               labelStyle="firstLabelStyle" userPhoto="third" alt="User Photo">Engage Saturn’s Rings Resort as a preferred provider</TaskCard>
            <TaskCard priority="medium" taskState="mark" label="SEESPACEEZ PLUS"
               labelStyle="secondLabelStyle" userPhoto="fourth" alt="User Photo">Enable speedy SpaceCraft as the preferred</TaskCard>
            <TaskCard priority="hight" taskState="done" label="SPACE TRAVEL PARTNERS"
               labelStyle="firstLabelStyle" userPhoto="fifth" alt="User Photo">Establish a catering vendor to provide meal service</TaskCard>
            <TaskCard priority="medium" taskState="mark" label="LOCAL MARS OFFICE"
               labelStyle="thirdLabelStyle" userPhoto="first" alt="User Photo">Requesting available flights is nów taking</TaskCard>
         </TaskBoard> */}
      </div>
      {children}
   </div >
   );
}

export default observer(Board)