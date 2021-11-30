import React, { useState } from 'react'
// import UserAccount from './layouts/UserAccount/UserAccount';
import { useHistory } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { IButtonProps } from './utils/interface'
import useStore from './hooks/useStore'
import { Header, Sidebar } from './layouts'
import { Button, UserField } from './components'
import {
  RESPONSIVE_SIZES,
  RESPONSIVE_VALUE,
  RESPONSIVE_WHITHOUT_VALUE,
  ROUTES,
} from './utils/constants'
import useMedia from './hooks/useMedia'
import useRoutes from './utils/routes'

import styles from './App.module.scss'
import 'react-toastify/dist/ReactToastify.css'

const buttons: IButtonProps[] = [
  {
    id: '0',
    name: 'header.home',
    link: ROUTES.home,
    icon: 'homeIcon',
    style: 'mainButtonStyle',
  },
  {
    id: '1',
    name: 'header.projects',
    link: ROUTES.projects,
    icon: 'projectsIcon',
    style: 'mainButtonStyle',
  },
  {
    id: '2',
    name: 'header.dashboards',
    link: ROUTES.dashboard,
    icon: 'dashboardsIcon',
    style: 'mainButtonStyle',
  },
  {
    id: '3',
    name: 'header.people',
    link: ROUTES.people,
    icon: 'peopleIcon',
    style: 'fifthButtonStyle',
  },
]

const App: React.FC = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const routes = useRoutes()

  const responsive = useMedia(
    RESPONSIVE_SIZES,
    RESPONSIVE_VALUE,
    RESPONSIVE_WHITHOUT_VALUE,
  )

  const [isSidebarOpened, setSidebarOpened] = useState(false)
  const [isUserFieldOpened, setUserFieldOpened] = useState(false)

  const { userStore } = useStore()
  const { isAuthenticated } = userStore

  const onButtonClick = (links: string) => {
    const click = isAuthenticated
      ? history.push(links)
      : toast.error('please sign up or log in')

    return click
  }

  const buttonsMap = buttons.map((button) => (
    <Button
      onClick={() => {
        setSidebarOpened(false)
        onButtonClick(button.link)
      }}
      buttonStyle={
        responsive === 'SD' || responsive === 'MD'
          ? 'sidebarButtonStyle'
          : button.style
      }
      key={button.id}
    >
      <div
        className={`${styles.icon} ${
          styles[`icon${responsive}`] && styles[button.icon]
        }`}
      />
      <p>{t(button.name)}</p>
    </Button>
  ))

  const buttonsInSidebar =
    responsive === 'SD' || responsive === 'MD' ? buttonsMap : ''

  const buttonsInHeader =
    responsive === 'LD' || responsive === 'Another' ? buttonsMap : ''

  return (
    <div className={styles.App}>
      <Header
        onClick={() => {
          setUserFieldOpened(false)
          setSidebarOpened(!isSidebarOpened)
        }}
        userField={() => {
          setSidebarOpened(false)
          setUserFieldOpened(!isUserFieldOpened)
        }}
      >
        {buttonsInHeader}
      </Header>
      <Sidebar setSidebarOpened={setSidebarOpened} isOpened={isSidebarOpened}>
        {buttonsInSidebar}
      </Sidebar>
      <UserField
        isOpened={isUserFieldOpened}
        onModalClose={() => setUserFieldOpened(false)}
      />
      {routes}
      {/* <UserAccount></UserAccount> */}
      <ToastContainer />
    </div>
  )
}

export default observer(App)
