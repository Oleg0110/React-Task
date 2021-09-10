import styles from "./CreateProjectArea.module.scss";
import { Button } from ".."
import { ProjectsStore } from "../../stores";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { useMedia } from "../../hooks";
import { CREATE_CONTENT_VALIDATION, TITLE_VALIDATION } from "../../utils/validation";
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE } from "../../utils/constants";




const CreateProjectArea = ({ onClick }) => {

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);

   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = data => {
      ProjectsStore.pushProject(data.title, data.content)
   };


   return (
      <div className={`${styles.createArea} ${styles[`createArea${responsive}`]}`}>
         <h2 className={styles.createCardTitle}>Create Project</h2>
         <form className={styles.descriptionProjectBlock} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={styles.projectTitle}>Project Name :</h3>
            <input
               {...register("title", TITLE_VALIDATION)}
               type="text" placeholder="Title" className={styles.inputName} />
            {errors.title?.message && <p className={styles.errorNamePosition}>
               {errors.title?.message}
            </p>}
            <h3 className={styles.projectTitle}>Project Description :</h3>
            <textarea
               {...register("content", CREATE_CONTENT_VALIDATION)}
               type="textarea" placeholder="Description" className={`${styles.inputText} ${styles[`inputText${responsive}`]}`} />
            {errors.content?.message && <p className={styles.errorContentPosition}>
               {errors.content?.message}
            </p>}
            <Button onClick={onClick} buttonStyle="fourthButtonStyle">Create Project</Button>
         </form>
      </div>
   )
}

export default observer(CreateProjectArea);