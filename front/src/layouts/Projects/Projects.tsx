import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { Button, Accordion, CreateProjectArea } from '../../components'
import useMedia from '../../hooks/useMedia'
import {
  RESPONSIVE_SIZES,
  RESPONSIVE_VALUE,
  RESPONSIVE_WHITHOUT_VALUE,
} from '../../utils/constants'
import { IProject } from '../../utils/interface'
import useStore from '../../hooks/useStore'
import styles from './Projects.module.scss'

const Projects: React.FC = ({ children }) => {
  const { projectStore } = useStore()
  const { projects, asyncGetProjects } = projectStore

  useEffect(() => {
    asyncGetProjects()
  }, [asyncGetProjects])

  const { t } = useTranslation()

  const responsive = useMedia(
    RESPONSIVE_SIZES,
    RESPONSIVE_VALUE,
    RESPONSIVE_WHITHOUT_VALUE,
  )

  const searchTitleref = useRef<HTMLInputElement>(null)
  const searchContentref = useRef<HTMLInputElement>(null)

  const [isOpened, setIsOpened] = useState(false)
  const [isChangeName, setChangeName] = useState(false)
  const [searchTitle, setSearchTitle] = useState('')
  const [searchContent, setSearchContent] = useState('')
  const [isSearchOpened, setIsSearchOpened] = useState(false)

  const projectsByTitle: IProject[] = projects.filter((found) => {
    const projectsTitle = found.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase())
    return projectsTitle
  })

  const projectsByContent: IProject[] = projects.filter((found) => {
    const projectsContent = found.content
      .toLowerCase()
      .includes(searchContent.toLowerCase())

    return projectsContent
  })

  const accordionBlock = () => {
    const block = `${
      (isOpened && styles.accordionBlock) || styles.accordionBlockMax
    }`
    return block
  }

  const createProjectArea = () => {
    const area = `${
      (isOpened && styles.openedCreateProjectBlock) ||
      styles.closeCreateProjectBlock
    }`
    return area
  }

  const projectsCount = () => {
    const count = `${projects.length === 0 ? styles.countNone : styles.count}`
    return count
  }

  const openModalButton = () => {
    if (isChangeName) {
      return t('projects.hide')
    }
    return t('projects.create')
  }

  return (
    <div className={styles.mainProjectsStyle}>
      <h1 className={styles.mainTitle}>
        {t('projects.title')}
        <span className={projectsCount()}>{projects.length}</span>
      </h1>
      <div className={styles.create}>
        <div
          className={` ${styles.searchArea} ${
            styles[`searchArea${responsive}`]
          }`}
        >
          <form
            onChange={(e) => {
              e.preventDefault()
              if (searchTitleref.current) {
                setSearchTitle(searchTitleref.current.value)
              } else if (searchContentref.current) {
                setSearchContent(searchContentref.current.value)
              } else {
                console.warn(
                  "Strange behavior, i don't know why, but null came here: searchValue",
                )
              }
            }}
          >
            <div
              className={`${styles.titleSearch} ${
                isSearchOpened && styles.titleSearchClose
              }`}
            >
              <input
                type='text'
                placeholder={t('projects.titlePlaceholder')}
                className={styles.searchInput}
                ref={searchTitleref}
              />
              <div className={styles.searchIcon} />
              <Button onClick={(e) => e.preventDefault()}>
                <div className={styles.delete} />
              </Button>
            </div>
            <div
              className={`${styles.contentSearch} ${
                isSearchOpened && styles.contentSearchOpened
              }`}
            >
              <input
                type='text'
                placeholder={t('projects.contentPlaceholder')}
                className={styles.searchInput}
                ref={searchContentref}
              />
              <div className={styles.searchIcon} />
              <Button onClick={(e) => e.preventDefault()}>
                <div className={styles.delete} />
              </Button>
            </div>
          </form>
          <Button
            tooltipContent={t('tooltip.change')}
            onClick={() => {
              setIsSearchOpened(!isSearchOpened)
            }}
          >
            <div className={styles.change} />
          </Button>
        </div>
        <Button
          onClick={() => {
            setIsOpened(!isOpened)
            setChangeName(!isChangeName)
          }}
          buttonStyle='thirdButtonStyle'
        >
          {openModalButton()}
        </Button>
      </div>
      {projects.length === 0 && <div className={styles.loader} />}
      <div
        className={`${styles.projectsBlocks} ${
          styles[`projectsBlocks${responsive}`]
        }`}
      >
        <div
          className={`${styles.accordionBlock} ${
            styles[`accordionBlock${responsive}`]
          } ${accordionBlock()}`}
        >
          {(isSearchOpened &&
            projectsByContent?.map((data) => (
              <Accordion id={data.id} key={data.id} />
            ))) ||
            projectsByTitle?.map((data) => (
              <Accordion id={data.id} key={data.id} />
            ))}
        </div>
        <div
          className={`${styles.createProjectArea} ${
            styles[`createProjectArea${responsive}`]
          } ${createProjectArea()}`}
        >
          <CreateProjectArea />
        </div>
      </div>
      {children}
    </div>
  )
}

export default observer(Projects)
