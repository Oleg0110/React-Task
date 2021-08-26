import styles from "./CreateProjectArea.module.scss";
import { Button } from ".."
import { ProjectsStore } from "../../stores";
import { observer } from "mobx-react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "../../hooks";
import { TITLE_VALIDATION } from "../../utils/validation";
import { MEDIUM_DEVISCES } from "../../utils/constants";


const CreateProjectArea = ({ onClick }) => {

   const mediumDevices = useMediaQuery(MEDIUM_DEVISCES)

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
               {...register("name", TITLE_VALIDATION)}
               type="text" placeholder="Name" className={styles.inputNane} />
            {errors.name && <p>Required field</p>}
            <h3 className={styles.projectTitle}>Project Description :</h3>
            <textarea
               {...register("content", {
                  required: {
                     value: true,
                     message: "ERROR"
                  },
                  minLength: {
                     value: 15,
                     message: "Minimal 15 letters"
                  },
               })}
               type="textarea" placeholder="Description" className={`${styles.inputText} ${mediumDevices && styles.inputTextMD}`} />
            {/* {errors.content && <p>Required field</p>} */}
            {errors.content?.minLength?.message && <p>{errors.content?.minLength.message}</p>}
            {errors.content?.message && <p>{errors.content?.message}</p>}
            <Button onClick={onClick} buttonStyle="thirdButtonStyle">Create Project</Button>
         </form>
      </div>
   )
}

export default observer(CreateProjectArea);