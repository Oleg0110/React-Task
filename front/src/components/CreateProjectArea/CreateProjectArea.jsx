import styles from "./CreateProjectArea.module.scss";
import { Button } from ".."
import { ProjectsStore } from "../../stores";
import { observer } from "mobx-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "../../hooks";
import { MAIN_VALIDATION } from "../../utils/validation";


const CreateProjectArea = ({ onClick }) => {

   const mediumDevices = useMediaQuery("(max-width: 768px)")
   // const nameRef = useRef(null)
   // const descriptionRef = useRef(null)

   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = data => {
      ProjectsStore.pushProject(data.name, data.content)
   };

   return (
      <div className={`${styles.createArea} ${mediumDevices && styles.createAreaMedia}`}>
         <h2 className={styles.createCardTitle}>Create Project</h2>
         <form className={styles.descriptionProjectBlock} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={styles.projectTitle}>Project Name :</h3>
            <input
               {...register("name", MAIN_VALIDATION)}
               type="text" placeholder="Name" className={styles.inputNane} />
            {errors.name && <p>Required field</p>}
            <h3 className={styles.projectTitle}>Project Description :</h3>
            <textarea
               {...register("content", {
                  required: true,
                  minLength: 15,
               })}
               type="textarea" placeholder="Description" className={`${styles.inputText} ${mediumDevices && styles.inputTextMedia}`} />
            {errors.content && <p>Required field</p>}
            {errors.content?.minLength && <p>Min 15 Symbol</p>}
            <Button onClick={onClick} buttonStyle="thirdButtonStyle">Create Project</Button>
         </form>
         {/* <form className={styles.descriptionProjectBlock} onSubmit={(e) => {
            e.preventDefault()
            ProjectsStore.pushProject(nameRef.current.value, descriptionRef.current.value)
         }}>
            <h3 className={styles.projectTitle}>Project Name :</h3>
            <input type="text" placeholder="Name" className={styles.inputNane} ref={nameRef} />
            <h3 className={styles.projectTitle}>Project Description :</h3>
            <textarea type="textarea" placeholder="Description" className={`${styles.inputText} ${mediumDevices && styles.inputTextMedia}`}
               ref={descriptionRef} />
            <Button onClick={onClick} buttonStyle="thirdButtonStyle">Create Project</Button>
         </form> */}
      </div>
   )
}

export default observer(CreateProjectArea);