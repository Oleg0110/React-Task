import React from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components'
import { ROUTES } from '../../utils/constants'
import { IButtonProps } from '../../utils/interFace'
import useStore from '../../hooks/useStore'
import styles from './Sidebar.module.scss'

interface ISidebarProps {
  isOpened: boolean
  setSidebarOpened: (boolean: boolean) => void
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
  const { userStore } = useStore()
  const { isAuthenticated } = userStore

  const { t } = useTranslation()
  const history = useHistory()

  const onButtonClick = (links: string) => {
    isAuthenticated
      ? history.push(links)
      : toast.error('please sign up or log in')
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
