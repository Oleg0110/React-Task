export const RESPONSIVE_SIZES = ["(max-width: 576px)", "(max-width: 768px)", "(max-width: 992px)"]
export const RESPONSIVE_VALUE = ["SD", "MD", "LD"]
export const RESPONSIVE_WHITHOUT_VALUE = "Another"

export const ROUTES = {
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

// const id = localStorage.getItem("userData")
// const user = JSON.parse(id)
// export const USER_ID = user.userId