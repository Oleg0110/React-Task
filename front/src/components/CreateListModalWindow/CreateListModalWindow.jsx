import styles from "./CreateListModalWindow.module.scss"
import { Button } from ".."
import { useForm } from "react-hook-form";
import { BoardStore } from "../../stores"
import { observer } from "mobx-react"
import { TITLE_VALIDATION } from "../../utils/validation";
import TextBox from "../TextBox/TextBox"
import { useEffect } from "react";
import axios from "axios"


const asyncFunc = async () => {
   const res = await fetch("http://localhost:5000/dashboards")
   const lists = await res.json()
   console.log(lists);
}


const CreateListModalWindow = ({ isListModalOpened, onModalClose }) => {

   useEffect(() => {
      asyncFunc()
   }, [])

   const { register, handleSubmit, formState: { errors } } = useForm();
   const onSubmit = data => {
      axios.post("http://localhost:5000/dashboards", data)
      BoardStore.pushList(data.title)
   }

   const load = () => {
      BoardStore.loadProjects()
   }

   return (
      <>
         <div className={`${styles.backFon} ${isListModalOpened && styles.opened}`} onClick={onModalClose}></div>
         <div className={`${styles.createArea} ${isListModalOpened && styles.openedCreate}`}>
            <div className={styles.modalBody}>
               <div className={styles.closeIconPosition}>
                  <Button onClick={onModalClose}><div className={styles.closeIcon} /></Button>
               </div>
               <span className={styles.title}>List Title</span>
               <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                  <input {...register("title", TITLE_VALIDATION)} type="text" placeholder="Title"
                     className={styles.input} />
                  {errors.title?.message && <p className={styles.errorPosition}>
                     {errors.title?.message}
                  </p>}

                  <TextBox inputStyle="inputCreateList" placeholder="Title" type="text" innerRef={register("title", TITLE_VALIDATION)} error={errors?.title?.message} />
                  <Button buttonStyle="fifthButtonStyle">Add List</Button>
               </form>
               <Button onClick={load}>load</Button>
            </div>
         </div>
      </>

   )
}


export default observer(CreateListModalWindow)