import { UserCard } from "../../components"
import styles from "./People.module.scss"
import { useMedia } from "../../hooks"
import { RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE } from "../../utils/constants";
import { UserStore } from "../../stores";

const People = () => {

   const responsive = useMedia(RESPONSIVE_SIZES, RESPONSIVE_VALUE, RESPONSIVE_WHITHOUT_VALUE);

   const { users } = UserStore

   return (
      <div className={styles.mainBlock}>
         <h1 className={styles.title}>Users</h1>
         <div className={`${styles.backFon} ${styles[`backFon${responsive}`]}`}>
            <div className={styles.scroll}>
               {users.map((data) => <UserCard name={data.name} email={data.email} key={data._id} />)}
            </div>
         </div>
      </div>
   )
}


export default People