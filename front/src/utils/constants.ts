interface IRouts {
   home: string,
   projects: string,
   dashboard: string,
   dashboardLists: string,
   dashboardTasks: string,
   people: string,
   backlog: string,
   reports: string,
   components: string,
   releases: string,
   addItem: string,
   settings: string,
   userSignUp: string,
   userLogIn: string,
   userAuth: string,
   userAuthSignUp: string,
   userAauthLogIn: string,
   userAauthPeople: string,
   userAauthUser: string,
}


export const RESPONSIVE_SIZES: Array<string> = ["(max-width: 576px)", "(max-width: 768px)", "(max-width: 992px)"]
export const RESPONSIVE_VALUE: Array<string> = ["SD", "MD", "LD"]
export const RESPONSIVE_WHITHOUT_VALUE: string = "Another"

export const ROUTES: IRouts = {
   home: "/",
   projects: "/projects",
   dashboard: "/dashboards",
   dashboardLists: "/dashboards/list",
   dashboardTasks: "/dashboards/task",
   people: "/people",
   backlog: "/backlog",
   reports: "/reports",
   components: "/components",
   releases: "/releases",
   addItem: "/add-item",
   settings: "/settings",
   userSignUp: "/user/sign-up",
   userLogIn: "/user/log-in",
   userAuth: "/user-auth",
   userAuthSignUp: "/user-auth/sign-up",
   userAauthLogIn: "/user-auth/login",
   userAauthPeople: "/user-auth/people",
   userAauthUser: "/user-auth/user",
}


export const storageDataName: string = "userData"

