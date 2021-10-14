import React from "react";
import { Button } from '..';
import { UserStore } from "../../stores";
import { observer } from "mobx-react"
import { useHistory } from "react-router";
import { ROUTES, storageDataName } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import styles from "./UserField.module.scss"

interface IUserFieldProps {
  isOpened: boolean,
  onModalClose: () => void
}

interface IUserProps {
  name: string,
  email: string
}

const UserField: React.FC<IUserFieldProps> = ({ isOpened, onModalClose }) => {
  const { t } = useTranslation();
  const history = useHistory();

  // !!! ToDo any

  const isAuth = !!UserStore.userToken;
  const { user } = UserStore;

  const logout = () => {
    localStorage.removeItem(storageDataName);
    onModalClose()
    history.push(ROUTES.home)
    window.location.reload()
  }

  const userInfo = (): string => isAuth ? styles.infoField : styles.infoFieldNone
  const userPhoto = (): string => isAuth ? styles.userPhoto : styles.empty
  const authentication = (): string => !isAuth ? styles.buttons : styles.buttonsNone
  const exit = (): string => isAuth ? styles.exit : styles.exitNone
  const sidebarHeight = (): string => isAuth ? styles.sidebarHeight : styles.sidebar


  return (
    <div className={isOpened ? sidebarHeight() : styles.opened}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t("userField.title")}</h1>
        <Button onClick={onModalClose}>
          <div className={styles.closeIcon} />
        </Button>
        <div className={userInfo()}>
          <div className={userPhoto()} />
          <div className={styles.userInfo}>
            <p className={styles.name}>{user?.name}</p>
            <p className={styles.email}>{user?.name}</p>
          </div>
        </div>
      </div>
      <div className={styles.buttonField}>
        <div className={authentication()}>
          <Button
            onClick={() => {
              history.push(ROUTES.userAuthSignUp);
              onModalClose();
            }}
            buttonStyle="userFieldButtonStyle">
            <span className={styles.buttonSign}>{t("userField.signUp")}</span>
          </Button>
          <Button onClick={() => {
            history.push(ROUTES.userAauthLogIn)
            onModalClose()
          }} buttonStyle="userFieldButtonStyle">
            <span className={styles.buttonLog}>{t("userField.logIn")}</span>
          </Button>
        </div>
        <div className={exit()}>
          <Button buttonStyle="userFieldButtonStyle" onClick={logout}>
            <p className={styles.buttonExit}>
              {t("userField.exit")}
            </p>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default observer(UserField)