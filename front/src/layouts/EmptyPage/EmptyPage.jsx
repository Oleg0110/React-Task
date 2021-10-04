import styles from "./EmptyPage.module.scss"
import { useTranslation } from "react-i18next";

const EmptyPage = ({ children }) => {

   const { t } = useTranslation();

   return (<div className={styles.backFon}>
      <h1 className={styles.title}>{t("empty.title")}</h1>
      <p className={styles.text}>{t("empty.text")}</p>
      <hr className={styles.line} />
      {children}
   </div>

   )
}

export default EmptyPage