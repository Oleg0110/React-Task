import { ROUTES } from "./constants"


export const BASIC_URL: string = "http://localhost:5000"

export const LINK_PROJECTS: string = `${BASIC_URL}${ROUTES.projects}`
export const LINK_DASHBOARD: string = `${BASIC_URL}${ROUTES.dashboard}`
export const LINK_DASHBOARD_LISTS: string = `${BASIC_URL}${ROUTES.dashboardLists}`
export const LINK_DASHBOARD_TASKS: string = `${BASIC_URL}${ROUTES.dashboardTasks}`
export const LINK_USER_AUTH_SING_UP: string = `${BASIC_URL}${ROUTES.userAuthSignUp}`
export const LINK_USER_AUTH_LOG_IN: string = `${BASIC_URL}${ROUTES.userAauthLogIn}`
export const LINK_USER_AUTH_PEOPLE: string = `${BASIC_URL}${ROUTES.userAauthPeople}`
export const LINK_USER_AUTH_USER: string = `${BASIC_URL}${ROUTES.userAauthUser}`
export const LINK_USER_AUTH: string = `${BASIC_URL}${ROUTES.userAuth}`