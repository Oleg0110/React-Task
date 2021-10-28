export const RESPONSIVE_SIZES: string[] = [
  '(max-width: 576px)',
  '(max-width: 768px)',
  '(max-width: 992px)',
]
export const RESPONSIVE_VALUE: string[] = ['SD', 'MD', 'LD']
export const RESPONSIVE_WHITHOUT_VALUE = 'Another'

export const ROUTES = {
  home: '/',
  projects: '/projects',
  dashboard: '/dashboards',
  dashboardColumn: '/dashboards/column',
  dashboardTasks: '/dashboards/task',
  people: '/people',
  backlog: '/backlog',
  reports: '/reports',
  components: '/components',
  releases: '/releases',
  addItem: '/add-item',
  settings: '/settings',
  userSearch: 'user-search',
  userSignUp: '/user/sign-up',
  userLogIn: '/user/log-in',
  userAuth: '/user-auth',
  userAuthSignUp: '/user-auth/sign-up',
  userAauthLogIn: '/user-auth/login',
  userAauthPeople: '/user-auth/people',
  userAauthUser: '/user-auth/user',
  manageProject: '/manage-project',
}

export const storageDataName = 'userData'
