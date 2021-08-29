import styles from "./CreateProjectArea.module.scss";
import { Button } from ".."
import { ProjectsStore } from "../../stores";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "../../hooks";
import { CREATE_CONTENT_VALIDATION, TITLE_VALIDATION } from "../../utils/validation";
import { LARGE_DEVICES, MEDIUM_DEVICES, SMALL_DEVICES } from "../../utils/constants";


const CreateProjectArea = ({ onClick }) => {

   const smallDevices = useMediaQuery(SMALL_DEVICES)
   const mediumDevices = useMediaQuery(MEDIUM_DEVICES)
   const largeDevices = useMediaQuery(LARGE_DEVICES)

   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = data => {
      ProjectsStore.pushProject(data.name, data.content)
   };

   return (
      <div className={`${styles.createArea} ${mediumDevices && styles.createAreaMD}`}>
         <h2 className={styles.createCardTitle}>Create Project</h2>
         <form className={styles.descriptionProjectBlock} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={styles.projectTitle}>Project Name :</h3>
            <input
               {...register("title", TITLE_VALIDATION)}
               type="text" placeholder="Name" className={styles.inputNane} />
            {errors.title?.message && <p className={`${styles.errorNamePosition} ${smallDevices && styles.errorNamePositionSD}
            ${mediumDevices && styles.errorNamePositionMD} `}>
               {errors.title?.message}
            </p>}
            <h3 className={styles.projectTitle}>Project Description :</h3>
            <textarea
               {...register("content", CREATE_CONTENT_VALIDATION)}
               type="textarea" placeholder="Description" className={`${styles.inputText} ${mediumDevices && styles.inputTextMD}`} />
            {errors.content?.message && <p className={`${styles.errorContentPosition}  ${smallDevices && styles.errorContentPositionSD}
            ${mediumDevices && styles.errorContentPositionMD} ${largeDevices && styles.errorContentPositionLD}`}>
               {errors.content?.message}
            </p>}
            <Button onClick={onClick} buttonStyle="fourthButtonStyle">Create Project</Button>
         </form>
      </div>
   )
}

export default observer(CreateProjectArea);