import { ROUTES } from "./constants"

const BASIC_URL = "http://localhost:5000"

export const LINK_PROJECTS = `${BASIC_URL}${ROUTES.projects}`
export const LINK_DASHBOARD = `${BASIC_URL}${ROUTES.dashboard}`
export const LINK_DASHBOARD_LISTS = `${BASIC_URL}${ROUTES.dashboardLists}`
export const LINK_DASHBOARD_TASKS = `${BASIC_URL}${ROUTES.dashboardTasks}`
export const LINK_USER_SING_UP = `${BASIC_URL}${ROUTES.user}${ROUTES.signUp}`
export const LINK_USER_LOG_IN = `${BASIC_URL}${ROUTES.user}${ROUTES.logIn}`
export const LINK_USER_AUTH_SING_UP = `${BASIC_URL}${ROUTES.userAuthSignUp}`
export const LINK_USER_AUTH_LOG_IN = `${BASIC_URL}${ROUTES.userAauthLogIn}`
export const LINK_USER_AUTH_PEOPLE = `${BASIC_URL}${ROUTES.userAauthPeople}`
export const LINK_USER_AUTH_USER = `${BASIC_URL}${ROUTES.userAauthUser}`
export const LINK_USER_AUTH = `${BASIC_URL}${ROUTES.userAuth}`