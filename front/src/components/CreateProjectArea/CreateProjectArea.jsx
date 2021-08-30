import styles from "./CreateProjectArea.module.scss";
import { Button } from ".."
import { ProjectsStore } from "../../stores";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "../../hooks";
import { CREATE_CONTENT_VALIDATION, TITLE_VALIDATION } from "../../utils/validation";
import { MEDIUM_DEVICES } from "../../utils/constants";


const CreateProjectArea = ({ onClick }) => {

   const mediumDevices = useMediaQuery(MEDIUM_DEVICES)

   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = data => {
      ProjectsStore.pushProject(data.name, data.content)
   };




   return (
      <div className={`${styles.createArea} ${mediumDevices && styles.createAreaMD}`}>
         <h2 className={styles.createCardTitle}>Create Project</h2>
         <form className={styles.descriptionProjectBlock} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={styles.projectName}>Project Name :</h3>
            <input
               {...register("name", TITLE_VALIDATION)}
               type="text" placeholder="Name" className={styles.inputName} />
            {errors.name?.message && <p className={styles.errorNamePosition}>
               {errors.name?.message}
            </p>}
            <h3 className={styles.projectTitle}>Project Description :</h3>
            <textarea
               {...register("content", CREATE_CONTENT_VALIDATION)}
               type="textarea" placeholder="Description" className={`${styles.inputText} ${mediumDevices && styles.inputTextMD}`} />
            {errors.content?.message && <p className={styles.errorContentPosition}>
               {errors.content?.message}
            </p>}
            <Button onClick={onClick} buttonStyle="fourthButtonStyle">Create Project</Button>
         </form>
      </div>
   )
}

export default observer(CreateProjectArea);