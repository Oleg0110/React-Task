import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { Button, Accordion, CreateProjectArea } from '../../components'
import { ProjectsStore } from '../../stores'
import useMedia from '../../hooks/useMedia'
import {
  RESPONSIVE_SIZES,
  RESPONSIVE_VALUE,
  RESPONSIVE_WHITHOUT_VALUE,
} from '../../utils/constants'
import styles from './Projects.module.scss'

interface IProjectsProps {
  title: string
  content: string
  _id: string
}

const Projects: React.FC = ({ children }) => {
  const { projects } = ProjectsStore

  useEffect(() => {
    ProjectsStore.asyncGetProjects()
  }, [])

  const { t } = useTranslation()

  const responsive = useMedia(
    RESPONSIVE_SIZES,
    RESPONSIVE_VALUE,
    RESPONSIVE_WHITHOUT_VALUE,
  )

  const searchTitleref = useRef<HTMLInputElement>(null)
  const searchContentref = useRef<HTMLInputElement>(null)

  const [isOpened, setIsOpened] = useState(false)
  const [isChangeName, setChangeName] = useState('Create Project')
  const [searchTitle, setSearchTitle] = useState('')
  const [searchContent, setSearchContent] = useState('')
  const [isSearchOpened, setIsSearchOpened] = useState(false)

  const projectsByTitle: IProjectsProps[] = projects.filter((found) => {
    const projectsTitle = found.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase())
    return projectsTitle
  })
  const projectsByContent: IProjectsProps[] = projects.filter((found) => {
    const projectsContent = found.content
      .toLowerCase()
      .includes(searchContent.toLowerCase())
    return projectsContent
  })

  const handleOnDragEnd = (result: object) => ProjectsStore.dragProject(result)

  const accordionBlock = (): string => {
    const block = `${
      (isOpened && styles.accordionBlock) || styles.accordionBlockMax
    }`
    return block
  }
  const createProjectArea = (): string => {
    const area = `${
      (isOpened && styles.openedCreateProjectBlock) ||
      styles.closeCreateProjectBlock
    }`
    return area
  }
  const projectsCount = (): string => {
    const count = `${
      ProjectsStore.projects.length === 0 ? styles.countNone : styles.count
    }`
    return count
  }

  return (
    <div className={styles.mainProjectsStyle}>
      <h1 className={styles.mainTitle}>
        {t('projects.title')}
        <span className={projectsCount()}>{ProjectsStore.projects.length}</span>
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
            setChangeName(
              isChangeName === `${t('projects.create')}`
                ? `${t('projects.hide')}`
                : `${t('projects.create')}`,
            )
          }}
          buttonStyle='thirdButtonStyle'
        >
          {isChangeName}
        </Button>
      </div>
      <div
        className={`${styles.projectsBlocks} ${
          styles[`projectsBlocks${responsive}`]
        }`}
      >
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='cards'>
            {(conduct) => (
              <div
                className={`${styles.accordionBlock} ${
                  styles[`accordionBlock${responsive}`]
                } ${accordionBlock()}`}
                {...conduct.droppableProps}
                ref={conduct.innerRef}
              >
                {(isSearchOpened &&
                  projectsByContent?.map((data, index) => (
                    <Draggable
                      key={data._id}
                      draggableId={data._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.dragHandleProps}
                        >
                          <Accordion
                            title={data.title}
                            content={data.content}
                            id={data._id}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))) ||
                  projectsByTitle?.map((data, index) => (
                    <Draggable
                      key={data._id}
                      draggableId={data._id}
                      index={index}
                    >
                      {(provid) => (
                        <div
                          ref={provid.innerRef}
                          {...provid.draggableProps}
                          {...provid.dragHandleProps}
                        >
                          <Accordion
                            title={data.title}
                            content={data.content}
                            id={data._id}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {conduct.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
