
import React, { useEffect, useRef, useState } from "react"
import { Button, CreateListModalWindow, Columns } from "../../components"
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"
import { DragDropContext } from 'react-beautiful-dnd';
import { useMedia } from "../../hooks"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE } from "../../utils/constants"
import { useTranslation } from "react-i18next";
import styles from "./Dashboards.module.scss"

interface ITasks {
   text: string,
   _id: string
}

interface ILists {
   title: string,
   tasks: Array<ITasks>,
   _id: string
}

const Dashboards: React.FC = ({ children }) => {

   const projectId: string = window.location.href.split("dashboards/")[1];

   const { t } = useTranslation();

   useEffect(() => {
      BoardStore.asyncGetLists(projectId)
   }, [projectId]);


   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);

   const { lists }: { lists: Array<ILists> } = BoardStore

   const searchValue = useRef<HTMLInputElement>(null)
   const [isModalOpened, setIsModalOpened] = useState(false)
   const [searchTitle, setSearchTitle] = useState('')

   // const filteredList = lists.map(data => {
   //    const filteredTask = data.tasks.filter(name => name.text.includes(searchTitle))
   //    return { ...data, tasks: filteredTask }
   // })


   const handleOnDragEnd = (result: object) => BoardStore.dragLists(result)

   // !!! ToDo ALT

   return (<div className={styles.mainBoardStyle}>
      <CreateListModalWindow isModalOpened={isModalOpened}
         onModalClose={() => setIsModalOpened(false)}
      />
      <div className={styles.boardStyle}>
         <h2 className={styles.mainTitle}>{t("dashboards.title")}</h2>
         <div className={styles.release}>
            <Button buttonStyle="thirdButtonStyle">{t("dashboards.release")}</Button>
            <Button><div className={styles["three-dots"]}
            // alt="Dots" 
            /></Button>
         </div>
      </div>
      <div className={`${styles.create} ${styles[`create${responsive}`]}}`}>
         <div className={`${styles.createButtonPosition} ${styles[`createButtonPosition${responsive}`]}`}>
            <Button onClick={() => setIsModalOpened(!isModalOpened)} buttonStyle="thirdButtonStyle">
               <div className={styles.plus}
               // alt="Plus Icon" 
               />{t("dashboards.create")}</Button>
         </div>
         <form className={styles.searchBoardArea} onChange={(e) => {
            e.preventDefault()
            setSearchTitle(searchValue.current!.value)
         }}>
            <input type="text" placeholder={t("dashboards.taskPlaceholder")} className={styles.searchInput} ref={searchValue} />
            <div className={styles.searchIcon}
            // alt="Search Icon" 
            />
            <Button onClick={(e) => e.preventDefault()}><div className={styles.delete}
            // alt="Delete Icon" 
            /></Button>
         </form>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
         <div className={styles.boardLists}>
            {lists.map((data, index) => {
               return (
                  <Columns cardsData={data.tasks} title={data.title} key={data._id} listId={data._id} index={index} />
               )
            })}
         </div>
      </DragDropContext>
      {children}
   </div >
   );
}

export default observer(Dashboards)