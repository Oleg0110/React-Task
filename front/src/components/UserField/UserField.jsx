import styles from "./UserField.module.scss"
import { Button } from '..';
import { useClickOutside } from "../../hooks";
import { useRef } from "react";
import { UserStore } from "../../stores";
import { observer } from "mobx-react"

const UserField = ({ isOpened, onModalClose, onClick, onClickOutside }) => {


   const { user } = UserStore

   const ref = useRef(null)

   useClickOutside(ref, onClickOutside)

   return (
      <div className={isOpened ? styles.sidebar : styles.opened} ref={ref}>
         <div className={styles.content}>
            <div className={styles.logoPosition}>
               <h1 className={styles.logo}>DILA</h1>
            </div>
            {user.map((data) => <p>{data.name}</p>)}
            <div className={styles.closeIconPosition}>
               <Button onClick={onModalClose}><div className={styles.closeIcon} /></Button>
            </div>
            <div>
               <Button onClick={onClick}>
                  <span className={styles.buttonStyle}>Sign up</span>
               </Button>
            </div>
         </div>
      </div>
   )
}

export default observer(UserField)