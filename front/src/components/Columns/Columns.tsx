import styles from "./Columns.module.scss"
import { Button, Tasks, CreateTaskModalWindow, DeleteListModal } from ".."
import { useForm } from "react-hook-form";
import React, { useState } from "react"
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"
import { Droppable } from 'react-beautiful-dnd';
import { TITLE_VALIDATION } from "../../utils/validation";

interface IcardsData {
   text: string,
   _id: string
}

interface IColumns {
   title: string,
   listId: string,
   cardsData?: Array<IcardsData>,
   index?: number
}

interface IData {
   title: string,
}

const Columns: React.FC<IColumns> = ({ title, listId, cardsData }) => {

   const [isTaskModalOpened, setIsTaskModalOpened] = useState<boolean>(false)
   const [isInputOpened, setIsInputOpened] = useState<boolean>(false)
   const [isDeleteOpened, setIsDeleteOpened] = useState<boolean>(false)

   const { register, handleSubmit, formState: { errors } } = useForm();

   // const handleOnDragEnd = (result) => {
   //    BoardStore.dragInList(result, id)
   // }

   const onSubmit = (data: IData) => {
      BoardStore.changeList(data.title, listId)
      // return `${isInputOpened ? styles.inputPositon : styles.opened}`
   }

   // !!! ToDo ALT

   return (
      <div>
         <DeleteListModal id={listId}
            onModalClose={() => setIsDeleteOpened(false)}
            isModalOpened={isDeleteOpened} />
         <Droppable droppableId={listId}>
            {(provided) => {
               return (
                  <div
                     className={styles.taskBoard}
                     {...provided.droppableProps}
                     ref={provided.innerRef}
                  >
                     <CreateTaskModalWindow id={listId} isModalOpened={isTaskModalOpened}
                        onModalClose={() => setIsTaskModalOpened(false)}
                     />
                     <div className={styles.taskInfo}>
                        <form className={`${styles.inputPositon} ${isInputOpened && styles.opened}`}
                           onSubmit={handleSubmit(onSubmit)}>
                           <div className={styles.inputPositonError}>
                              <input {...register("title", TITLE_VALIDATION)} autoComplete="off" type="text" defaultValue={title}
                                 className={styles.input} />
                              {errors.title?.message && <p className={styles.errorPosition}>
                                 {errors.title?.message}
                              </p>}
                           </div>
                           <div className={styles.clickOutside} onClick={() => setIsInputOpened(false)}></div>
                        </form>
                        <p className={`${styles.taskTitle} ${isInputOpened && styles.hide}`}
                           onClick={() => setIsInputOpened(!isInputOpened)}>{title}</p>
                        <div className={styles.buttonPosition}>
                           <Button onClick={() => setIsTaskModalOpened(!isTaskModalOpened)}>
                              <div className={styles.plus}
                              // alt="Plus Icon" 
                              /></Button>
                           <Button onClick={() => setIsDeleteOpened(!isDeleteOpened)}><div className={styles.delete}
                           // alt="Delete" 
                           /></Button>
                        </div>
                     </div>
                     {
                        cardsData?.map((data, index) => {
                           return (
                              <Tasks text={data.text} index={index} key={data._id} id={data._id} listId={listId} />
                           )
                        })
                     }
                     {provided.placeholder}
                  </div>
               )
            }}
         </Droppable>
      </div >
   )
}


export default observer(Columns)