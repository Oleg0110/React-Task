import React from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components'
import { ROUTES } from '../../utils/constants'
import { UserStore } from '../../stores'
import styles from './Sidebar.module.scss'

interface ISidebarProps {
  isOpened: boolean
  // onClick: () => void
  setSidebarOpened: (boolean: boolean) => void
}

interface IButtonProps {
  id: string
  name: string
  link: string
  icon: string
  style: string
}

const buttons: IButtonProps[] = [
  {
    id: '0',
    name: 'sidebar.backlog',
    link: ROUTES.backlog,
    icon: 'backlogIcon',
    style: 'sidebarButtonStyle',
  },
  {
    id: '1',
    name: 'sidebar.reports',
    link: ROUTES.reports,
    icon: 'reportsIcon',
    style: 'sidebarButtonStyle',
  },
  {
    id: '2',
    name: 'sidebar.components',
    link: ROUTES.components,
    icon: 'componentsIcon',
    style: 'sidebarButtonStyle',
  },
  {
    id: '3',
    name: 'sidebar.releases',
    link: ROUTES.releases,
    icon: 'releaseIcon',
    style: 'sidebarButtonStyle',
  },
  {
    id: '5',
    name: 'sidebar.addItem',
    link: ROUTES.addItem,
    icon: 'addItemIcon',
    style: 'sidebarButtonStyle',
  },
]

const Sidebar: React.FC<ISidebarProps> = ({
  isOpened,
  children,
  setSidebarOpened,
}) => {
  const isAuth = !!UserStore.userToken

  const history = useHistory()

  const { t } = useTranslation()

  const onButtonClick = (links: string) => {
    isAuth ? history.push(links) : toast.error('please sign up or log in')
    setSidebarOpened(false)
  }

  return (
    <div className={`${styles.sidebar} ${isOpened && styles.opened}`}>
      {children}
      {buttons.map((data) => (
        <Button
          key={data.id}
          onClick={() => {
            onButtonClick(data.link)
          }}
          buttonStyle={data.style}
        >
          <div className={`${styles.icon} ${styles[data.icon]}`} />
          {t(data.name)}
        </Button>
      ))}
    </div>
  )
}

export default Sidebar
